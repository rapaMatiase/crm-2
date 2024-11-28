//REACT
import { useEffect, useState } from "react";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Checkbox, Input, TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, trashIcon } from "@progress/kendo-svg-icons";
import { Label } from "@progress/kendo-react-labels";
//REMIX
import { useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { ActionFunction,  redirect } from "@remix-run/node";
//CONFIG
import { ROUTE_BASE_ATRIBUTOS } from "~/config/routesConfig";
import { deleteAtributo } from "~/api/apiAtributos";

export const action: ActionFunction = async ({ request, params }) => {
    const {idAtributo} = params;
    await deleteAtributo({request, idAtributo});
    return redirect(`${ROUTE_BASE_ATRIBUTOS}`);
};

export default function CMSDefinirAtributosProductosDelete(){
    
    //REMIX-HOOKS
    const {atributoSeleccionado} = useOutletContext<{atributoSeleccionado: any}>();
    const submit = useSubmit();
    const navigate = useNavigate();

    //TELERIK-HOOKS
    const [atributo, setAtributo] = useState<any>();
    const [loading, setLoading] = useState(true);

    //FUNTIONS
    useEffect(() => {
        setAtributo(atributoSeleccionado);
        setLoading(false);
    }, [atributoSeleccionado, loading]);

    const handleSubmit = (dataItem: { [name: string]: any }, event?: React.SyntheticEvent<any, Event>) => {
        if (event) {
            event.preventDefault();
        }
        submit(dataItem, { method: "POST" });
    }

    if(loading){
        return <div>Loading...</div>   
    }

    return (
        <Form
            initialValues={{
                idAtributo : atributo.idAtributo,
                nombre: atributo.nombre,
                nombreCorto: atributo.nombreCorto,
                comentario: atributo.comentario
            }}
            onSubmit={handleSubmit}
            render={(renderProps: FormRenderProps) => (
                <Dialog
                    title={`Eliminar atributo`}
                    onClose={()=>navigate(-1)}
                    width={500}
                    >
                    <FormElement>
                        <FieldWrapper>
                            <Field
                                name={"idAtributo"}
                                component={Input}
                                type={"number"}
                                label={"IdAtributo"}
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
                                name={"nombreCorto"}
                                component={Input}
                                type={"text"}
                                label={"Nombre corto"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label>Comentario</Label>
                            <Field
                                name={"comentario"}
                                component={TextArea}
                                label={"Comentario"}
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
                            onClick={()=>navigate(-1)}
                            icon="cancel"
                            svgIcon={cancelIcon}
                        >
                            Cancel
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