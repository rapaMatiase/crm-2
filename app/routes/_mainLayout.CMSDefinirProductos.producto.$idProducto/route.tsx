//REACT
import { useState } from "react";
//REMIX
import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useParams, useSearchParams, useSubmit } from "@remix-run/react";
//TELERIK
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column, GridCellProps, GridToolbar } from "@progress/kendo-react-grid";
//COMPONENTS 
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import CreateForm from './CreateForm';
//SESION
import { getSession } from "~/servicies/session.server";
//CONFIG
import { API_ENDPOINTS_PRODUCTOS, API_ENDPOINTS_UNIDADES_MEDIDA, API_ENDPOINTS_ATRIBUTOS } from "~/config/apiConfig";
import { ROUTE_BASE_PRODUCTOS } from "~/config/routesConfig";

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




export const loader: LoaderFunction = async ({ request, params }) => {

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("user")?.token;

    const { idProducto } = params;

    const response = await fetch(`${API_ENDPOINTS_PRODUCTOS.GET}/IdProductobase/${idProducto}`, {
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
    const response2 = await fetch(`${API_ENDPOINTS_UNIDADES_MEDIDA.GET}`, {
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


    const response3 = await fetch(`${API_ENDPOINTS_ATRIBUTOS.GET}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response3.ok) {
        throw new Error("Failed to fetch data");
    }

    const todosAtributosData = await response3.json();

    return json({ atributosDataFormat, unidadesDeMedidaCodigoNombre, todosAtributosData });
};

export const action: ActionFunction = async ({ request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");
    
    const formData = await request.formData();
    const idProducto = formData.get("idProductoBase");
    const atributos = JSON.parse(formData.get("atributos") as string);

    const productoAtributos = {
        idProductoBase: Number(idProducto),
        atributos: atributos.map((atributo: any) => {
            return {
                idAtributoProducto: Number(idProducto),
                idAtributo: atributo.idAtributo,
                strUniMed: atributo.strUniMed,
                strValor: atributo.strValor,
            }
        })
    }

    const jsonProductoAtributos = JSON.stringify(productoAtributos);

    const response = await fetch(`${API_ENDPOINTS_PRODUCTOS.POST}`, {
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


export default function CMSDefinirProductosGrillaAtributos() {

    //REMIX-HOOK
    const [searchParams, setSearchParams] = useSearchParams();
    const { idProducto } = useParams();
    const { atributosDataFormat: atributosData, unidadesDeMedidaCodigoNombre, todosAtributosData } = useLoaderData<{ atributosDataFormat: Atributo[], unidadesDeMedidaCodigoNombre: string[] }>();
    const serchJson = searchParams.get("search");
    const navigate = useNavigate();
    const submit = useSubmit();


    const codigoNombre = JSON.parse(serchJson).codigoNombre
    const Atributos = [...atributosData];
    
    const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
    const [openFormDelete, setOpenFormDelete] = useState<boolean>(false);
    const [openFormCreate, setOpenFormCreate] = useState<boolean>(false);

    const [editItem, setEditItem] = useState<Atributo>({ idAtributo: 0 });
    const [data, setData] = useState<Array<Atributo>>(Atributos);

    const enterCreate = () => {
        setOpenFormCreate(true);
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

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("idProductoBase", idProducto || "");
        formData.append("atributos", JSON.stringify(data));
        submit(formData, { method: 'POST' });
        navigate(`${ROUTE_BASE_PRODUCTOS}`);
    }

    return (
        <>
            <h2>{codigoNombre}</h2>
            <Grid style={{ height: "500px" }} data={data}>
                <GridToolbar>

                    <Button type="button"  onClick={enterCreate}> Agregar atributo </Button>

                    <Button
                        onClick={() => {
                            navigate(`${ROUTE_BASE_PRODUCTOS}`);
                        }}> Cancelar y volver </Button>

                    <Button  themeColor={"primary"} onClick={handleSubmit}> Guardar todo </Button>

                </GridToolbar>

                <Column field="idAtributo" title="Id" width="50px" editable={false} />
                <Column field="nombre" title="Nombre atributo" />
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
                dataAtributos={todosAtributosData}
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
                dataAtributos={todosAtributosData}
            />}

        </>
    );
}
