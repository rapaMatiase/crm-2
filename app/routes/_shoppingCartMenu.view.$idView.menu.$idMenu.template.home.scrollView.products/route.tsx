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
import sinImagen from '/templateHome/ScrollView/images.jpeg';
import { ScrollViewComponent } from '~/components/scrollView-components';
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
        <ListViewItemWrapper style={{ flex: 1, padding: 10, borderRight: '1px solid lightgrey' }}>
            <Card>
                <CardImage
                    src={props.dataItem.image}
                    style={{
                        height: 150,
                        width: 180,
                    }}
                    className="cms-body_tarjeta-imagen"
                />
                <CardTitle
                    style={{
                        fontSize: 14,
                    }}
                    className="cms-body_tarjeta-cuerpo"
                >
                    {createComponent(dataHtml.body[0], props.dataItem)}
                </CardTitle>
            </Card>
        </ListViewItemWrapper>
    );
};

export default function Component() {
    interface LoaderData {
        dataWithImages: Array<{ image: string; ProductName: string; content: string }>;
        dataHtml: string;
    }

    const { dataWithImages, dataHtml } = useLoaderData<LoaderData>();

    const sixsPrimary = dataWithImages;
    return (
        <>
         <GridLayoutItem row={4} col={1} colSpan={15} style={{ backgroundColor: "red", placeItems: "center", placeContent: "center" }}>
         <h3> Productos destacados </h3>
            </GridLayoutItem>
            <GridLayoutItem row={5} col={1} colSpan={10} rowSpan={3} style={{ backgroundColor: "yellow" }}>
                <ListView
                 data={sixsPrimary}
                 item={(props) => MyItemRender(props, dataHtml)}
                 style={{ width: '110%', height: "40%" }} />
                  <style>
                    {`.k-listview-content {
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
        <div> Si estas viendo este texto, no hay datos para la lista de productos. </div>
    </>
}
// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card