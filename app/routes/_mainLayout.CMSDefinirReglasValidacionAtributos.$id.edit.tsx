//REACT
import { useEffect, useState } from "react";
//TELERIK
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { ComboBox, ComboBoxFilterChangeEvent } from "@progress/kendo-react-dropdowns";
import { Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { filterBy } from "@progress/kendo-data-query";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
//REMIX
import { useOutletContext, useParams, useSubmit, useLoaderData } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
//SERVICES
import { getSession } from "~/session.server";

//INTERFACE
type OutletContextType = {
    reglaValidacionAtributosSeleccionado: any;
    closeForm: () => void;
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const relgaValidacionAtributos = {
        idReglaValidacion: Number(formData.get("idReglaValidacion")),
        nombre: String(formData.get("nombre")),
        strTipoProducto: String(formData.get("strTipoProducto")),
        strGrupoProducto: String(formData.get("strGrupoProducto")),
        strAtributo: String(formData.get("strAtributo")),
        strUniMed: String(formData.get("strUniMed")),
        comentario: String(formData.get("comentario"))
    }

    const jsonReglaValidacionAtributos = JSON.stringify(relgaValidacionAtributos);

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Atributos/ActualizarReglaValidacionAtributo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: jsonReglaValidacionAtributos
    });
    console.log(response);
    if (!response.ok) {
        throw new Response("Failed to update regla de validacion", { statusText: response.statusText });
    }

    return redirect(`/CMSDefinirReglasValidacionAtributos`);
};

export const ErrorBoundary = (error) => {
    console.error(error);
    return (
        <div>
            <h1>Something went wrong</h1>
            <pre>{error.message}</pre>
        </div>
    );
};

export const loader = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const responseTiposProducto = await fetch("https://apptesting.leiten.dnscheck.com.ar/TiposProducto/GetTiposProducto", {
        headers: {
            "Authorization": token
        }
    });

    if (!responseTiposProducto.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const tiposProducto = await responseTiposProducto.json();

    const tiposProductoCodigoNombre = tiposProducto.map((producto) => {
        return producto.codigoNombre;
    });


    const responseGruposProducto = await fetch("https://apptesting.leiten.dnscheck.com.ar/GruposProductos/GetGruposProducto", {
        headers: {
            "Authorization": token
        }
    });

    if (!responseTiposProducto.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const gruposProducto = await responseGruposProducto.json();

    const gruposProductoNombre = gruposProducto.map((producto) => {
        return producto.codigoNombre;
    });

    const responseAtributos = await fetch("https://apptesting.leiten.dnscheck.com.ar/Atributos/GetAtributos", {
        headers: {
            "Authorization": token
        }
    });

    if (!responseTiposProducto.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const atributos = await responseAtributos.json();

    const atributosNombres = atributos.map((atributo) => {
        return atributo.nombre;
    });

    const responseUnidadesMedida = await fetch("https://apptesting.leiten.dnscheck.com.ar/UnidadesMedida/GetUnidadesMedida", {
        headers: {
            "Authorization": token
        }
    });

    if (!responseUnidadesMedida.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const unidadesMedida = await responseUnidadesMedida.json();

    const unidadesDeMedidaCodigoNombre = unidadesMedida.map((unidad: { codigo: string }) => {
        return unidad.codigoNombre;
    });
    return { tiposProductoCodigoNombre, gruposProductoNombre, atributosNombres, unidadesDeMedidaCodigoNombre };

};


export default function EditFormReglaValidacionAtributosSeleccionado() {
    
    //REMIX-HOOKS
    const { tiposProductoCodigoNombre, gruposProductoNombre, atributosNombres, unidadesDeMedidaCodigoNombre } = useLoaderData<{ tiposProductoCodigoNombre: string[], gruposProductoNombre: string[], atributosNombres: string[], unidadesDeMedidaCodigoNombre: string[] }>();
    const { reglaValidacionAtributosSeleccionado, closeForm } = useOutletContext<OutletContextType>();
    const { id } = useParams();
    const submit = useSubmit();
    const [reglaValidacionAtributos, setReglaValidacionAtributos] = useState<any>();
    const [loading, setLoading] = useState(true);

    //TELERIK-FILTERS
    const [dataUnidadMedida, setDataUnidadMedida] = useState(unidadesDeMedidaCodigoNombre);
    const [dataAtributos, setDataAtributos] = useState(atributosNombres);
    const [dataGruposProducto, setDataGruposProducto] = useState(gruposProductoNombre);
    const [dataTiposProducto, setDataTiposProducto] = useState(tiposProductoCodigoNombre);

    useEffect(() => {
        setReglaValidacionAtributos(reglaValidacionAtributosSeleccionado);
        setLoading(false);
    }, [reglaValidacionAtributosSeleccionado, loading]);

    //TELERIK-FUNCTIONS
    const handleSubmit = (dataItem, event) => {
        event.preventDefault();
        submit(dataItem, { method: "POST" });
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Form
            initialValues={{
                idReglaValidacion: reglaValidacionAtributos.idReglaValidacion,
                nombre: reglaValidacionAtributos.nombre,
                strTipoProducto: Number(id) === 0 ? [] : [reglaValidacionAtributos.strTipoProducto],
                strGrupoProducto: reglaValidacionAtributos.strGrupoProducto,
                strAtributo: reglaValidacionAtributos.strAtributo,
                strUniMed: reglaValidacionAtributos.strUniMed,
                comentario: reglaValidacionAtributos.comentario,
            }}
            onSubmit={handleSubmit}
            render={(renderProps: FormRenderProps) => (
                <Dialog
                    title={`${Number(id) === 0 ? "Nueva Regla de validacion" : "Editar Regla de validacion"}`}
                    onClose={closeForm}
                    width={500}
                >
                    <FormElement>
                        <FieldWrapper>
                            <Field
                                name={"idReglaValidacion"}
                                component={Input}
                                type={"number"}
                                label={"id"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"nombre"}
                                component={Input}
                                type={"text"}
                                label={"Nombre"}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                data={dataTiposProducto}
                                name={"strTipoProducto"}
                                component={ComboBox}
                                filterable={true}
                                label={"Tipo de producto"}
                                onFilterChange={(event: ComboBoxFilterChangeEvent) => {
                                    setDataTiposProducto(filterBy(tiposProductoCodigoNombre, event.filter));
                                }}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                data={dataGruposProducto}
                                name={"strGrupoProducto"}
                                component={ComboBox}
                                filterable={true}
                                label={"Grupo de producto"}
                                onFilterChange={(event: ComboBoxFilterChangeEvent) => {
                                    setDataGruposProducto(filterBy(gruposProductoNombre, event.filter));
                                }}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                data={dataAtributos}
                                name={"strAtributo"}
                                component={ComboBox}
                                filterable={true}
                                label={"Atributos"}
                                onFilterChange={(event: ComboBoxFilterChangeEvent) => {
                                    setDataAtributos(filterBy(atributosNombres, event.filter));
                                }}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                data={dataUnidadMedida}
                                name={"strUniMed"}
                                component={ComboBox}
                                filterable={true}
                                label={"Unidades de medida"}
                                onFilterChange={(event: ComboBoxFilterChangeEvent) => {
                                    setDataUnidadMedida(filterBy(unidadesDeMedidaCodigoNombre, event.filter));
                                }}
                                validator={(value) => { return !value ? "El campo nombre es requerido" : "" }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label>Comentario</Label>
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
    );
};