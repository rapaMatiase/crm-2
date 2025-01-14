
const ROUTE_TEMPLATE_CONFIG = {
    //NAVEGARFILTROLISTA : (idView: string, idMenu: string) => (`/view/${idView}/menu/${idMenu}/template/listProduct/filters/products`),
    NAVEGARFILTROLISTA : (idView: string, idMenu: string) => (`/view/${idView}/menu/${idMenu}/template/listProduct2/breadcrumb/chiplist/filters/products`),
    HomePageBasic : (idView: string, idMenu: string) => (`/view/${idView}/menu/${idMenu}/template/home/scrollView/products/events`),
    ProductoListPageBasic : (idView: string, idMenu: string) => (`/view/${idView}/menu/${idMenu}/template/listProduct2/breadcrumb/chiplist/filters/products`),
    DetailProductPageBasic : (idView: string, idMenu: string) => (`/view/${idView}/menu/${idMenu}/template/detailProduct/breadcrumb/main/detail/othersModels`),
    HomePageComponent : (idView: string, idMenu: string) => (`/footer/view/${idView}/menu/${idMenu}/locations/search/template/home/scrollView/products`), 
}

export default ROUTE_TEMPLATE_CONFIG;