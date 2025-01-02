import { API_ENDPOINTS_ATRIBUTOS } from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getSegmentos = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_ATRIBUTOS.GET_SEGMENTOS}`, {
        method: 'GET',
        headers: {
            "Authorization": token

        }
    });

    const result = await response.json();
    return result;
};
