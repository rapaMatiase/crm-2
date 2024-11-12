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
import { atRule } from "postcss";

export default function CreateForm(props) {
    //TELERIK-HOOKS
    const { cancelEdit, onSubmit, item, data, dataAtributos, ...other } = props;
    const [tipoValor, setTipoValor] = useState("");
    const [unidadesMedida, setUnidadesMedida] = useState(data);
    const [todosAtributos, setTodosAtributos] = useState(dataAtributos);

    const [atibutoSelected, setAtributoSelected] = useState({});
    //FUNCTIONS
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
        <>
            <Dialog
                title={`Crear atributo`}
                onClose={cancelEdit}
                width={400}
                height={600}
            >
                <FormElement>
                    <FieldWrapper>
                        <Input
                            label={"ID Atributo"}
                            value={atibutoSelected.idAtributo}
                            readOnly
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <ComboBox
                            data={todosAtributos}
                            name={"nombre"}
                            filterable={true}
                            textField="nombre"
                            label={"Atributo"}
                            onChange={(event) => {
                                setAtributoSelected(event.target.value)
                                console.log(atibutoSelected)
                            }}
                            onFilterChange={filterChangeAtributo}
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <Input
                            label={"Tipo de dato"}
                            value={atibutoSelected.tipoValor}
                            readOnly
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        {atibutoSelected.tipoValor === "Texto" && (
                            <Input
                                name={"valorTexto"}
                                type="text"
                                label={"Valor Texto"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: event.target.value })
                                }}
                            />
                        )}
                        {atibutoSelected.tipoValor === "Numerico" && (
                            <Input
                                name={"valorTexto"}
                                type="number"
                                label={"Valor Numero"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: event.target.value })
                                }}
                            />
                        )}
                        {atibutoSelected.tipoValor === "Fecha" && (
                            <Input
                                name={"valorTexto"}
                                type="date"
                                label={"Valor Fecha"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: event.target.value })
                                }}
                            />
                        )}
                        {atibutoSelected.tipoValor === "Entero" && (
                            <Input
                                name={"valorTexto"}
                                type="number"
                                label={"Valor Entero"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: event.target.value })
                                }}
                            />
                        )}
                    </FieldWrapper>
                    <FieldWrapper>
                        <ComboBox
                            data={unidadesMedida}
                            name={"strUniMed"}
                            filterable={true}
                            value={atibutoSelected.strUniMed}
                            label={"Unidades de medida"}
                            onFilterChange={filterChange}
                            onChange={(event) => {
                                setAtributoSelected({ ...atibutoSelected, strUniMed: event.target.value })
                            }}
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
                            onClick={(event)=>{
                                event.preventDefault();
                                onSubmit(atibutoSelected)
                            }}
                            icon="save"
                            svgIcon={saveIcon}
                        >
                            Guardar
                        </Button>
                    </DialogActionsBar>
            </Dialog>
        </>
    );
};


/*


 <Form
            initialValues={{ 
                idAtributo : atibutoSelected.idAtributo, 
                nombre : atibutoSelected.nombre, 
                tipoDato : "", 
                valorTexto : "", 
                strUniMed : "" 
            }}
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
                                data={todosAtributos}
                                name={"nombre"}
                                component={ComboBox}
                                filterable={true}
                                textField="nombre"
                                label={"Atributo"}
                                onChange={(event)=>{
                                    setAtributoSelected(event.target.value)
                                    console.log(atibutoSelected)
                                }}
                                onFilterChange={filterChangeAtributo}
                                validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"tipoDato"}
                                component={DropDownList}
                                label={"Tipo de dato"}
                                value={"Texto"}
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
*/