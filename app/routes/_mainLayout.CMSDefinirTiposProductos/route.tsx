//REMIX
import { useNavigate, useLoaderData } from "@remix-run/react";
import { LoaderFunction,  } from '@remix-run/node';

//TELERIK
import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
//COMPONENTS
import { FormComboBoxFilter } from "~/components/fm-components";
//API
import { GetTiposProductos } from "~/api/apiAtributos";


export const loader: LoaderFunction = async ({ request }) => {
    const data = await GetTiposProductos({request})
    return { data };
    
}

export default function CMSDefinirTiposProductos() {
    const { data } = useLoaderData<{ data: any }>();
    

    const navigate = useNavigate();

    const handleSubmit = (values: { [name: string]: any }, event?: React.SyntheticEvent) => {
        event?.preventDefault();
        const idTipoProducto = values.codigo.idTipoProducto
        const nombreTipoProducto = values.codigo.nombre
        navigate(`/lista/CMSDefinirTiposProductos/${idTipoProducto}/${nombreTipoProducto}`);
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
                            label={"Seleccione un Tipo de Producto:"}
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