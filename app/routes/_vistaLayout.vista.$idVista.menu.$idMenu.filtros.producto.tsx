import * as React from "react";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {
  Card,
  CardTitle,
  CardImage,
} from "@progress/kendo-react-layout";
import { getSession } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;
  
  const url = new URL(request.url);
  const urlParams = url.searchParams.getAll("producto")[0];
  const urlParamObject = JSON.parse(urlParams);
  const idVista = params.idVista;

  const jsonBody = JSON.stringify(urlParamObject);
  const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetItems?IdVista=${idVista}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  ,
  body: jsonBody
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
  return {};
};



const MyItemRender = (props) => {
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
          src={`https://picsum.photos/200`}
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
            {props.dataItem.nombre}
          </CardTitle>
        </div>
      </Card>
    </div>
  );
};
const App = () => {

  const data = useLoaderData<any[]>();

  return (
    <>
    <br />
      <ListView
        // onScroll={scrollHandler}
        data={data}
        item={MyItemRender}
        style={{
          width: "80%",
          height: 530,
        }}
      />

      <style>
        {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }`}
      </style>
    </>
  );
};
export default App;