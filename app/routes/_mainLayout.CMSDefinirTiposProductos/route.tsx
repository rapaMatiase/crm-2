import { Button } from '@progress/kendo-react-buttons';
import { Field, FieldRenderProps, FieldWrapper, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useState } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getSession } from '~/servicies/session.server';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { GetTiposProductos } from '~/api/ApiAtributos';

export const loader: LoaderFunction = async ({ request }) => {
    const response = await GetTiposProductos({ request });
    return response;
};



export default function CMSDefinirTiposProductos() {
    const [formData, setFormData] = useState({
        idTiposProductos: '',
        codigo: '',
        nombre: '',
        activo: false,
        codigoNombre: ''
    });

    let data = useLoaderData() as any[];

    const handleSubmit = (data: any) => {
        console.log('Form submitted with data:', data);
    };

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEdit = (item: any) => {
        // Implement edit functionality
        console.log('Edit item:', item);
    };

    const handleDelete = (item: any) => {
        // Implement delete functionality
        console.log('Delete item:', item);
    };

    return (


        <>
            <Form
                onSubmit={handleSubmit as any}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement style={{ maxWidth: 650 }}>
                        <legend className={'k-form-legend'}>Por favor elegi un producto:</legend>

                        <Field
                            name={'idTiposProductos'}
                            component={Input}
                            value={formData.idTiposProductos}
                            onChange={handleChange}
                            label={'ID Tipo Producto'} />

                        <Field
                            name={'codigo'}
                            component={Input}
                            value={formData.codigo}
                            onChange={handleChange}
                            label={'Código'} />

                        <Field
                            name={'nombre'}
                            component={Input}
                            value={formData.nombre}
                            onChange={handleChange}
                            label={'Nombre'} />

                        <Field
                            name={'activo'}
                            component="input"
                            checked={formData.activo}
                            onChange={handleChange}
                            label={'Activo'}
                            type="checkbox" />

                        <Field
                            name={'codigoNombre'}
                            component={Input}
                            value={formData.codigoNombre}
                            onChange={handleChange}
                            label={'Código Nombre'} />

                        <div className="k-form-buttons">
                            <Button type="submit" disabled={!formRenderProps.allowSubmit}>
                                Submit
                            </Button>
                        </div>
                        </FormElement>
                    )} />
                        <Grid
                            data={data}
                            style={{ maxHeight: '400px' }}
                        >
                            <GridColumn field="idTiposProductos" title="ID Tipos Productos" />
                            <GridColumn field="codigo" title="Código" />
                            <GridColumn field="nombre" title="Nombre" />
                            <GridColumn field="activo" title="Activo" />
                            <GridColumn field="codigoNombre" title="Código Nombre" />
                            <GridColumn
                                title="Acciones"
                                cell={(props) => (
                                    <td>
                                        <Button onClick={() => handleEdit(props.dataItem)}>Editar</Button>
                                        <Button onClick={() => handleDelete(props.dataItem)}>Eliminar</Button>
                                    </td>
                                )} />
                        </Grid>
                </>
    );
}