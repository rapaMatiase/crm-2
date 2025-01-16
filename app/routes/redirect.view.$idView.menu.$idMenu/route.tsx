import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "react-router-dom";
import { getVista } from "~/api/apiContentSettings";
import ActionAnalyzer from "~/utils/menuActionAnalyzer";

export const loader: LoaderFunction = async ({ request, params }) => {
    const data = await getVista({ request, params });
    const actionAnalyzer = new ActionAnalyzer(action, navigate, urlParamsManager);


    return { data };
    
};

export default function VistaTemplate() {

    const { data } = useLoaderData<{ data: any }>();
console.log(data, "aca estoy")
    return (
        <>
        <h1>

        {data.templateName}
        </h1>
           holas
        </>
    );
}