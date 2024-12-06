
//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';

import data from './data.json';
import { ListView, ListViewHeader, ListViewItemProps, ListViewItemWrapper } from "@progress/kendo-react-listview";

const MyHeader = (titles) => {
    return (
        <ListViewHeader style={{ color: 'rgb(160, 160, 160)', fontSize: 14, display : "flex" }} className='pl-3 pb-2 pt-2'>
            {titles.map((title, index) => {
                return <div style={{flex : "1"}}>
                    {title}
                </div>
            })}
        </ListViewHeader>
    );
}

const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (
        <ListViewItemWrapper style={{ padding: 10, borderBottom: '1px solid lightgrey', display : "flex" }}>

            <div style={{flex : "1"}}>
              {item.model}
            </div>
            <div style={{flex : "1"}}>
              {item.code}
            </div>
            <div style={{flex : "1"}}>
              {item.engine}
            </div>
            <div style={{flex : "1"}}>
              {item.power}
            </div>
            <div style={{flex : "1"}}>
              {item.weight}
            </div>
            <div style={{flex : "1"}}>
              {item.dimensions}
            </div>
            <div style={{flex : "1"}}>
              {item.speed}
            </div>
            <div style={{flex : "1"}}>
              {item.bladeSize}
            </div>
            <div style={{flex : "1"}}>
              {item.diameter}
            </div>
            <div style={{flex : "1"}}>
              {item.price}
            </div>
            <div style={{flex : "1"}}>
              {item.tax}
            </div>

           
        </ListViewItemWrapper>
    );
}

export default function OtherModels() {


    return (
        <>
            <GridLayoutItem row={7} col={2} colSpan={10}>
                <ListView
                    data={data.data}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={()=>MyHeader(data.header)}
                    /* footer={MyFooter} */
                />
            </GridLayoutItem>
            <Outlet />
            <style>
                {`.k-listview-footer {
                    border-top-width: 0 !important;
                }`}
            </style>
        </>
    )
}