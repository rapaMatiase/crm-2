import * as React from "react";


import { Label } from "@progress/kendo-react-labels";
import { Input, Checkbox, RadioGroup } from "@progress/kendo-react-inputs";


import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";
import { Form, Field, FieldWrapper, FormElement } from "@progress/kendo-react-form";
import { LoaderFunction } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunction) => {
  const { idVista, idMenu, } = params;
  const url = new URL(request.url);

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;

  const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetAtributosCMS?IdVista=${idVista}&Id=${idMenu}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: url.searchParams.getAll("producto")[0]
    }
  );

  const urlProducto = JSON.parse(url.searchParams.getAll("producto")[0]);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return { data, urlProducto };
};



const App = () => {
  const { idVista, idMenu } = useParams();
  const { data, urlProducto } = useLoaderData();
  const navigate = useNavigate();
  const [opcionSelected, setOpcionSelected] = React.useState(null);

  const handleChange = (e) => {
      console.log("antes", urlProducto)
      urlProducto.pop()
      console.log("al medio", urlProducto)
      const newParams = [...urlProducto, { key: e.value, value: "" }]
      console.log("despues", newParams)

      const jsonParam = new URLSearchParams({ producto: JSON.stringify(newParams) })
      navigate(`/vista/${idVista}/menu/${idMenu}/filtros/producto?${jsonParam.toString()}`)
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