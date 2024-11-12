//REACT
import { useEffect, useState } from "react";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Input, NumericTextBox, Checkbox, TextArea } from "@progress/kendo-react-inputs";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
//REMIX
import { useOutletContext, useParams, useSubmit, useLoaderData } from "@remix-run/react";
import { LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
//SERVICES
import { getSession } from "~/session.server";

//CONSTANTS
const tipoDeValores = ["Texto", "Numerico", "Fecha", "Entero"];

//INTERFACES
interface OutletContext {
    atributoSeleccionado: any;
    closeForm: () => void;
}

export const action: ActionFunction = async ({ request }) => {

    const formData = await request.formData();
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

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

    const jsonAtributo = JSON.stringify(atributo);

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Atributos/ActualizarAtributo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: jsonAtributo
    });

    if (!response.ok) {
        throw new Error(`Failed to update atributo: ${response.statusText}`);
    }

    return redirect(`/CMSDefinirAtributosProductos`);
};

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/UnidadesMedida/GetUnidadesMedida", {
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const unidadesMedida = await response.json();

    const unidadesDeMedidaCodigoNombre = unidadesMedida.map((unidad: { codigo: string }) => {
        return unidad.codigo;
    });
    return unidadesDeMedidaCodigoNombre;
};

export default function CMSDefinirAtributosProductosFormEdit(){

    //REMIX-HOOKS
    const unidadesDeMedidaCodigoNombre = useLoaderData();
    const { atributoSeleccionado, closeForm } = useOutletContext<OutletContext>();
    const { id } = useParams();
    const submit = useSubmit();

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
                render={(renderProps: FormRenderProps) => (
                    <Dialog
                        title={Number(id) === 0 ? "Crear Atributo" : "Editar Atributo"}
                        onClose={closeForm}
                        width={600}
                        height={700}
                    >
                        <FormElement>
                            <FieldWrapper>
                                <Field
                                    name={"idAtributo"}
                                    component={Input}
                                    type={"number"}
                                    label={"idAtributo"}
                                    readOnly
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Field
                                    name={"nombre"}
                                    component={Input}
                                    type={"text"}
                                    label={"Nombre"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Field
                                    name={"nombreCorto"}
                                    component={Input}
                                    type={"text"}
                                    label={"Nombre corto"}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Field
                                    name={"strUniMeds"}
                                    component={MultiSelect}
                                    label={"Unidades de medida"}
                                    data={unidadesDeMedidaCodigoNombre}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Field
                                    name={"activo"}
                                    component={Checkbox}
                                    label={"Activo"}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <Field
                                    name={"tipoValor"}
                                    component={DropDownList}
                                    label={"Tipo de valor"}
                                    data={tipoDeValores}
                                    onChange={(e) => setTipoValor(e.target.value)}
                                    readOnly={readOnly}
                                    validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                {tipoValor === "Texto" && (
                                    <Field
                                        name={"valorMinimo"}
                                        component={Input}
                                        type={"text"}
                                        label={"Valor Minimo (Texto)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                                {tipoValor === "Numerico" && (
                                    <Field
                                        name={"valorMinimo"}
                                        component={Input}
                                        type={"number"}
                                        label={"Valor Minimo (Numerico)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                                {tipoValor === "Fecha" && (
                                    <Field
                                        name={"valorMinimo"}
                                        component={Input}
                                        type={"date"}
                                        label={"Valor Minimo (Fecha)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                                {tipoValor === "Entero" && (
                                    <Field
                                        name={"valorMinimo"}
                                        component={NumericTextBox}
                                        type={"number"}
                                        label={"Valor Minimo (Entero)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                            </FieldWrapper>
                            <FieldWrapper>
                                {tipoValor === "Texto" && (
                                    <Field
                                        name={"valorMaximo"}
                                        component={Input}
                                        type={"text"}
                                        label={"Valor Maximo (Texto)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                                {tipoValor === "Numerico" && (
                                    <Field
                                        name={"valorMaximo"}
                                        component={Input}
                                        type={"number"}
                                        label={"Valor Maximo (Numerico)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                                {tipoValor === "Fecha" && (
                                    <Field
                                        name={"valorMaximo"}
                                        component={Input}
                                        type={"date"}
                                        label={"Valor Maximo (Fecha)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                                {tipoValor === "Entero" && (
                                    <Field
                                        name={"valorMaximo"}
                                        component={NumericTextBox}
                                        type={"number"}
                                        label={"Valor Maximo (Entero)"}
                                        validator={(value)=>{return !value ? "El campo nombre es requerido" : ""}}
                                    />
                                )}
                            </FieldWrapper>
                            <FieldWrapper>
                                <Label>Comentarios</Label>
                                <Field
                                    name={"comentario"}
                                    component={TextArea}
                                    label={"Comentario"}
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
                                svgIcon={saveIcon}
                            >
                                {Number(id) === 0 ? "Guardar" : "Actualizar"}
                            </Button>
                        </DialogActionsBar>
                    </Dialog>
                )}
            />
            
        </>
    );
};