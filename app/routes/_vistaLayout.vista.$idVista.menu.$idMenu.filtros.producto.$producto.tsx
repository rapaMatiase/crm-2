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

const productosJson = [
  {
    "codigo": "000001",
    "nombre": "PISON  MASALTA MR60R",
    "id": "PRO..6448",
    "texto": ""
  },
  {
    "codigo": "000002",
    "nombre": "PISON MASALTA MR60H",
    "id": "PRO..6449",
    "texto": ""
  },
  {
    "codigo": "000003",
    "nombre": "Pisón Masalta EMR85M",
    "id": "PRO..6450",
    "texto": ""
  },
  {
    "codigo": "000005",
    "nombre": "PISON MASALTA MR75R",
    "id": "PRO..6452",
    "texto": ""
  },
  {
    "codigo": "000007",
    "nombre": "PISON  MASALTA MR68H",
    "id": "PRO..6454",
    "texto": ""
  },
  {
    "codigo": "000009",
    "nombre": "Pisón Masalta EMR68M",
    "id": "PRO..6456",
    "texto": ""
  },
  {
    "codigo": "000010",
    "nombre": "Pisón Masalta EMR70H",
    "id": "PRO..6462",
    "texto": ""
  },
  {
    "codigo": "000011",
    "nombre": "Pisón Masterpac PMR70H",
    "id": "PRO..6466",
    "texto": ""
  },
  {
    "codigo": "000012",
    "nombre": "Pisón Masterpac PMR60H",
    "id": "PRO..6467",
    "texto": ""
  },
  {
    "codigo": "PI000001",
    "nombre": "PISON MASTERPAC PMR75R",
    "id": "PRO..6468",
    "texto": ""
  },
  {
    "codigo": "PI000002",
    "nombre": "Pisón Bomag BT60",
    "id": "PRO..6469",
    "texto": ""
  },
  {
    "codigo": "000015",
    "nombre": "Pisón Bomag BT65",
    "id": "PRO..6472",
    "texto": ""
  },
  {
    "codigo": "000016",
    "nombre": "Pisón Bomag BT80D",
    "id": "PRO..6473",
    "texto": ""
  },
  {
    "codigo": "000020",
    "nombre": "Pisón Masterpac PMR85D",
    "id": "PRO..6477",
    "texto": ""
  },
  {
    "codigo": "000001U",
    "nombre": "PISON  MASALTA MR60R U",
    "id": "PRO..9071",
    "texto": ""
  },
  {
    "codigo": "000002U",
    "nombre": "PISON MASALTA MR60H U",
    "id": "PRO..9072",
    "texto": ""
  },
  {
    "codigo": "000003U",
    "nombre": "Pisón Masalta EMR85M U",
    "id": "PRO..9073",
    "texto": ""
  },
  {
    "codigo": "000005U",
    "nombre": "PISON MASALTA MR75R U",
    "id": "PRO..9074",
    "texto": ""
  },
  {
    "codigo": "000007U",
    "nombre": "PISON  MASALTA MR68H U",
    "id": "PRO..9075",
    "texto": ""
  },
  {
    "codigo": "000009U",
    "nombre": "Pisón Masalta EMR68M U",
    "id": "PRO..9076",
    "texto": ""
  },
  {
    "codigo": "000010U",
    "nombre": "Pisón Masalta EMR70H U",
    "id": "PRO..9077",
    "texto": ""
  },
  {
    "codigo": "000011U",
    "nombre": "Pisón Masterpac PMR70H U",
    "id": "PRO..9078",
    "texto": ""
  },
  {
    "codigo": "000012U",
    "nombre": "Pisón Masterpac PMR60H U",
    "id": "PRO..9079",
    "texto": ""
  },
  {
    "codigo": "PI000001U",
    "nombre": "PISON MASTERPAC PMR75R U",
    "id": "PRO..9080",
    "texto": ""
  },
  {
    "codigo": "PI000002U",
    "nombre": "Pisón Bomag BT60 U",
    "id": "PRO..9081",
    "texto": ""
  },
  {
    "codigo": "000015U",
    "nombre": "Pisón Bomag BT65 U",
    "id": "PRO..9082",
    "texto": ""
  },
  {
    "codigo": "000016U",
    "nombre": "Pisón Bomag BT80D U",
    "id": "PRO..9083",
    "texto": ""
  },
  {
    "codigo": "000020U",
    "nombre": "Pisón Masterpac PMR85D U",
    "id": "PRO..9084",
    "texto": ""
  },
  {
    "codigo": "000932",
    "nombre": "PISON GUTE HCR90K",
    "id": "PRO..11451",
    "texto": ""
  },
  {
    "codigo": "000932U",
    "nombre": "PISON GUTE HCR90K U",
    "id": "PRO..11453",
    "texto": ""
  },
  {
    "codigo": "000989",
    "nombre": "PISON MIKASA HCR801",
    "id": "PRO..12050",
    "texto": ""
  },
  {
    "codigo": "000989U",
    "nombre": "PISON MIKASA HCR801 U",
    "id": "PRO..12051",
    "texto": ""
  },
  {
    "codigo": "001214",
    "nombre": "PISON LIFAN HCR80K MOTOR GX100",
    "id": "PRO..14412",
    "texto": ""
  },
  {
    "codigo": "001215",
    "nombre": "PISON LIFAN HCR80K MOTOR LIFAN 6,5HP",
    "id": "PRO..14413",
    "texto": ""
  },
  {
    "codigo": "001214U",
    "nombre": "PISON LIFAN HCR80K MOTOR GX100 U",
    "id": "PRO..14414",
    "texto": ""
  },
  {
    "codigo": "001215U",
    "nombre": "PISON LIFAN HCR80K MOTOR LIFAN 6,5HP U",
    "id": "PRO..14415",
    "texto": ""
  },
  {
    "codigo": "001285",
    "nombre": "Pisón Masalta EMR75M",
    "id": "PRO..14895",
    "texto": ""
  },
  {
    "codigo": "001285U",
    "nombre": "Pisón Masalta EMR75M U",
    "id": "PRO..14896",
    "texto": ""
  },
  {
    "codigo": "001952U",
    "nombre": "PISON DE TERCEROSU",
    "id": "PRO..22026",
    "texto": ""
  },
  {
    "codigo": "006941",
    "nombre": "Pisón Masalta MR70H",
    "id": "PRO..26510",
    "texto": ""
  },
  {
    "codigo": "006941U",
    "nombre": "Pisón Masalta MR70H U",
    "id": "PRO..26511",
    "texto": ""
  }
]

// export const loader: LoaderFunction = async ({ request, params }) => {
//   const session = await getSession(request.headers.get("Cookie"));
//   const token = session.get("token");

//   const idVista = params.idVista;

//   const jsonBody = JSON.stringify([{ key: "string", value: "string" }]);
//   const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetItems?IdVista=2`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": token
//     }
//   ,
//   body: jsonBody
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const data = await response.json();
//   return data;
// };



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
  const data = productosJson; //useLoaderData<any[]>();
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