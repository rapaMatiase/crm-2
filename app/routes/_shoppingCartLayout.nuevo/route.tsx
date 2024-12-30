//REMIX
import {  LoaderFunction } from "@remix-run/node";
import {  Outlet, useLoaderData } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";
//JSON HARCODEADO
import jsonRedesSociales from "~/api/apiRedesSociales";


export default function TemplateBasic() {

    return (
        <>
        hola
        </>
    )
}

