//REACT
import { useState } from "react";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
    
    FormElement,
    FieldWrapper,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { ComboBox, ComboBoxFilterChangeEvent } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { filterBy, FilterDescriptor } from "@progress/kendo-data-query";


export default function CreateForm(props: { cancelEdit: any; onSubmit: any; item: any; data: any; dataAtributos: any; }) {
    //TELERIK-HOOKS
    const { cancelEdit, onSubmit, item, data, dataAtributos } = props;
    const [unidadesMedida, setUnidadesMedida] = useState(data);
    const [todosAtributos, setTodosAtributos] = useState(dataAtributos);

    interface Atributo {
        idAtributo: string;
        tipoValor: string;
        valorTexto?: string;
        strUniMed?: string;
    }

    const [atibutoSelected, setAtributoSelected] = useState<Atributo>({
        idAtributo: "",
        tipoValor: "",
    });
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
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: String(event.target.value) })
                                }}
                            />
                        )}
                        {atibutoSelected.tipoValor === "Numerico" && (
                            <Input
                                name={"valorTexto"}
                                type="number"
                                label={"Valor Numero"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: String(event.target.value) })
                                }}
                            />
                        )}
                        {atibutoSelected.tipoValor === "Fecha" && (
                            
                            <Input
                                name={"valorTexto"}
                                type="date"
                                label={"Valor Fecha"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: String(event.target.value) })
                                }}
                            />
                        )}
                        {atibutoSelected.tipoValor === "Entero" && (
                            <Input
                                name={"valorTexto"}
                                type="number"
                                label={"Valor Entero"}
                                onChange={(event) => {
                                    setAtributoSelected({ ...atibutoSelected, valorTexto: String(event.target.value) })
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
