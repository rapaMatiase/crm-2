// TELERIK 
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormCheckbox, FormDropDownList, FormInput, FormUpload } from "~/components/fm-components";

// COMPONENTS
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";

// API
import { ActionFunction } from "@remix-run/node";
import {  getTiposContenido1, postSetTipoContenido } from "~/api/apiContentSettings";
// UTILS
import {  useNavigate, useSubmit } from "@remix-run/react";
import { json, LoaderFunction, redirect, useActionData, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import { ROUTE_BASE_TIPOS_CONTENIDO } from "~/config/routesConfig";




//ACTION FUNCTION
export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  const idTipoContenido = Number(formData.get("idTipoContenido"));
  const nombre = String(formData.get("nombre"));
  const comentario = String(formData.get("comentario"));
  const activo = formData.get("activo") === "true";
 
  const data = {
    idTipoContenido,
    nombre,
    comentario,
    activo,
  }

  const response = await postSetTipoContenido({ request, data });

  return redirect(`${ROUTE_BASE_TIPOS_CONTENIDO}`); 
}

export default function CMSDefinirMarcasProductosEdit() {
  const { tipoContenidoSeleccionado } = useOutletContext<any>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();

  const [atributo, setAtributo] = useState<any>();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
        setAtributo(tipoContenidoSeleccionado);
        setLoading(false);
    }, [tipoContenidoSeleccionado, loading]);

  const handleCloseAndCancel = () => {
    navigate(`${ROUTE_BASE_TIPOS_CONTENIDO}`);
  }

  //REMIX
  const handleSubmit = async (dataItem: any) => {
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
        idTipoContenido: atributo.idTipoContenido,
        nombre: atributo.nombre,
        comentario: atributo.comentario,
        activo: atributo.activo,
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
          id={"idTipoContenido"}
          name={"idTipoContenido"}
          label={"idTipoContenido"}
          component={FormInput}
          type="number"
          readOnly
          />
          <Field
          id={"nombre"}
          name={"nombre"}
          label={"Nombre"}
          component={FormInput}
          type="text"
          />
          <Field
          id={"comentario"}
          name={"comentario"}
          label={"comentario"}
          component={FormInput}
          type="text"
          />
          <Field

          name={"activo"}
          component={FormCheckbox}
          label={"Activo"}
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

