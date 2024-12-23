import { ListView, ListViewItemProps } from "@progress/kendo-react-listview";
import { Outlet } from "@remix-run/react";
import { Card, CardImage, GridLayoutItem } from "@progress/kendo-react-layout";
import data from './data.json';

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
                {item.title}
                <CardImage
                    src={`${item.url}`}
                    style={{ height: 200, width: 250 }}
                />
            </Card>
        </div>
    );
};

export default function TemplateBasic() {

    return (
        <>
            
                <GridLayoutItem row={2} col={2} colSpan={10}>
                    <ListView
                        data={data}
                        item={MyItemRender}
                        style={{  height: "100%" }}
                    />
                </GridLayoutItem>
            <Outlet />
            <style>
                {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }`}
            </style>
        </>
    )
}