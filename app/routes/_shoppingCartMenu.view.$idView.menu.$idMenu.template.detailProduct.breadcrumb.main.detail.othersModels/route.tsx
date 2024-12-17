
//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';

import data from './data.json';
import { ListView, ListViewHeader, ListViewItemProps, ListViewItemWrapper } from "@progress/kendo-react-listview";

const MyHeader = (titles: any[]) => {
    return (
        <ListViewHeader className="cms-body_otros-modelos-titulos">
            {titles.map((title, index) => {
                return <div>
                    {title}
                </div>
            })}
        </ListViewHeader>
    );
}

const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (
        <ListViewItemWrapper className="cms-body_otros-modelos-fila">

            <div >
              {item.model}
            </div>
            <div >
              {item.code}
            </div>
            <div >
              {item.engine}
            </div>
            <div >
              {item.power}
            </div>
            <div >
              {item.weight}
            </div>
            <div >
              {item.dimensions}
            </div>
            <div >
              {item.speed}
            </div>
            <div >
              {item.bladeSize}
            </div>
            <div >
              {item.diameter}
            </div>
            <div >
              {item.price}
            </div>
            <div >
              {item.tax}
            </div>
        </ListViewItemWrapper>
    );
}

export default function OtherModels() {


    return (
        <>
            <GridLayoutItem className="cms-body-grid_otros-modelos">
                <ListView
                    data={data.data}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={()=>MyHeader(data.header)}
                    className="cms-body_otros-modelos"
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