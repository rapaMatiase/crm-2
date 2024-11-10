import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { ComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent } from "@progress/kendo-react-dropdowns";


import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { getSession } from "~/session.server";
import { useEffect, useState } from "react";
import { Button } from "@progress/kendo-react-buttons";

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;
    const search = params.search;

    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/Productos/GetProductosBasePorBusquedaAmbigua/PatronBusqueda/${search}`,
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
    const productosData = useLoaderData<any[]>();
    const [search, setSearch] = useState<any>();
    const [filterData, setFilterData] = useState<any>(productosData);
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const [producto, setProducto] = useState<any>();
    useEffect(() => {
        if (search) {
            fetcher.load(`/CMSDefinirProductos/${search}`);
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
        const { codigo, codigoNombre } = producto;
        console.log(producto);
        setProducto(producto);
        //navigate(`/CMSDefinirProductos/search/producto/20190/${codigoNombre}`);
        //navigate(`/CMSDefinirProductos/${producto.idProductoBase}`);
    }


    const handleOpen = () => {
        navigate(`/CMSDefinirProductos/search/producto/20190/${producto.codigoNombre}`);
        //window.open(`vista/${vista}/menu/1`, '_blank');
    }

    return (
        <>
            <div style={{ width: "100%", textAlign: "center" }}>
                
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                    render={(formRenderProps) => (
                        <FormElement style={{ width: "500px", margin: "auto" }}>
                            <FieldWrapper>
                                <ComboBox
                                    name={"Producto"}
                                    textField="codigoNombre"
                                    filterable={true}
                                    label={"Vistas"}
                                    data={filterData}
                                    onFilterChange={handleFilter}
                                    onChange={handleSelectProduct}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Button
                                    onClick={handleOpen}
                                >
                                    Procesar
                                </Button>
                            </FieldWrapper>
                        </FormElement>
                    )} />
            
        </div >
            <Outlet />
        </>
    )
}