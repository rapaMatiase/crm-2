import { json } from "@remix-run/node";
import { API_ENDPOINTS_UNIDADES_MEDIDA } from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getUnidadesMedida = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");
    
    const response = await fetch(`${API_ENDPOINTS_UNIDADES_MEDIDA.GET}`, {
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw ("Failed to fetch unidades de medida");
    }

    const unidadesMedidaData = await response.json();

    return json({unidadesMedidaData});

}