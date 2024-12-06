import { Outlet } from "@remix-run/react";
import { Card, CardImage, GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

export default function TemplateBasic() {

    return (
        <>
            <GridLayout
                style={{  width: "100%", margin: "auto" }}
                className="colorRojo"
                cols={[
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" },
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" },
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" },
                    { width: "8.33%" }, { width: "8.33%" }, { width: "8.33%" }]}
            >
                <Outlet />
            </GridLayout>
        </>
    )
}