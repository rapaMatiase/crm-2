//REMIX
import { ListView, ListViewItemWrapper } from "@progress/kendo-react-listview";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

export const loader: LoaderFunction = async ({ request, params }) => {
    const stylessData = await getStyles({ request, params });
    return { stylessData };
}


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
            <Outlet />
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />
            <footer style={{backgroundColor :  "green"}}>
                <GridLayout
                    style={{height : 600}}
                    rows={[{ height: "100%" }]}
                    cols={[{ width: "60%" }, { width: "30%" }, { width: "10%" }]}
                >
                    <GridLayoutItem row={1} col={2} style={{backgroundColor : "red"}}>
                        <h2>Comuniquese con Leiten</h2>
                        <ListView
                            data={json}
                            style={{ width: "100%" }}
                            item={(props) => {
                                return <ListViewItemWrapper style={{display : "flex", flexDirection : "column"}}>
                                    <span> {props.dataItem.sede} </span>
                                    <span> {props.dataItem.address} </span>
                                    <span> {props.dataItem.tel} </span>
                                </ListViewItemWrapper>
                            }}
                        />
                    </GridLayoutItem>

                </GridLayout>

            </footer>
        </>
    )
}

