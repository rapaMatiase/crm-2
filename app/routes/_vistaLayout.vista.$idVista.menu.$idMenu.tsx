//RREMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
//SERVICE
import { getSession } from "~/session.server";
//telerik
import { Menu, AppBar, AppBarSection, AppBarSpacer, MenuItem } from '@progress/kendo-react-layout';


// export const loader : LoaderFunction = async ({ request, params }) => {
//     const {idVista, idMenu} = params;
//     const session = await getSession(request.headers.get("Cookie"));
//     const token = session.get("user")?.token;

//     const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/ContentSettings/ContentSettings/GetMenu/IdVista/${idVista}/IdMenu/${idMenu}`,
//         {
//             method: "GET",
//             headers: {
//                 Authorization: token
//             }
//         }
//     );
    
//     const menus = await response.json();
    
//     const title = menus.title;
//     const menuItems = menus.menuItems.map((item: any) => {
//         return {
//             text : item.title,
//             items : item.menuItems.map((subItem: any) => {
//                 return {
//                     text : subItem.title,
//                 }
//             })
//         }
//     });
//     return {title, menuItems};
// }

const itemRender = (props) => {
    return (
        <div style={{width : "100%", backgroundColor :"red"}}>
            <span>{props.item.text}</span>
            
        </div>
    )
}

const menu = {
    title : "titulo principal",
    menuItems: [
        {
            text : "titulo secundario",
            items : [
                {
                    text : "titulo terciario"
                }
            ]
        },
        {
            text : "titulo secundario",
            items : [
                {
                    text : "titulo terciario"
                }
            ]
        }
    ]
}

export default function vista(){
    const {idVista, idMenu} = useParams();
    const {title, menuItems} = menu; //useLoaderData<any[]>();
    console.log(menuItems)
    return (
        <>
            <h1 className="title">{title} </h1>
            <AppBar>

                <AppBarSpacer style={{ width: 4 }} />

            
                <AppBarSection>
                     <Menu items={menuItems} /* onSelect={handleSelectMenu} *//> 
                </AppBarSection>

                <AppBarSection>
                    <Menu>
                        <MenuItem text="queso"  render={itemRender} />
                    </Menu>
                </AppBarSection>

                <AppBarSpacer />


            </AppBar>
            <Outlet />
        </>
    )
}