// TemplateBasic.tsx
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
// API
import { getStyles } from "~/api/apiStyles";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";
// Componentes
import Footer from "~/components/footer-component";

export const loader: LoaderFunction = async ({ request, params }) => {
    const stylessData = await getStyles({ request, params });
    //const centrosDeOperacion = await getCentrosOperaciones({ request });
    return { stylessData,  /* centrosDeOperacion */ };
}

export default function TemplateBasic() {
    const { stylessData, /* centrosDeOperacion */ } = useLoaderData<{ stylessData: any }>();

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />
            <Outlet />
            
        </>
    );
}
