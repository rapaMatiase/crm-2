import React, { useState } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import {
    AppBar,
    AppBarSection,
    Drawer,
    DrawerContent,
    DrawerSelectEvent,
    GridLayout,
    GridLayoutItem,
    Menu,
} from "@progress/kendo-react-layout";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBoxSimple, FormInput } from "~/components/fm-components";
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";

interface HeaderProps {
    title: string;
    menuItems: any[];
    sucursales: { idCentrosOperaciones: number; nombre: string }[];
}

const items = [
    { text: "Inbox", selected: true },
    { text: "Comprado", separator: true },
    { text: "Notifications" },
    { text: "Calendar" },
    { separator: true },
    { text: "Attachments" },
    { text: "Favourites" },
];

const inputValidator = (value: string) => {
    return value ? "" : "This field is required";
};

export const Header: React.FC<HeaderProps> = ({ title, menuItems, sucursales }) => {
    const { idView, idMenu } = useParams();
    const navigate = useNavigate();

    // states
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(
        items.findIndex((x) => x.selected === true)
    );

    // functions
    const handleClick = () => setExpanded((prevState) => !prevState);
    const handleSelect = (ev: DrawerSelectEvent) => {
        setSelectedId(ev.itemIndex);
        setExpanded(false);
    };

    // functions
    const handleSelectMenu = (event: { item: any }) => {
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
    };

    const handleNavigate = () => {
        navigate(`/view/10/menu/1/template/home/scrollView/products/events`);
    };

    const max = 100;
    

    return (
        <Drawer
            expanded={expanded}
            position={"end"}
            mode={"overlay"}
            width={400}
            items={items.map((item, index) => ({
                ...item,
                selected: index === selectedId,
            }))}
            onSelect={handleSelect}
        >
            <DrawerContent>
                <GridLayout className="cms-header-grid cms-header">
                    <div
                        className="cms-header-grid_logo cms-header_logo"
                        onClick={handleNavigate}
                    ></div>
                    <h1 className="cms-header-grid_titulo cms-header_titulo">{title}</h1>
                </GridLayout>
                {/* ComboBox de sucursales */}
                <GridLayoutItem className="cms-home-body_eventos-combobox">
                    <Form
                        initialValues={{ sucursales: 'Todas las sucursales' }}
                        render={() => (
                            <FormElement>
                                <Field
                                    component={FormComboBoxSimple}
                                    name="sucursuales"
                                    className="cms-home-body_eventos-combobox-input"
                                    id={sucursales.map((sucursal) => sucursal.idCentrosOperaciones).join(',')}
                                    data={sucursales.map((item) => item.nombre)}
                                />
                            </FormElement>
                        )}
                    />
                </GridLayoutItem>
                <AppBar className="cms-menu-grid cms-menu">
                    <AppBarSection className="cms-menu-grid_seccion-carrito cms-menu_seccion-carrito">
                        <div className="cms-menu_carrito" onClick={handleClick}></div>
                    </AppBarSection>
                    <AppBarSection className="cms-menu-grid_seccion-menu cms-menu_seccion-menu">
                        <Menu
                            className="cms-menu_menu"
                            items={menuItems}
                            onSelect={handleSelectMenu}
                        />
                    </AppBarSection>
                    <Form
                        initialValues={{
                            username: "",
                        }}
                        render={(formRenderProps) => (
                            <FormElement
                                style={{
                                    position: "relative",
                                    marginLeft: 0,
                                    marginRight: "auto",
                                }}
                            >
                                <fieldset className={"k-form-fieldset"}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                       
                                    >
                                        <Field
                                            id={"username"}
                                            name={"username"}
                                            max={max}
                                            value={formRenderProps.valueGetter("username")}
                                            component={FormInput}
                                            validator={inputValidator}
                                            style={{ flex: 1 }}
                                        />
                                    </div>
                                </fieldset>
                            </FormElement>
                        )}
                    />
                </AppBar>
            </DrawerContent>
        </Drawer>
    );
};
