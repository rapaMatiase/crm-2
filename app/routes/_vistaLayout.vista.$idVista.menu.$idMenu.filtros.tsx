import * as React from "react";


import { Label } from "@progress/kendo-react-labels";
import { Input, Checkbox, RadioGroup } from "@progress/kendo-react-inputs";


import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";
import { Form, Field, FieldWrapper, FormElement } from "@progress/kendo-react-form";
import { LoaderFunction } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunction) => {
  const { idVista, idMenu, } = params;
  
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;
  
  const url = new URL(request.url);
  
  const mainJsonStraight = url.searchParams.get("menu");
  const filtroJsonStraight = url.searchParams.get("filtro");

  const mainObject = mainJsonStraight ? JSON.parse(mainJsonStraight) : null;
  const filtroObject = filtroJsonStraight ? JSON.parse(filtroJsonStraight) : null;

  const arrayFilter = [ ...mainObject, ...filtroObject ];
  const arrayFilterJson = JSON.stringify(arrayFilter);

  const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetAtributosCMS?IdVista=${idVista}&Id=${idMenu}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: arrayFilterJson
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  
  const data = await response.json();
  return { data, urlProducto : {menu : mainObject, filtros : filtroObject} };
};



const App = () => {
  const { idVista, idMenu } = useParams();
  const { data, urlProducto } = useLoaderData();
  const navigate = useNavigate();
  const [opcionSelected, setOpcionSelected] = React.useState(null);

  const handleChange = (event) => {
    const itemFilterSelected = event.value;
    console.log(itemFilterSelected);
    const urlParam = new URLSearchParams({
      menu : JSON.stringify(urlProducto.menu),
      filtro : JSON.stringify([{key : `${itemFilterSelected}`, value : ""}])
    });

      navigate(`/vista/${idVista}/menu/${idMenu}/filtros/producto?${urlParam.toString()}`)
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignItems : "start", paddingTop: 30 }}>
        {data.nombre}
        <Form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          render={(formRenderProps) => (
            <FormElement style={{ width: "500px" }}>
              {data.map((item: any) => {
                return (
                  <FieldWrapper>
                    <Label>{item.nombre}</Label>

                 

                    {item.accion == "SeleccionUnica" &&

                      (()=>{
                        const data = item.opciones.map((subitem) => {
                          return { label: subitem.texto, value: subitem.id }
                        }) 
                        return (
                          <RadioGroup value={opcionSelected} onChange={handleChange} data={data}  />
                        )
                      })()
                      }


                    

                  </FieldWrapper>
                );
              })}


            </FormElement>
          )} />
        <Outlet />

      </div>

    </>
  );
};
export default App;