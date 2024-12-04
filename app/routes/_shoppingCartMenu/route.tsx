//REMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";

export const loader: LoaderFunction = async ({ request, params }) => {
    const stylessData = await getStyles({ request, params });
    return { stylessData };
}

export default function TemplateBasic() {
    const { stylessData } = useLoaderData<{ stylessData: any }>();

    return (
        <>
            <Outlet />
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />
            <footer>
                Este es el footer
            </footer>
        </>
    )
}

