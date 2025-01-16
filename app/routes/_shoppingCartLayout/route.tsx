//REMIX
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
//API
import { getStyles } from "~/api/apiStyles";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";


export const loader: LoaderFunction = async ({ request, params }) => {
    const stylessData = await getStyles({ request, params });
    return { stylessData};
}

export default function TemplateBasic() {
    const { stylessData } = useLoaderData<{ stylessData: any }>();

    return (
        <>
            <GridLayout
                className="cms-main-grid"
                /* cols={[{width : "1fr"}, {width : "1fr"}, {width : "1fr"}, {width : "1fr"},
                    {width : "1fr"}, {width : "1fr"}, {width : "1fr"}, {width : "1fr"},
                    {width : "1fr"}, {width : "1fr"}, {width : "1fr"}, {width : "1fr"}
                ]} */
            >
                <Outlet />  
                <div id="div-1" className="cms-div-1"></div>
                <div id="div-2" className="cms-div-2"></div>
                <div id="div-3" className="cms-div-3"></div>
                <div id="div-4" className="cms-div-4"></div>
                <div id="div-5" className="cms-div-5"></div>
                <div id="div-6" className="cms-div-6"></div>
                <div id="div-7" className="cms-div-7"></div>
                <div id="div-8" className="cms-div-8"></div>
                <div id="div-9" className="cms-div-9"></div>
                <div id="div-10" className="cms-div-10"></div>
                <div id="div-11" className="cms-div-11"></div>
                <div id="div-12" className="cms-div-12"></div>
                <div id="div-13" className="cms-div-13"></div>
                <div id="div-14" className="cms-div-14"></div>
                <div id="div-15" className="cms-div-15"></div>
                <div id="div-16" className="cms-div-16"></div>
                <div id="div-17" className="cms-div-17"></div>
                <div id="div-18" className="cms-div-18"></div>
                <div id="div-19" className="cms-div-19"></div>
                <div id="div-20" className="cms-div-20"></div>
            </GridLayout>
            <style dangerouslySetInnerHTML={{ __html: stylessData }} />
        </>
    )
}

