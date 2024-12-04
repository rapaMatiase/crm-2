//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';
import { ListView, ListViewItemProps, ListViewItemWrapper } from '@progress/kendo-react-listview';


const json = [
    {
        url : "",
        date : "",
        title : "Capacitación en Pulido de Pisos de Hormigón en BsAs",
        detail : "",
        sucursal : ""
    },
    {
        url : "",
        date : "",
        title : "Capacitación en Pulverización de Pintura en Rosario",
        detail : "",
        sucursal : ""
    },
    {
        url : "",
        date : "",
        title : "CAPACITACIÓN DE DEMOLICIÓN, CORTE Y PERFORADO DE HORMIGÓN EN Santa Fe",
        detail : "",
        sucursal : ""
    },
    {
        url : "",
        date : "",
        title : "Capacitación en Pulverizacion de Pintura en Ctes",
        detail : "",
        sucursal : ""
    }

]


const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (
        <ListViewItemWrapper style={{ width : "50%", height: "50%" , padding: 10, borderRight: '1px solid lightgrey' }}>
            {item.title}
           {/*  <Card>
                    <CardImage src={"/templateHome/productMain/1.jpeg"} />
                        <CardBody>
                            {item.content}
                        </CardBody>
                </Card> */}
        </ListViewItemWrapper>
    );
};

export default function Events() {


    return (
        <>
            <GridLayoutItem row={13} col={1} colSpan={10} rowSpan={2} style={{ backgroundColor: "pink" }}>
            <ListView
                    data={json}
                    item={MyItemRender}
                    style={{ width: '100%', height: "100%", display : "flex", flexWrap : "wrap", overflow :"hidden" }} />
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card