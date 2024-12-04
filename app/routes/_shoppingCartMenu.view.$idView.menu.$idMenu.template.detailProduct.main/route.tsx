//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import {  GridLayoutItem } from '@progress/kendo-react-layout';

export default function Home() {


    return (
        <>
            <GridLayoutItem row={1} col={1} colSpan={10}>
                Main
            </GridLayoutItem>    
            <Outlet />
        </>
    )
}