//REMIX
import { useState } from "react";
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem, Breadcrumb, BreadcrumbLinkMouseEvent, Card, CardImage } from "@progress/kendo-react-layout";
import { ListView, ListViewItemProps } from "@progress/kendo-react-listview";

//FOR DELETE

const MyItemRender = (props: ListViewItemProps) => {
    const item = props.dataItem;
    return (
        <div className="k-listview-item">
            <Card
                style={{
                    width: "100%",
                    boxShadow: 'none',
                    flex: '1',
                    margin: 25,
                    border: 'none',
                }}
            >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/zjWCWTBUk8I?si=fV8Egy_rOmJrSyGJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </Card>
        </div>
    );
};

const data = [1, 2, 3, 4, 5] 

export default function TemplateBasic() {


    return (
        <>
            <GridLayoutItem row={2} col={2} colSpan={10}>
                <ListView
                    data={data}
                    item={MyItemRender}
                    style={{ height: "100%" }}
                />
                <style>
                    {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }`}
                </style>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}

