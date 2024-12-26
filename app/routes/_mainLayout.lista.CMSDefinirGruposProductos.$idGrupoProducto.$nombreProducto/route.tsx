//TELERIK - IMPORTS
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn, GridDataStateChangeEvent, GridToolbar } from "@progress/kendo-react-grid";
import { filterIcon } from "@progress/kendo-svg-icons";
import { Loader, LoaderType } from '@progress/kendo-react-indicators';

//TELERIK - IMPORT EXCEL
import { ExcelExport } from "@progress/kendo-react-excel-export";

//TELERIK - IMPORT DATA
import { DataResult, process, State } from '@progress/kendo-data-query';
import { useRef, useState } from "react";
import { isRouteErrorResponse, Outlet, useLoaderData, useNavigate, useParams, useRouteError } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";

//COMPONENTS
import { ColumnMenu } from "./columnMenu";
import { getImagenesTipoEntidad } from "~/api/apiContentSettings";


export const loader: LoaderFunction = async ({ request, params }) => {
  const tipoEntidad = "GRUPRO";
  const { idGrupoProducto } = params as { idGrupoProducto: string };
  const data = await getImagenesTipoEntidad({ request, tipoEntidad, idEntidad: idGrupoProducto });
  return data;
}

export default function CMSDefinirGruposProductosList() {

  const data = useLoaderData()
  const navigate = useNavigate();
  const { idGrupoProducto, nombreProducto } = useParams();

  const cellAction = (props: any) => (
    <td {...props.tdProps}>
      <Button onClick={() => {
        const dataItem = props.dataItem;
        navigate(`/lista/CMSDefinirGruposProductos/${idGrupoProducto}/${nombreProducto}/delete/${dataItem.idMediaEntity}`)
      }}>Borrar</Button>
      <Button onClick={() => {
      const dataItem = props.dataItem;
      const link = document.createElement('a');
      link.href = dataItem.rawMedia;
      link.download = dataItem.nombre;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}>Descargar imagen</Button>
    </td>
  )

  const cellImage = (props: any) => (
    <td {...props.tdProps} style={{ display: "flex", justifyContent: "center" }} >
      <img src={props.dataItem.rawMedia} alt={props.dataItem.nombre} style={{ height: 200, width: 300 }} />
    </td>
  )
  //REMIX
  const handleEditarImagen = () => {
    navigate(`/lista/CMSDefinirGruposProductos/${idGrupoProducto}/${nombreProducto}/edit`);
  }
  //REMIX
  const handleCambiarProducto = () => {
    navigate("/CMSDefinirGruposProductos")
  }

  //TELERIK - EXPORT EXCEL
  const _export = useRef<ExcelExport | null>(null);
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };


  //TELERIK-FILTER-GRID
  const createDataState = (dataState: State, atributos: any) => {
    return {
      result: process(atributos, dataState),
      dataState: dataState
    };
  }

  const initialState = createDataState({}, data);

  const [result, setResult] = useState<DataResult>(initialState.result);
  const [dataState, setDataState] = useState<State>(initialState.dataState);

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    let updatedState = createDataState(event.dataState, data);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  }

  return (
    <>
      <h2> {nombreProducto} </h2>
      <Button onClick={handleCambiarProducto}> Cambiar de Producto </Button>
      <ExcelExport data={result.data} ref={_export}>
        <Grid
          style={{ height: "500px" }}
          data={process(data as unknown[], dataState)}
          {...dataState}
          onDataStateChange={dataStateChange}
          sortable={true}
          columnMenuIcon={filterIcon}
        >
          <GridToolbar>
            <Button onClick={excelExport}> Export to Excel </Button>
            <Button themeColor={"primary"} onClick={handleEditarImagen}> Cargar imagen nueva </Button>
          </GridToolbar>
          <GridColumn columnMenu={ColumnMenu} cell={cellImage} field="rawMedia" title="Archivo" width={500} />
          <GridColumn columnMenu={ColumnMenu} field="idMediaEntity" title="ID" />
          <GridColumn columnMenu={ColumnMenu} field="nombre" title="Nombre" />
          <GridColumn columnMenu={ColumnMenu} field="tipoContenido" title="Tipo Contenido" />
          <GridColumn columnMenu={ColumnMenu} field="mimeType" title="mimeType" />

          <GridColumn cell={cellAction} title="Acciones" />
        </Grid>
      </ExcelExport>
      <Outlet />
    </>
  );
}

//LOADER
export function ErrorBoundary() {
  const error = useRouteError();
  const [type, setType] = useState<LoaderType>('infinite-spinner');
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }
  return (
    <div style={{ padding: "100px", color: "blue", display: "flex", justifyContent: "center" }}>
      <Loader type={type} />
    </div>
  );
}
