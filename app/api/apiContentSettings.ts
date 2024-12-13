//CONFIG
import { redirect } from "@remix-run/node";
import { API_ENDPOINTS_CONTENT_SETTEINGS } from "~/config/apiConfig";
import { ROUTE_LOGIN } from "~/config/routesConfig";
//SERVICES
import { getSession } from "~/servicies/session.server";

export const getVistas = async ({ request }: { request: Request }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (token === undefined) {
        redirect(`${ROUTE_LOGIN}`);
    }

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.VISTA}`,
        {
            method: "GET",
            headers: {
                Authorization: token
            }
        }
    );

    const vistasData = await response.json();

    return vistasData;
}

export const getImage = async ({ request, id }: { request: Request, id: string }) => {

    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (token === undefined) {
        redirect(`${ROUTE_LOGIN}`);
    }

    const imageResponse = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.IMAGE}/Id/${id}/TipoContenido/0`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });


    
    if (!imageResponse.ok) {
        const imageResponseBody = await imageResponse.json();
        if (imageResponseBody.message.startsWith("No existe la imagen buscada")) {
            return null;
        }
        throw new Error('Network response was not ok');
    }

    const imageBlob = await imageResponse.blob();
    const imageArrayBuffer = await imageBlob.arrayBuffer();
    const imageBase64 = btoa(
        new Uint8Array(imageArrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const image = `data:image/jpeg;base64,${imageBase64}`;

    return image;
}

export const getMenu = async ({ request, idView, idMenu }: { request: Request, idView: string, idMenu: string }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (token === undefined) {
        redirect(`${ROUTE_LOGIN}`);
    }

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.MENU}/IdVista/${idView}/IdMenu/${idMenu}`,
        {
            method: "GET",
            headers: {
                Authorization: token
            }
        }
    );

    const menus = await response.json();
    return menus;
}

export const getImagenesTipoEntidad = async ({ request, tipoEntidad, idEntidad }: { request: Request, tipoEntidad: String, idEntidad : any}) => {

  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const { token } = session.get("user");

  const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.GET_IMAGENES}/TipoEntidad/${tipoEntidad}/IdEntidad/${idEntidad}`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }
  );

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Expected data to be an array");
  }

  const dataWithImages = data.map((item) => {
    const image = `data:image/jpeg;base64,${item.rawMedia}`;
    return {
      ...item,
      rawMedia: image
    };
  });

  return dataWithImages;
}

export const getAtributosCMS = async ({ request, idView, idMenu, arrayFilterJson }: { request: Request, idView: string, idMenu: string, arrayFilterJson: string }) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (token === undefined) {
        redirect(`${ROUTE_LOGIN}`);
    }

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.GET_ATRIBUTOS_CMS}?IdVista=${idView}&Id=${idMenu}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: arrayFilterJson
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;

}

export const getItems = async ( request, idView, arrayFilterJson  ) => {

    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (token === undefined) {
        redirect(`${ROUTE_LOGIN}`);
    }
    
    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.GET_ITEMS}?IdVista=${idView}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: arrayFilterJson
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

    const data = await response.json();

    return data;
}

export const getContenidoFichaItem = async ( request, idView) => {
    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    if (token === undefined) {
        redirect(`${ROUTE_LOGIN}`);
    }

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.GET_CONTENIDO_FICHA_ITEM}?IdVista=${idView}`,
        {
            method: "POST",
            headers: {
                Authorization: token
            }
        }
    );

    const data = await response.json();
    return data;
}

export const postSetImagen = async ({ request, tipoEntidad, idEntidad, data }: { request: Request, tipoEntidad: string, idEntidad: string, data: any }) => {

    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.SET_IMAGEN}?TipoEntidad=${tipoEntidad}&IdEntitidad=${idEntidad}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
        
    });

    return response;

};



export const getMimeType = async ({ request}: { request: Request}) => {

    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.GET_MIMETYPE}`,
        {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
                Authorization: token
            }
        }
    );

    return response.json()
};

export const getTipoContenido = async ({ request}: { request: Request}) => {

    const cookie = request.headers.get("Cookie");
    const session = await getSession(cookie);
    const { token } = session.get("user");

    const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.GET_TIPOS_CONTENIDO}`,
        {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
                Authorization: token
            }
        }
    );

    return response.json()
};

export const deleteImagenes = async ({request, idMediaEntity}) => {
    
  
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const {token} = session.get("user");

  const response = await fetch(`${API_ENDPOINTS_CONTENT_SETTEINGS.DELETE_IMAGEN}?IdMediaEntity=${idMediaEntity}`, {
      method: 'DELETE',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
      }
  });

  return response 
}