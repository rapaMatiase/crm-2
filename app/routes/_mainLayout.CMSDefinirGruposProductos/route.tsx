//REMIX
import { useNavigate, useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { LoaderFunction,  } from '@remix-run/node';

//TELERIK
import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
//COMPONENTS
import { FormComboBoxFilter } from "~/components/fm-components";
//API
import { getGruposProductos } from "~/api/apiGruposProductos";
import { BackOfficeError } from "~/type/cmsBackOffice";
import { createInternalError } from "~/utils/errorUtils";
import { BackOfficeErrorAlert, BackOfficeUnExpectErrorAlert } from "~/components/alertError";

const PROCESS_NAME = "Definir grupos de productos";
const ROUTE_NAME = "CMSDefinirGruposProductos";

export const loader: LoaderFunction = async ({ request }) => {
    const response = await getGruposProductos({request})
    if (!response.ok) {
            const error: BackOfficeError = createInternalError(
                PROCESS_NAME,
                ROUTE_NAME,
                response
            );
            throw new Response(JSON.stringify(error), { status: response.status });
        }
    
        const data = await response.json();
        return { data };
    
}

export default function CMSDefinirGruposProductos() {
    const { data } = useLoaderData<{ data: any }>();
    

    const navigate = useNavigate();

    const handleSubmit = (values: { [name: string]: any }, event?: React.SyntheticEvent) => {
        event?.preventDefault();
        const idGrupoProductoSelected = values.codigo.idGrupoProducto
        const nombreGrupoProductoSelected = values.codigo.nombre
        navigate(`/lista/CMSDefinirGruposProductos/${idGrupoProductoSelected}/${nombreGrupoProductoSelected}`);
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
                            label={"Seleccione un Grupo Producto:"}
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

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        const errorData = JSON.parse(error.data);
        return <BackOfficeErrorAlert error={errorData} />
    }

    return <BackOfficeUnExpectErrorAlert error={{
        PROCESS_NAME,
        ROUTE_NAME,
    }} />

}