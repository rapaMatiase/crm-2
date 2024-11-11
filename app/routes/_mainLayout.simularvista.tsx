import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getSession } from "~/session.server";
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
    const vistas = await response.json();
    return vistas;
}

export default function SimularVista() {
    const vistas = useLoaderData<any[]>();
    const [filterData, setFilterData] = useState<any>(vistas);
    const [vista, setVista] = useState<any>();
    const handleFilter = (event: ComboBoxFilterChangeEvent) => {
        const value = event.filter.value;
        const filteredVistas = vistas.filter((vista) =>
            vista.codigoNombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilterData(filteredVistas);
    }

    const handleSelectVista = (event) => {
        const producto = event.target.value;
        setVista(producto);
    }

    const handleOpen = () => {
        console.log(vista);
        const jsonParam = new URLSearchParams({ producto: JSON.stringify([{key : `${vista.codigoNombre}`, value : ""}]) })
        window.open(`vista/${vista.codigo}/menu/1/filtros/producto?${jsonParam}`, '_blank');
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
                                data={filterData}
                                onFilterChange={handleFilter}
                                onChange={handleSelectVista}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Button
                                onClick={handleOpen}
                            >
                                simular
                            </Button>
                        </FieldWrapper>
                    </FormElement>
                )} />
        </>
    )
}