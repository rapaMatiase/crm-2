import * as React from "react";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {
  Card,
  CardTitle,
  CardImage,
} from "@progress/kendo-react-layout";
import { getSession } from "~/servicies/session.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getImage } from "~/api/apiContentSettings";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, trashIcon } from "@progress/kendo-svg-icons";


function parseTemplate(template: string, data: Record<string, any>): string {
  return template.replace(/#(\w+)#/g, (_, key) => {
    if (typeof data[key] === "boolean") {
      return data[key] ? "initial" : "none";
    }
    return data[key] !== undefined ? data[key] : `#${key}#`;
  });
}

function parseStyle(style: string): React.CSSProperties {
  return style.split(";").reduce((acc, rule) => {
    const [key, value] = rule.split(":").map(str => str.trim());
    if (key && value) {
      const camelCaseKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      acc[camelCaseKey] = value;
    }
    return acc;
  }, {} as React.CSSProperties);
}

function createComponent(config: any, data: Record<string, any>, setProducto: any): React.ReactNode {
  const { component, style, content, ...events } = config;
  const { EsVendible, EsOferta, EsAlquilable, } = data;
  const parsedStyle = style ? parseStyle(parseTemplate(style, data)) : undefined;
  const parsedContent = Array.isArray(content)
    ? content.map((child, index) => createComponent(child, data))
    : parseTemplate(content, data);

  const props: any = { style: parsedStyle, key: Math.random() };

  // Add event handlers
  Object.keys(events).forEach(event => {
    if (event.startsWith("on")) {
      if (events[event] === "#TODO#") {
        props[event] = (event) => AddToCardTodo(event, EsVendible, EsOferta, EsAlquilable);
      } else if (events[event] === "#ADD#") {
        props[event] = (event) => AddToCard(event);
      } else if (events[event] === "#OFERTA#") {
        props[event] = (event) => AddToCardOferta(event);
      } else if (events[event] === "#ALQUILAR#") {
        props[event] = (event) => AddToCardAlquilado(event);
      } else {
        props[event] = new Function(events[event]);
      }
    }
  });

  return React.createElement(
    component,
    props,
    parsedContent
  );
}

function AddToCardTodo(event, EsVendible, EsOferta, EsAlquilable) {
 
}

function AddToCard(event) {
 
}

function AddToCardOferta(event) {
  
}

function AddToCardAlquilado(event) {
  
}


