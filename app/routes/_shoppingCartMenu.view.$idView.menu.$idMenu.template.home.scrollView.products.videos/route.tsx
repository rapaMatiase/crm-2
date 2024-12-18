//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';


const json = {

}



export default function ScrollViewComponent() {


    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_videos' >
                <GridLayout className='cms-home-body_videos'>
                    <GridLayoutItem className='cms-home-body_videos-principal' row={1} col={1} colSpan={1} rowSpan={3} style={{ backgroundColor: "black" }}>
                        <h3> Videos destacados </h3>
                    </GridLayoutItem>
                    <GridLayoutItem  row={1} col={2} colSpan={1} style={{ backgroundColor: "blue" }}>
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