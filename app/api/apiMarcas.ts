import { API_ENDPOINTS_ATRIBUTOS } from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getMarcas = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_ATRIBUTOS.GET_MARCAS}`, {
        method: 'GET',
        headers: {
            "Authorization": token

        }
    });

    return response;
};