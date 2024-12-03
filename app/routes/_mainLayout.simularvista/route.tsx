//REACT
import { useState } from "react";
//REMIX
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
//TELERIK
import { ComboBoxFilterChangeEvent, ComboBox } from "@progress/kendo-react-dropdowns";
import { FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
//API
import { getVistas } from "~/api/ApiContentSettings";


export const loader: LoaderFunction = async ({ request }) => {
    const response = await getVistas({ request });
    const vistasData = response;
    return {vistasData};
}

export default function SimularVista() {
    //REMIX-HOOKS
    const {vistasData} = useLoaderData<{ vistasData: any[] }>();
   
    //REACT-HOOKS
    const [vistasFilter, setVistaFilter] = useState<any>(vistasData); 
    const [vistaSelected, setVistaSelected] = useState<any>();
    
    //FUNCTIONS
    const handleVistaFilter = (event: ComboBoxFilterChangeEvent) => {
        const value = event.filter.value;
        const filteredVistas = vistasData.filter((vista) =>
            vista.codigoNombre.toLowerCase().includes(value.toLowerCase())
        );
        setVistaFilter(filteredVistas);
    }

    const handleVistaSelected = (event) => {
        const itemMenu = event.target.value;
        setVistaSelected(itemMenu);
    }

    const handleOpenVistaNewTab = () => {
        window.open(`view/${vistaSelected.codigo}/menu/1/template/listProduct/filters/products`, '_blank');
    }

    return (
        <>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                render={(formRenderProps) => (
                    <FormElement style={{width : "500px", margin : "auto"}}>
                        <FieldWrapper>
                            <ComboBox
                                name={"vista"}
                                textField="codigoNombre"
                                filterable={true}
                                label={"Vistas"}
                                data={vistasFilter}
                                onFilterChange={handleVistaFilter}
                                onChange={handleVistaSelected}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Button onClick={handleOpenVistaNewTab}>
                                Simular
                            </Button>
                        </FieldWrapper>
                    </FormElement>
                )} />
        </>
    )
}