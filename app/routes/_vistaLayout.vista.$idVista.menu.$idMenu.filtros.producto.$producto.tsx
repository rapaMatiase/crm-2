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

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetItems?IdVista=3", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify([{ key: "string", value: "string" }]),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
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
  //const [data, setData] = React.useState(availableData.splice(0, 12));
  const data = useLoaderData<any[]>();
  // const scrollHandler = (event) => {
  //   const e = event.nativeEvent;
  //   if (
  //     e.target.scrollTop + 10 >=
  //     e.target.scrollHeight - e.target.clientHeight
  //   ) {
  //     const moreData = availableData.splice(0, 6);
  //     if (moreData.length > 0) {
  //       setData(data.concat(moreData));
  //     }
  //   }
  // };
  return (
    <>
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