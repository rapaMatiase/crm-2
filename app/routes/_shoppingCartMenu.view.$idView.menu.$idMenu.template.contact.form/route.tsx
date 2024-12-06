//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { Field, Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { FormInput, FormTextArea } from "~/components/fm-components";
import { Button } from "@progress/kendo-react-buttons";


export default function DetailProduct() {


    return (
        <>
            <GridLayoutItem
                row={1}
                col={1}
                colSpan={5}
            >
                <Form
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement>
                            <Field
                                name={"nombreApellido"}
                                component={FormInput}
                                type={"text"}
                                label={"Nombre y apellido"}
                            />
                            <Field
                                name={"email"}
                                component={FormInput}
                                type={"email"}
                                label={"E-Mail"}
                            />
                            <Field
                                name={"telefono"}
                                component={FormInput}
                                type={"number"}
                                label={"Telèfono"}
                            />
                            <Field
                                name={"empresa"}
                                component={FormInput}
                                type={"text"}
                                label={"Empresa"}
                            />
                            <Field
                                name={"mensaje"}
                                component={FormTextArea}
                                label={"Mensaje"}
                            />
                            <Button
                                themeColor={"primary"}
                                disabled={!formRenderProps.allowSubmit}
                                onClick={formRenderProps.onSubmit}
                            >
                                Enviar mensaje
                            </Button>
                        </FormElement>
                    )}
                />
            </GridLayoutItem>

            <Outlet />
        </>
    )
}