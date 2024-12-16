import * as React from 'react'

import { TabStrip, TabStripSelectEventArguments, TabStripTab } from '@progress/kendo-react-layout';
import { Outlet, useParams } from "@remix-run/react";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect } from 'react';
import { GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { ROUTE_BASE_PRODUCTOS } from '~/config/routesConfig';

export default function RouteProductos() {

    const [selected, setSelected] = React.useState<number>(0);
    const { nombreProducto, idProducto } = useParams();

    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected);
        if (e.selected === 0) {
            navigate(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/atributos`);
        }
        if (e.selected === 1) {
            navigate(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/imagenes`);
        }
        if (e.selected === 2) {
            navigate(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/otros`);
        }
    };


    const navigate = useNavigate();

    

    return (
        <>
            <h2> {nombreProducto} </h2>

                <Button
                    onClick={() => {
                        navigate(`${ROUTE_BASE_PRODUCTOS}`);
                    }}> Elegir otro producto </Button>

            
            <TabStrip selected={selected} onSelect={handleSelect}>
                <TabStripTab title="Atributos">
                    {selected === 0 && <Outlet />}
                </TabStripTab>
                <TabStripTab title="Imagenes">
                    {selected === 1 && <Outlet />}
                </TabStripTab>
                <TabStripTab title="Detalles">
                    {selected === 2 && <Outlet />}
                </TabStripTab>

            </TabStrip>

        </>
    )
}


