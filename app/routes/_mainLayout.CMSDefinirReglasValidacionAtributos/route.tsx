//REACT
import {  useRef, useState } from 'react';
//TELERIK
import { Grid, GridColumn as Column, GridToolbar, GridDataStateChangeEvent } from '@progress/kendo-react-grid';
import { DataResult, process, State } from '@progress/kendo-data-query';
import { filterIcon } from '@progress/kendo-svg-icons';
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from '@progress/kendo-react-buttons';
//REMIX
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
//SESION
import { getSession } from "~/session.server";
//COMPONENTS
import { ColumnMenu } from './columnMenu';

export const loader: LoaderFunction = async ({request}) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Atributos/GetReglaValidacionAtributos", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const reglasDeValidacionAtributosData = await response.json();
    return reglasDeValidacionAtributosData;
};

export default function CMSDefinirRelgasValidacionAtributos() {

    //REMIX-HOOOKS
    const reglaValidacionAtributosData = useLoaderData<any[]>();
    const navigate = useNavigate();

    //TELERIK-HOOKS
    const [form, setForm] = useState(false);
    const [reglaValidacionAtributosSeleccionado, setReglaValidacionAtributos] = useState<any>();

    //TELERIK - FUNCTIONS
    const openForm = () => {
        setForm(true);
    }

    const closeForm = () => {
        setForm(false);
    }

    const handleEditReglaValidacionAtributos = (item) => {
        openForm();
        setReglaValidacionAtributos(item);
        navigate(`/CMSDefinirReglasValidacionAtributos/${item.idReglaValidacion}/edit`);
    };

    const handleDeleteReglaValidacionAtributos = (item) => {
        openForm();
        setReglaValidacionAtributos(item);
        navigate(`/CMSDefinirReglasValidacionAtributos/${item.idReglaValidacion}/delete`);
    };

    const CustomCellAction = (props) => {
        return (
            <td>
                <Button onClick={() => { handleEditReglaValidacionAtributos(props.dataItem) }}>Editar</Button>
                <Button onClick={() => { handleDeleteReglaValidacionAtributos(props.dataItem) }}>Eliminar</Button>
            </td>
        )
    }

    const handleNuevaReglaDeValidacionAtributos = () => {
        openForm();
        setReglaValidacionAtributos({
            idReglaValidacion: 0,
            nombre: "",
            strTipoProducto: [],
            strGrupoProducto : "",
            strAtributo : "",
            strUniMed : "",
            comentario: ""
        });
        navigate(`/CMSDefinirReglasValidacionAtributos/0/edit`);
    }

    //TELERIK - EXPORT EXCEL
    const _export = useRef<ExcelExport | null>(null);
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    //TELERIK - FILTER
    const createDataState = (dataState: State, atributos: any[]) => {
        return {
            result: process(atributos, dataState),
            dataState: dataState
        };
    }

    const initialState = createDataState({
        take: 8,
        skip: 0
    }, reglaValidacionAtributosData);

    const [result, setResult] = useState<DataResult>(initialState.result);
    const [dataState, setDataState] = useState<State>(initialState.dataState);

    const dataStateChange = (event: GridDataStateChangeEvent) => {
        let updatedState = createDataState(event.dataState, reglaValidacionAtributosData);
        setResult(updatedState.result);
        setDataState(updatedState.dataState);
    }

    return (
        <>
            <ExcelExport data={result} ref={_export}>
                <Grid
                    style={{ height: "500px" }}
                    data={process(reglaValidacionAtributosData, dataState)}
                    {...dataState}
                    onDataStateChange={dataStateChange}
                    sortable={true}
                    columnMenuIcon={filterIcon}
                >
                    <GridToolbar>
                        <div >
                            <Button
                                title="Export Excel"
                                type="button"
                                onClick={excelExport}
                            >
                                Export to Excel
                            </Button>
                            <Button
                                title="Add new"
                                themeColor={"primary"}
                                type="button"
                                onClick={handleNuevaReglaDeValidacionAtributos}
                            >
                                Nuevo atributo
                            </Button>
                        </div>
                    </GridToolbar>
                    <Column field="idReglaValidacion" title="id" width="40px" filter={'numeric'} columnMenu={ColumnMenu} />
                    <Column field="nombre" title="Nombre" width="250px" filter={'text'} columnMenu={ColumnMenu} />
                    <Column field="strTipoProducto" title="Tipo de producto" filter={'text'} columnMenu={ColumnMenu} />
                    <Column field="strGrupoProducto" title="Grupo de producto" />
                    <Column field="strAtributo" title="Atributo" filter={'boolean'} columnMenu={ColumnMenu}/>
                    <Column field="strUniMed" title="Unidad de medida" filter={'text'} columnMenu={ColumnMenu}/>
                    <Column field="comentario" title="Comentario" />
                    <Column cell={CustomCellAction} title='Actiones' width="200px" />
                </Grid>
            </ExcelExport>
            {form && <Outlet context={{ reglaValidacionAtributosSeleccionado, closeForm }} />}
        </>
    );
};
