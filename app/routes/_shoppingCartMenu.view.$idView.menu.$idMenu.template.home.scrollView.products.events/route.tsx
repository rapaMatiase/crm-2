//REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from '@remix-run/react';
//TELERIK
import {  GridLayoutItem } from '@progress/kendo-react-layout';
import {  LoaderFunction } from '@remix-run/node';
import { getEventos } from '~/api/apiContentSettings';
import { getCentrosOperaciones } from '~/api/apiCentrosOperaciones';
import EventList from '~/components/eventList-component';

export const loader: LoaderFunction = async ({ request, params }) => {

    const idView = params.idView;
    if (!idView) {
        throw new Error("idView is required");
    }
    const eventos = await getEventos({ request, idView });
    const sucursales = await getCentrosOperaciones({ request })


    return { eventos, sucursales }
};

interface LoaderData {
    eventos: any; 
    sucursales: any; 
}

export default function Events() {
    const { eventos, sucursales } = useLoaderData<LoaderData>();

    return (
        <>
            <GridLayoutItem className="cms-home-body-grid_eventos">
                <EventList eventos={eventos} sucursales={sucursales} />
            </GridLayoutItem>
            <Outlet />
        </>
    );
}


export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div> No hay datos para eventos </div>

    </>
}

