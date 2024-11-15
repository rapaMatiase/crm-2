import { json } from "@remix-run/node";
import { API_ENDPOINTS_REGLAS_VALIDACION_ATRIBUTOS } from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getReglasDeValidacionAtributos = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");


    const response = await fetch(`${API_ENDPOINTS_REGLAS_VALIDACION_ATRIBUTOS.GET}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const reglasValidacionAtributoData = await response.json();

    return json({reglasValidacionAtributoData});
}

export const postReglaDeValidacionAtributos = async ({ request, reglaValidacionAtributo }: { request: Request, reglaValidacionAtributo : any }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");

    const reglaValidacionAtributoJson = JSON.stringify(reglaValidacionAtributo);

    const response = await fetch(`${API_ENDPOINTS_REGLAS_VALIDACION_ATRIBUTOS.POST}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: reglaValidacionAtributoJson
    });

    if (!response.ok) {
        throw new Error(`Failed to update regla de validacion: ${response.statusText}`);
    }
}