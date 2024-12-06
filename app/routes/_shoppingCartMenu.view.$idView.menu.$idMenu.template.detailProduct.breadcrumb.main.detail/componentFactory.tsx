
import { ListView, ListViewItemWrapper } from '@progress/kendo-react-listview';
import React from 'react';



export const TextComponent: React.FC<{content : string}> = ({ content }) => {
    return (<p>{content}</p>);
};

export const TableComponent: React.FC<{data : any}> = ({ data }) => {

    const MyItemRender: React.FC<any> = (props) => {
        return (<ListViewItemWrapper style={{display : "flex", width : "100%"}}>
                   <div style={{flex : 1}}>{props.dataItem.text}</div>
                   <div style={{flex : 1}}>{props.dataItem.value}</div> 
                </ListViewItemWrapper>);
    }

    return (
        <>
             <ListView 
                data={data} 
                item={MyItemRender} 
                style={{ width: '100%' }} />
        </>
    )
};



export function createComponent(config): React.ReactNode {
    switch (config.type) {
        case "table":
            return <TableComponent data={config.data} />;
        case "ListView":
            return ""
        case "text":
            return <TextComponent content={config.data} />;
        default:
            return null;
    }
}