const dataProductosHtml =
  [
    {
      PreUni: 3500,
      NombreGrupo: "Vino",
      NroSerie: "333",
      Nombre: "Botella de vino tinto",
      FecVen: "2023-06-30",
      Stock: 500,
      EsVendible: true,
      EsOferta: true,
      EsAlquilable: false,
      component: {
        component: "div",
        style: "display: flex; flex-direction: column; border: 1px black solid; margin-bottom: 10px;",
        content: [
          {
            component: "h3",
            content: "#Nombre#",
          },
          {
            component: "div",
            style: "display : flex; flex-direction : row;",
            content: [
              {
                component: "p",
                style: "margin-right : 10px;",
                content: "Precio: $#PreUni#",
              },
              {
                component: "p",
                content: "Precio: $#PreUni#",
              }
            ]
          },
          {
            component: "p",
            content: "Precio: $#PreUni#",
          },
          {
            component: "span",
            style: "color: grey; font-size: 15px;",
            content: "Unidades disponibles: #Stock#",
          },
          {
            component: "button",
            style: "display: #EsVendible#; font-size: 30px; background-color: red; color: gray; border-radius: 5px;",
            content: "Comprar",
            onClick: "#ADD#",
          },
          {
            component: "button",
            style: "display: #EsOferta#; font-size: 30px; background-color: blue; color: gray; border-radius: 5px;",
            content: "Oferta",
            onClick: "#OFERTA#",
          },
        ],
      },
    },
    {
      PreUni: 2500,
      NombreGrupo: "Refresco",
      NroSerie: "444",
      Nombre: "Lata de refresco",
      FecVen: "2023-01-15",
      Stock: 2000,
      EsVendible: true,
      EsOferta: false,
      EsAlquilable: true,
      component: {
        component: "div",
        style: "display: flex; flex-direction: column; border: 1px black solid; margin-bottom: 10px;",
        content: [
          {
            component: "h3",
            content: "#Nombre#",
          },
          {
            component: "p",
            content: "Precio: $#PreUni#",
          },
          {
            component: "button",
            style: "display: #EsAlquilable#; font-size: 30px; background-color: green; color: white; border-radius: 10px;",
            content: "Alquilar",
            onClick: "#ALQUILAR#"
          },
        ],
      },
    },
    {
      PreUni: 5500,
      NombreGrupo: "Atun",
      NroSerie: "445",
      Nombre: "Lata de Atun",
      FecVen: "2023-01-15",
      Stock: 4430,
      EsVendible: false,
      EsOferta: false,
      EsAlquilable: true,
      component: {
        component: "div",
        style: "display: flex; flex-direction: column; border: 1px black solid; margin-bottom: 10px;",
        content: [
          {
            component: "h3",
            content: "#Nombre#",
          },
          {
            component: "p",
            content: "Precio: $#PreUni#",
          },
          {
            component: "button",
            style: "display: #EsAlquilable#; font-size: 30px; background-color: green; color: white; border-radius: 10px;",
            content: "Alquilar",
            onClick: "#ALQUILAR#"
          },
        ],
      },
    },
    {
      PreUni: 5500,
      NombreGrupo: "Atun",
      NroSerie: "445",
      Nombre: "Lata de Atun",
      FecVen: "2023-01-15",
      Stock: 4430,
      EsVendible: false,
      EsOferta: false,
      EsAlquilable: true,
      component: {
        component: "div",
        style: "display: flex; flex-direction: column; border: 1px black solid; margin-bottom: 10px;",
        content: [
          {
            component: "h3",
            content: "#Nombre#",
          },
          {
            component: "p",
            content: "Precio: $#PreUni#",
          },
          {
            component: "button",
            style: "display: #EsAlquilable#; font-size: 30px; background-color: green; color: white; border-radius: 10px;",
            content: "Alquilar",
            onClick: "#ALQUILAR#"
          },
        ],
      },
    },
    {
      PreUni: 5500,
      NombreGrupo: "Atun",
      NroSerie: "445",
      Nombre: "Lata de Atun",
      FecVen: "2023-01-15",
      Stock: 4430,
      EsVendible: true,
      EsOferta: true,
      EsAlquilable: true,
      component: {
        component: "div",
        style: "display: flex; flex-direction: column; border: 1px black solid; margin-bottom: 10px;",
        content: [
          {
            component: "h3",
            content: "#Nombre#",
          },
          {
            component: "p",
            content: "Precio: $#PreUni#",
          },
          {
            component: "button",
            style: "display: #EsAlquilable#; font-size: 30px; background-color: yellow; color: white; border-radius: 10px;",
            content: "TODO",
            onClick: "#TODO#"
          },
        ],
      },
    }
  ];


export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;

  const idVista = params.idVista;

  const url = new URL(request.url);

  const mainJsonStraight = url.searchParams.get("menuItemSelected");
  const filtroJsonStraight = url.searchParams.get("attributeItemsSelected");

  const mainObject = mainJsonStraight ? JSON.parse(mainJsonStraight) : null;
  const filtroObject = filtroJsonStraight ? JSON.parse(filtroJsonStraight) : null;

  const filtroArray = filtroObject ? Object.values(filtroObject) : [];

  const arrayFilter = [...mainObject, ...filtroArray];
  const arrayFilterJson = JSON.stringify(arrayFilter);


  const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetItems?IdVista=${idVista}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: arrayFilterJson
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

  const dataWithHtml = dataWithImages.map((item: any, index: number) => {
    if (index % 3 === 0) {
      return { ...item, ...dataProductosHtml[0] };
    }
    if (index % 2 === 0) {
      return { ...item, ...dataProductosHtml[1] };
    }
    if (index % 2 !== 0) {
      return { ...item, ...dataProductosHtml[4] };
    }
    return { ...item, ...dataProductosHtml[3] };
  })

  return dataWithHtml;
};



const MyItemRender = (props, setProducto) => {
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
            {/* {createComponent(props.dataItem.component, props.dataItem, setProducto)} */}
            {props.dataItem.nombre}
          </CardTitle>
        </div>
      </Card>
    </div>
  );
};
const App = () => {

  const data = useLoaderData<any[]>();
  const [producto, setProducto] = React.useState({});
  return (
    <>
      <br />
      <ListView
        data={data}
        item={(props)=>MyItemRender(props, setProducto)}
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
