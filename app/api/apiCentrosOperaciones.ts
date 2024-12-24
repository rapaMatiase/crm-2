import { json } from "@remix-run/node";
import { API_ENDOPOINT_CENTROS_OPERACIONES} from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getCentrosOperaciones = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");
    
    const response = await fetch(`${API_ENDOPOINT_CENTROS_OPERACIONES.GET_CENTROS_OPERACIONES}`, {
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw ("Failed to fetch centros operaciones");
    }

    const centrosOperaciones = await response.json();

    return centrosOperaciones;

}