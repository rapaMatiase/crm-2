//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout } from '@progress/kendo-react-layout';


export default function Home() {
    return (
        <>
            <GridLayout className="cms-home-body-grid cms-home-body" >
                <Outlet />
            </GridLayout>
        </>
    )
}