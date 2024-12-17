//REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useNavigate, useParams, useRouteError } from "@remix-run/react";
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

    if (!idView || !idMenu) {
        throw new Error("idView and idMenu are required");
    }

    const menus = await getMenu({ request, idView, idMenu });

    const title = menus.title;

    const menuItems = menus.menuItems.map((item: any) => {
        return {
            text: item.title,
            id: item.id,
            url2: [{ texto: "no", value: item.id, nombre: item.title, tipo: "menu" }],
            action: item.action,
            items: item.menuItems.map((subItem: any) => {
                return {
                    text: subItem.title,
                    idFather: item.id,
                    id: subItem.id,
                    url2: [{ texto: "no", value: item.id, nombre: item.title, tipo: "menu" }, { texto: "no", value: subItem.id, nombre: subItem.title, tipo: "menu" }],
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

        if (idView && idMenu) {
            actionAnalyzer.analyze(itemMenuSelected.action, navigate, url, idView, idMenu);
        } else {
            console.error("idView or idMenu is undefined");
        }
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

                    <GridLayout className="cms-header-grid cms-header" >
                        <div className="cms-header-grid_logo cms-header_logo"></div>
                        <h1 className="cms-header-grid_titulo cms-header_titulo"> {title} </h1>
                    </GridLayout>

                    <AppBar className="cms-menu-grid cms-menu" >
                        <AppBarSection className="cms-menu-grid_seccion-menu cms-menu_seccion-menu">
                            <Menu className="cms-menu_menu" items={menuItems} onSelect={handleSelectMenu} />
                        </AppBarSection>
                        <AppBarSection className="cms-menu-grid_seccion-carrito cms-menu_seccion-carrito">
                            <div className="cms-menu_carrito" onClick={handleClick}> </div>
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

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div> Sin datos para este menu </div>
        <Outlet />
    </>
}