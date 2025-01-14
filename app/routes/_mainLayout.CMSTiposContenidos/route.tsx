import { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
    Grid,
    GridColumn,
    GridToolbar,
} from '@progress/kendo-react-grid';
import {
    isRouteErrorResponse,
    LoaderFunction,
    Outlet,
    useLoaderData,
    useNavigate,
    useRouteError,
} from 'react-router-dom';
import { getTiposContenido1 } from '~/api/apiContentSettings';
import { Loader, LoaderType } from '@progress/kendo-react-indicators';


// Loader function
export const loader: LoaderFunction = async ({ request }) => {
    try {
        const data = await getTiposContenido1({ request });
        if (!data || !Array.isArray(data)) {
            throw new Error("Datos inválidos");
        }
        return data;
    } catch (error) {
        throw new Response("Error al cargar datos", { status: 500 });
    }
};

export default function CMSOtrosContenidos() {
    const data = useLoaderData() as any[]; 
    const navigate = useNavigate();

    const [tipoContenidoSeleccionado, setTipoContenidoSeleccionado] = useState<any>();


    const cellAction = (props: any) => (
        <td {...props.tdProps}>
            <Button
                onClick={() => {
                    const dataItem = props.dataItem;
                    setTipoContenidoSeleccionado(dataItem);
                    navigate(`/CMSTiposContenidos/edit/idTipoContenido/${dataItem.idTipoContenido}`);
                }}
            >
                Editar
            </Button>
            <Button
                onClick={() => {
                    const dataItem = props.dataItem;
                    setTipoContenidoSeleccionado(dataItem);
                    navigate(`/CMSTiposContenidos/delete/idTipoContenido/${dataItem.idTipoContenido}`);
                }}
            >
                Borrar
            </Button>
        </td>
    );

    const handleAgregarImagen = () => {
        navigate(`/CMSTiposContenidos/agregar`);
    };

    return (
        <>
            <Grid
                style={{ height: '475px', marginTop: '20px' }}
                data={data}
            >
                <GridToolbar>
                    <Button type="button" onClick={handleAgregarImagen}>
                        Agregar Tipo de Contenido
                    </Button>
                </GridToolbar>
                <GridColumn field="idTipoContenido" title="ID Tipo Contenido" />
                <GridColumn field="nombre" title="Nombre" />
                <GridColumn field="comentario" title="Comentario" />
                <GridColumn
                    
                    field="activo"
                    width={100}
                    title="Activo"
                    filter={'boolean'}
                    cell={(props) => (
                        <td>
                            {props.dataItem.activo ? 'Si' : 'No'}
                        </td>
                    )}
                />
                <GridColumn cell={cellAction} title="Acciones" />
            </Grid>
            <Outlet context={{tipoContenidoSeleccionado}}/>
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