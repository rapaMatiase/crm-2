//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';


export default function DetailProduct() {


    return (
        <>
            <GridLayout className="cms-detalle-body-grid cms-body">
                <Outlet />
            </GridLayout>
        </>
    )
}