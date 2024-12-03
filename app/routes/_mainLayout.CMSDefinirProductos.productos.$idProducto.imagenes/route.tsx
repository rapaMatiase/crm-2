import * as React from 'react';
import { useState } from 'react';
import { Form, Field, FormElement, FieldRenderProps, FormRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import {
    Grid,
    GridColumn as Column,
} from '@progress/kendo-react-grid';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import productos from "./data";
import { getSession } from '~/servicies/session.server';

interface FormData {
    file: File | null;
    Nombre: string;
    dropdown: string;
    tipoContenido: string;
    mimeType: string;
    rawMedia: string;
}

interface Imagen {
    id: number;
    Nombre: string;
    image: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { idProducto } = params;
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");

    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/GetImagenes/TipoEntidad/PRO/IdEntidad/${idProducto}`,{
        headers : {
        'Authorization': token
        }
    }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    const data: Imagen[] = await response.json();
    return data;
};

export function useImages() {
    return useLoaderData();
}

export default function RouteImage(): JSX.Element {
    const [formData, setFormData] = useState<FormData | null>(null);

    
    const handleSubmit = (dataItem: { [name: string]: any }) => {
        const formData: FormData = {
            file: dataItem.file || null,
            Nombre: dataItem.Nombre || '',
            dropdown: dataItem.dropdown || '',
            tipoContenido: dataItem.tipoContenido || '',
            mimeType: dataItem.mimeType || '',
            rawMedia: dataItem.rawMedia || ''
        };
        setFormData(formData);
    };
    

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement style={{ maxWidth: 650 }}>
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend'}>Por favor elegi un producto:</legend>

                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={'file'}
                                        component={({ fieldRenderProps }: FieldRenderProps) => (
                                            <div>
                                                <input type="file" {...fieldRenderProps} />
                                                <Button onClick={() => alert('Update button clicked')}>Update</Button>
                                            </div>
                                        )}
                                        labelClassName={'k-form-label'}
                                        label={'Select file'}
                                    />
                                </div>
                            </FieldWrapper>

                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={'Nombre'}
                                        component={Input}
                                        labelClassName={'k-form-label'}
                                        label={'Nombre'}
                                    />
                                </div>
                            </FieldWrapper>
                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={'dropdown'}
                                        component={({ fieldRenderProps }: FieldRenderProps) => (
                                            <div>
                                                <label className="k-form-label" htmlFor="dropdown">Opciones</label>
                                                <select id="dropdown" {...fieldRenderProps}>
                                                    <option value="">Selecciona un producto</option>
                                                    {productos.map((producto, index) => (
                                                        <option key={index} value={producto.Nombre}>{producto.Nombre}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        labelClassName={'k-form-label'}
                                        label={'Dropdown'}
                                    />
                                </div>
                            </FieldWrapper>
                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={'tipoContenido'}
                                        component={Input}
                                        labelClassName={'k-form-label'}
                                        label={'Tipo Contenido'}
                                    />
                                </div>
                            </FieldWrapper>
                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={'mimeType'}
                                        component={Input}
                                        labelClassName={'k-form-label'}
                                        label={'Mime Type'}
                                    />
                                </div>
                            </FieldWrapper>
                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={'rawMedia'}
                                        component={Input}
                                        labelClassName={'k-form-label'}
                                        label={'Raw Media'}
                                    />
                                </div>
                            </FieldWrapper>
                        </fieldset>
                        <div className="k-form-buttons">
                            <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
                        </div>
                    </FormElement>
                )}
            />
            
                <Grid
                    style={{ height: '475px', marginTop: '20px' }}
                    data={productos}
                >
                    <Column field="Nombre" title="Nombre" />
                    <Column field="dropdown" title="Opción" />
                    <Column field="file.name" title="Archivo" />
                    <Column field="tipoContenido" title="Tipo Contenido" />
                    <Column field="mimeType" title="Mime Type" />
                    <Column field="rawMedia" title="Raw Media" />
                    <Column
                        field="dropdown"
                        title="Imagen"
                        cell={(props) => {
                            
                            return (
                                <td>
                                  <img src={props.dataItem.image} alt={"producto.Nombre"} style={{width : 100, height : 100}}  />
                                </td>
                            );
                        }}
                    />
                </Grid>
                
           
        </>
    );
}