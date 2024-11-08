import * as React from "react";
import { Grid, GridColumn as Column, GridCellProps, GridToolbar } from "@progress/kendo-react-grid";

import { Button } from "@progress/kendo-react-buttons";

import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import CreateForm from './CreateForm';


import { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/session.server";
import { useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { useState } from "react";


interface EditCommandCellProps extends GridCellProps {
    enterEdit: (item: Atributo) => void;
    enterDelete: (item: Atributo) => void;
}

const EditCommandCell = (props: EditCommandCellProps) => {
    return (
        <td>
            <Button
                themeColor={"primary"}
                type="button"
                onClick={() => props.enterEdit(props.dataItem)}
            >
                Edit
            </Button>
            <Button
                themeColor={"warning"}
                type="button"
                onClick={() => props.enterDelete(props.dataItem)}
            >
                Delete
            </Button>
        </td>
    );
};


export const action = async ({ request }) => {
    const formData = await request.formData();
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const idProducto = formData.get("idProductoBase");
    const atributos = JSON.parse(formData.get("atributos"));

    const productoAtributos = {
        idProductoBase: Number(idProducto),
        atributos: atributos.map((atributo: any) => {
            return {
                idAtributoProducto : Number(idProducto),
                idAtributo: atributo.idAtributo,
                strUniMed: atributo.strUniMed,
                strValor : atributo.strValor,
            }
        })
    }

    const jsonProductoAtributos = JSON.stringify(productoAtributos);

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Productos/ActualizarProductoAtributos", {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: jsonProductoAtributos
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response;
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;
    const { idProducto } = params;

    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/Productos/GetAtributosPorProducto/IdProductobase/${idProducto}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const atributosData = await response.json();

    const atributosDataFormat = atributosData.map((atributo: any) => {
        return {
            idAtributo: atributo.idAtributo,
            nombre: atributo.nombre,
            tipoValor: atributo.tipoValor,
            valorTexto: atributo.valorTexto,
            valorFecha: new Date(atributo.valorFecha),
            valorEntero: atributo.valorEntero,
            valorNumero: atributo.valorNumero,
            strUniMed: atributo.strUniMed,
        };
    });

    //Lista de unidades 
    const response2 = await fetch("https://apptesting.leiten.dnscheck.com.ar/UnidadesMedida/GetUnidadesMedida", {
        headers: {
            "Authorization": token
        }
    });

    if (!response2.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const unidadesMedida = await response2.json();

    const unidadesDeMedidaCodigoNombre = unidadesMedida.map((unidad: { codigo: string }) => {
        return unidad.codigo;
    });


    return { atributosDataFormat, unidadesDeMedidaCodigoNombre };
};

interface Atributo {
    idAtributo: number;
    nombre: string;
    tipoValor: string;
    valorTexto: string;
    valorFecha: Date;
    valorEntero: number;
    valorNumero: number;
    strUniMed: string;
}


const App = () => {
    const { atributosDataFormat: atributosData, unidadesDeMedidaCodigoNombre } = useLoaderData<{ atributosDataFormat: Atributo[], unidadesDeMedidaCodigoNombre: string[] }>();
    const {idProducto, codigoNombreProducto} = useParams();
    const Atributos = [...atributosData];

    const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
    const [openFormDelete, setOpenFormDelete] = useState<boolean>(false);
    const [openFormCreate, setOpenFormCreate] = useState<boolean>(false);

    const [editItem, setEditItem] = useState<Atributo>({ idAtributo: 0 });
    const [data, setData] = useState<Array<Atributo>>(Atributos);
    const submit = useSubmit();

    const enterCreate = () => {
        setOpenFormCreate(true);
        setEditItem(item);
    }

    const enterEdit = (item: Atributo) => {
        setOpenFormEdit(true);
        setEditItem(item);
    }

    const enterDelete = (item: Atributo) => {
        setOpenFormDelete(true);
        setEditItem(item);
    }

    const handleSubmitEdit = (event) => {
        let newData = data.map(item => {
            if (event.idAtributo === item.idAtributo) {
                item = { ...event };
            }
            return item;
        })
        setData(newData);
        setOpenFormEdit(false);
    }

    const handleSubmitCreate = (event) => {
        let newData = data.concat(event);
        setData(newData);
        setOpenFormCreate(false);
    }

    const handleSubmitDelete = (event) => {
        let newData = data.filter(item => item.idAtributo !== event.idAtributo);
        setData(newData);
        setOpenFormDelete(false);
    }

    const handleCancelEdit = () => {
        setOpenFormEdit(false);
    }

    const handleCancelDelete = () => {
        setOpenFormDelete(false);
    }

    const handleCancelCreate = () => {
        setOpenFormCreate(false);
    }

    const MyEditCommandCell = (props: GridCellProps) => (
        <EditCommandCell {...props} enterEdit={enterEdit} enterDelete={enterDelete} />
    );

    const handleSubmitGrilla = () =>{
        console.log(data);
        const formData = new FormData();
        formData.append("idProductoBase", idProducto || "");
        formData.append("atributos", JSON.stringify(data));
        submit(formData, { method: 'POST' });
    } 

    return (
        <>
            <h2>{codigoNombreProducto}</h2>
            <Grid style={{ height: "500px" }} data={data}>
                <GridToolbar>
                        <div >
                            <Button
                                type="button"
                                onClick={enterCreate}
                            >
                                Agregar atributo
                            </Button>
                            <Button
                                title="Add new"
                                themeColor={"primary"}
                                type="button"
                                onClick={handleSubmitGrilla}
                            >
                                Guardar todo
                            </Button>
                        </div>
                        </GridToolbar>

                <Column field="idAtributo" title="Id" width="50px" editable={false} />
                <Column field="nombre" title="Nombre" />
                <Column field="tipoValor" title="Tipo de valor" editor="text" />
                <Column field="valorTexto" title="Valor de texto" editor="text" />
                <Column field="strUniMed" title="Unidades de medida" editor="text" />
                <Column cell={MyEditCommandCell} />

            </Grid>
            {openFormEdit && <EditForm
                cancelEdit={handleCancelEdit}
                onSubmit={handleSubmitEdit}
                item={editItem}
                data={unidadesDeMedidaCodigoNombre}
            />}

            {openFormDelete && <DeleteForm
                cancelEdit={handleCancelDelete}
                onSubmit={handleSubmitDelete}
                item={editItem}
            />}
            {openFormCreate && <CreateForm
                cancelEdit={handleCancelCreate}
                onSubmit={handleSubmitCreate}
                data={unidadesDeMedidaCodigoNombre}
            />}

            <style>
                {`.k-animation-container {
                    z-index: 10003;
                }`}
            </style>
        </>
    );
}

export default App;