import { SetStateAction, useState, useEffect } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { Form, useNavigate, useOutletContext } from '@remix-run/react';
import { Field, FieldWrapper, FormElement } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import { Checkbox, Input, TextArea } from '@progress/kendo-react-inputs';
import { cancelIcon, trashIcon } from '@progress/kendo-svg-icons';
import data from '../_mainLayout.CMSDefinirProductos.productos.$idProducto.imagenes/data';

type OutletContextType = {
    selectedItem: {
        idMarcaProducto: string;
        codigo: string;
        nombre: string;
        codigoNombre: string;
    };
    open: boolean;
    handleClose: () => void;
    handleConfirmDelete: () => void;
};

export default function CMSDefinirMarcasProductosEdit() {
    const { selectedItem, open, handleClose: contextHandleClose, handleConfirmDelete: contextHandleConfirmDelete } = useOutletContext<OutletContextType>();
    const navigate = useNavigate();

    const [idMarcaProducto, setIdMarcaProducto] = useState('');
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [codigoNombre, setCodigoNombre] = useState('');

    useEffect(() => {
        if (selectedItem) {
            setIdMarcaProducto(selectedItem.idMarcaProducto);
            setCodigo(selectedItem.codigo);
            setNombre(selectedItem.nombre);
            setCodigoNombre(selectedItem.codigoNombre);
        }
    }, [selectedItem]);
    

    const handleDialogClose = () => {
        
        contextHandleClose();
        navigate(-1);
    };

    const handleDelete = () => {
            if (selectedItem) {
                // Assuming you have an array of items stored in a state or context
                const updatedData = data.filter((item: any) => item.idMarcaProducto !== selectedItem.idMarcaProducto);
                setData(updatedData);
            }
            
            contextHandleClose();
            navigate(-1);
        }

    return (
        <Form>
             <Dialog
                    title={`Eliminar atributo`}
                    onClose={handleDialogClose}
                    width={500}
                    >
                    <FormElement>
                        <FieldWrapper>
                            <Field
                                name={"idMarcaProducto"}
                                component={Input}
                                type={"number"}
                                label={"idMarcaProducto"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"codigo"}
                                component={Input}
                                type={"text"}
                                label={"Codigo"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                        <Field
                                name={"nombre"}
                                component={Input}
                                type={"text"}
                                label={"Nombre"}
                                readOnly
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label>codigoNombre</Label>
                            <Field
                                name={"codigoNombre"}
                                component={Input}
                                type={"text"}
                                label={"codigoNombre"}
                                readOnly
                            /> 
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label>¿Está seguro que desea eliminar este atributo?</Label>
                            <Field 
                            name="confirmacion" 
                            label="Confirmo que deseo eliminar este atributo"
                            component={Checkbox}
                            readOnly
                            />
                        </FieldWrapper>
                    </FormElement>
                    <DialogActionsBar layout="end">
                        <Button
                            onClick={()=>navigate(-1)}
                            icon="cancel"
                            svgIcon={cancelIcon}
                        >
                            Cancel
                        </Button>
                        <Button
                            themeColor={"primary"}
                            disabled={false}
                            icon="save"
                            onClick={handleDelete}
                            svgIcon={trashIcon}
                        >
                            Eliminar
                        </Button>
                    </DialogActionsBar>
            </Dialog>
        </Form>
    );
}
function setData(arg0: any) {
    throw new Error('Function not implemented.');
}

