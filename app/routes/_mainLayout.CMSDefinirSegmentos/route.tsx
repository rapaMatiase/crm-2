//REMIX
import { useNavigate, useLoaderData } from "@remix-run/react";
import { LoaderFunction,  } from '@remix-run/node';

//TELERIK
import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
//COMPONENTS
import { FormComboBoxFilter } from "~/components/fm-components";
//API
import { GetSegmentos} from "~/api/apiAtributos";


export const loader: LoaderFunction = async ({ request }) => {
    const data = await GetSegmentos({request})
    return { data };
    
}

export default function CMSDefinirSegmentos() {
    const { data } = useLoaderData<{ data: any }>();
    

    const navigate = useNavigate();

    const handleSubmit = (values: { [name: string]: any }, event?: React.SyntheticEvent) => {
        event?.preventDefault();
        const idSegmentos = values.codigo.idSegmento
        const nombreSegmentos = values.codigo.nombre
     
        navigate(`/lista/CMSDefinirSegmentos/${idSegmentos}/${nombreSegmentos}`);
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
                            label={"Seleccione un Segmento:"}
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