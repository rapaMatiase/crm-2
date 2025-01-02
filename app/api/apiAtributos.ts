//CONFIG
import { API_ENDPOINTS_ATRIBUTOS } from "~/config/apiConfig";
//SERVICES
import { getSession } from "~/servicies/session.server";

export const getAtributos = async ({ request }: { request: Request }) => {

    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_ATRIBUTOS.GET}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });

    return response;
}

export const postAtributo = async ({ request, atributo }: { request: Request, atributo: any }) => {
    
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (!session.has("user")) {
        return new Response("User session is not active", { status: 401 });
    }

    const atributoJson = JSON.stringify(atributo);

    const response = await fetch(`${API_ENDPOINTS_ATRIBUTOS.POST}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: atributoJson
    });

    if (!response.ok) {
        throw new Error(`Fallo el update atributo en postAtributo: ${response.statusText}`);
    } 
}

export const deleteAtributo = async ({ request, idAtributo }: { request: Request, idAtributo: string }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_ATRIBUTOS.DELETE}/IdAtributo/${idAtributo}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw ("Failed to delete atributo");
    }
};








