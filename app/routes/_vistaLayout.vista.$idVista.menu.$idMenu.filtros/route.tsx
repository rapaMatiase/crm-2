//REACT
import { useState } from "react";
//REMIX
import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
//TELERIK
import { Label } from "@progress/kendo-react-labels";
import { RadioButton, RadioGroup } from "@progress/kendo-react-inputs";
import { Form, FieldWrapper, FormElement } from "@progress/kendo-react-form";
import { ChipList, Chip, ChipListDataChangeEvent, ChipProps } from '@progress/kendo-react-buttons';
//SERVICIES
import { getSession } from "~/servicies/session.server";
import { isUrlSearchParamsEmpty, parseUrlSearchParams } from "~/utils/URLSearchParams";

export const loader = async ({ request, params }) => {
  const { idVista, idMenu, } = params;

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("user")?.token;

  const url = new URL(request.url);

  const arrayFilterJson = JSON.stringify([]);
  if(!isUrlSearchParamsEmpty(url.searchParams)){
    const { menuItemSelected, defaultAttribute, attributeItemsSelected } = parseUrlSearchParams( url.searchParams );
    
    const mainJsonStraight = menuItemSelected
    const filtroJsonStraight = attributeItemsSelected
  
    const mainObject = mainJsonStraight ? JSON.parse(mainJsonStraight) : null;
    const defaultAttributeObject = defaultAttribute ? JSON.parse(defaultAttribute) : null;
    const filtroObject = filtroJsonStraight ? JSON.parse(filtroJsonStraight) : null;
  
    const filtroArray = filtroObject ? Object.values(filtroObject) : [];
  
    const arrayFilter = [...mainObject, ...filtroArray];
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
     return { data, urlProducto: { menu: mainObject, filtros: filtroObject } };

  }else{
    const arrayFilterJson = JSON.stringify([]);    
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
     return { data };
  
  }


  
};

export default function FiltroPorductos() {
  const { idVista, idMenu } = useParams();
  const { data, urlProducto } = useLoaderData();
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState<any>(urlProducto ? { ...urlProducto.filtros } : {});

  const handleChange = (nombreFiltro: any, nombreFiltrado: any, valorFiltro: any) => {

    setFiltros((prevFiltros: any) => ({ ...prevFiltros, [`${nombreFiltro}`]: { key: `${valorFiltro}`, value: "", texto: nombreFiltrado } }));

    const urlParam = new URLSearchParams({
      menuItemSelected: JSON.stringify(urlProducto.menuItemSelected),
      attributeItemsSelected: JSON.stringify(filtros)
    });

    navigate(`/vista/${idVista}/menu/${idMenu}/filtros/producto?${urlParam.toString()}`)
  };

  const onClearFilter = (value: any) => {
    const { [value]: _, ...filtrosNuevos } = filtros;
    setFiltros(filtrosNuevos);

    const urlParam = new URLSearchParams({
      menuItemSelected: JSON.stringify(urlProducto.menuItemSelected),
      attributeItemsSelected: JSON.stringify(filtrosNuevos)
    });

    navigate(`/vista/${idVista}/menu/${idMenu}/filtros/producto?${urlParam.toString()}`)
  }


  const handleDataChange = (event: ChipListDataChangeEvent) => {
   
  };


  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "start", paddingTop: 30 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <ul style={{ listStyle: "none" }}>
              {filtros && Object.keys(filtros).map((key, index) => {
                return (key === "default" ? "" : <li key={`filtros-${index}`} onClick={(event) => onClearFilter(key)}>
                  <span> {key} : {filtros[key].texto} </span>
                </li>)
              })}

            </ul>

            <ChipList
              data={Object.keys(filtros).map((key: any) => ({ text: filtros[key].texto, value: filtros[key].key, otros: "ss" }))}
              selection="multiple"
              onDataChange={handleDataChange}
              chip={(props: ChipProps) => <Chip removable={true} {...props} />}
            />
          </div>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            render={() => (
              <FormElement style={{ width: "500px" }}>
                {data.map((item: any, itemIndex: number) => {
                  return (
                    <FieldWrapper key={itemIndex}>
                      <Label>{item.nombre}</Label>
                      <ul style={{ listStyle: "none" }}>
                        {item.accion == "SeleccionUnica" &&
                          (() => {
                            return <div>{item.opciones.map((subitem: any, index: number) => {
                              return <li key={`filtros-${item.nombre}-${index}`} ><RadioButton
                                key={`${item.nombre}-${index}`}
                                name={item.nombre}
                                checked={filtros.hasOwnProperty(item.nombre) && filtros[item.nombre].key == subitem.id}
                                onChange={() => (handleChange(item.nombre, subitem.texto, subitem.id))}
                                label={subitem.texto} /></li>
                            })}
                            </div>
                          })()}
                      </ul>
                    </FieldWrapper>
                  );
                })}
              </FormElement>
            )} />
        </div>
        <Outlet />
      </div>

    </>
  );
};


//https://www.telerik.com/kendo-react-ui/components/layout/drawer