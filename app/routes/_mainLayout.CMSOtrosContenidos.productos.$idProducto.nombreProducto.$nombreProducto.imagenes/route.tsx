import { useState } from 'react';

import { Button } from '@progress/kendo-react-buttons';
import {
    Grid,
    GridColumn,
    GridToolbar,
} from '@progress/kendo-react-grid';
import { isRouteErrorResponse, LoaderFunction, Outlet, useLoaderData, useNavigate, useParams, useRouteError } from 'react-router-dom';
import { getImagenesTipoEntidad } from '~/api/apiContentSettings';
import { Loader, LoaderType } from '@progress/kendo-react-indicators';


interface Imagen {
    id: number;
    Nombre: string;
    image: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const tipoEntidad = "OTROS";
  const { idProducto } = params as { idProducto: string };
  const data = await getImagenesTipoEntidad({ request, tipoEntidad, idEntidad : idProducto });
  return data;
}

export default function RouteImage(): JSX.Element {
    const data = useLoaderData() as any[];
    const navigate = useNavigate();
    const { idProducto, nombreProducto } = useParams<{ idProducto: string; nombreProducto: string }>();


    const cellAction = (props: any) => (
        <td {...props.tdProps}>
          <Button onClick={() => {
            const dataItem = props.dataItem;
            navigate(`/CMSOtrosContenidos/productos/${idProducto}/nombreProducto/${nombreProducto}/imagenes/delete/${dataItem.idMediaEntity}`)
          }}>Borrar</Button>
        </td>
      )

    //REMIX
  const handleEditarImagen = () => {
    navigate(`/CMSOtrosContenidos/productos/${idProducto}/nombreProducto/${nombreProducto}/imagenes/edit`)
  }

    return (
        <>

            <Grid
                style={{ height: '475px', marginTop: '20px' }}
                data={data}
            >
                <GridToolbar>

                    <Button type="button" onClick={handleEditarImagen}> Agregar Imagen </Button>

                </GridToolbar>
                <GridColumn
                    field="rawMedia"
                    title="Imagen"
                    cell={(props) => {
                        return (
                            <td >
                                <img src={`${props.dataItem.rawMedia}`} alt={"producto.Nombre"} style={{ height: 200, width: 200 }} />
                            </td>
                        );
                    }}
                />
                <GridColumn field="idMediaEntity" title="idMediaEntity" />
                <GridColumn field="nombre" title="nombre" />
                <GridColumn field="tipoContenido" title="tipoContenido" />
                <GridColumn field="mimeType" title="Mime Type" />
                <GridColumn cell={cellAction} title="Acciones" />
            </Grid>

                    <Outlet/>

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