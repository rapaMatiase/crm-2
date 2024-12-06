//REACT
import { useState } from "react"
//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { Breadcrumb, BreadcrumbLinkMouseEvent, GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
//TO DELETE
import data from './data.json';

export default function DetailProduct() {

    const [listBreadcrumb, setListBreadcrumb] = useState(data);

    const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
        const index = event.id;
        const breadcrumbSelected = listBreadcrumb[Number(index)];
        alert(breadcrumbSelected.label);
        //Deberia redireccionar a la url del breadcrumb seleccionda
    }   

    return (
        <>
            <GridLayoutItem row={1} col={2} colSpan={12} >
                <Breadcrumb
                    data={listBreadcrumb}
                    onItemSelect={handleItemSelect}
                    textField="label"
                />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}