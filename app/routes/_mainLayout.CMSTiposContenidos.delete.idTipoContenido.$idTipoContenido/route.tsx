//REMIX
import { ActionFunction, json } from "@remix-run/node";
import {  useActionData, useNavigate, useSubmit } from "@remix-run/react";
import {  isRouteErrorResponse, LoaderFunction, redirect, useOutletContext, useRouteError } from "react-router";
//TELERIK 
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { cancelIcon, saveIcon, trashIcon } from "@progress/kendo-svg-icons";
//API
import { deleteImagenes, deleteTipoContenido, getMimeType, getTipoContenido } from "~/api/apiContentSettings";
import { Loader, LoaderType } from "@progress/kendo-react-indicators";
import { useEffect, useState } from "react";
import { ROUTE_BASE_TIPOS_CONTENIDO } from "~/config/routesConfig";


export const action: ActionFunction = async ({ request, params }) => {
    const { idTipoContenido } = params;
    if (!idTipoContenido) {
        return json({ statusText: "idTipoContenido is required", status: 400 });
    }
    const response = await deleteTipoContenido({ request, idTipoContenido });
    if (!response.ok) {
      return json({ statusText: response.statusText, status: response.status });

  }
    return redirect(`${ROUTE_BASE_TIPOS_CONTENIDO}`);
}

interface ActionData {
  statusText?: string;
  status?: number;
}
export default function CMSOtrosContenidosDelete() {
  const { tipoContenidoSeleccionado } = useOutletContext<any>();

  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData<ActionData | null>();

  const [atributo, setAtributo] = useState<any>();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
        setAtributo(tipoContenidoSeleccionado);
        setLoading(false);
    }, [tipoContenidoSeleccionado, loading]);

  const handleCloseAndCancel = () => {
    navigate(-1);
  }

  const handleSubmit = async () => {
    event?.preventDefault();
    submit({}, { method: "POST" });
  }

  if(loading){
    return <div>Loading...</div>   
}

  return (
    <>
      <Form
        initialValues={{
          idTipoContenido: atributo.idTipoContenido,
          nombre: atributo.nombre,
          comentario: atributo.comentario,
          activo: atributo.activo,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <Dialog
           
            width={500}
            onClose={handleCloseAndCancel}
          >
          {actionData?.status && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
            {actionData.statusText}
            </div>
          )}
          {"¿Esta seguro que desea eliminar la imagen?"}
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

                icon="trash"
                onClick={handleSubmit}
                svgIcon={trashIcon}
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