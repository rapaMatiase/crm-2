import { Outlet, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { Card, CardImage, CardTitle, GridLayoutItem } from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from "~/utils/URLSearchParams";
import { getSession } from "~/servicies/session.server";
import { LoaderFunction } from "@remix-run/node";
import { getImage } from "~ /api/apiContentSettings";
import { ListView } from "@progress/kendo-react-listview";
import React from "react";


export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;

  const idVista = params.idVista;


  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const urlParamsSearch = urlSearchParamsToObject(searchParams);
  const filters = urlParamsSearch.filters;
  const filterArray = Object.keys(filters).map((key) => {
    return { key: filters[key].id, value: "" };
  });

  const paramSearch = [...urlParamsSearch.menu, ...filterArray]

  const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetItems?IdVista=${idVista}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(paramSearch)
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const dataWithImages = await Promise.all(
    data.map(async (item: any) => {
      const { id } = item;
      const image = await getImage({ request, id });
      return { ...item, image };
    })

  );


  // const responseHtml = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetContenidoFichaItem?IdVista=3`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": token
  //   }
  // })

  // const dataHtml = await responseHtml.json();

  return { dataWithImages };
};



const MyItemRender = (props, dataHtml) => {

  return (
    <div className="k-listview-item">
      <Card
        style={{
          width: 180,
          boxShadow: "none",
          flex: "0 0 25.33%",
          margin: 25,
          border: "none",
        }}
      >
        <CardImage
          src={props.dataItem.image}
          style={{
            height: 150,
            width: 180,
          }}
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
          >
            {/* {createComponent(dataHtml, props.dataItem)} */}
            {props.dataItem.nombre}
          </CardTitle>
        </div>
      </Card>
    </div>
  );
};

export default function Products() {
  const { dataWithImages } = useLoaderData();
  const [url] = useSearchParams();

  return (
    <>
      <GridLayoutItem row={2} col={4} colSpan={7} rowSpan={7}>
        <ListView
          data={dataWithImages}
          item={(props) => MyItemRender(props)}
          style={{ height: 850 }}
        />
        <style>
          {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }`}
        </style>
      </GridLayoutItem>
    </>
  )
}