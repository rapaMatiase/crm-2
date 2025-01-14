//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { Field, Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { FormInput, FormTextArea } from "~/components/fm-components";
import { Button } from "@progress/kendo-react-buttons";

import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const data = {
        nombreApellido: formData.get("Nombre y Apellido"),
        email: formData.get("email"),
        telefono: formData.get("telefono"),
        empresa: formData.get("empresa"),
        mensaje: formData.get("mensaje"),
    };


    return json({ success: true });
};

export default function FormEvents() {


    return (
        <>
            <GridLayout>

                <GridLayoutItem
                    row={1}
                    col={1}
                    colSpan={5}
                >
                    <Form
                        render={(formRenderProps: FormRenderProps) => (
                            <FormElement>
                                <GridLayoutItem>

                                    <Field
                                        name={"Nombre y Apellido"}
                                        component={FormInput}
                                        type={"text"}
                                        label={"Nombre y apellido"}
                                    />
                                </GridLayoutItem>
                                <GridLayoutItem>

                                    <Field
                                        name={"email"}
                                        component={FormInput}
                                        type={"email"}
                                        label={"E-Mail"}
                                    />
                                </GridLayoutItem>
                                <GridLayoutItem>

                                    <Field
                                        name={"telefono"}
                                        component={FormInput}
                                        type={"number"}
                                        label={"Telèfono"}
                                    />
                                </GridLayoutItem>
                                <GridLayoutItem>

                                    <Field
                                        name={"empresa"}
                                        component={FormInput}
                                        type={"text"}
                                        label={"Empresa"}
                                    />
                                </GridLayoutItem>
                                <GridLayoutItem>

                                    <Field
                                        name={"mensaje"}
                                        component={FormTextArea}
                                        label={"Mensaje"}
                                    />
                                </GridLayoutItem>
                                <GridLayoutItem>

                                    <Button
                                        themeColor={"primary"}
                                        disabled={!formRenderProps.allowSubmit}
                                        onClick={formRenderProps.onSubmit}
                                    >
                                        Enviar mensaje
                                    </Button>
                                </GridLayoutItem>
                            </FormElement>
                        )}
                    />
                </GridLayoutItem>
            </GridLayout>

            <Outlet />
        </>
    )
}