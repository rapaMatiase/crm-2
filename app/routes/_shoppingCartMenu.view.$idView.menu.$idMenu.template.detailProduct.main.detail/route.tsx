import { useState } from "react";
//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem, TabStrip, TabStripSelectEventArguments, TabStripTab } from '@progress/kendo-react-layout';
import { json } from "./json";
import { createComponent } from "./componentFactory";


export default function Detail() {

    const [selected, setSelected] = useState<number>(1);

    const handleSelect = (e: TabStripSelectEventArguments) => {
        setSelected(e.selected);
    };

    return (
        <>
            <GridLayoutItem row={2} col={1} colSpan={10}>
                <TabStrip 
                    tabPosition="left"
                    selected={selected} 
                    onSelect={handleSelect}>
                    {json.map((item, index) => (
                        <TabStripTab key={index} title={item.title}>
                            {createComponent(item)}
                        </TabStripTab>
                    ))}
                    <TabStripTab title="Paris">
                    </TabStripTab>
                </TabStrip>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}