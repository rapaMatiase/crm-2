//TELERIK
import {  GridLayout } from '@progress/kendo-react-layout';
import { Outlet } from '@remix-run/react';

export default function listProduct() {
    
    return (
        <>
            <GridLayout
                className="grid-layout cuerpo"
                style={{ placeContent: "center" }}

                gap={{ rows: 10, cols: 10 }}
                rows={[{ height: 50 }, { height: 150 }, { height: 650 }]}
                cols={[
                    { width: 100 }, { width: 100 }, { width: 100 }, 
                    { width: 100 }, { width: 100 }, { width: 100 }, 
                    { width: 100 }, { width: 100 }, { width: 100 }, 
                    { width: 100 }, { width: 100 }, { width: 100 }]}
            >

                <Outlet />

            </GridLayout>
        </>
    )
}