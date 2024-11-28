//REMIX
import { useNavigate, useSearchParams } from "@remix-run/react";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import {
    isRouteErrorResponse,
    useRouteError,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
//TELERIK
import { Form } from "@progress/kendo-react-form";
import { GridLayoutItem } from '@progress/kendo-react-layout';
//SERVICES  
import { getAtributosCMS } from "~/api/apiContentSettings";
//UTILS
import { isUrlSearchParamsEmpty } from "~/utils/URLSearchParams";
import { FormElement } from "@progress/kendo-react-form";
//COMPONENTS
import { SingleSeleccion } from "~/components/fm-filters-components";
import { ChipList, Chip, ChipListDataChangeEvent, ChipProps } from '@progress/kendo-react-buttons';


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    //PARAMS
    const { idVista = "", idMenu = "" } = params;

    //URLS SEARCH PARAMS}
    const url = new URL(request.url);

    if (isUrlSearchParamsEmpty(url.searchParams)) {
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
                        value: opcion.id,
                        url: { [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } }
                    }
                })
            }
        });

        return { data: dataLabel };
    }

    if (!isUrlSearchParamsEmpty(url.searchParams)) {
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
                        value: { [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } }, //{id : opcion.id, label: opcion.texto, filterName : item.nombre},
                        url: { [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false } }
                    }
                },
            ),
            data2: item.opciones.map((opcion: any) => {
                return {
                    [item.nombre]: { label: opcion.texto, id: opcion.id, menu: false }  
                }
            },
        )
    }
});

        return { data: dataLabel };
    }

    return {}
}


const listaChip = [
    {text : "Proveedor - Leiten", value : "1"},
    {text : "Clase - Corta hierro", value : "2"},
    {text : "Grupo de producto - Industrial", value : "3"},
]

const listFilter = [
    {
        filterName: "Proveedor",
        action: "SeleccionUnica",
        data: [
            {
                label: "Leiten",
                value: "1",
            },
            {
                label: "Ferreteria",
                value: "2",
            },
            {
                label: "Ferreteria 2",
                value: "3",
            }
        ]
    },
    {
        filterName: "Clase",
        action: "SeleccionUnica",
        data: [
            {
                label: "Corta hierro",
                url: { clase: { label: "Corta hierro", id: "1", menu: false } }
            },
            {
                label: "Corta madera",
                value: "2",
            },
            {
                label: "Corta plastico",
                value: "3",
            }
        ]
    },
    {
        filterName: "Grupo de producto",
        action: "SeleccionUnica",
        data: [
            {
                label: "Industrial",
                value: "1",
                url: { grupo: { label: "Industrial", id: "1", menu: false } }
            },
            {
                label: "Hogar",
                value: "2",
                url: { grupo: { label: "Hogar", id: "2", menu: false } }
            },
            {
                label: "Oficina",
                value: "3",
                url: { grupo: { label: "Oficina", id: "3", menu: false } }
            }
        ]
    }
];

export default function filtros() {
    const { data } = useLoaderData<{ data: any }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filters = {};//{ ...JSON.parse(searchParams.get("filters") || "{}") };



    const handleChange = (event: any, item: any) => {
        debugger;
        const dataOption = event.value;
        const objeto = {}
        const newFilters = { ...filters, [dataOption.filterName]: [{ key: dataOption.id, data: "", label: dataOption.label }] }
        navigate(`/vista/8/menu/1?${new URLSearchParams({
            filters: JSON.stringify({
                ...newFilters
            }),
        })}`);
    }



    return (
        <>
            <GridLayoutItem row={2} col={1} colSpan={3} style={{ backgroundColor: "blue" }}>
                 <ChipList
                    data={listaChip}
                    selection="multiple"
                    chip={(props: ChipProps) => <Chip removable={true} {...props} />}
                />

            </GridLayoutItem>
            <GridLayoutItem row={3} col={1} colSpan={3} style={{ backgroundColor: "green" }}>
                <Form
                    render={() => (
                        <FormElement>
                            {data.map((item: any, index: number) => (
                                <>
                                    <SingleSeleccion
                                        key={`${index}-${item.id}`}
                                        handleChange={handleChange}
                                        item={item}
                                    />
                                </>
                            ))}
                        </FormElement>
                    )}
                />
               
            </GridLayoutItem>
            <GridLayoutItem row={2} col={4} rowSpan={4} colSpan={7}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}></div>
            </GridLayoutItem>
        </>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}