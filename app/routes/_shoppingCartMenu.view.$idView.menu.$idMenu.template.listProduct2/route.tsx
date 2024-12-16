//TELERIK
import {  GridLayout } from '@progress/kendo-react-layout';
import { Outlet } from '@remix-run/react';

export default function listProduct() {
    
    return (
        <>
            <GridLayout className="cms-body-grid cms-body">

                <Outlet />

            </GridLayout>
        </>
    )
}