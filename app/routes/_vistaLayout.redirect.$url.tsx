//RREMIX
import { LoaderFunction, redirect } from "@remix-run/node";
//SERVICE


export const loader: LoaderFunction = async ({ request, params }) => {
  const {url} = params;

    return redirect(`https://${url}`);
}

