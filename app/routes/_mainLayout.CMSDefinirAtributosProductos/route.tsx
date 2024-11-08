import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { LoaderFunction } from '@remix-run/node';
import { process } from '@progress/kendo-data-query';
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { Button } from '@progress/kendo-react-buttons';
import {  useRef, useState } from 'react';
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { ColumnMenu } from './columnMenu';
import { filterIcon } from '@progress/kendo-svg-icons';
import { getSession } from "~/session.server";

export const loader: LoaderFunction = async ({request}) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Atributos/GetAtributos", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const atributosData = await response.json();
    return atributosData;
};


const App = () => {

    //REMIX-HOOOKS
    const atributosData = useLoaderData<any[]>();
    const navigate = useNavigate();

    //TELERIK-HOOKS
    const [form, setForm] = useState(false);
    const [atributoSeleccionado, setAtributoSeleccionado] = useState<any>();

    //TELERIK - FUNCTIONS
    const openForm = () => {
        setForm(true);
    }

    const closeForm = () => {
        setForm(false);
    }

    const handleEditAtributo = (item) => {
        openForm();
        setAtributoSeleccionado(item);
        navigate(`/CMSDefinirAtributosProductos/${item.idAtributo}/edit`);
    };

    const handleDeleteAtributo = (item) => {
        openForm();
        setAtributoSeleccionado(item);
        navigate(`/CMSDefinirAtributosProductos/${item.idAtributo}/delete`);
    };

    const CustomCellAction = (props) => {
        return (
            <td>
                <Button onClick={() => { handleEditAtributo(props.dataItem) }}>Editar</Button>
                <Button onClick={() => { handleDeleteAtributo(props.dataItem) }}>Eliminar</Button>
            </td>
        )
    }

    const handleNuevoAtributo = () => {
        openForm();
        setAtributoSeleccionado({
            idAtributo: 0,
            nombre: "",
            nombreCorto: "",
            jsonUniMed: [],
            activo: false,
            tipoValor: "",
            ValorMinimo: "",
            ValorMaximo: "",
            ValoresPosibles: [],
            comentario: ""
        });
        navigate(`/CMSDefinirAtributosProductos/0/edit`);
    }

    //TELERIK - EXPORT EXCEL
    const _export = useRef<ExcelExport | null>(null);
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    //TELERIK - FILTER
    const createDataState = (dataState, atributos) => {
        return {
            result: process(atributos, dataState),
            dataState: dataState
        };
    }

    const initialState = createDataState({}, atributosData);

    const [result, setResult] = useState<DataResult>(initialState.result);
    const [dataState, setDataState] = useState<State>(initialState.dataState);

    const dataStateChange = (event: GridDataStateChangeEvent) => {
        let updatedState = createDataState(event.dataState, atributosData);
        setResult(updatedState.result);
        setDataState(updatedState.dataState);
    }

    return (
        <>
            <ExcelExport data={result} ref={_export}>
                <Grid
                    style={{ height: "500px" }}
                    data={process(atributosData, dataState)}
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
                                onClick={handleNuevoAtributo}
                            >
                                Nuevo atributo
                            </Button>
                        </div>
                    </GridToolbar>
                    <Column field="idAtributo" title="id" width="40px" filter={'numeric'} columnMenu={ColumnMenu} />
                    <Column field="nombre" title="Nombre" width="250px" filter={'text'} columnMenu={ColumnMenu} />
                    <Column field="nombreCorto" title="Nombre corto" filter={'text'} columnMenu={ColumnMenu} />
                    <Column field="strUniMeds" title="Unidadades de medida" />
                    <Column field="activo" title="Activo" filter={'boolean'} columnMenu={ColumnMenu}/>
                    <Column field="tipoValor" title="Tipo de valor" filter={'text'} columnMenu={ColumnMenu}/>
                    <Column field="valorMinimo" title="Valor minimo" />
                    <Column field="valorMaximo" title="Valor maximo" />
                    {/* <Column field="valoresPosibles" title="Valores posibles" /> */}
                    <Column field="comentario" title="Comentario" />
                    <Column cell={CustomCellAction} title='Actiones' width="200px" />
                </Grid>
            </ExcelExport>
            {form && <Outlet context={{ atributoSeleccionado, closeForm }} />}
        </>
    );
};

export default App;