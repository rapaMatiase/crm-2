//REMIX
import { Outlet, useActionData} from "@remix-run/react";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
//TELERIK
import { useLoaderData, useSubmit } from "@remix-run/react";
import { Form, Field, FormElement, FieldWrapper, FormRenderProps } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
//SESION
import { sessionStorage } from "~/servicies/session.server";
//CONFIG
import { API_ENDPOINTS_LOGIN } from "~/config/apiConfig";
import { ROUTE_MAIN_LAYOUT } from "~/config/routesConfig";
import { getLogin } from "~/api/apiContentSettings";

export const loader: LoaderFunction = async ({ request }) => {

    const response = await getLogin({ request });
    return response
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const password = formData.get("password");

    const response = await fetch(`${API_ENDPOINTS_LOGIN.POST}`, {
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


    if (!response.ok) {
        return json({ error: "Usuario no encontrado. Revice sus credenciales." }, { status: 401 });
    }

    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    session.set("user", { name: result.nomUsr, token: result.sessionId });
    const cookieHeader = await sessionStorage.commitSession(session);

    return redirect(` ${ROUTE_MAIN_LAYOUT}`, { headers: { "Set-Cookie": cookieHeader } });
};

export default function Login() {

    //REMIX-HOOKS
    const submit = useSubmit();
    const actionData = useActionData();
    const { titulo } = useLoaderData<{ titulo: string }>();

    return (
        
        < >
            <h1 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                margin: "auto"
            }}
            >{titulo}</h1>
            <h2 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                margin: "auto"
            }}
            > Login </h2>
            {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
            <Form
                onSubmit={(dataItem, event) => {
                    event?.preventDefault();
                    submit(dataItem, { method: "post" });
                }}
                render={(renderProps: FormRenderProps) => (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                        margin: "auto"
                    }}>
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
                    </div>
                )}
            />
            <Outlet />
        </>
    );
};
