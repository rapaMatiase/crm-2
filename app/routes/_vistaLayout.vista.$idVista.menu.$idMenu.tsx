//RREMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
//SERVICE
import { getSession } from "~/session.server";
//telerik
import { Menu, AppBar, AppBarSection, AppBarSpacer, MenuItem } from '@progress/kendo-react-layout';



export default function vista(){
    return (
        <>
            <Outlet />
        </>
    )
}