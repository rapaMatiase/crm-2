//REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useNavigate, useParams, useRouteError } from "@remix-run/react";
import { useState } from "react";

// Validator function for the input field
const inputValidator = (value: string) => {
    return value ? "" : "This field is required";
};

import { AppBar, AppBarSection, Drawer, DrawerContent, DrawerSelectEvent, GridLayout, Menu } from '@progress/kendo-react-layout';
import { LoaderFunction } from "@remix-run/node";
import { getMenu } from "~/api/apiContentSettings";
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";
import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { Hint, Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
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

    const handleNavigate = () => {
        navigate(`/view/10/menu/1/template/home/scrollView/products/events`);
    }

    const max = 100; // Define the max variable

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
                        <div className="cms-header-grid_logo cms-header_logo" onClick={handleNavigate} ></div>
                        <h1 className="cms-header-grid_titulo cms-header_titulo"> {title} </h1>
                    </GridLayout>

                    <AppBar className="cms-menu-grid cms-menu" >
                        <AppBarSection className="cms-menu-grid_seccion-carrito cms-menu_seccion-carrito">
                            <div className="cms-menu_carrito" onClick={handleClick}> </div>
                        </AppBarSection>
                        <AppBarSection className="cms-menu-grid_seccion-menu cms-menu_seccion-menu">
                            <Menu className="cms-menu_menu" items={menuItems} onSelect={handleSelectMenu} />
                        </AppBarSection>
                        <Form
                            initialValues={{
                                username: '',
                            }}
                            render={(formRenderProps) => (
                                <FormElement style={{ position: "relative", marginLeft: 0, marginRight: "auto" }}>
                                    <fieldset className={'k-form-fieldset'}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <Field
                                                id={'username'}
                                                name={'username'}
                                                max={max}
                                                value={formRenderProps.valueGetter('username')}
                                                component={FormInput}
                                                validator={inputValidator}
                                                style={{ flex: 1 }}
                                            />
                                            <div onClick={formRenderProps.onSubmit} style={{ cursor: "pointer", background: "red" }} >
                                                buscar
                                            </div>
                                        </div>
                                    </fieldset>
                                </FormElement>
                            )}
                        />

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