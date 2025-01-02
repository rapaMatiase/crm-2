

//REACT
import {  useRef, useState } from 'react';
//TELERIK
import { Grid, GridColumn as Column, GridToolbar, GridDataStateChangeEvent } from '@progress/kendo-react-grid';
import { DataResult, process, State } from '@progress/kendo-data-query';
import { filterIcon } from '@progress/kendo-svg-icons';
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from '@progress/kendo-react-buttons';
//REMIX
import { isRouteErrorResponse, Outlet, useActionData, useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
//COMPONENTS
import { ColumnMenu } from './columnMenu';
//CONFIG
import { ROUTE_BASE_REGLAS_VALIDACION_ATRIBUTOS } from '~/config/routesConfig';
//API
import { getReglasDeValidacionAtributos } from '~/api/apiReglaDeValidacion';
import { BackOfficeError } from '~/type/cmsBackOffice';
import { createInternalError } from '~/utils/errorUtils';
import { BackOfficeErrorAlert, BackOfficeUnExpectErrorAlert } from '~/components/alertError';

const PROCESS_NAME = "Definir reglas de validacion de atributos";
const ROUTE_NAME = "CMSDefinirReglasValidacionAtributos";

export const loader: LoaderFunction = async ({request}) => {
    const response = await getReglasDeValidacionAtributos({request});

if (!response.ok) {
        const error: BackOfficeError = createInternalError(
            PROCESS_NAME,
            ROUTE_NAME,
            response
        );
        throw new Response(JSON.stringify(error), { status: response.status });
    }

    const reglasValidacionAtributoData = await response.json();
    return { reglasValidacionAtributoData };

    
};

export default function CMSDefinirRelgasValidacionAtributos() {

    //REMIX-HOOOKS
    const { reglasValidacionAtributoData } = useLoaderData<{ reglasValidacionAtributoData: any[] }>();
    const navigate = useNavigate();
    const actionData = useActionData()

    //TELERIK-HOOKS
    const [reglaValidacionAtributosSeleccionado, setReglaValidacionAtributos] = useState<any>();

    const handleEditReglaValidacionAtributos = (item: { idReglaValidacion: any; }) => {
        setReglaValidacionAtributos(item);
        navigate(`${ROUTE_BASE_REGLAS_VALIDACION_ATRIBUTOS}/${item.idReglaValidacion}/edit`);
    };

    const handleDeleteReglaValidacionAtributos = (item: { idReglaValidacion: any; }) => {
        setReglaValidacionAtributos(item);
        navigate(`${ROUTE_BASE_REGLAS_VALIDACION_ATRIBUTOS}/${item.idReglaValidacion}/delete`);
    };

    const CustomCellAction = (props: { dataItem: { idReglaValidacion: any; }; }) => {
        return (
            <td>
                <Button onClick={() => { handleEditReglaValidacionAtributos(props.dataItem) }}>Editar</Button>
                <Button onClick={() => { handleDeleteReglaValidacionAtributos(props.dataItem) }}>Eliminar</Button>
            </td>
        )
    }

    const handleNuevaReglaDeValidacionAtributos = () => {
        // openForm();
        setReglaValidacionAtributos({
            idReglaValidacion: 0,
            nombre: "",
            strTipoProducto: [],
            strGrupoProducto : "",
            strAtributo : "",
            strUniMed : "",
            comentario: ""
        });
        navigate(`${ROUTE_BASE_REGLAS_VALIDACION_ATRIBUTOS}/0/edit`);
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
    }, reglasValidacionAtributoData);

    const [result, setResult] = useState<DataResult>(initialState.result);
    const [dataState, setDataState] = useState<State>(initialState.dataState);

    const dataStateChange = (event: GridDataStateChangeEvent) => {
        let updatedState = createDataState(event.dataState, reglasValidacionAtributoData);
        setResult(updatedState.result);
        setDataState(updatedState.dataState);
    }

    return (
        <>
            <ExcelExport data={result.data} ref={_export}>
                <Grid
                    style={{ height: "500px" }}
                    data={process(reglasValidacionAtributoData, dataState)}
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
            <Outlet context={{ reglaValidacionAtributosSeleccionado }} />
        </>
    );
};

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