//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';
import { ListView, ListViewItemProps, ListViewItemWrapper } from '@progress/kendo-react-listview';
import { Grid } from '@progress/kendo-react-grid';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormComboBoxSimple } from '~/components/fm-components';


const json = [
    {
        url: "",
        date: "",
        title: "Capacitación en Pulido de Pisos de Hormigón en BsAs",
        detail: "",
        sucursal: ""
    },
    {
        url: "",
        date: "",
        title: "Capacitación en Pulverización de Pintura en Rosario",
        detail: "",
        sucursal: ""
    },
    {
        url: "",
        date: "",
        title: "CAPACITACIÓN DE DEMOLICIÓN, CORTE Y PERFORADO DE HORMIGÓN EN Santa Fe",
        detail: "",
        sucursal: ""
    },
    {
        url: "",
        date: "",
        title: "Capacitación en Pulverizacion de Pintura en Ctes",
        detail: "",
        sucursal: ""
    }

]


const MyItemRender = (props: ListViewItemProps) => {
    let item = props.dataItem;
    return (
        <ListViewItemWrapper  className='cms-home-body_envento-lista-item' /*  style={{ width: "50%", height: "50%", padding: 10, borderRight: '1px solid lightgrey' }} */>
            {item.title}
        </ListViewItemWrapper>
    );
};

export default function Events() {


    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_envento-titulo'  >
                <h3 className='cms-home-body_envento-titulo'>Eventos</h3>
            </GridLayoutItem> 
            <GridLayoutItem className='cms-home-body-grid_envento-combobox cms-home-body-_envento-combobox'  >
                <Form 
                    initialValues={{sucursales: 'Todas las sucursales'}}
                    render={()=>(
                        <FormElement>
                            <Field 
                                component={FormComboBoxSimple} 
                                name={'sucursuales'} 
                                id={'sucursales'}
                                data={['Todas las sucursales', 'Rosario', 'Santa Fe', 'Ctes', 'BsAs']}
                               />
                        </FormElement>
                    )}
                />
            </GridLayoutItem> 
            <GridLayoutItem className='cms-home-body-grid_envento-lista' row={15} col={1} colSpan={10} rowSpan={2} style={{ backgroundColor: "pink" }}>
                <ListView
                    data={json}
                    item={MyItemRender}
                    className='cms-home-body_envento-lista'
                   /*  style={{ width: '100%', height: "100%", display: "flex", flexWrap: "wrap", overflow: "hidden" }} */ />
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


