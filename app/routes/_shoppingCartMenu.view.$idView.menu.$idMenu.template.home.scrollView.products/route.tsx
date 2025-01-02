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


export default function Component() {
    interface LoaderData {
        dataWithImages: Array<{ image: string; ProductName: string; content: string }>;
        dataHtml: string;
    }

    const { dataWithImages, dataHtml } = useLoaderData<LoaderData>();

    
    

    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_productos-destacados-titulo'>
                <h3 className='cms-home-body_productos-destacados-titulo'> Productos destacados </h3>
            </GridLayoutItem>

                        <ScrollViewComponent data={dataWithImages} dataHtml={dataHtml} />
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