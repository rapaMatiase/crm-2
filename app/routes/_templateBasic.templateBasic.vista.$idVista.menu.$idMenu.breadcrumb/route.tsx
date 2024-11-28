//REMIX
import { Outlet, useSearchParams } from "@remix-run/react";
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { Breadcrumb, BreadcrumbLinkMouseEvent, BreadcrumbLinkKeyDownEvent } from '@progress/kendo-react-layout';
import { urlSearchParamsToObject } from "~/utils/URLSearchParams";

export default function BreadCrumb() {

    
    const [url] = useSearchParams();
    
    const data =  JSON.parse(url.get("breadcrumb")) || [];
    const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {

    };

    return (
        <>
            <GridLayoutItem row={1} col={1} colSpan={10} >
                <Breadcrumb
                    data={data}
                    onItemSelect={handleItemSelect}
                    textField="label"
                   // onKeyDown={handleKeyDown}
                />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}