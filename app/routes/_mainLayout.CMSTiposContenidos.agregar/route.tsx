
// TELERIK
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormCheckbox, FormInput } from "~/components/fm-components";

// COMPONENTS
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";

// API
import { ActionFunction } from "@remix-run/node";
import { postSetTipoContenido } from "~/api/apiContentSettings";

// UTILS
import { useNavigate, useSubmit } from "@remix-run/react";
import { json, redirect, useActionData } from "@remix-run/react";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const idTipoContenido = Number(formData.get("idTipoContenido"));
  const nombre = String(formData.get("nombre"));
  const comentario = String(formData.get("comentario"));
  const activo = Boolean(formData.get("activo"));
  const data = {
    idTipoContenido,
    nombre,
    comentario,
    activo,
  };
  const response = await postSetTipoContenido({ request, data });

  if (!response.ok) {
    return json({ statusText: response.statusText, status: response.status, data });
  }

  return redirect(`/CMSTiposContenidos`); 
};

export default function CMSAgregarImagen() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();

  const handleCloseAndCancel = () => {
    navigate(-1);
  };


  const handleSubmit = async (dataItem: any) => {
    
      submit(dataItem, { method: "post" });
  };

  return (
    <Dialog title={" Agregar Tipo Contenido"} width={600} onClose={handleCloseAndCancel}>
      {actionData?.status && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{actionData.statusText}</div>
      )}

      <Form
        initialValues={{idTipoContenido: 0}}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
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
                Guardar
              </Button>
            </DialogActionsBar>
          </FormElement>
        )}
      />
    </Dialog>
  );
}
