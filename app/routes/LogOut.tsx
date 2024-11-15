//REMIX
import {  redirect } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
//SESION
import { sessionStorage } from "~/servicies/session.server";
//COMPONENTS
import { ROUTE_LOGIN } from "~/config/routesConfig";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    return redirect(`${ROUTE_LOGIN}`, {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
};