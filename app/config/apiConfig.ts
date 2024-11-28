import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;


export const API_ENDPOINTS_ATRIBUTOS = {
    GET : `${API_BASE_URL}/Atributos/GetAtributos`,
    POST : `${API_BASE_URL}/Atributos/ActualizarAtributo`,
    DELETE : `${API_BASE_URL}/Atributos/DeleteAtributo`
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
    POST : `${API_BASE_URL}/Productos/ActualizarProductoAtributos`
}

export const API_GRUPOS_PRODUCTO = {
    GET : `${API_BASE_URL}/GruposProductos/GetGruposProducto`
}

export const API_ENDPOINTS_TIPOS_PRODUCTO = {
    GET : `${API_BASE_URL}/TiposProducto/GetTiposProducto`
}

export const API_ENDPOINTS_LOGIN = {
    POST : `${API_BASE_URL}/Contexto/Contexto/Login`,
    GET : `${API_BASE_URL}/Contexto/Contexto/GetPreLoginInfo`
};
export const API_ENDPOINTS_GET_MAIN_MENU = `${API_BASE_URL}/Contexto/Contexto/GetMainMenu`;