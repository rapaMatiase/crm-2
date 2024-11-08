import * as React from "react";


import { Label } from "@progress/kendo-react-labels";
import { Input, Checkbox, RadioGroup  } from "@progress/kendo-react-inputs";


import { Outlet, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";
import { Form, Field, FieldWrapper, FormElement } from "@progress/kendo-react-form";
import { LoaderFunction } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunction) => {
  const { idVista, idMenu } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;

  const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetAtributosCMS?IdVista=3&Id=1`,
    {
      method: "GET",
      headers: {
        Authorization: token
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log(data);
  return data;
};



const App = () => {
  const data = useLoaderData();

  return (
    <>
    <div style={{display : "flex", flexDirection : "row"}}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        render={(formRenderProps) => (
          <FormElement style={{ width: "500px", margin: "auto" }}>
            {data.map((item: any) => {
              return (
                <FieldWrapper>
                  <Label>{item.nombre}</Label>

                  {item.accion == "SeleccionMultiple" &&
                    item.opciones.map((subitem) => {
                      console.log(subitem.texto)
                      return (
                        <>
                          <Checkbox
                            key={subitem.id}
                            id={subitem.id}
                            name={subitem.id}
                            label={subitem.texto}
                          />
                        </>
                      )
                    })
                  }


                  {item.accion == "SeleccionUnica" &&
                    
                    (()=>{
                      const data = item.opciones.map((subitem) => {
                        return { label: subitem.texto, value: subitem.id }
                      }) 
                      return (
                        <RadioGroup data={data} />
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