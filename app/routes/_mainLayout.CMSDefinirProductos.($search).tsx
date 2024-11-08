import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { ComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent } from "@progress/kendo-react-dropdowns";


import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { getSession } from "~/session.server";
import { useEffect, useState } from "react";

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
    
    useEffect(() => {
        if (search){
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
        const {codigo, codigoNombre} = producto;
        console.log(producto);
        navigate(`/CMSDefinirProductos/search/producto/20190/${codigoNombre}`);
        //navigate(`/CMSDefinirProductos/${producto.idProductoBase}`);
    }

    return (
        <>
            <div style={{width : "100%", textAlign : "center"}}>
                <ComboBox
                    name={"productos"}
                    textField="codigoNombre"
                    filterable={true}
                    label={"Productos"}
                    data={filterData}
                    onFilterChange={handleFilter}
                    onChange={handleSelectProduct}
                    style={{ width: "50%"}}
                />
            </div>
                <br></br>
            <Outlet />
        </>
    )
}