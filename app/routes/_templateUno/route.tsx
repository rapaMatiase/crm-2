//REACTJS
import { useState } from "react";
//REMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useParams } from "@remix-run/react";
//TELERIK
import { Menu, AppBar, AppBarSection, AppBarSpacer, Drawer, DrawerContent, DrawerSelectEvent, MenuItem, StackLayout, Card, CardImage, CardTitle, CardSubtitle, GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { Breadcrumb } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
//API
import { getMenu } from "~/api/apiContentSettings";
//UTILIS
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";
import { ListView } from "@progress/kendo-react-listview";


export const loader: LoaderFunction = async ({ request, params }) => {
    const { idVista, idMenu } = params;

    if (!idVista || !idMenu) {
        throw new Error("idVista and idMenu are required");
    }

    const menus = await getMenu({ request, idVista, idMenu });

    const title = menus.title;

    const menuItems = menus.menuItems.map((item: any) => {
        return {
            text: item.title,
            id: item.id,
            urlParam: [{ key: item.id, value: "" }],
            breadcrumb: [{ text: item.title, id: item.id }],
            action: item.action,
            items: item.menuItems.map((subItem: any) => {
                return {
                    text: subItem.title,
                    idFather: item.id,
                    id: subItem.id,
                    urlParam: [{ key: item.id, value: "" }, { key: subItem.id, value: "" }],
                    action: item.action,
                    breadcrumb: [{ text: item.title, id: item.id }, { text: subItem.title, id: subItem.id }]
                }
            })
        }
    });

    return { title, menuItems };
}

const items = [
    { text: 'Inbox', selected: true },
    { text: "Comprado", separator: true },
    { text: 'Notifications' },
    { text: 'Calendar', },
    { separator: true },
    { text: 'Attachments', },
    { text: 'Favourites', }
];



const contentRender = (props: any) => {
    console.log(props.item.data)
    return (
        <div style={{ padding: '10px', width: "80vw", textAlign: "center" }}>Custom content for itemId: {props.itemId}, text: {props.item.text}</div>
    );
};

export default function vistaLayout() {
    //REMIX-HOOKS
    const { idVista, idMenu } = useParams();
    const { title, menuItems } = useLoaderData<{ title: string, menuItems: any[] }>();
    const navigate = useNavigate();

    //TELERIK-HOOKS
    const [dataBreadcrumb, setDataBreadcrumb] = useState<any[]>([menuItems[0]]);

    //FUNCTIONS
    const handleSelectMenu = (event: { item: any; }) => {
        const itemMenuSelected = event.item;

        setDataBreadcrumb(itemMenuSelected.breadcrumb);
        //Create the routes
        const actionAnalyzer = new menuActionAnalyzer();
        const urlParamsManager = null; //UrlParamsManager.getInstance();
        actionAnalyzer.analyze(itemMenuSelected.action, navigate, urlParamsManager, idVista, idMenu);
    }

    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(items.findIndex(x => x.selected === true));

    const handleClick = () => { setExpanded(prevState => !prevState); };

    const handleSelect = (ev: DrawerSelectEvent) => {
        setSelectedId(ev.itemIndex);
        setExpanded(false);
    };

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
                    <AppBar style={{marginBottom : 20}} >
                        <AppBarSpacer style={{ width: 4 }} />
                        <AppBarSection>
                            <Menu items={menuItems}  />
                        </AppBarSection>

                        <AppBarSection>
                            <Menu>
                                <MenuItem text="Inbox" contentRender={contentRender} data={menuItems[0].items} />
                                {menuItems.map((item) => {
                                    return (
                                        <MenuItem text={item.text} >
                                            {item.items.map((subItem) => {
                                                return (
                                                    <MenuItem cssStyle={{ width: 1000 }} text={subItem.text} render={() => {
                                                        return <><ListView
                                                            data={[subItem]}
                                                            className="k-listview-content"
                                                            item={(props) => {
                                                                return (
                                                                    <div className='k-listview-item'>
                                                                        <Card
                                                                            style={{ width: 180, boxShadow: 'none', flex: '0 0 25.33%', margin: 25, border: 'none' }}
                                                                        >
                                                                            <CardImage src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/54748432143492082bf60eee16c1c681f4d6270f/porto-180x150.png`} style={{ height: 150, width: 180 }} />
                                                                            <div style={{ padding: 0 }}>
                                                                                <CardTitle style={{ fontSize: 14 }}>
                                                                                    {props.dataItem.text}
                                                                                </CardTitle>

                                                                            </div>
                                                                        </Card>
                                                                    </div>
                                                                )
                                                            }}
                                                            style={{ width: "100%", height: 530 }}
                                                        />
                                                            <style>
                                                                {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }`}
                                                            </style>
                                                        </>
                                                    }} />
                                                )
                                            })}
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </AppBarSection>

                        <Button onClick={handleClick}> Carrito</Button>
                        <AppBarSpacer />
                    </AppBar>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <GridLayout
                            gap={{ rows: 10, cols: 10 }}
                            rows={[{ height: 50 }, { height: 150 }, { height: 650 }]}
                            cols={[{ width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }, { width: 100 }]}
                        >
                            <GridLayoutItem row={1} col={1} colSpan={10} style={{backgroundColor : "red"}}>
                                <Breadcrumb data={dataBreadcrumb} />
                            </GridLayoutItem>
                            <Outlet />
                        </GridLayout>
                    </div>
                </DrawerContent>
            </Drawer>

        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/layout/menu/items/rendering/#toc-items/