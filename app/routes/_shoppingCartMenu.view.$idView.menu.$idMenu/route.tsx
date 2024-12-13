//REMIX
import {  Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";

import { AppBar, AppBarSection, AppBarSpacer, Drawer, DrawerContent, DrawerSelectEvent, GridLayout, Menu } from '@progress/kendo-react-layout';
import { Button } from "@progress/kendo-react-buttons";
import { LoaderFunction } from "@remix-run/node";
import { getMenu } from "~/api/apiContentSettings";
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";

const items = [
    { text: 'Inbox', selected: true },
    { text: "Comprado", separator: true },
    { text: 'Notifications' },
    { text: 'Calendar', },
    { separator: true },
    { text: 'Attachments', },
    { text: 'Favourites', }
];

export const loader: LoaderFunction = async ({ request, params }) => {
    const { idView, idMenu } = params;

    const menus = await getMenu({ request, idView, idMenu });

    const title = menus.title;

    const menuItems = menus.menuItems.map((item: any) => {
        return {
            text: item.title,
            id: item.id,
            url2: [{texto : "no",  value: item.id, nombre : item.title, tipo : "menu" }],
            action: item.action,
            items: item.menuItems.map((subItem: any) => {
                return {
                    text: subItem.title,
                    idFather: item.id,
                    id: subItem.id,
                    url2: [{ texto : "no", value: item.id, nombre : item.title, tipo : "menu" }, {texto : "no", value: subItem.id, nombre : subItem.title, tipo : "menu" }],
                    action: subItem.action,
                }
            })
        }
    });

    return { title, menuItems };
}



export default function TemplateBasic() {
    //REMIX
    const { idView, idMenu } = useParams();
    const { title, menuItems } = useLoaderData<{ title: string, menuItems: any[] }>();
    const navigate = useNavigate();
    //DRAWER
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(items.findIndex(x => x.selected === true));

    //FUNTIONS - DRAWER
    const handleClick = () => { setExpanded(prevState => !prevState); };
    const handleSelect = (ev: DrawerSelectEvent) => {
        setSelectedId(ev.itemIndex);
        setExpanded(false);
    };

    //FUNCTION - MENU
    const handleSelectMenu = (event: { item: any; }) => {
        const itemMenuSelected = event.item;
        const actionAnalyzer = new menuActionAnalyzer();

        const url = new URLSearchParams({
            filters: JSON.stringify(itemMenuSelected.url2),
        });

        actionAnalyzer.analyze(itemMenuSelected.action, navigate, url, idView, idMenu);
    }

    return (
        <>
            <Drawer
                expanded={expanded}
                position={"end"}
                mode={'overlay'}
                width={400}
                items={items.map(
                    (item, index) => ({ ...item, selected: index === selectedId }))}
                onSelect={handleSelect}
            >
                <DrawerContent>
                    <div className="header" >
                        <div className="header-logo" style={{ height: 120, width: 860 }}></div>
                        <h1 className="header-titulo"> {title} </h1>
                    </div>

                    <AppBar className="menu cms-menu" >
                        <AppBarSection className="menu-seccion">
                            <Menu className="menu-seccion-items" items={menuItems} onSelect={handleSelectMenu} />
                        </AppBarSection>
                        <AppBarSection className="menu-seccion">
                            <div className="menu-seccion-carrito" onClick={handleClick}> </div>
                        </AppBarSection>
                    </AppBar>

                        <Outlet />


                </DrawerContent>
            </Drawer>
            <style>
                {`.k-menu-popup  {
                    position: fixed;
                    top: auto;
                    z-index: 1000; 
                    }`}
            </style>
        </>
    )
}