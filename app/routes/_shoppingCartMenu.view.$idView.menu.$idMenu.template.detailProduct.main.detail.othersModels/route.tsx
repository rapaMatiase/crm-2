
//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import {  GridLayoutItem } from '@progress/kendo-react-layout';


export default function OtherModels() {


    return (
        <>
            <GridLayoutItem row={3} col={1} colSpan={10}>
                OtherModels
            </GridLayoutItem>    
            <Outlet />
        </>
    )
}