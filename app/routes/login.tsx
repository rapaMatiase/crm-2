import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Input, NumericTextBox, Checkbox, TextArea } from "@progress/kendo-react-inputs";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";


import { useActionData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { sessionStorage } from "~/session.server";


// export const loader: LoaderFunction = async ({ request }) => {

//     const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/Contexto/Contexto/GetPreLoginInfo`,
//         {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             }
//         }
//     );

//     const result = await response.json();

//     if (!response.ok) {
//         throw new Error("Failed to fetch pre-login info");
//     }

//     return (result);

// }

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const password = formData.get("password");

    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Contexto/Contexto/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codUsr: name,
            passWord: password,
        }),
    });

    const result = await response.json();

    if (response.status === 401) {
        return json({ error: "Unauthorized: Invalid username or password" }, { status: 401 });
    }

    if (!response.ok) {
        return json({ error: "Usuario no encontrado. Revice sus credenciales." }, { status: 401 });
        throw new Error("Failed to fetch unidades de medida");
    }

    const session = await sessionStorage.getSession(request.headers.get("Cookie"));

    // Set some session data
    session.set("user", { name: result.nomUsr, token: result.sessionId });

    // Commit the session data to the store
    const cookieHeader = await sessionStorage.commitSession(session);

    return redirect("/index", { headers: { "Set-Cookie": cookieHeader } });
};






export default function Login() {
    const submit = useSubmit();
    const actionData = useActionData();

    // const {titulo} = useLoaderData();
    return (
        <>
            {/* <h1>{titulo}</h1> */}
            <h2> Login </h2>
            {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
            <Form
                onSubmit={(dataItem, event) => {
                    event?.preventDefault();
                    submit(dataItem, { method: "post" });
                }}
                render={(renderProps: FormRenderProps) => (
                    <FormElement>
                        <FieldWrapper>
                            <Field
                                name={"name"}
                                component={Input}
                                type={"text"}
                                label={"Nombre"} />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                name={"password"}
                                component={Input}
                                type={"password"}
                                label={"Contraseña"} />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Button
                                themeColor={"primary"}
                                disabled={!renderProps.allowSubmit}
                                icon="save"
                            >
                                Entrar
                            </Button>
                        </FieldWrapper>
                    </FormElement>
                )}
            />
        </>
    );
};
