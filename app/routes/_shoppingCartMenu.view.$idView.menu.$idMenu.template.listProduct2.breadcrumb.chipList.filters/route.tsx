//REACT
import { useCallback, useEffect, useState } from 'react';
//REMIX
import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { RadioButton, RadioButtonChangeEvent } from '@progress/kendo-react-inputs';
import { getAtributosCMS } from '~/api/apiContentSettings';

const json = {
    nombre: "grupo1",
    opciones: [
        { texto: "First", id: 1 },
        { texto: "Second", id: 2 },
        { texto: "Third", id: 3 }
    ]
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

    const { idView, idMenu } = params;
   
    const response = await getAtributosCMS({
        request,
        idView,
        idMenu,
        arrayFilterJson: JSON.stringify([{ key: "", value: "" }])
    });

    return { data : response }
}

export default function Filters() {
    const {data} = useLoaderData();
    const [url] = useSearchParams();
    
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedValue = JSON.parse(url.get('filters')) || [];
        if (selectedValue.length === 0) {
            setSelectedValue([]);
        }else{
            setSelectedValue(selectedValue);
        }
    }, [url]);

 
    const handleChange = (e: RadioButtonChangeEvent) => {
            const valuesFilters= selectedValue.filter(item => item.nombre !== e.value.nombre);
            const newFilters = [...valuesFilters, e.value];	
            setSelectedValue(newFilters);
         
            navigate({
                pathname: `/view/8/menu/1/template/listProduct2/breadcrumb/chiplist/filters/products`,
                search: `?filters=${JSON.stringify(newFilters).toString()}`
            })
        }

    return (
        <>
            <GridLayoutItem row={3} col={1} colSpan={3} rowSpan={6} className="grid-layout-filtros" style={{ backgroundColor: "grey" }}>
                <div>
                    {data.map((item, index) => {
                        const opciones = item.opciones;
                        return (
                            <>
                            <h5>{item.nombre}</h5>
                            {opciones.map((opcion, index) => {
                                return (
                                    <>
                                        <RadioButton 
                                            name={item.nombre} 
                                            value={{texto : opcion.texto, value : opcion.id, nombre : item.nombre, tipo : "filtro"}} 
                                            checked={selectedValue.some(itemUrl => itemUrl.value === opcion.id)}
                                            label={opcion.texto} 
                                            onChange={handleChange} />
                                        <br />
                                    </>
                                )
                            })}
                            </>
                        )
                    })}
                
                </div>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}