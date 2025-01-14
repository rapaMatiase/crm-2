//REMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ListView, ListViewItemProps } from "@progress/kendo-react-listview";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";
//JSON HARCODEADO
import { getContenidoFichaSucursalItem } from "~/api/apiContentSettings";
import { createComponent } from "~/utils/ParseHtmlInjeccion";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { idView } = params;
    const centrosDeOperacion = await getCentrosOperaciones({ request });
    const centroDeOperacionHtml = await getContenidoFichaSucursalItem({ request, idView });
    return { centrosDeOperacion, centroDeOperacionHtml };
}

const itemRender = (props: ListViewItemProps, dataHtml: string) => {
    const item = props.dataItem;
    return (
        <div className="cms-centros-operaciones_lista-item" >
            {createComponent(dataHtml.body[0], props.dataItem)}
            {/* <span> {item.nombre} </span>
            <span> {item.calle} {item.numero}- {item.localidad} - {item.nombreProvincia} </span> */}
        </div>

    )

}

export default function TemplateBasic() {
    const { centrosDeOperacion, centroDeOperacionHtml } = useLoaderData<any>();
    
    return (
        <>
            <Outlet />
            <GridLayoutItem row={14} col={1} colSpan={12} className="cms-centros-operaciones_titulo" >
                <h1>Titulo </h1>
            </GridLayoutItem>

            <GridLayoutItem row={15} col={1} colSpan={12} style={{ width: 400 }} className="cms-centros-operaciones_lista" >
                <ListView
                    data={centrosDeOperacion}
                    item={(props) => itemRender(props, centroDeOperacionHtml)}
                />
            </GridLayoutItem>

            <GridLayoutItem row={14} rowSpan={2} col={1} colSpan={12} className="cms-centros-operaciones_fondo" style={{ backgroundColor: "red", zIndex: -1 }} >

            </GridLayoutItem>
        </>
    )
}

