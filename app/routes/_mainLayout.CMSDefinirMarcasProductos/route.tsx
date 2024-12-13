//REMIX
import { useNavigate, useLoaderData } from "@remix-run/react";
import { LoaderFunction,  } from '@remix-run/node';

//TELERIK
import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
//COMPONENTS
import { FormComboBoxFilter } from "~/components/fm-components";
//API
import { getAtributoMarcas } from "~/api/ApiAtributos";


export const loader: LoaderFunction = async ({ request }) => {
    const response = await getAtributoMarcas({request})
    return {data : response.data};
}

export default function CMSDefinirMarcasProductos() {
    const { data } = useLoaderData<{ data: any }>();
    const navigate = useNavigate();

    const handleSubmit = (values: { [name: string]: any }, event?: React.SyntheticEvent) => {
        event?.preventDefault();
        const idMarcaProductoSelected = values.codigo.idMarcaProducto
        const nombreMarcaProductoSelected = values.codigo.nombre
        navigate(`/lista/CMSDefinirMarcasProductos/${idMarcaProductoSelected}/${nombreMarcaProductoSelected}`);
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                    <FormElement style={{ width: "500px", margin: "auto" }}>
                        <Field
                            id={"codigo"}
                            name={"codigo"}
                            label={"Seleccione una marca:"}
                            data={data}
                            textField="codigoNombre"
                            component={FormComboBoxFilter}
                        />
                        <Button
                            disabled={!formRenderProps.allowSubmit}
                            type={"submit"}>
                            Buscar
                        </Button>
                    </FormElement>
                )}
            />
        </>
    );
}   