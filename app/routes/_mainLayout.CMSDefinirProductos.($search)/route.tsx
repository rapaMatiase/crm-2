//REACT
import { useEffect, useState } from "react";
//REMIX
import { isRouteErrorResponse, useFetcher, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
//TELERIK
import { Field, FieldWrapper, Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { ComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
//SERVICIES
import { getSession } from "~/servicies/session.server";
//CONFIG
import { API_ENDPOINTS_PRODUCTOS } from "~/config/apiConfig";
import { ROUTE_BASE_PRODUCTOS } from "~/config/routesConfig";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    // Handle our 404 gracefully by setting a generic error as page title
    if (!data) {
      return [{ title: "User not found!" }];
    }
    return [{ title: "BackOffice - Productos" }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;
    const search = params.search;

    const response = await fetch(`${API_ENDPOINTS_PRODUCTOS.SEARCH}/PatronBusqueda/${search}`,
        {
            method: "GET",
            headers: {
                Authorization: token
            }
        }
    );

    const productosData = await response.json();
    return productosData;
};

export default function CMSDefinirProductos() {
    //REMIX-HOOK
    const productosData = useLoaderData<any[]>();
    const fetcher = useFetcher();
    const navigate = useNavigate();

    //TELERIK-HOOK
    const [search, setSearch] = useState<any>();
    const [filterData, setFilterData] = useState<any>(productosData);
    const [producto, setProducto] = useState<any>();

    //FUNCTION
    useEffect(() => {
        if (search) {
            fetcher.load(`${ROUTE_BASE_PRODUCTOS}/${search}`);
        }
    }, [search])

    useEffect(() => {
        if (fetcher.data) {
            setFilterData(fetcher.data);
        }
    }, [fetcher.data]);

    const handleFilter = (event: ComboBoxFilterChangeEvent) => {
        const value = event.filter.value;
        setSearch(value);
    }

    const handleSelectProduct = (event: ComboBoxChangeEvent) => {
        const producto = event.target.value;
        setProducto(producto);
    }

    const handleSubmit = (event) => {
        console.log("hea")
        event.preventDefault();
        const urlParam = new URLSearchParams({ search: JSON.stringify({ codigoNombre: producto.codigoNombre }) });
        navigate(`${ROUTE_BASE_PRODUCTOS}/producto/${producto.idProductoBase}?${urlParam.toString()}`);
    }

    return (
        <>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Form
                    onSubmit={handleSubmit}
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement style={{ width: "500px", margin: "auto" }}>
                            <FieldWrapper>
                                <ComboBox
                                    name={"Producto"}
                                    textField="codigoNombre"
                                    filterable={true}
                                    placeholder="Escriba para buscar un producto"
                                    data={filterData}
                                    onFilterChange={handleFilter}
                                    onChange={handleSelectProduct}
                                    validationMessage={"Producto requerido"}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Button
                                     disabled={!formRenderProps.allowSubmit}
                                     onClick={formRenderProps.onSubmit}
                                     type="submit"
                                    >
                                    Editar
                                </Button>
                            </FieldWrapper>
                        </FormElement>
                    )} />
            </div >

           {/*  <Form 
                onSubmit={()=>{console.log("submit")}}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement>
                        <FieldWrapper>
                            <Field name="codigoNombre" component="input" />
                        </FieldWrapper>
                        <FieldWrapper>
                            <button
                            disabled={!formRenderProps.allowSubmit}
                            onClick={formRenderProps.onSubmit}
                                type="submit"> mandar</button>
                        </FieldWrapper>
                    </FormElement>
                )}/> */}
        </>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <div> Fallaste </div>
}