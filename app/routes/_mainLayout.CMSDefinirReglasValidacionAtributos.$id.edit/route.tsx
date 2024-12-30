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
import { useOutletContext, useParams, useSubmit, useLoaderData, useNavigate, useActionData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
//CONFIG
import { ROUTE_BASE_REGLAS_VALIDACION_ATRIBUTOS } from '~/config/routesConfig';
//API
import { postReglaDeValidacionAtributos } from "~/api/apiReglaDeValidacion";
import { getUnidadesMedida } from "~/api/apiUnidadesMedida";
import { getAtributos } from "~/api/apiAtributos";
import { getGruposProducto } from "~/api/apiGruposProductos";

import { getTiposProductos } from "~/api/apiTiposProductos";


export const loader: LoaderFunction = async ({ request }) => {
    
    //TIPOS DE PRODUCTO
    const responseTiposProducto = await getTiposProductos({ request });
    const tiposProductoData = await responseTiposProducto
    const tiposProductoCodigoNombreData = tiposProductoData.map((producto: { codigoNombre: any; }) => {
        return producto.codigoNombre;
    });
    
    
    //PRODUCTOS
    const responseGruposProducto = await getGruposProducto({request});
    const {gruposProductosData} = await responseGruposProducto.json();
    const gruposProductoNombreData = gruposProductosData.map((producto: { codigoNombre: any; }) => {
        return producto.codigoNombre;
    });

    //ATRIBUTOS
    const responseAtributos = await getAtributos({request});
    const {atributosData} = responseAtributos;
    const atributosNombresData = atributosData.map((atributo: { nombre: any; }) => {
        return atributo.nombre;
    });

    
    
    //UNIDADES DE MEDIDA
    const responseUnidadesMedida = await getUnidadesMedida({request});
    const {unidadesMedidaData} = await responseUnidadesMedida.json();
    const unidadesDeMedidaCodigoNombreData = unidadesMedidaData.map((unidad: {
        codigoNombre: any; codigo: string 
}) => {
        return unidad.codigoNombre;
    });
    
    return { tiposProductoCodigoNombreData, gruposProductoNombreData, atributosNombresData, unidadesDeMedidaCodigoNombreData };
    
};

export const action: ActionFunction = async ({ request }) => {

    const formData = await request.formData();
    
    const reglaValidacionAtributo = {
        idReglaValidacion: Number(formData.get("idReglaValidacion")),
        nombre: String(formData.get("nombre")),
        strTipoProducto: String(formData.get("strTipoProducto")),
        strGrupoProducto: String(formData.get("strGrupoProducto")),
        strAtributo: String(formData.get("strAtributo")),
        strUniMed: String(formData.get("strUniMed")),
        comentario: String(formData.get("comentario"))
    }

    const response = await postReglaDeValidacionAtributos({ request, reglaValidacionAtributo });
    if(!response.ok){
        return json({ statusText: response.statusText, status: response.status });
    }

    return redirect(`${ROUTE_BASE_REGLAS_VALIDACION_ATRIBUTOS}`);
};

export default function EditFormReglaValidacionAtributosSeleccionado() {
    
    //REMIX-HOOKS
    const {  tiposProductoCodigoNombreData, gruposProductoNombreData,  atributosNombresData, unidadesDeMedidaCodigoNombreData } = useLoaderData<{ tiposProductoCodigoNombreData: string[], gruposProductoNombreData: string[], atributosNombresData: string[], unidadesDeMedidaCodigoNombreData: string[] }>();
    const { reglaValidacionAtributosSeleccionado } = useOutletContext<any>();
    const { id } = useParams();
    const submit = useSubmit();
    const [reglaValidacionAtributos, setReglaValidacionAtributos] = useState<any>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const actionData = useActionData();

    //TELERIK-FILTERS
    const [dataUnidadMedida, setDataUnidadMedida] = useState(unidadesDeMedidaCodigoNombreData);
    const [dataAtributos, setDataAtributos] = useState(atributosNombresData);
    const [dataGruposProducto, setDataGruposProducto] = useState(gruposProductoNombreData);
    const [dataTiposProducto, setDataTiposProducto] = useState(tiposProductoCodigoNombreData);

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
                    onClose={()=>navigate(-1)}
                    width={500}
                >
                    {actionData?.status && (
                        <div style={{ color: 'red', marginBottom: '1rem' }}>
                            {actionData.statusText}
                        </div>
                    )}
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
                                    setDataTiposProducto(filterBy(tiposProductoCodigoNombreData, event.filter));
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
                                    setDataGruposProducto(filterBy(gruposProductoNombreData, event.filter));
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
                                    setDataAtributos(filterBy(atributosNombresData, event.filter));
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
                                    setDataUnidadMedida(filterBy(unidadesDeMedidaCodigoNombreData, event.filter));
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
                            onClick={()=>navigate(-1)}
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