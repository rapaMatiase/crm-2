//REMIX
import { ListView, ListViewItemWrapper } from "@progress/kendo-react-listview";
import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Links, Outlet, useLoaderData } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
// import styles from "~/styles/cmsStyle.css?url";

export const loader: LoaderFunction = async ({ request, params }) => {
    const stylessData = await getStyles({ request, params });
    return { stylessData };
}

// export const links: LinksFunction = () => [
//     { rel: "stylesheet", href: styles },
// ];

const json = [
    {
        sede: "Buenos Aires",
        address: "3 de Febrero 4456 - Caseros - Buenos Aires",
        tel: "(011) 5263 8899 / (011) 5263 8899"
    },
    {
        sede: "Tucumán",
        address: "Avenida Adolfo de la Vega 470 - San Miguel de Tucumán - Tucumán",
        tel: "(0381) 423 7038 / (0381) 587 5337"
    },
    {
        sede: "Rosario",
        address: "Av. Pres. Perón 7973, Rosario - Rosario - Santa Fe",
        tel: "(0341) 208 2000 / (0341) 281 8218"
    },
    {
        sede: "Santa Fe",
        address: "Av. Galicia 2360, Santa Fe, Argentina - Santa Fe - Santa Fe",
        tel: "(0342) 469 1294 / (0342) 576 3225"
    },
    {
        sede: "Corrientes",
        address: "Medrano 1864, Corrientes, Argentina - Corrientes - Corrientes",
        tel: "(0379) 579 0290 / (0362) 411 5024"
    },
    {
        sede: "Córdoba",
        address: "Av. Circunvalación Agustín Tosco 3974 - Córdoba - Córdoba",
        tel: "(0351) 700 3000 / (0351) 563 6491"
    },
    {
        sede: "Mendoza",
        address: "Sobremonte 261, Guaymallén - Mendoza Capital - Mendoza",
        tel: "(011) 5263 8899 / (0351) 563 6457"
    },
    {
        sede: "Neuquén",
        address: "Lules 2520, Neuquén - Capital - Neuquén",
        tel: "(299) 513 7015 / (299) 513 7015"
    },
    {
        sede: "Salta",
        address: "Próximamente - Salta Capital - Salta",
        tel: "- / -"
    }
]

export default function TemplateBasic() {
    const { stylessData } = useLoaderData<{ stylessData: any }>();

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />
            <Outlet />
            <footer >
                <GridLayout className="cms-footer-grid cms-footer">
                    <GridLayoutItem className="cms-footer-grid_titulo cms-footer_titulo" >
                            <h1>Titulo </h1>
                    </GridLayoutItem>
                    {json.map((item, index) => {
                        return (
                            <GridLayoutItem key={`footer-${index}`} className={`cms-footer-grid_item-${index}  cms-footer_item-todos`}  >
                                    <span> {item.sede} </span>
                                    <span> {item.address} </span>
                                    <span> {item.tel} </span>
                            </GridLayoutItem>)
                    })}
                 
                </GridLayout>
            </footer>
        </>
    )
}

