//REACT
import { useState } from "react";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
    Form,
    Field,
    FormElement,
    FieldWrapper,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { ComboBox, ComboBoxFilterChangeEvent, DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { filterBy, FilterDescriptor } from "@progress/kendo-data-query";

export default function CreateForm(props){
    //TELERIK-HOOKS
    const { cancelEdit, onSubmit, item, data, ...other } = props;
    const [tipoValor, setTipoValor] = useState("");
    const [unidadesMedida, setUnidadesMedida] = useState(data);

    //FUNCTIONS
    const filterData = (filter: FilterDescriptor) => {
        const data = unidadesMedida.slice();
        return filterBy(data, filter);
    };

    const filterChange = (event: ComboBoxFilterChangeEvent) => {
        setUnidadesMedida(filterData(event.filter));
    };

    return (
        <Form
            initialValues={{ ...item, idAtributo: 0 }}
            onSubmit={onSubmit}
            render={(renderProps) => (
                <Dialog
                    title={`Crear atributo`}
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
                                validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"tipoDato"}
                                component={DropDownList}
                                label={"Tipo de dato"}
                                data={["Texto", "Numero", "Fecha", "Entero"]}
                                onChange={(event)=>{setTipoValor(event.target.value)}}
                                validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            {tipoValor === "Texto" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="text"
                                    label={"Valor Texto"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                            {tipoValor === "Numero" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="number"
                                    label={"Valor Numero"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                            {tipoValor === "Fecha" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="date"
                                    label={"Valor Fecha"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                            {tipoValor === "Entero" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="number"
                                    label={"Valor Entero"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                data={unidadesMedida}
                                name={"strUniMed"}
                                component={ComboBox}
                                filterable={true}
                                label={"Unidades de medida"}
                                onFilterChange={filterChange}
                                validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
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
                            icon="save"
                            svgIcon={saveIcon}
                        >
                            Guardar
                        </Button>
                    </DialogActionsBar>
                </Dialog>
            )}
            {...other}
        />
    );
};