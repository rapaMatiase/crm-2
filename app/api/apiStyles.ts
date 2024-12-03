//CONFIG
import { API_ENDPOINT_STYLES } from "~/config/apiConfig";
//SESION
import { getSession } from "~/servicies/session.server";


export const getStyles = async ({request, params}: { request: Request, params: any }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const idView = params.idView;

    const response = await fetch(`${API_ENDPOINT_STYLES.GET}/IdVista/${idView}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const stylessData = await response.text();
    
    return stylessData;
}  