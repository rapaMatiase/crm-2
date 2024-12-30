//REMIX
import {  LoaderFunction } from "@remix-run/node";
import {  Outlet, useLoaderData } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";
//JSON HARCODEADO
import jsonRedesSociales from "~/api/apiRedesSociales";

export const loader: LoaderFunction = async ({ request, params }) => {
    const stylessData = await getStyles({ request, params });
    const centrosDeOperacion = await getCentrosOperaciones({ request });
    return { stylessData,  centrosDeOperacion };
}

export default function TemplateBasic() {
    const { stylessData, centrosDeOperacion } = useLoaderData<{ stylessData: any }>();

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />
            <Outlet />
            <footer >
                <GridLayout className="cms-footer-grid cms-footer">
                    <GridLayoutItem className="cms-footer-grid_titulo cms-footer_titulo" >
                            <h1>Titulo </h1>
                    </GridLayoutItem>
                    {centrosDeOperacion.map((item, index) => {
                        return (
                            <GridLayoutItem key={`footer-${index}`} className={`cms-footer-grid_item-${index}  cms-footer_item-todos`}  >
                                    <span> {item.idCentrosOperaciones} </span>
                                    <span> {item.nombre} </span>
                                    <span> {item.activo} </span>
                            </GridLayoutItem>)
                    })}
                 
                </GridLayout>
            </footer>
        <div className='cms-home-body_redesSociales'>
        <GridLayout >
            <GridLayoutItem  >
                <h3>Conoce nuestras redes! </h3>
            </GridLayoutItem>
            {jsonRedesSociales.map((red, index) => (
                <a key={index} href={red.url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={red.iconoBase64}
                        alt={red.nombre}
                        style={{ width: "30px", height: "30px", marginRight: "10px" }}
                    />
                    
                </a>
            ))}
        </GridLayout>
        </div>
        </>
    )
}

