import { json } from "@remix-run/node";
import { API_GRUPOS_PRODUCTO } from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getGruposProducto = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const {token} = session.get("user");

    const response = await fetch(`${API_GRUPOS_PRODUCTO.GET}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const gruposProductosData = await response.json();

    return json({gruposProductosData});
}