import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { ListView, ListViewItemWrapper } from '@progress/kendo-react-listview';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormComboBoxSimple } from '~/components/fm-components';

interface Evento {
    fecha: string;
    titulo: string;
    texto: string;
}

interface Sucursal {
    idCentrosOperaciones: string;
    nombre: string;
}

interface EventListProps {
    eventos: { eventos: Evento[] };
    sucursales: Sucursal[];
}

export default function EventList  ({ eventos, sucursales }: EventListProps)  {
    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        return { month, day };
    };

    const MyItemRender = (props: { dataItem: any; }) => {
        const item = props.dataItem;
        const { month, day } = formatDate(item.fecha);
        return (
            <ListViewItemWrapper className="cms-home-body_enventos-lista-listview-item">
                <span>{item.titulo}</span>
                <span>{item.texto}</span>
                <span>{day}</span>
                <span>{month}</span>
            </ListViewItemWrapper>
        );
    };

    return (
        <GridLayout className="cms-home-body_eventos-contenedor">
            <GridLayoutItem className="cms-home-body_eventos-titulo">
                <h3>Eventos</h3>
            </GridLayoutItem>
            <GridLayoutItem className="cms-home-body_eventos-combobox">
                <Form
                    initialValues={{ sucursales: 'Todas las sucursales' }}
                    render={() => (
                        <FormElement>
                            <Field
                                component={FormComboBoxSimple}
                                name="sucursuales"
                                className="cms-home-body_eventos-combobox-input"
                                id={sucursales.map((sucursal) => sucursal.idCentrosOperaciones).join(',')}
                                data={sucursales.map((item) => item.nombre)}
                            />
                        </FormElement>
                    )}
                />
            </GridLayoutItem>
            <GridLayoutItem
                className="cms-home-body_enventos-lista"
                row={15}
                col={1}
                colSpan={10}
                rowSpan={2}
                style={{ backgroundColor: "pink" }}
            >
                <ListView
                    data={eventos.eventos}
                    item={MyItemRender}
                    className="cms-home-body_enventos-lista-listview"
                />
            </GridLayoutItem>
        </GridLayout>
    );
};


