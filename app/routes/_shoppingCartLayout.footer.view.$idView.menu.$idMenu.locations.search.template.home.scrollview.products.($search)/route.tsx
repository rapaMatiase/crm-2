//REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError, useSearchParams } from '@remix-run/react';
//TELERIK
import { CardTitle, GridLayoutItem, StackLayout } from '@progress/kendo-react-layout';
import {

    Card,
    CardBody,
    CardImage,
} from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from '~/utils/URLSearchParams';
import { getContenidoFichaItem, getImage, getItems } from '~/api/apiContentSettings';
import { LoaderFunction } from '@remix-run/node';
import { createComponent } from '~/utils/ParseHtmlInjeccion';
import { ListView, ListViewItemProps, ListViewItemWrapper } from '@progress/kendo-react-listview';


export const loader: LoaderFunction = async ({ request, params }) => {

    const idView = params.idView;

    const url = new URL(request.url);
    const selectedValue = url.searchParams.get("filters") || "[]";
    const selectedValueParese = JSON.parse(selectedValue);

    const array = selectedValueParese.map((item) => {
        return { key: item.value, value: "" };
    })
    const searchParams = url.searchParams;
    const urlParamsSearch = urlSearchParamsToObject(searchParams);

    const paramSearch = [...urlParamsSearch.menu, ...array]

    const paramJson = JSON.stringify(paramSearch);

    const response = await getItems(request, idView, paramJson);

    const data = await response;

    const dataWithImages = await Promise.all(
        data.map(async (item: any) => {
            const { id } = item;
            const image = await getImage({ request, id });
            return { ...item, image };
        })
    );

    const responseHtml = await getContenidoFichaItem(request, idView);

    return { dataWithImages, dataHtml: responseHtml };
};



const MyItemRender = (props: ListViewItemProps, dataHtml: string) => {
    let item = props.dataItem;
    return (
        <ListViewItemWrapper className='cms-tarjetas' style={{ flex: 1, padding: 10, borderRight: '1px solid lightgrey' }}>
            <Card>
                <CardImage
                    src={props.dataItem.image}
                    style={{
                        height: 150,
                        width: 180,
                    }}
                    className="cms-tarjetas_imagen"
                />
                <CardTitle
                    style={{
                        fontSize: 14,
                    }}
                    className="cms-tarjetas_cuerpo"
                >
                    {createComponent(dataHtml.div[0], props.dataItem)}
                </CardTitle>
            </Card>
        </ListViewItemWrapper>
    );
};

export default function Component() {

    const { dataWithImages, dataHtml } = useLoaderData<any>();

    return (
        <>
            <GridLayoutItem className='cms-productos-destacados_titulo' id='component-productos-destacados-titulo' row={5} col={1} colSpan={15} style={{ backgroundColor: "red", placeItems: "center", placeContent: "center" }}>
                <h3> Productos destacados </h3>
            </GridLayoutItem>
            <GridLayoutItem className='cms-productos-destacados_lista' id='component-productos-destacados-lista' row={6} col={1} colSpan={12} rowSpan={3} style={{ backgroundColor: "yellow" }}>
                <ListView
                    data={dataWithImages}
                    item={(props) => MyItemRender(props, dataHtml)}
                    style={{ width: '100%', height: "100%" }} />
                <style>
                    {` #component-productos-destacados-lista .k-listview-content {
                    display: flex;
                    flex-wrap: nowrap;
                }`}
                </style>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div> Si estas viendo este texto, no hay datos para la lista de productos. 22</div>
    </>
}
// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card