//REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useNavigate, useParams, useRouteError } from "@remix-run/react";
import { useState } from "react";

// Validator function for the input field
const inputValidator = (value: string) => {
    return value ? "" : "This field is required";
};

import { AppBar, AppBarSection, Drawer, DrawerContent, DrawerSelectEvent, GridLayout, GridLayoutItem, Menu } from '@progress/kendo-react-layout';
import { LoaderFunction } from "@remix-run/node";
import { getMenu } from "~/api/apiContentSettings";
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";
import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { FormInput } from "~/components/fm-components";


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



export default function Component() {

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

    const handleNavigate = () => {
        navigate(`/view/10/menu/1/template/home/scrollView/products/events`);
    }

    const max = 100; // Define the max variable

    return (
        <>
            <GridLayoutItem row={1} col={1} colSpan={3} className="cms-header_logo" >
                <div style={{ backgroundColor: "violet", height: "100px", width: "100px", margin: 10 }} onClick={handleNavigate} ></div>
            </GridLayoutItem>

            <GridLayoutItem row={1} col={3} colSpan={3} className="cms-header_titulo" >
                <h1> {title} </h1>
            </GridLayoutItem>

            <GridLayoutItem row={1} col={1} colSpan={12} style={{ backgroundColor: "red", zIndex: -1 }} className="cms-header_fondo" >
            </GridLayoutItem>

            <GridLayoutItem row={2} col={1} colSpan={3} className="cms-menu">
                <AppBar>
                    <AppBarSection >
                        <Menu className="cms-menu_seccion-menu" items={menuItems} id="cms-menu-id" onSelect={handleSelectMenu} />
                    </AppBarSection>
                </AppBar>
            </GridLayoutItem>

            <GridLayoutItem row={2} col={8} colSpan={1} className="cms-menu_carrito" >
                <div onClick={handleClick} style={{ backgroundColor: "red", height: "20px", width: "10px", margin: 10 }} className="cms-menu_carrito_boton"> </div>
            </GridLayoutItem>

            <GridLayoutItem row={2} col={1} colSpan={12} style={{ backgroundColor: "yellow", zIndex: -1 }} className="cms-menu_fondo" >
            </GridLayoutItem>
            
            <Outlet />

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