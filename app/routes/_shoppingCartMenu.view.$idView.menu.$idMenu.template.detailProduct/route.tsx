//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';


export default function DetailProduct() {


    return (
        <>
            <GridLayout
                style={{ placeContent: "center" }}
                className="colorRojo"
                gap={{ rows: 15, cols: 10 }}
                rows={[{ height: 50 }, { height: 300 }, { height: 300 }, { height: 300 } ]}
                cols={[{ width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }]}
            >   
                <Outlet />
            </GridLayout>
        </>
    )
}