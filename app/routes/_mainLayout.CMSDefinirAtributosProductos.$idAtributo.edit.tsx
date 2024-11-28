//REACT
import { useEffect, useState } from "react";
//REMIX
import { useOutletContext, useParams, useSubmit, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Input, NumericTextBox, Checkbox, TextArea } from "@progress/kendo-react-inputs";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { FormInput, FormCheckbox, FormDropDownList, FormTextArea, FormMultiSelect } from "~/components/fm-components";
//CONFIG
import { ROUTE_BASE_ATRIBUTOS } from "~/config/routesConfig";
//API
import { postAtributo } from "~/api/ApiAtributos";
import { getUnidadesMedida } from "~/api/apiUnidadesMedida";
import { requiredValidator } from "~/components/fm-validators";

//CONSTANTS
const tipoDeValores = ["Texto", "Numerico", "Fecha", "Entero"];

export const loader: LoaderFunction = async ({ request }) => {
    const response = await getUnidadesMedida({ request });

    const { unidadesMedidaData } = await response.json();

    const unidadesDeMedidaCodigoNombre = unidadesMedidaData.map((unidad: { codigo: string }) => {
        return unidad.codigo;
    });

    return unidadesDeMedidaCodigoNombre;
};

export const action: ActionFunction = async ({ request }) => {

    const formData = await request.formData();

    const atributo = {
        idAtributo: Number(formData.get("idAtributo")),
        nombre: String(formData.get("nombre")),
        nombreCorto: String(formData.get("nombreCorto")),
        tipoValor: String(formData.get("tipoValor")),
        valorMinimo: formData.get("valorMinimo"),
        valorMaximo: formData.get("valorMaximo"),
        valoresPosibles: [""],
        strUniMeds: [formData.get("strUniMeds")],
        comentario: String(formData.get("comentario")),
        activo: Boolean(formData.get("activo")),
    }

    await postAtributo({ request, atributo });

    return redirect(`${ROUTE_BASE_ATRIBUTOS}`);
};


export default function CMSDefinirAtributosProductosEditCreate() {

    //REMIX-HOOKS
    const unidadesDeMedidaCodigoNombre = useLoaderData();
    const { atributoSeleccionado } = useOutletContext<any>();
    const { idAtributo } = useParams();
    const submit = useSubmit();
    const navigator = useNavigate();

    //TELERIK-HOOKS
    const [atributo, setAtributo] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [tipoValor, setTipoValor] = useState("");
    const [readOnly, setReadOnly] = useState(false);

    //FUNCTIONS
    useEffect(() => {
        setAtributo(atributoSeleccionado);
        setTipoValor(atributoSeleccionado.tipoValor);
        setLoading(false);
        setReadOnly(atributoSeleccionado.id === 0 ? true : false);
    }, [atributoSeleccionado, loading]);

    const handleSubmit = (dataItem: { [name: string]: any }, event?: React.SyntheticEvent<any, Event>) => {
        event?.preventDefault();
        submit(dataItem, { method: "POST" });
    }

    const handleCloseAndCancel = () => {
        navigator(`${ROUTE_BASE_ATRIBUTOS}`);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Form
                initialValues={{
                    idAtributo: atributo.idAtributo,
                    nombre: atributo.nombre,
                    nombreCorto: atributo.nombreCorto,
                    strUniMeds: atributo.strUniMeds,
                    tipoValor: atributo.tipoValor,
                    activo: atributo.activo,
                    valorMinimo: atributo.valorMinimo,
                    valorMaximo: atributo.valorMaximo,
                    comentario: atributo.comentario,
                    idUniMed: atributo.idUniMed
                }}
                onSubmit={handleSubmit}
                render={(formRenderProps: FormRenderProps) => (
                    <Dialog
                        title={Number(idAtributo) === 0 ? "Crear Atributo" : "Editar Atributo"}
                        onClose={handleCloseAndCancel}
                        width={600}
                        height={700}
                    >
                        <FormElement>
                            <Field
                                name={"idAtributo"}
                                component={FormInput}
                                type={"number"}
                                label={"idAtributo"}
                            />
                            <Field
                                name={"nombre"}
                                component={FormInput}
                                type={"text"}
                                label={"Nombre"}
                                validator={requiredValidator}
                            />
                            <Field
                                name={"nombreCorto"}
                                component={FormInput}
                                type={"text"}
                                label={"Nombre corto"}
                                validator={requiredValidator}
                            />
                            <Field 
                                component={FormMultiSelect}
                                name="strUniMeds"
                                label="Unidades de medida"
                                data={unidadesDeMedidaCodigoNombre}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                            <Field
                                name={"activo"}
                                component={FormCheckbox}
                                label={"Activo"}
                            />
                            <Field
                                name="tipoValor"
                                component={FormDropDownList}
                                label="Tipo de valor"
                                data={tipoDeValores}
                                readOnly={Number(idAtributo) !== 0}
                                onChange={(e) => setTipoValor(e.target.value)}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                            {tipoValor === "Texto" && (
                                <Field
                                    name={"valorMinimo"}
                                    component={FormInput}
                                    type={"text"}
                                    label={"Valor Minimo (Texto)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            {tipoValor === "Numerico" && (
                                <Field
                                    name={"valorMinimo"}
                                    component={FormInput}
                                    label={"Valor Minimo (Numerico)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            {tipoValor === "Fecha" && (
                                <Field
                                    name={"valorMinimo"}
                                    component={FormInput}
                                    type={"date"}
                                    label={"Valor Minimo (Fecha)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            {tipoValor === "Entero" && (
                                <Field
                                    name={"valorMinimo"}
                                    component={FormInput}
                                    type={"number"}
                                    label={"Valor Minimo (Entero)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}

                            {tipoValor === "Texto" && (
                                <Field
                                    name={"valorMaximo"}
                                    component={FormInput}
                                    type={"text"}
                                    label={"Valor Maximo (Texto)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            {tipoValor === "Numerico" && (
                                <Field
                                    name={"valorMaximo"}
                                    component={FormInput}
                                    label={"Valor Maximo (Numerico)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            {tipoValor === "Fecha" && (
                                <Field
                                    name={"valorMaximo"}
                                    component={FormInput}
                                    type={"date"}
                                    label={"Valor Maximo (Fecha)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            {tipoValor === "Entero" && (
                                <Field
                                    name={"valorMaximo"}
                                    component={FormInput}
                                    type={"number"}
                                    label={"Valor Maximo (Entero)"}
                                    validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                                />
                            )}
                            <Field
                                component={FormTextArea}
                                name="comentario"
                                label="Comentario"
                            />
                        </FormElement>
                        <DialogActionsBar layout="end">
                            <Button
                                onClick={handleCloseAndCancel}
                                icon="cancel"
                                svgIcon={cancelIcon}
                            >
                                Cancelar
                            </Button>
                            <Button
                                themeColor={"primary"}
                                disabled={!formRenderProps.allowSubmit}
                                icon="save"
                                onClick={formRenderProps.onSubmit}
                                svgIcon={saveIcon}
                            >
                                {Number(idAtributo) === 0 ? "Guardar" : "Actualizar"}
                            </Button>
                        </DialogActionsBar>
                    </Dialog>
                )}
            />

        </>
    );
};