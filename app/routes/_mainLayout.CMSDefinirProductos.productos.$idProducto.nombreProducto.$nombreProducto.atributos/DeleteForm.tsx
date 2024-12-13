//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
    Form,
    Field,
    FormElement,
    FieldWrapper,
} from "@progress/kendo-react-form";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, trashIcon } from "@progress/kendo-svg-icons";
import { Label } from "@progress/kendo-react-labels";

export default function DeleteFomr(props){
    const { cancelEdit, onSubmit, item, data, ...other } = props;

    return (
        <Form
            initialValues={item}
            onSubmit={onSubmit}
            render={(renderProps) => (
                <Dialog
                    title={`Eliminar atributo`}
                    onClose={cancelEdit}
                    width={400}
                    height={600}
                >
                    <FormElement>
                        <FieldWrapper>
                            <Field
                                name={"idAtributo"}
                                component={Input}
                                label={"idAtributo"}
                                type="number"
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"nombre"}
                                component={Input}
                                label={"Nombre"}
                                type="text"
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"tipoDato"}
                                component={DropDownList}
                                label={"Tipo de dato"}
                                data={["Texto", "Numero", "Fecha", "Entero"]}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            {item.tipoValor === "Texto" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="text"
                                    label={"Valor Texto"}
                                    readOnly
                                />
                            )}
                            {item.tipoValor === "Numero" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="number"
                                    label={"Valor Numero"}
                                    readOnly
                                />
                            )}
                            {item.tipoValor === "Fecha" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="date"
                                    label={"Valor Fecha"}
                                    readOnly
                                />
                            )}
                            {item.tipoValor === "Entero" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="number"
                                    label={"Valor Entero"}
                                    readOnly
                                />
                            )}
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"strUniMed"}
                                component={Input}
                                label={"Unidades de medida"}
                                type="text"
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
                        <Button onClick={cancelEdit} icon="cancel" svgIcon={cancelIcon}>
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            themeColor={"primary"}
                            disabled={!renderProps.allowSubmit}
                            onClick={renderProps.onSubmit}
                            icon="trash"
                            svgIcon={trashIcon}
                        >
                            Eliminar
                        </Button>
                    </DialogActionsBar>
                </Dialog>
            )}
            {...other}
        />
    );
};
