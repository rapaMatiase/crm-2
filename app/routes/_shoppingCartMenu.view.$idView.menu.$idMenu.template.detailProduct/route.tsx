//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout } from '@progress/kendo-react-layout';


export default function DetailProduct() {


    return (
        <>
            <GridLayout className="cms-body-grid cms-body">
                <Outlet />
            </GridLayout>
        </>
    )
}