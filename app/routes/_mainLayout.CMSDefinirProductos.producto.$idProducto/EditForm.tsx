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
import { ComboBox, ComboBoxFilterChangeEvent} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { filterBy, FilterDescriptor } from "@progress/kendo-data-query";

export default function EditForm(props){
    const { cancelEdit, onSubmit, item, data, dataAtributos, ...other } = props;
    
    const [unidadesMedida, setUnidadesMedida] = useState(data);
    const [todosAtributos, setTodosAtributos] = useState(dataAtributos);

    const filterData = (filter: FilterDescriptor) => {
        const data = unidadesMedida.slice();
        return filterBy(data, filter);
    };

    const filterChange = (event: ComboBoxFilterChangeEvent) => {
        setUnidadesMedida(filterData(event.filter));
    };

    const filterDataAtributo = (filter: FilterDescriptor) => {
        const data = todosAtributos.slice();
        return filterBy(data, filter);
    };

    const filterChangeAtributo = (event: ComboBoxFilterChangeEvent) => {
        setTodosAtributos(filterDataAtributo(event.filter));
    };

    return (
        <Form
            initialValues={item}
            onSubmit={onSubmit}
            render={(renderProps) => (
                <Dialog
                    title={`Editar atributo`}
                    onClose={cancelEdit}
                    width={400}
                    height={600}               >
                    <FormElement>
                        {/* <FieldWrapper>
                            <Field
                                name={"idAtributo"}
                                component={Input}
                                label={"idAtributo"}
                                type="number"
                                readOnly
                            />
                        </FieldWrapper> */}
                        <FieldWrapper>
                            {/* <Field
                                name={"nombre"}
                                component={Input}
                                label={"Nombre"}
                                type="text"
                                validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                            /> */}

                            <Field
                                data={todosAtributos}
                                name={"nombre"}
                                component={ComboBox}
                                filterable={true}
                                label={"Atributo"}
                                onFilterChange={filterChangeAtributo}
                                validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"tipoValor"}
                                component={Input}
                                type="text"
                                label={"Tipo de dato"}
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
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                            {item.tipoValor === "Numero" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="number"
                                    label={"Valor Numero"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                            {item.tipoValor === "Fecha" && (
                                <Field
                                    name={"valorTexto"}
                                    component={Input}
                                    type="date"
                                    label={"Valor Fecha"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            )}
                            {item.tipoValor === "Entero" && (
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