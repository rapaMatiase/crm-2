//REMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";
//JSON HARCODEADO
import jsonRedesSociales from "~/api/apiRedesSociales";
import { getSession } from "~/servicies/session.server";
import { API_ENDPOINT_STYLES } from "~/config/apiConfig";

export const loader: LoaderFunction = async ({ request, params }) => {
    //const stylessData =  await getStyles({ request, params });
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const idView =  params.idView;

    const response = await fetch(`${API_ENDPOINT_STYLES.GET}/IdVista/${idView}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if(!response.ok) {
        throw new Response("No se puedo cargar los estilos para esta vista.", {
            statusText: "Error al obtener los estilos",
            status: 400,
        });
    }

    const stylessData = await response.text();

    const centrosDeOperacion = await getCentrosOperaciones({ request });
    return { stylessData, centrosDeOperacion };
}

export default function TemplateBasic() {
    const { stylessData, centrosDeOperacion } = useLoaderData<{ stylessData: any }>();

    return (
        <>
            <GridLayout
                cols={[
                    { width: "1fr" }, { width: "1fr" }, { width: "1fr" }, { width: "1fr" },
                    { width: "1fr" }, { width: "1fr" }, { width: "1fr" }, { width: "1fr" },
                    { width: "1fr" }, { width: "1fr" }, { width: "1fr" }, { width: "1fr" }]}
                rows={[{ height: "auto" }, { height: "auto" }, { height: "auto" }]}
                style={{ width: "100%" }}
                className="cms-grid-layout"
            >
                <Outlet />

                <footer className="cms-footer" style={{ display: "grid" }}>
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

                </footer>
            </GridLayout>
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />

            <div className='cms-home-body_redesSociales'>
                <GridLayout >
                    <GridLayoutItem  >
                        <h1>Conoce nuestras redes! </h1>
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


export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status} - {error.statusText}</h1>
                <p>{error.data}</p>
                <Outlet />
            </div>
        );
    }

    return (
        <div>
            <h1> Ocurrio un error inesperado. </h1>
        </div>
    );
}