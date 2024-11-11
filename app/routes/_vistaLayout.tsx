//RREMIX
import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
//SERVICE
import { getSession } from "~/session.server";
//telerik
import { Menu, AppBar, AppBarSection, AppBarSpacer, MenuItem, CardBody } from '@progress/kendo-react-layout';

import { useRef, useState } from "react";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {
    Card,
    CardTitle,
    CardImage,
    CardSubtitle,
} from "@progress/kendo-react-layout";

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
    const menuItems = menus.menuItems.map((item: any) => {
        return {
            text: item.title,
            id: item.id,
            items: item.menuItems.map((subItem: any) => {
                return {
                    text: subItem.title,
                    idFather: item.id,
                    id: subItem.id
                }
            })
        }
    });
    return { title, menuItems };
}


const ListViewItemRender = (props) => {
    let item = props.dataItem;
    return (
        <Card
            style={{
                width: "250",
                boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                marginTop: "15px",
                flex: "0 0 25.33%",
                margin: 10,
                border: "none",
            }}
        >
            <CardImage
                src={""}
                style={{
                    height: "150px",
                    width: "100%",
                }}
            />
            <CardBody>
                {item.text}
            </CardBody>
        </Card>
    );
};


export default function vistaLayout() {
    const { idVista, idMenu } = useParams();
    const { title, menuItems } = useLoaderData<any[]>();
    const [menuSelected, setMenuSelected] = useState<any>();
    const [paramsUrl, setParamsUrl] = useState<any>({});
    const navigate = useNavigate();
    const handleSelectMenu = (event) => {
        const itemMenu = event.item;
        let params = "";
        if (itemMenu.idFather) {
            params = new URLSearchParams({ producto: JSON.stringify([{ key: itemMenu.id, value: "" }, { key: itemMenu.idFather, value: "" }]) });
        } else {
            params = new URLSearchParams({ producto: JSON.stringify([{ key: itemMenu.id, value: "" }]) });

        }
        navigate(`/vista/${idVista}/menu/${idMenu}/filtros?${params.toString()}`)
    }


    return (
        <>
            <h1 className="title">{title} </h1>
            <AppBar >

                <AppBarSpacer style={{ width: 4 }} />
                <AppBarSection>
                    <Menu items={menuItems} onSelect={handleSelectMenu} />

                </AppBarSection>
                {/* <AppBarSection>
                    <Menu>
                        {menuItems.map(({ text, id, items }, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    text={text}
                                    render={() => {
                                        return (<Link to={`/vista/3/menu/1/filtros/producto/${id}`} >
                                            {text}
                                        </Link>
                                        )
                                    }}
                                >
                                    {items.map((subItem, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                text={subItem.text}
                                                render={() => {
                                                    return (
                                                        <ListView
                                                            data={[subItem]}
                                                            item={ListViewItemRender}
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        />
                                                    )
                                                }}
                                            />
                                        )
                                    })}
                                   
                                </MenuItem>
                            )
                        })}
                    </Menu>

                </AppBarSection> */}

                <AppBarSpacer />

            </AppBar>

            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/layout/menu/items/rendering/#toc-items/