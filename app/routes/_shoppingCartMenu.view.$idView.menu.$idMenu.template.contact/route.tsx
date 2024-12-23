//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout } from '@progress/kendo-react-layout';


export default function DetailProduct() {


    return (
        <>
            <GridLayout
                style={{ alignItems: "center", width: "100%", margin: "auto" }}
                className="colorRojo"
                cols={[
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" },
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" },
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" },
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" }]}
            >
                <Outlet />
            </GridLayout>
        </>
    )
}