import dotenv from 'dotenv';

dotenv.config();

export const API_BASE_URL = process.env.API_BASE_URL;


export const API_ENDPOINTS_ATRIBUTOS = {
    GET : `${API_BASE_URL}/Atributos/GetAtributos`,
    POST : `${API_BASE_URL}/Atributos/ActualizarAtributo`,
    DELETE : `${API_BASE_URL}/Atributos/DeleteAtributo`,
    GET_MARCAS : `${API_BASE_URL}/Atributos/GetMarcas`,
    POST_MARCAS : `${API_BASE_URL}/Atributos/ActualizarMarca`,
    GET_GRUPOS_PRODUCTOS : `${API_BASE_URL}/Atributos/GetGruposProductos`,
    GET_SEGMENTOS : `${API_BASE_URL}/Atributos/GetSegmentos`,
    GET_TIPOS_PRODUCTOS : `${API_BASE_URL}/Atributos/GetTiposProducto`,
};

export const API_ENDPOINTS_UNIDADES_MEDIDA = {
    GET : `${API_BASE_URL}/UnidadesMedida/GetUnidadesMedida`,
}

export const API_ENDPOINTS_REGLAS_VALIDACION_ATRIBUTOS = {
    GET : `${API_BASE_URL}/Atributos/GetReglaValidacionAtributos`,
    POST : `${API_BASE_URL}/Atributos/ActualizarReglaValidacionAtributo`,
    DELETE : `${API_BASE_URL}/Atributos/DeleteReglaValidacionAtributo`
};

export const API_ENDPOINTS_PRODUCTOS = {
    SEARCH : `${API_BASE_URL}/Productos/GetProductosBasePorBusquedaAmbigua`,
    GET : `${API_BASE_URL}/Productos/GetAtributosPorProducto`,
    POST : `${API_BASE_URL}/Productos/ActualizarProductoAtributos`,
    GET_TEXTOS: `${API_BASE_URL}/Productos/GetTextosPorProducto`,
    GET_TIPOS_TEXTO: `${API_BASE_URL}/Productos/GetTiposTexto`,
    SET_TEXTO: `${API_BASE_URL}/Productos/ActualizarProductoTexto`,
    DELETE_TEXTO: `${API_BASE_URL}/Productos/DestroyProductoTexto`,
}

export const API_GRUPOS_PRODUCTO = {
    GET : `${API_BASE_URL}/GruposProductos/GetGruposProducto`
}

export const API_ENDPOINTS_TIPOS_PRODUCTO = {
    GET : `${API_BASE_URL}/TiposProducto/GetTiposProducto`
}

export const API_ENDPOINTS_LOGIN = {
    POST : `${API_BASE_URL}/Contexto/Contexto/Login`,
    GET : `${API_BASE_URL}/Contexto/Contexto/GetPreLoginInfo`,
    GET_MAIN_MENU: `${API_BASE_URL}/Contexto/Contexto/GetMainMenu`

};

export const API_ENDPOINTS_CONTENT_SETTEINGS = {
    IMAGE : `${API_BASE_URL}/ContentSettings/GetImagen`,
    MENU : `${API_BASE_URL}/ContentSettings/ContentSettings/GetMenu`, 
    VISTA : `${API_BASE_URL}/ContentSettings/ContentSettings/GetVistas`,
    GET_ATRIBUTOS_CMS : `${API_BASE_URL}/ContentSettings/GetAtributosCMS`,
    SET_IMAGEN : `${API_BASE_URL}/ContentSettings/SetImagen`,
    GET_ITEMS: `${API_BASE_URL}/ContentSettings/GetItems`,
    GET_CONTENIDO_FICHA_ITEM: `${API_BASE_URL}/ContentSettings/GetContenidoFichaItem`,
    GET_MIMETYPE: `${API_BASE_URL}/ContentSettings/GetMimeTypes`,
    GET_TIPOS_CONTENIDO: `${API_BASE_URL}/ContentSettings/GetTiposContenido`,
    GET_IMAGENES: `${API_BASE_URL}/ContentSettings/GetImagenes`,
    DELETE_IMAGEN: `${API_BASE_URL}/ContentSettings/DeleteImagen`,
    POST_CARRUSEL: `${API_BASE_URL}/ContentSettings/GetCarruselConfig`,
    POST_VIDEOS: `${API_BASE_URL}/ContentSettings/GetVideosConfig`,
    GET_EVENTOS: `${API_BASE_URL}/ContentSettings/GetEventos`,
}

export const API_ENDPOINTS_GET_MAIN_MENU = `${API_BASE_URL}/Contexto/Contexto/GetMainMenu`;

export const API_ENDPOINT_STYLES = {
    GET : `${API_BASE_URL}/Styles/GetStyle`
}

export const API_ENDOPOINT_CENTROS_OPERACIONES = {
    GET_CENTROS_OPERACIONES : `${API_BASE_URL}/CentrosOperaciones/GetCentrosOperaciones`
}