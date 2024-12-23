//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';



export default function ScrollViewComponent() {


const info = {"Videos":[{"Url":"https://www.youtube.com/watch?v=KJH1M4MIwhU","IdItem":"","Orden":1},{"Url":"https://www.youtube.com/watch?v=KJH1M4MIwhU","IdItem":"","Orden":2},{"Url":"https://www.youtube.com/watch?v=KJH1M4MIwhU","IdItem":"","Orden":3},{"Url":"https://www.youtube.com/watch?v=KJH1M4MIwhU","IdItem":"","Orden":4}]}

const firstVideo = info.Videos[0].Url.replace("watch?v=", "embed/")
const secondVideo = info.Videos[1].Url.replace("watch?v=", "embed/")
const thirdVideo = info.Videos[2].Url.replace("watch?v=", "embed/")
const fourVideo = info.Videos[3].Url.replace("watch?v=", "embed/")

    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_videos' >
                <GridLayout className='cms-home-body_videos'>
                    <GridLayoutItem className='cms-home-body_videos-principal' row={1} col={1} colSpan={1} rowSpan={3} style={{ backgroundColor: "black" }}>
                    <iframe width="560" height="315" src={`${firstVideo}`} title="YouTube video player" ></iframe> 
                    </GridLayoutItem>
                    <GridLayoutItem  row={1} col={2} colSpan={1} style={{ backgroundColor: "blue" }}>
                    <iframe width="260" height="150" src={`${secondVideo}`} title="YouTube video player"  ></iframe>                     </GridLayoutItem>
                    <GridLayoutItem row={2} col={2} colSpan={1} style={{ backgroundColor: "yellow" }}>
                    <iframe width="260" height="150" src={`${thirdVideo}`} title="YouTube video player" ></iframe> 
                    </GridLayoutItem>
                    <GridLayoutItem row={3} col={2} colSpan={1} style={{ backgroundColor: "red" }}>
                    <iframe width="260" height="150" src={`${fourVideo}`} title="YouTube video player" ></iframe> 
                    </GridLayoutItem>
                </GridLayout>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card