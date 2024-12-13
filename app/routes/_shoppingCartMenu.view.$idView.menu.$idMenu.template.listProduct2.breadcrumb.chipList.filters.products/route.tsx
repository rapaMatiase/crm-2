//TELERIK
import { isRouteErrorResponse, Outlet, useLoaderData, useParams, useRouteError, useSearchParams } from "@remix-run/react";
import { Card, CardImage, CardTitle, GridLayoutItem } from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from "~/utils/URLSearchParams";
import { getSession } from "~/servicies/session.server";
import { data, LoaderFunction } from "@remix-run/node";
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

    const filters = urlParamsSearch.filters || [{ key: "", value: "" }];

    const filterArray = Object.keys(filters).map((key) => {
        return { key: filters[key].id, value: "" };
    });

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



const MyItemRender = (props, dataHtml) => {

    return (
        <div className="k-listview-item cms-lista-productos-item">
            <Card
                style={{
                    width: 180,
                    boxShadow: "none",
                    flex: "0 0 25.33%",
                    margin: 25,
                }}
                className="cms-tarjetas"
            >
                <CardImage
                    src={props.dataItem.image}
                    style={{
                        height: 150,
                        width: 180,
                    }}
                    className="cms-tarjetas-imagenes"
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
                        className="cms-tarjetas-cuerpo"
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
            <GridLayoutItem row={2} col={4} colSpan={9} rowSpan={7} className="grid-layout-lista-productos">
                <ListView
                    data={dataWithImages}
                    item={(props) => MyItemRender(props, dataHtml)}
                    style={{ height: 850 }}
                    className="cms-lista-productos"
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