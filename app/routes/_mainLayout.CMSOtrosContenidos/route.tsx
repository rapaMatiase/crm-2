import { useState } from 'react';

import { Button } from '@progress/kendo-react-buttons';
import {
    Grid,
    GridColumn,
    GridToolbar,
} from '@progress/kendo-react-grid';
import { isRouteErrorResponse, LoaderFunction, Outlet, useLoaderData, useNavigate, useRouteError } from 'react-router-dom';
import { getImagenesTipoEntidad } from '~/api/apiContentSettings';
import { Loader, LoaderType } from '@progress/kendo-react-indicators';


interface Imagen {
    id: number;
    Nombre: string;
    image: string;
}

const ID_ENTIDAD = 0;
const TIPO_ENTIDAD = "OTROS";

const PROCESS_NAME = "Definir otros contenidos";
const ROUTE_NAME = "CMSOtrosContenidos";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getImagenesTipoEntidad({ request, tipoEntidad: TIPO_ENTIDAD, idEntidad: ID_ENTIDAD  });
  return data;
}



export default function CMSOtrosContenidos() {
    const data = useLoaderData() as any[];
    const navigate = useNavigate();


    const cellAction = (props: any) => (
        <td {...props.tdProps}>
          <Button onClick={() => {
            const dataItem = props.dataItem;
            navigate(`/CMSOtrosContenidos/delete/idMediaEntity/${dataItem.idMediaEntity}`)
          }}>Borrar</Button>
        </td>
      )

    //REMIX
  const handleAgregarImagen = () => {
   navigate(`/CMSOtrosContenidos/agregar/idEntidad/${ID_ENTIDAD}/tipoEntidad/${TIPO_ENTIDAD}`)
  }

    return (
        <>

            <Grid
                style={{ height: '475px', marginTop: '20px' }}
                data={data}
            >
                <GridToolbar>

                    <Button type="button" onClick={handleAgregarImagen}> Agregar Imagen </Button>

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