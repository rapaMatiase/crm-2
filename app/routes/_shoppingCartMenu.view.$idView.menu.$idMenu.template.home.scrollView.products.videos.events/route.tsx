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
    const eventos = await getEventos({ request, idView });
    const sucursales = await getCentrosOperaciones({ request })

    
    return { eventos, sucursales }
};

const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (

        <ListViewItemWrapper className='cms-home-body_enventos-lista-listview-item'>
            <span>{item.titulo}</span>
            <span>{item.texto}</span>
            <span>{item.fecha}</span>
        </ListViewItemWrapper>

    );
};

export default function Events() {

    const { eventos, sucursales } = useLoaderData<any[]>()
    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_eventos'>
                <GridLayout className='cms-home-body_eventos-contenedor'>
                    <GridLayoutItem className='cms-home-body_eventos-titulo'  >
                        <h3 >Eventos</h3>
                    </GridLayoutItem>
                    <GridLayoutItem className='cms-home-body_eventos-combobox'  >
                        <Form
                            initialValues={{ sucursales: 'Todas las sucursales' }}
                            render={() => (
                                <FormElement>
                                    <Field
                                        component={FormComboBoxSimple}
                                        name={'sucursuales'}
                                        className="cms-home-body_eventos-combobox-input"
                                        id={sucursales.idCentrosOperaciones}
                                        data={sucursales.map((item: any) => item.nombre)}
                                    />
                                </FormElement>
                            )}
                        />
                    </GridLayoutItem>
                    <GridLayoutItem className='cms-home-body_enventos-lista' row={15} col={1} colSpan={10} rowSpan={2} style={{ backgroundColor: "pink" }}>
                        <ListView
                            data={eventos.eventos}
                            item={MyItemRender}
                            className='cms-home-body_enventos-lista-listview'
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
        <div> No hay datos para eventos </div>

    </>
}

