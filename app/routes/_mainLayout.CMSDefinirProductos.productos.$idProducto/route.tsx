import * as React from 'react'

import { TabStrip, TabStripSelectEventArguments, TabStripTab } from '@progress/kendo-react-layout';
import { Outlet } from "@remix-run/react";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect } from 'react';

export default function RouteProductos() {
    
    const [selected, setSelected] = React.useState<number>(1);

    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected);
        if (e.selected === 0) {
            navigate(`/CMSDefinirProductos/productos/${29161}/atributos`);
        }
        if (e.selected === 1) {
            navigate(`/CMSDefinirProductos/productos/${29161}/imagenes`);
        }
        if (e.selected === 2) {
            navigate(`/CMSDefinirProductos/productos/${29161}/otros`);
        }
    };


    const navigate = useNavigate();

    return (
        <>
            <TabStrip selected={selected} onSelect={handleSelect}>
                <TabStripTab title="Atributos">
                {selected === 0 && <Outlet />}
                </TabStripTab>
                <TabStripTab title="Imagenes">
                {selected === 1 && <Outlet />}
                </TabStripTab>
                <TabStripTab title="Otros">
                {selected === 2 && <Outlet />}

                </TabStripTab>
                
            </TabStrip>
            
        </>
    )
}


