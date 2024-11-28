import { Outlet, useLoaderData, useNavigate, useParams, useSearchParams } from "@remix-run/react";
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { isUrlSearchParamsEmpty, objectToUrlSearchParams, urlSearchParamsToObject } from "~/utils/URLSearchParams";
import { getAtributosCMS } from "~/api/apiContentSettings";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, FormElement } from "@progress/kendo-react-form";
import { SingleSeleccion } from "~/components/fm-filters-components";
import { useState } from "react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    //PARAMS
    const { idVista = "", idMenu = "" } = params;

    //URLS SEARCH PARAMS}
    const url = new URL(request.url);

     const response = await getAtributosCMS({
            request,
            idVista,
            idMenu,
            arrayFilterJson: JSON.stringify([{ key: "", value: "" }])
        });

        const dataLabel = response.map((item: any) => {
            return {
                filterName: item.nombre,
                action: item.accion,
                data: item.opciones.map((opcion: any) => {
                    return {
                        label: opcion.texto,
                        value:{ [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } },
                        // url: { [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } }
                    }
                })
            }
        });

        return { data: dataLabel };
}

export default function Filters() {
    const { data } = useLoaderData();
    const {idVista, idMenu} = useParams();
    const [url] = useSearchParams();
    const [object, setObject] = useState(urlSearchParamsToObject(url));
    const {menu, breadcrumb, filters, chipts} = urlSearchParamsToObject(url);
    const navigate = useNavigate();

    

    const handleChange = (event: any) => {
        const dataOption = event.value;
        
        const newFilter = { ...filters, ...dataOption}

        const newChips = [...Object.keys(newFilter).map(key => ({
            label: newFilter[key].label,
            value: newFilter[key].id
        }))]
        
        
        const objectUrl = objectToUrlSearchParams({menu, breadcrumb, filters : newFilter, chipts: newChips});
       
        navigate(`/templateBasic/vista/${idVista}/menu/${idMenu}/breadcrumb/chipts/filters/products?${objectUrl.toString()}`);
    }

    return (
        <>
            <GridLayoutItem row={3} col={1} colSpan={3} rowSpan={6} >
                <Form
                    render={() => (
                        <FormElement>
                            {data.map((item: any, index: number) => (
                                <>
                                    <SingleSeleccion
                                        key={`${index}-${item.id}`}
                                        handleChange={handleChange}
                                        item={item}
                                        filters={filters}
                                    />
                                </>
                            ))}
                        </FormElement>
                    )}
                />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}