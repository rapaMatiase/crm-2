//REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from '@remix-run/react';
//TELERIK
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { ListView, ListViewItemProps, ListViewItemWrapper } from '@progress/kendo-react-listview';
import { data, LoaderFunction } from '@remix-run/node';
import { getEventos } from '~/api/apiContentSettings';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormComboBoxSimple } from '~/components/fm-components';
import { getCentrosOperaciones } from '~/api/apiCentrosOperaciones';

export const loader: LoaderFunction = async ({ request, params }) => {

    const idView = params.idView;
    if (!idView) {
        throw new Error("idView is required");
    }
    const data = await getEventos({ request, idView });
    const sucursales = await getCentrosOperaciones({ request })


    return { data, sucursales }
};

const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (

        <ListViewItemWrapper style={{ width: "50%", height: "50%", padding: 10, borderRight: '1px solid lightgrey' }}>
            {item.titulo}
            <br />
            {item.texto}
            <br />
            {item.fecha}
        </ListViewItemWrapper>

    );
};

export default function Events() {

    const { eventos, sucursales } = useLoaderData<any[]>()

    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_eventos'>
                <GridLayout className='cms-home-body_evento-contendor'>
                    <GridLayoutItem className='cms-home-body_evento-contenedor-titulo'>
                        <h3 className='cms-home-body_evento-titulo'>Eventos</h3>
                    </GridLayoutItem>
                    <GridLayoutItem className='cms-home-body_evento-contenedor-combobox'>
                        <Form
                            initialValues={{ sucursales: 'Todas las sucursales' }}
                            render={() => (
                                <FormElement>
                                    <Field
                                        component={FormComboBoxSimple}
                                        name={'sucursuales'}
                                        id={sucursales.idCentrosOperaciones}
                                        data={sucursales.map((item: any) => item.nombre)}
                                    />
                                </FormElement>
                            )}
                        />
                    </GridLayoutItem>
                    <GridLayoutItem className='cms-home-body_evento-contenedor-lista'>
                        <ListView
                            data={eventos}
                            item={MyItemRender}
                            className='cms-home-body_envento-lista'
                        />
                    </GridLayoutItem>
                </GridLayout>
            </GridLayoutItem>
            <Outlet />
            <style>
                {`.k-listview-content {
                    display: flex;
                    flex-wrap: wrap;
                }
                `}
            </style>
        </>
    )
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div> El error esta en Eventos </div>

    </>
}

