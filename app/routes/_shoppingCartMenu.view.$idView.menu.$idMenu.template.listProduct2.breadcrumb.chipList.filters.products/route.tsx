//TELERIK
import {  isRouteErrorResponse, Outlet, useLoaderData, useRouteError, useSearchParams } from "@remix-run/react";
import { Card, CardImage, CardTitle, GridLayoutItem } from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from "~/utils/URLSearchParams";
import { LoaderFunction } from "@remix-run/node";
import { getImage, getItems, getContenidoFichaItem } from "~/api/apiContentSettings";
import { ListView } from "@progress/kendo-react-listview";
import { createComponent } from "~/utils/ParseHtmlInjeccion";
import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";

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

    const paramJson: never[] = []

    const response = await getItems(request, idView, [
        {
          "key": "string",
          "value": "string"
        }
      ]);

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



const MyItemRender = (props, dataHtml) => {
    return (
        <div className="k-listview-item cms-body_lista-productos-item" id={`item-${props.dataItem.codigo}`}>
            <Card
                className="cms-body_tarjeta"
                id={`card-${props.dataItem.codigo}`}
            >
                <CardImage
                    src={props.dataItem.image}
                    style={{
                        height: 150,
                        width: 180,
                    }}

                    className="cms-body_tarjeta-imagen"
                />
                <div
                    style={{
                        padding: 0,
                    }}
                >
                    <CardTitle
                        style={{
                            fontSize: 14,
                        }}
                        className="cms-body_tarjeta-cuerpo"
                    >
                        {createComponent(dataHtml.body[0], props.dataItem)}

                    </CardTitle>
                </div>
            </Card>
        </div>
    );
};

export default function Filters() {
    const { dataWithImages, dataHtml } = useLoaderData();
    const [url] = useSearchParams();

    
    const fetcher = useFetcher();

    useEffect(() => {
        fetcher.load(window.location.pathname + window.location.search);
    }, [url]);

    return (
        <>
            <GridLayoutItem  className="cms-body-grid_main cms-body_main">
                <ListView
                    data={dataWithImages}
                    item={(props) => MyItemRender(props, dataHtml)}
                    style={{ height: 850 }}
                    className="cms-body_lista-productos"
                />
                <style>
                    {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }
                `}
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
        <div> Si estas viendo este texto, no hay productos en este lista de productos. </div>
    </>
}