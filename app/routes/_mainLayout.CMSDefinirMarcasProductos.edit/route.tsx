import { SetStateAction, useState, useEffect } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { useNavigate, useOutletContext } from '@remix-run/react';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { FormInput, FormUpload } from '~/components/fm-components';
import { Input } from '@progress/kendo-react-inputs';
import { ROUTE_BASE_MARCAS } from '~/config/routesConfig';
import { cancelIcon, saveIcon } from '@progress/kendo-svg-icons';

type OutletContextType = {
    selectedItem: {
        idMarcaProducto: string;
        codigo: string;
        nombre: string;
        codigoNombre: string;
    };

};


export default function CMSDefinirMarcasProductosEdit() {

    //Este hook de remix me permite acceder a los datos pasados de DefinirMarca
    const { selectedItem } = useOutletContext<OutletContextType>();
    const [marcaSeleccionada, setMarcaSeleccionada] = useState<any>();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);


    const handleClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        setMarcaSeleccionada(selectedItem);
        setLoading(false);
    }, [loading, marcaSeleccionada]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Form
                initialValues={{
                    idMarcaProducto: marcaSeleccionada.idMarcaProducto,
                    codigo: marcaSeleccionada.codigo,
                    nombre: marcaSeleccionada.nombre,
                    codigoNombre: marcaSeleccionada.codigoNombre,

                }}
                render={(formRenderProps: FormRenderProps) => (
                    <Dialog
                        title={"Editar Atributo"}
                        onClose={handleClose}
                        width={600}
                        height={700}
                    >
                        <FormElement>
                            <Field
                                name={"idMarcaProducto"}
                                component={FormInput}
                                type={"number"}

                                label={"idMarcaProducto"}
                            />
                            <Field
                                name={"codigo"}
                                component={FormInput}
                                type={"number"}

                                label={"codigo"}
                            />
                            <Field
                                name={"nombre"}
                                component={FormInput}
                                type={"text"}

                                label={"nombre"}
                            />
                            <Field
                                name={"codigoNombre"}
                                component={FormInput}
                                type={"text"}

                                label={"codigoNombre"}
                            />
                            <Field
                                name={"UploadImage"}
                                component={FormUpload}


                                label={"idMarcaProducto"}
                            />
                        </FormElement>
                        <DialogActionsBar>
                            <Button onClick={handleClose}
                                icon="cancel"
                                svgIcon={cancelIcon}>Close</Button>
                            <Button
                                themeColor={"primary"}
                                disabled={!formRenderProps.allowSubmit}
                                icon="save"
                                onClick={formRenderProps.onSubmit}
                                svgIcon={saveIcon}
                            >
                                {"Actualizar"}
                            </Button>
                        </DialogActionsBar>
                    </Dialog>

                )}
            />
        </>
    );
}
