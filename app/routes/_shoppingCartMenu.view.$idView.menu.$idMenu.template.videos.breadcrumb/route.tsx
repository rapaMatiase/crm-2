//REMIX
import { useState } from "react";
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem, Breadcrumb, BreadcrumbLinkMouseEvent } from "@progress/kendo-react-layout";
//FOR DELETE
import data from './data.json';


export default function TemplateBasic() {

    const [listBreadcrumb, setListBreadcrumb] = useState(data);

    const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
        const index = event.id;
        const breadcrumbSelected = listBreadcrumb[Number(index)];
        //Deberia redireccionar a la url del breadcrumb seleccionda
    }   

    return (
        <>
            <GridLayoutItem row={1} col={2} colSpan={10}>
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

