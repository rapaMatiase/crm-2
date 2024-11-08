//REACT
import { useEffect, useState } from "react";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Checkbox, Input, TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, trashIcon } from "@progress/kendo-svg-icons";
import { Label } from "@progress/kendo-react-labels";
//REMIX
import { useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { ActionFunction,  redirect } from "@remix-run/node";
//SERVICES
import { getSession } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const {id} = params;

    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/Atributos/DeleteAtributo/IdAtributo/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw ("Failed to update atributo");
    }

    return redirect(`/CMSDefinirReglasValidacionAtributos`);
};


export default function CMSDefinirReglasValidacionAtributosDelete() {
    
    //REMIX-HOOKS
    const {reglaValidacionAtributosSeleccionado, closeForm} = useOutletContext();
    const {id} = useParams();
    const submit = useSubmit();

    const [reglaValidacionAtributos, setReglaValidacionAtributos] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setReglaValidacionAtributos(reglaValidacionAtributosSeleccionado);
        setLoading(false);
    }, [reglaValidacionAtributosSeleccionado, loading]);

    //TELERIK-FUNCTIONS
    const handleSubmit = (dataItem, event) => {
        event.preventDefault();
        submit(dataItem, {method : "POST"});
    }

    if(loading){
        return <div>Loading...</div>   
    }

    return (
        <Form
            initialValues={{
                idReglaValidacion: reglaValidacionAtributos.idReglaValidacion,
                nombre : reglaValidacionAtributos.nombre,
                strTipoProducto : reglaValidacionAtributos.strTipoProducto,
                strAtributo : reglaValidacionAtributos.strAtributo,
                strUniMed : reglaValidacionAtributos.strUniMed,
                comentario : reglaValidacionAtributos.comentario,
            }}
            onSubmit={handleSubmit}
            render={(renderProps: FormRenderProps) => (
                <Dialog
                    title={"Eliminar regla de validación"}
                    onClose={closeForm}
                    width={500}
                    >
                    <FormElement>
                    <FieldWrapper>
                            <Field
                                name={"idReglaValidacion"}
                                component={Input}
                                type={"number"}
                                label={"idReglaValidacion"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"nombre"}
                                component={Input}
                                type={"text"}
                                label={"Nombre"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"strTipoProducto"}
                                component={Input}
                                type={"text"}
                                label={"Tipo de procurto"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"strUniMed"}
                                component={Input}
                                label={"Unidades de medida"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label>Comentarios</Label>
                            <Field
                                name={"comentario"}
                                component={TextArea}
                                label={"Comentario"}
                                autoSize={true}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label>¿Está seguro que desea eliminar este atributo?</Label>
                            <Field 
                            name="confirmacion" 
                            label="Confirmo que deseo eliminar este atributo"
                            component={Checkbox}
                            readOnly
                            />
                        </FieldWrapper>
                    </FormElement>
                    <DialogActionsBar layout="end">
                        <Button
                            onClick={closeForm}
                            icon="cancel"
                            svgIcon={cancelIcon}
                        >
                            Cancelar
                        </Button>
                        <Button
                            themeColor={"primary"}
                            disabled={!renderProps.allowSubmit}
                            icon="save"
                            onClick={renderProps.onSubmit}
                            svgIcon={trashIcon}
                        >
                            Eliminar
                        </Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        />
    );
};