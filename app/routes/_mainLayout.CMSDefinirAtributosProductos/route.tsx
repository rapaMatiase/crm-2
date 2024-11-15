//REACT
import {  useRef, useState } from 'react';
//REMIX
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
//TELERIK
import { Grid, GridColumn as Column, GridToolbar, GridDataStateChangeEvent } from '@progress/kendo-react-grid';
import { DataResult, process, State } from '@progress/kendo-data-query';
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { Button } from '@progress/kendo-react-buttons';
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { filterIcon } from '@progress/kendo-svg-icons';
//COMPONENTS
import { ColumnMenu } from './columnMenu';
//CONFIG
import { ROUTE_BASE_ATRIBUTOS } from '~/config/routesConfig';
import { getAtributos } from '~/api/apiAtributos';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) {
      return [{ title: "User not found!" }];
    }
    return [{ title: "BackOffice - Atributos" }];
};

export const loader: LoaderFunction = async ({ request }) => {
    const response = await getAtributos({ request });
    const { atributosData } = await response.json();
    return {atributosData};
}

export default function CMSDefinirAtributosProductosHome(){

    //REMIX-HOOOKS
    const {atributosData} = useLoaderData<{atributosData: any[]}>();
    const navigate = useNavigate();

    //TELERIK-HOOKS
    const [atributoSeleccionado, setAtributoSeleccionado] = useState<any>();

    //TELERIK - FUNCTIONS
    const CustomCellAction = (props: any) => {
        return (
            <td style={{display : "flex", justifyContent : "space-evenly"}}>
                <Button 
                    onClick={() => {
                        const dataItem = props.dataItem;
                        setAtributoSeleccionado(dataItem);
                        navigate(`${ROUTE_BASE_ATRIBUTOS}/${dataItem.idAtributo}/edit`); 
                    }}>
                        Editar
                </Button>
                <Button 
                    onClick={() => { 
                        const dataItem = props.dataItem;
                        setAtributoSeleccionado(dataItem); 
                        navigate(`${ROUTE_BASE_ATRIBUTOS}/${dataItem.idAtributo}/delete`);
                    }}>
                        Eliminar
                </Button>
            </td>
        )
    }

    const handleNuevoAtributo = () => {
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
        navigate(`${ROUTE_BASE_ATRIBUTOS}/0/edit`);
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
            <ExcelExport data={result.data} ref={_export}>   
                <Grid
                    style={{ height: "500px" }}
                    data={process(atributosData, dataState)}
                    {...dataState}
                    onDataStateChange={dataStateChange}
                    sortable={true}
                    columnMenuIcon={filterIcon}
                >
                    <GridToolbar>
                        <Button onClick={excelExport}> Export to Excel </Button>
                        <Button themeColor={"primary"} onClick={handleNuevoAtributo}> Nuevo atributo </Button>
                    </GridToolbar>

                    <Column columnMenu={ColumnMenu} field="idAtributo" title="id" width={75} filter={'numeric'}  />
                    <Column columnMenu={ColumnMenu} field="nombre" title="Nombre" width={250} filter={'text'}  />
                    <Column columnMenu={ColumnMenu} field="nombreCorto" width={150} title="Nombre corto" filter={'text'}  />
                    <Column columnMenu={ColumnMenu} field="strUniMeds" title="Unidadades de medida" />
                    <Column columnMenu={ColumnMenu} field="activo" width={100} title="Activo" filter={'boolean'} />
                    <Column columnMenu={ColumnMenu} field="tipoValor" width={125} title="Tipo de valor" filter={'text'} />
                    <Column field="valorMinimo" width={125} title="Valor minimo" />
                    <Column field="valorMaximo" width={125} title="Valor maximo" />
                    <Column field="comentario" width={125} title="Comentario" />
                    <Column cell={CustomCellAction} title='Actiones' width="150px" />
                </Grid>
            </ExcelExport>

             <Outlet context={{ atributoSeleccionado }} />
        </>
    );
};
