// REMIX
import { Outlet, redirect, useLoaderData, useNavigate } from "@remix-run/react";
// KENDO
import { Menu, AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

// REMIX
import { json, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/servicies/session.server";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;
    const nombre = session.get("user")?.name;

    if (!token) {
        return redirect("/login"); 
    }

    const response = await fetch("https://appcms.testingleiten.dnscheck.com.ar/Contexto/Contexto/GetMainMenu", {
        headers: {
            Authorization: token
        }
    });

    if (!response.ok) {
        throw new Response("Failed to fetch menu items", { status: response.status });
    }

    const data = await response.json();
    return json({...data, nombre});
};

export default function MainLayout() {
    const { titulo, menuItem, text,  nombre } = useLoaderData<{ titulo: string, menuItem: any, text: string, nombre: string }>();
    const navigate = useNavigate();
    const [menuSelected, setMenuSelected] = useState<any>();

    const handleSelectMenu = (event: any) => {
        const processName = event.item.processName;
        const text = event.item.text;
        if(processName != ""){
            navigate(processName)
            setMenuSelected(text)
        }
    }

    return (
        <>
            <h1 className="title">{titulo} </h1>
            <AppBar >

                <AppBarSpacer style={{ width: 4 }} />

                <AppBarSection>
                    <Menu items={menuItem.items} onSelect={handleSelectMenu}/>
                </AppBarSection>

                <AppBarSpacer />

                <AppBarSection>
                    <h3>Usuario : {nombre}</h3>
                </AppBarSection>
            </AppBar>

            <h3>{menuSelected}</h3>
            <Outlet />
            <style>
                {`.k-menu-popup  {
                    position: fixed;
                    top: auto;
                    z-index: 1000; 
                    }`}
        </style>
        </>
    );
};
