// TELERIK 
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormDropDownList, FormInput, FormTextArea, FormUpload } from "~/components/fm-components";

// COMPONENTS
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";

// API
import { ActionFunction } from "@remix-run/node";
import { getTipoTexto, postSetTexto } from "~/api/apiContentSettings";

// UTILS
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { json, LoaderFunction, redirect, useActionData, useOutletContext, useParams } from "react-router";
import { useState, useContext, useEffect } from "react";


export const loader: LoaderFunction = async ({ request }) => {

  const dataTipoTexto = await getTipoTexto({ request });
  return { dataTipoTexto };
}


//ACTION FUNCTION
export const action: ActionFunction = async ({ request, params }) => {
  const { idProducto, nombreProducto } = params as { idProducto: string, nombreProducto: string };

  const formData = await request.formData();
  const idProductoTexto = formData.get("idProductoTexto");
  const tipoTexto = formData.get("tipoTexto");
  const texto = formData.get("texto");

  const data = {
    idProductoTexto,
    tipoTexto,
    texto
  }

  const response = await postSetTexto({ request, idProducto, data });

  if (!response.ok) {
    return json({ statusText: response.statusText, status: response.status, data });
  }

  return redirect(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/detalles`);
}

export default function CMSDefinirProductosTextoEdit() {

  const { dataTexto, dataTipoTexto } = useLoaderData<{ dataTexto: any, dataTipoTexto: any }>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();
  const [loading, setLoading] = useState(true);
  const { textoSeleccionado } = useOutletContext<any>();
  const [texto, setTexto] = useState<{ idProductoTexto: string, tipoTexto: string, texto: string } | null>(null)


  const handleCloseAndCancel = () => {
    navigate(-1);
  }

  useEffect(() => {
    setTexto(textoSeleccionado);
    setLoading(false);
  }, [textoSeleccionado, loading]);

  //REMIX
  const handleSubmit = (dataItem) => {
    const { idProductoTexto, tipoTexto, texto } = dataItem;
    const formData = new FormData();
    formData.append("idProductoTexto", idProductoTexto);
    formData.append("tipoTexto", tipoTexto);
    formData.append("texto", texto);
    submit(formData, { method: "POST" });
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Form
        initialValues={{
          idProductoTexto: texto?.idProductoTexto,
          tipoTexto: texto?.tipoTexto,
          texto: texto?.texto
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
                id={"idProductoTexto"}
                name={"idProductoTexto"}
                label={"idProductoTexto"}
                component={FormInput}
                type="text"
              />
              <Field
                id={"tipoTexto"}
                name={"tipoTexto"}
                label={"tipoTexto"}

                component={FormDropDownList}
                data={dataTipoTexto}
              />
              <Field
                id={"texto"}
                name={"texto"}
                label={"texto"}
                component={FormTextArea}
                data={dataTexto}
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

