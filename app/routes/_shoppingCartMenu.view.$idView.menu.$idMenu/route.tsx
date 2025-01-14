// TemplateBasic.tsx
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";
// API
import { getMenu } from "~/api/apiContentSettings";
// Componentes
import { Header } from "~/components/header-component";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { idView, idMenu } = params;

    if (!idView || !idMenu) {
        throw new Error("idView and idMenu are required");
    }

    const menus = await getMenu({ request, idView, idMenu });
    const sucursales = await getCentrosOperaciones({ request })

    const title = menus.title;
    const menuItems = menus.menuItems.map((item: any) => ({
        text: item.title,
        id: item.id,
        url2: [
            { texto: "no", value: item.id, nombre: item.title, tipo: "menu" },
        ],
        action: item.action,
        items: item.menuItems.map((subItem: any) => ({
            text: subItem.title,
            idFather: item.id,
            id: subItem.id,
            url2: [
                { texto: "no", value: item.id, nombre: item.title, tipo: "menu" },
                { texto: "no", value: subItem.id, nombre: subItem.title, tipo: "menu" },
            ],
            action: subItem.action,
        })),
    }));

    return { title, menuItems, sucursales };
};

export default function TemplateBasic() {
    const { title, menuItems, sucursales } = useLoaderData<{
        title: string;
        menuItems: any[];
        sucursales: any[];
    }>();

    return (
        <>
            <Header title={title} menuItems={menuItems} sucursales={sucursales} />
            <Outlet />
        </>
    );
}
