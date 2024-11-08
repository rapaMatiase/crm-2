import { Outlet, redirect, useLoaderData, useNavigate } from "@remix-run/react";

import { Menu, AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';


import { json, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/session.server";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;
    const nombre = session.get("user")?.name;

    if (!token) {
        return redirect("/login"); // Redirect to login if no token is found
    }

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Contexto/Contexto/GetMainMenu", {
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
    const { titulo, menuItem, text,  nombre } = useLoaderData<{ items: any[] }>();
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
            <AppBar>

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

        </>
    );
};
