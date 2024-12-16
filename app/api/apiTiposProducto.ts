import { json } from "@remix-run/node";
import { API_ENDPOINTS_ATRIBUTOS } from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getTiposProducto = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_ATRIBUTOS.GET_TIPOS_PRODUCTOS}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data: ${errorText}`);
    }

    const tiposProductoData = await response.json();

    return tiposProductoData ;
}