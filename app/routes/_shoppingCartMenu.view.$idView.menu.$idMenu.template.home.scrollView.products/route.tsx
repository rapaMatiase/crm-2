//REMIX
import { Outlet, useLoaderData, useSearchParams } from '@remix-run/react';
//TELERIK
import { CardTitle, GridLayoutItem, StackLayout } from '@progress/kendo-react-layout';
import {
    StackLayout,
    Card,
    CardBody,
    CardImage,
} from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from '~/utils/URLSearchParams';
import { getContenidoFichaItem, getImage, getItems } from '~/api/apiContentSettings';
import { LoaderFunction } from '@remix-run/node';
import { createComponent } from '~/utils/ParseHtmlInjeccion';


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


export default function ScrollViewComponent() {
    interface LoaderData {
        dataWithImages: Array<{ image: string; ProductName: string; content: string }>;
        dataHtml: string;
    }

    const { dataWithImages, dataHtml } = useLoaderData<LoaderData>();


const sixsPrimary = dataWithImages.slice(0, 6);

    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_productos-destacados-titulo'>
            <h3 className='cms-home-body_productos-destacados-titulo'> Productos destacados </h3>
            </GridLayoutItem>
            <GridLayoutItem className='cms-home-body-grid_productos-destacados-lista'>
            <StackLayout className='cms-home-body_productos-destacados-lista' orientation={'horizontal'}>
                    {sixsPrimary.map((item, index) => (
                        <Card key={`productosdestacados-${index}`} style={{ height : "100%"}} className='cms-home-body_productos-destacados-lista-card'>
                            <CardImage src={item.image} />
                            <CardBody>
                            {createComponent(dataHtml.body[0], item)}
                            </CardBody>
                        </Card>))}
                </StackLayout>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card