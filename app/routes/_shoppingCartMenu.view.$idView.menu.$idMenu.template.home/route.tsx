//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';


export default function Home() {


    return (
        <>
            <GridLayout
                style={{ placeContent: "center" }}
                className="colorRojo"
                gap={{ rows: 15, cols: 10 }}
                rows={[{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 },{ height: 100 } ]}
                cols={[{ width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }]}
            >

                
                <Outlet />
            </GridLayout>
        </>
    )
}