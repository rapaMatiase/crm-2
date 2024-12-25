import { useState } from 'react';

import { Button } from '@progress/kendo-react-buttons';
import {
    Grid,
    GridColumn,
    GridToolbar,
} from '@progress/kendo-react-grid';
import { isRouteErrorResponse, LoaderFunction, Outlet, useLoaderData, useNavigate, useParams, useRouteError } from 'react-router-dom';
import { getTextosPorProducto } from '~/api/apiContentSettings';
import { Loader, LoaderType } from '@progress/kendo-react-indicators';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { idProducto } = params as { idProducto: string };
  const data = await getTextosPorProducto({ request, idProductoBase: idProducto });
  return data;
}

export default function RouteImage(): JSX.Element {
    const data = useLoaderData() as any[];
    const navigate = useNavigate();
    const { idProducto, nombreProducto } = useParams<{ idProducto: string; nombreProducto: string }>();
const [textoSeleccionado, setTextoSeleccionado] = useState<any>(null);

    const cellAction = (props: any) => (
        <td {...props.tdProps}>
          <Button onClick={() => {
            const dataItem = props.dataItem;
            setTextoSeleccionado(dataItem);

            navigate(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/detalles/edit/${dataItem.idProductoTexto}`)
          }}>Editar</Button>
          <Button onClick={() => {
            const dataItem = props.dataItem;
            navigate(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/detalles/delete/${dataItem.idProductoTexto}`)
          }}>Borrar</Button>
          </td>
      )

    //REMIX
  const handleCrearDetalle = () => {
    setTextoSeleccionado({idProductoTexto :0, tipoTexto: "", texto: ""});
    navigate(`/CMSDefinirProductos/productos/${idProducto}/nombreProducto/${nombreProducto}/detalles/edit/0`)
  }

    return (
        <>

            <Grid
                style={{ height: '475px', marginTop: '20px' }}
                data={data}
            >
                <GridToolbar>

                    <Button type="button" onClick={handleCrearDetalle}> Agregar Texto </Button>
                    

                </GridToolbar>
                
                <GridColumn field="idProductoTexto" title="idProductoTexto" />
                <GridColumn field="tipoTexto" title="tipoTexto" />
                <GridColumn field="texto" title="texto" />
               
                <GridColumn cell={cellAction} title="Acciones" />
            </Grid>

                    <Outlet context={{textoSeleccionado}}/>

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
        <div style={{ padding: "100px", color: "blue" , display: "flex", justifyContent: "center"}}>
          <Loader type={type} />
        </div>
    );
  }