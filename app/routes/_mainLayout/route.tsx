// REMIX
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
// KENDO
import { Menu, AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

// REMIX
import { json, LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { getMainMenu } from "~/api/apiContentSettings";

export const loader: LoaderFunction = async ({ request }) => {
    
    const response = await getMainMenu({ request });
   return response

};

export default function MainLayout() {
    const { titulo, menuItem, nombre } = useLoaderData<{ titulo: string, menuItem: any, text: string, nombre: string }>();
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
