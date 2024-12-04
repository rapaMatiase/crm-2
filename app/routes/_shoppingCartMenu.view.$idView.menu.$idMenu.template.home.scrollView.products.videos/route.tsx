//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';


const json = {

}



export default function ScrollViewComponent() {


    return (
        <>
            <GridLayoutItem row={8} col={1} colSpan={10} rowSpan={5} style={{ backgroundColor: "green" }}>
                <GridLayout
                    style={{ height : "100%", width : "100%" }} 
                    rows={[{height : "30%"}, {height : "30%"}, {height : "30%"}, {height : "10%"}]}   
                    cols={[{width : "70%"}, {width : "30%"}]}
                    gap={{rows : 5, cols : 5}}
                >
                    <GridLayoutItem row={1} col={1} colSpan={1} rowSpan={3} style={{ backgroundColor: "black" }}>
                        <h3> Videos destacados </h3>
                    </GridLayoutItem>
                    <GridLayoutItem row={1} col={2} colSpan={1} style={{ backgroundColor: "blue" }}>
                        <h3> Videos destacados </h3>
                    </GridLayoutItem>
                    <GridLayoutItem row={2} col={2} colSpan={1} style={{ backgroundColor: "yellow" }}>
                        <h3> Videos destacados </h3>
                    </GridLayoutItem>
                    <GridLayoutItem row={3} col={2} colSpan={1} style={{ backgroundColor: "red" }}>
                        <h3> Videos destacados </h3>
                    </GridLayoutItem>
                    <GridLayoutItem row={4} col={1} colSpan={2} style={{ backgroundColor: "purple" }}>
                    
                    </GridLayoutItem>
                </GridLayout>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card