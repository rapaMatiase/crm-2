import { Link } from "@remix-run/react";

export default function simularVistaTesting() {


    return (
        <>
            <ul>
                <li>
                    <Link to="/view/8/menu/1/template/home/scrollView/products/videos/events" target="_blank">Home </Link>
                </li>
                <li>
                    <Link to="/view/8/menu/1/template/detailProduct/breadcrumb/main/detail/othersModels" target="_blank">detail product </Link>
                </li>
                <li>
                    <Link to="/view/8/menu/1/template/listProduct/filters/products" target="_blank">list product </Link>
                </li>
                <li>
                    <Link to="/view/8/menu/1/template/videos/breadcrumb/list/video" target="_blank">videos </Link>
                </li>
                <li>
                    <Link to="/footer/view/23/menu/1/locations/search/template/home/scrollview/products" target="_blank">Nuevo home </Link>
                </li>
            </ul>
        </>
    )
}