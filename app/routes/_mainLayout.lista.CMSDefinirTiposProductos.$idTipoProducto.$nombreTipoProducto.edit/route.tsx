// TELERIK 
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormDropDownList, FormInput, FormUpload } from "~/components/fm-components";

// COMPONENTS
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";

// API
import { ActionFunction } from "@remix-run/node";
import { getMimeType, getTipoContenido, postSetImagen } from "~/api/apiContentSettings";
import { convertToBase64 } from "~/utils/convertToBase64";

// UTILS
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import {  json, LoaderFunction, redirect, useActionData } from "react-router";


export const loader: LoaderFunction = async ({ request }) => {
  const dataMimeType = await getMimeType({ request })
  const dataTipoContenido = await getTipoContenido({ request });
   return { dataMimeType , dataTipoContenido  };
} 

//ACTION FUNCTION
 export const action: ActionFunction = async ({ request, params }) => {
  const {  idTipoProducto,  nombreTipoProducto } = params as { idTipoProducto: string, nombreTipoProducto: string };

  const formData = await request.formData();
  const nombre = formData.get("nombre");
  const tipoContenido = formData.get("tipoContenido");
  const mimeType = formData.get("mimeType");
  const rawMedia = formData.get("rawMedia");

  const data = {
    nombre,
    tipoContenido,
    mimeType,
    rawMedia
  }

  const tipoEntidad = "TIPPRO";

  const response = await postSetImagen({ request, tipoEntidad, idEntidad: idTipoProducto, data });

  if (!response.ok) {
    return json({ statusText: response.statusText, status: response.status, data });
  }

  return redirect(`/lista/CMSDefinirTiposProductos/${idTipoProducto}/${nombreTipoProducto}`);
} 

export default function CMSDefinirTiposProductosEdit() {

  const { dataMimeType, dataTipoContenido } = useLoaderData<{ dataMimeType: any, dataTipoContenido: any }>();
  const navigate = useNavigate();
  const submit = useSubmit(); 
 const actionData = useActionData();

  
  const handleCloseAndCancel = () => {
    navigate(-1);
  }

  //REMIX
   const handleSubmit = async (dataItem) => {
    const file = dataItem.rawMedia[0].getRawFile();
    const base64 = await convertToBase64(file);
    dataItem.rawMedia = base64;
    submit(dataItem, { method: "POST" });
  } 

  const selectMessage = function () {
    return <span>Seleccionar archivo</span>;
};

  return (
    <>
      <Form
        initialValues={{ 
          nombre: actionData?.status ? actionData.data.nombre : "",
          tipoContenido: actionData?.status ? actionData.data.tipoContenido : "",
          mimeType: actionData?.status ? actionData.data.mimeType : "",
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <Dialog
            title={"Editar"}
            width={600}
            onClose={handleCloseAndCancel}
          >
            {actionData?.status && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {actionData.statusText}
                </div>
            )}

            <FormElement>
              <Field
                id={"nombre"}
                name={"nombre"}
                label={"Nombre"}
                component={FormInput}
                type="text"
              />
              <Field
                id={"tipoContenido"}
                name={"tipoContenido"}
                label={"Tipo de contenido"}
                component={FormDropDownList}
                data={dataTipoContenido}
              />
              <Field
                id={"mimeType"}
                name={"mimeType"}
                label={"Tipo de archivo"}
                component={FormDropDownList}
                data={dataMimeType}
              />
              <Field
                id={"rawMedia"}
                name={"rawMedia"}
                label={"Archivo"}
                component={FormUpload}
                selectMessageUI={selectMessage}
                mass
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
                {"Guardar"}
              </Button>
            </DialogActionsBar>
          </Dialog>
        )}
      />
     
    </>
  );
}

