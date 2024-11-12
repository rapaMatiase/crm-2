//RREMIX
import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate, useParams, useSearchParams } from "@remix-run/react";
//SERVICE
import { getSession } from "~/session.server";
//telerik
import { Menu, AppBar, AppBarSection, AppBarSpacer, MenuItem, CardBody } from '@progress/kendo-react-layout';
import { Breadcrumb } from "@progress/kendo-react-layout";

import { useRef, useState } from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { idVista, idMenu } = params;

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/ContentSettings/GetMenu/IdVista/${idVista}/IdMenu/${idMenu}`,
        {
            method: "GET",
            headers: {
                Authorization: token
            }
        }
    );

    const menus = await response.json();


    const title = menus.title;

    const actionAnalisis = (action: string) => {
        if (action === "") {
            return "";
        }

        if (action.startsWith("URL:")) {
            const [actionType, url] = action.split(":");
            return { actionType, url };
        }

        if (action.startsWith("Vista:")) {
            const [actionType, vista] = action.split(":");
            return { actionType, vista };
        }

        return { action };
    }

    const menuItems = menus.menuItems.map((item: any) => {
        return {
            text: item.title,
            id: item.id,
            urlParam: [{ key: item.id, value: "" }],
            breadcrumb : [{ text: item.title, id: item.id }],
            action: actionAnalisis(item.action),
            items: item.menuItems.map((subItem: any) => {
                return {
                    text: subItem.title,
                    idFather: item.id,
                    id: subItem.id,
                    urlParam: [{ key: item.id, value: "" }, { key: subItem.id, value: "" }],
                    action: actionAnalisis(subItem.action),
                    breadcrumb : [{ text: item.title, id: item.id }, { text: subItem.title, id: subItem.id }]
                }
            })
        }
    });

    return { title, menuItems };
}



export default function vistaLayout() {
    const { idVista, idMenu } = useParams();
    const { title, menuItems } = useLoaderData<any[]>();
    const [menuSelected, setMenuSelected] = useState<any>();
    const [paramsUrl, setParamsUrl] = useState<any>({});
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataBreadcrumb, setDataBreadcrumb] = useState<any[]>([]);

    const handleSelectMenu = (event) => {
        const itemMenuSelected = event.item;
        console.log(itemMenuSelected);

        setDataBreadcrumb(itemMenuSelected.breadcrumb);


        if (itemMenuSelected.action === "") {
            const urlParam = new URLSearchParams({
                menu: JSON.stringify(itemMenuSelected.urlParam),
                filtro: JSON.stringify([])
            });
            navigate(`/vista/${idVista}/menu/${idMenu}/filtros/producto?${urlParam.toString()}`);
        }

        if (itemMenuSelected.action.actionType === "URL") {
            window.open(`/redirect/${itemMenuSelected.action.url}`, '_blank');
        }

        if (itemMenuSelected.action.actionType === "Vista") {
            const urlParam = new URLSearchParams({
                menu: JSON.stringify(itemMenuSelected.urlParam),
                filtro: JSON.stringify([])
            });
            window.open(`/vista/${itemMenuSelected.action.vista}/menu/${idMenu}/filtros/producto?${urlParam.toString()}`, "_blank");
        }

    }

    const handleItemSelect = (event) => {
        // const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
        // const newData = data.slice(0, itemIndex + 1);
        // setData(newData);
    };
    const handleButtonClick = (event) => {
        // if (event) {
        //     setData(items);
        // }
    };
    const handleKeyDown = (event) => {
        // if (event.nativeEvent.keyCode === 13) {
        //     const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
        //     const newData = data.slice(0, itemIndex + 1);
        //     setData(newData);
        // }
    };

    return (
        <>
            <h1 className="title">{title} </h1>
            <AppBar >

                <AppBarSpacer style={{ width: 4 }} />
                <AppBarSection>
                    <Menu items={menuItems} onSelect={handleSelectMenu} />

                </AppBarSection>

                <AppBarSpacer />

            </AppBar>
            
            <div  style={{ marginTop: "20px" }}>
                <Breadcrumb
                    data={dataBreadcrumb}
                />
                </div>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/layout/menu/items/rendering/#toc-items/