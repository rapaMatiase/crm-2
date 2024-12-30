//TELERIK
import {  GridLayout } from '@progress/kendo-react-layout';
import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

export default function listProduct() {
    
    return (
        <>
            <GridLayout className="cms-body-grid cms-body">

                <Outlet />

            </GridLayout>
        </>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div className="cms-body-grid_main cms-body_main"> Al horno </div>

    </>
}
