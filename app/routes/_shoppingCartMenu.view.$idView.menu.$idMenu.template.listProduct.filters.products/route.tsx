import { isRouteErrorResponse, Outlet, useLoaderData, useParams, useRouteError, useSearchParams } from "@remix-run/react";
import { Card, CardImage, CardTitle, GridLayoutItem } from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from "~/utils/URLSearchParams";
import { getSession } from "~/servicies/session.server";
import { data, LoaderFunction } from "@remix-run/node";
import { getImage, getItems, getContenidoFichaItem } from "~/api/apiContentSettings";
import { ListView } from "@progress/kendo-react-listview";
import { createComponent } from "~/utils/ParseHtmlInjeccion";

export const loader: LoaderFunction = async ({ request, params }) => {

  const idView = params.idView;

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const urlParamsSearch = urlSearchParamsToObject(searchParams);
  const filters = urlParamsSearch.filters || [{key : "", value : ""}];

  const filterArray = Object.keys(filters).map((key) => {
    return { key: filters[key].id, value: "" };
  });

  const paramSearch = [...urlParamsSearch.menu, ...filterArray]

  const paramJson = JSON.stringify(paramSearch);

  const response = await getItems( request, idView, paramJson );
  
  const data = await response;

  const dataWithImages = await Promise.all(
    data.map(async (item: any) => {
      const { id } = item;
      const image = await getImage({ request, id });
      return { ...item, image };
    })
  );

  const responseHtml = await getContenidoFichaItem(request, idView);
  return { dataWithImages, dataHtml : responseHtml };
};



const MyItemRender = (props, dataHtml) => {

  return (
    <div className="k-listview-item lista-productos-item">
      <Card
        style={{
          width: 180,
          boxShadow: "none",
          flex: "0 0 25.33%",
          margin: 25,
        }}
        className="tarjetas"
      >
        <CardImage
          src={props.dataItem.image}
          style={{
            height: 150,
            width: 180,
          }}
          className="tarjetas-imagen"
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
            className="tarjetas-cuerpo"
          >
            {createComponent(dataHtml.body[0], props.dataItem)}
           
          </CardTitle>
        </div>
      </Card>
    </div>
  );
};

export default function Products() {
  const { dataWithImages, dataHtml } = useLoaderData();
  const [url] = useSearchParams();
  
  return (
    <>
      <GridLayoutItem row={2} col={4} colSpan={7} rowSpan={7} className="grid-layout-lista-productos">
        <ListView
          data={dataWithImages}
          item={(props) => MyItemRender(props, dataHtml)}
          style={{ height: 850 }}
          className="lista-productos"
        />
        <style>
          {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }
                `}
        </style>
      </GridLayoutItem>
    </>
  )
}

export function ErrorBoundary(){
    const error = useRouteError();

    if(isRouteErrorResponse(error)){
        return <div>{error.status} - {error.statusText}</div>
    }

    return <GridLayoutItem row={2} col={4} colSpan={7} rowSpan={7} style={{placeContent : "center"}} ><div> Algo fallo </div> </GridLayoutItem>
}