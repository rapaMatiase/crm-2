import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getSession } from "~/servicies/session.server";
import { ComboBoxFilterChangeEvent, ComboBox } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";


export const loader: LoaderFunction = async ({ request }) => {

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/ContentSettings/GetVistas`,
        {
            method: "GET",
            headers: {
                Authorization: token
            }
        }
    );
    const vistasData = await response.json();
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
        const urlParam = new URLSearchParams({
            menu : JSON.stringify([{key : "string", value : ""}]),
            filtro : JSON.stringify([{key : "string", value : ""}])
        });
        
        
        window.open(`vista/${vistaSelected.codigo}/menu/1/filtros/producto?${urlParam.toString()}`, '_blank');
       
        // window.open(`vista/${vista.codigo}/menu/1/filtros/producto?${jsonParam}`, '_blank');
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