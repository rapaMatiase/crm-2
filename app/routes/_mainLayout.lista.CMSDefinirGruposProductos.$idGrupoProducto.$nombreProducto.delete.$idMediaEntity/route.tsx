//REMIX
import { ActionFunction, json } from "@remix-run/node";
import {  useActionData, useNavigate, useSubmit } from "@remix-run/react";
import {  isRouteErrorResponse, LoaderFunction, redirect, useRouteError } from "react-router";
//TELERIK 
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { FormCheckbox } from "~/components/fm-components";
//API
import { deleteImagenes, getMimeType, getTipoContenido } from "~/api/apiContentSettings";
import { Loader, LoaderType } from "@progress/kendo-react-indicators";
import { useState } from "react";



export const loader: LoaderFunction = async ({ request }) => {
  const dataMimeType = await getMimeType({ request })
  const dataTipoContenido = await getTipoContenido({ request });
  return { dataMimeType, dataTipoContenido };
}


export const action: ActionFunction = async ({ request, params }) => {
    const { idMediaEntity, idGrupoProducto, nombreProducto } = params;
    const response = await deleteImagenes({ request ,idMediaEntity });
    if (!response.ok) {
      return json({ statusText: response.statusText, status: response.status });

  }
    return redirect(`/lista/CMSDefinirGruposProductos/${idGrupoProducto}/${nombreProducto}`);
}

export default function CMSDefinirGruposProductosDelete() {

  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();


  const handleCloseAndCancel = () => {
    navigate(-1);
  }

  const handleSubmit = async () => {
    submit({}, { method: "POST" });
  }

  return (
    <>
      <Form
        
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
                id={"mimeType"}
                name={"mimeType"}
                label={"¿Esta seguro que desea eliminar la imagen?"}
                component={FormCheckbox}
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
                {"Eliminar"}
              </Button>
            </DialogActionsBar>
          </Dialog>
        )}
      />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const [type, setType] = useState<LoaderType>('infinite-spinner');
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }
  return (
      <div style={{ padding: "100px", color: "blue" , display: "flex", justifyContent: "center"}}>
        <Loader type={type} />
      </div>
  );
}