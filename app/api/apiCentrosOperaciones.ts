import { json } from "@remix-run/node";
import { API_ENDOPOINT_CENTROS_OPERACIONES} from "~/config/apiConfig";
import { getSession } from "~/servicies/session.server";

export const getCentrosOperaciones = async ({ request }: { request: Request }) => {
   /* const cookie = request.headers.get("Cookie");
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

    return centrosOperaciones;*/

return [
  {
    "idCentroOperaciones": 2,
    "nombre": "Buenos Aires",
    "activo": true
  },
  {
    "idCentroOperaciones": 3,
    "nombre": "Rosario",
    "activo": true
  },
  {
    "idCentroOperaciones": 4,
    "nombre": "Santa Fe",
    "activo": true
  },
  {
    "idCentroOperaciones": 5,
    "nombre": "Tucuman RotoPlast",
    "activo": true
  },
  {
    "idCentroOperaciones": 6,
    "nombre": "Tucuman Comercial",
    "activo": true
  },
  {
    "idCentroOperaciones": 8,
    "nombre": "Cordoba",
    "activo": true
  },
  {
    "idCentroOperaciones": 9,
    "nombre": "Corrientes",
    "activo": true
  },
  {
    "idCentroOperaciones": 10,
    "nombre": "Mendoza",
    "activo": true
  },
  {
    "idCentroOperaciones": 11,
    "nombre": "Neuquen",
    "activo": true
  },
  {
    "idCentroOperaciones": 12,
    "nombre": "IDEE",
    "activo": true
  },
  {
    "idCentroOperaciones": 13,
    "nombre": "Salta",
    "activo": true
  },
  {
    "idCentroOperaciones": 14,
    "nombre": "Cocchiararo",
    "activo": true
  },
  {
    "idCentroOperaciones": 15,
    "nombre": "Obrador express 001",
    "activo": true
  }
]

}