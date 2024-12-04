//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import {
    Card,

    CardBody,
    CardImage,

} from '@progress/kendo-react-layout';
import { ListView, ListViewItemProps, ListViewItemWrapper } from '@progress/kendo-react-listview';


const json = {

    items : [
        {url : "/templateHome/productMain/1.jpeg", alt : "Banner 1", content : "Texto descriptivo 1 - con html injectable"},
        {url : "/templateHome/productMain/2.jpeg", alt : "Banner 2", content : "Texto descriptivo 2 - con html injectable"},
        {url : "/templateHome/productMain/3.jpeg", alt : "Banner 3", content : "Texto descriptivo 3 - con html injectable"},
        {url : "/templateHome/productMain/4.jpeg", alt : "Banner 4", content : "Texto descriptivo 4 - con html injectable"},
        {url : "/templateHome/productMain/5.jpeg", alt : "Banner 5", content : "Texto descriptivo 5 - con html injectable"},
        {url : "/templateHome/productMain/6.jpeg", alt : "Banner 6", content : "Texto descriptivo 6 - con html injectable"},
    ]
}


const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (
        <ListViewItemWrapper style={{ flex : 1, padding: 10, borderRight: '1px solid lightgrey' }}>
            {item.ProductName}
            <Card>
                    <CardImage src={"/templateHome/productMain/1.jpeg"} />
                        <CardBody>
                            {item.content}
                        </CardBody>
                </Card>
        </ListViewItemWrapper>
    );
};

export default function ScrollViewComponent() {


    return (
        <>
            <GridLayoutItem row={4} col={1} colSpan={10}  style={{ backgroundColor: "red", placeItems : "center", placeContent : "center" }}>
                <h3> Productos destacados </h3>
            </GridLayoutItem>
            <GridLayoutItem row={5} col={1} colSpan={10} rowSpan={3} style={{ backgroundColor: "yellow" }}>
                <ListView
                    data={json.items}
                    item={MyItemRender}
                    style={{ width: '100%', height: "100%" }} />
            </GridLayoutItem>
            <Outlet />
            <style>
                {`.k-listview-content {
                    display: flex;
                    flex-wrap: nowrap;
                }`}
            </style>
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card