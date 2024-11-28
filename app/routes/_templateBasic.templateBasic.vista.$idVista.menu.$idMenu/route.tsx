//REMIX
import { Link, Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
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
    const { idVista, idMenu } = params;

    const menus = await getMenu({ request, idVista, idMenu });

    const title = menus.title;

    const menuItems = menus.menuItems.map((item: any) => {
        return {
            text: item.title,
            id: item.id,
            urlParam: [{ key: item.id, value: "" }],
            url2:  [{ key: item.id, value: "" }] ,
            breadcrumb: [{ label: item.title, id: item.id }],
            action: item.action,
            items: item.menuItems.map((subItem: any) => {
                return {
                    text: subItem.title,
                    idFather: item.id,
                    id: subItem.id,
                    urlParam: [{ key: item.id, value: "" }, { key: subItem.id, value: "" }],
                    url2: [{ key: item.id, value: "" }, { key: subItem.id, value: "" }],
                    action: subItem.action,
                    breadcrumb: [{ label: item.title, id: item.id }, { label: subItem.title, id: subItem.id }]
                }
            })
        }
    });

    return { title, menuItems };
}


// https://www.telerik.com/kendo-react-ui/components/layout/drawer/custom_rendering

export default function TemplateBasic() {
    //REMIX
    const { idVista, idMenu } = useParams();
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
            menu: JSON.stringify(itemMenuSelected.url2),
            breadcrumb: JSON.stringify(itemMenuSelected.breadcrumb),
            chipts : JSON.stringify([]),
            filters : JSON.stringify({})
        });
        
        actionAnalyzer.analyze(itemMenuSelected.action, navigate, url, idVista, idMenu);
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
                    <h1> {title} </h1>
                    
                    <AppBar style={{ marginBottom: 20 }} >
                        <AppBarSpacer style={{ width: 4 }} />
                        <AppBarSection>
                            <Menu items={menuItems} onSelect={handleSelectMenu} />
                        </AppBarSection>
                        <Button onClick={handleClick}> Carrito</Button>
                    </AppBar>

                    <GridLayout
                        style={{ placeContent: "center" }}
                        gap={{ rows: 10, cols: 10 }}
                        rows={[{ height: 50 }, { height: 150 }, { height: 650 }]}
                        cols={[{ width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }]}
                    >
                        <Outlet />
                    </GridLayout>

                </DrawerContent>
            </Drawer>

        </>
    )
}