//REMIX
import { isRouteErrorResponse, Outlet, useActionData, useFetcher, useLoaderData, useNavigate, useParams, useRouteError, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

import { AppBar, AppBarSection, Drawer, DrawerContent, DrawerSelectEvent, GridLayout, GridLayoutItem, Menu } from '@progress/kendo-react-layout';
import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormInput } from "~/components/fm-components";
import { getDefinirProductos, getDefinirProductosaAction } from "~/api/apiContentSettings";
import { ComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent } from "@progress/kendo-react-dropdowns";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { ROUTE_BASE_PRODUCTOS } from "~/config/routesConfig";

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await getDefinirProductos({ request, params });
    return response
};

export const action : ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const search = formData.get('search');
    const response = await getDefinirProductosaAction({ request, search });
    return response
}


export default function Component() {

    const productosData = useLoaderData<any[]>();
    const actionData = useActionData();
    const navigate = useNavigate();
    const {search} = useParams();
    const submit = useSubmit();
    //TELERIK-HOOK
    const [search2, setSearch] = useState<any>();
    const [filterData, setFilterData] = useState<any>(actionData);
    const [producto, setProducto] = useState<any>();

    const handleChange = (event) => {
        const prodocutoIngresado = event.target.value;
        setProducto(prodocutoIngresado);
        submit({ search: prodocutoIngresado });
    }

    const handleFilter = (event: ComboBoxFilterChangeEvent) => {
        const value = event.filter.value;
        setSearch(value);
    }

    const handleSelectProduct = (event: ComboBoxChangeEvent) => {

        const producto = event.target.value;
        setProducto(producto);
    }

    const handleClick = () => {

    }

    const handleSubmit = (event) => { }
    return (
        <>
            <GridLayoutItem row={2} col={4} colSpan={3} className="cms-menu_seccion-buscardor" >
                <Form
                    render={(formRenderProps) => (
                        <FormElement >
                            <FieldWrapper>
                                <Field
                                    id="comboboxBuscador"
                                    name={'username'}
                                    component={ComboBox}
                                    textField="codigoNombre"
                                    className="cms-menu_seccion-buscardor-input"
                                    filterable={true}
                                    placeholder="Escriba para buscar un producto"
                                    data={filterData}
                                    onFilterChange={handleFilter}
                                    onChange={handleChange}
                                    clearButton={true}
                                />
                            </FieldWrapper>

                            <style>
                                {`

                                #comboboxBuscador + button {
                                    visibility: hidden;
                                }
                                #comboboxBuscador + span + button {
                                    visibility: hidden;
                                }
                                `}
                            </style>
                        </FormElement>
                    )}
                />
             </GridLayoutItem>

            <GridLayoutItem row={2} col={7} colSpan={1} className="cms-menu_seccion-boton" >
                <div onClick={handleClick} style={{ backgroundColor: "red", height: "20px", width: "10px", margin: 10 }} className="cms-menu_seccion-boton-buscador"> </div>
            </GridLayoutItem>


            <Outlet />

        </>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div> Sin datos para este menu </div>
        <Outlet />
    </>
}