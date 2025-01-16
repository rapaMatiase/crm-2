// REMIX
import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { useState } from "react";
import { GridLayoutItem } from "@progress/kendo-react-layout";
import { LoaderFunction } from "@remix-run/node";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBoxSimple } from "~/components/fm-components";
import { getCentrosOperaciones } from "~/api/apiCentrosOperaciones";

export const loader: LoaderFunction = async ({ request }) => {
  const sucursales = await getCentrosOperaciones({ request });
  return sucursales;
};

export default function Component() {
  const sucursales = useLoaderData<typeof loader>();

  // Inicializar el estado con "Buenos Aires" o la primera sucursal
  const [selectedSucursal, setSelectedSucursal] = useState(() => {
    return (
      sucursales[0]
    );
  });

  // Función para manejar el cambio de sucursal
  const handleSucursalChange = (event: any) => {
    const selectedName = event.value;
    const sucursal = sucursales.find(
      (item: { nombre: string }) => item.nombre === selectedName
    );
    setSelectedSucursal(sucursal || sucursales[0]);
  };

  return (
    <>
      <GridLayoutItem row={1} col={9} className="cms-header_sucursales">
        <Form
          initialValues={{ sucursales: selectedSucursal?.nombre }}
          render={() => (
            <FormElement>
              <Field
                component={FormComboBoxSimple}
                name="sucursales"
                id="sucursales"
                data={sucursales.map((item: { nombre: string }) => item.nombre)}
                onChange={handleSucursalChange}
                value={selectedSucursal?.nombre}
              />
            </FormElement>
          )}
        />
      </GridLayoutItem>
      <GridLayoutItem  row={1} col={10} className="cms-header_sucursales_whatsapp">
        <p>
          {selectedSucursal.telefonoContactoComercial}
        </p>
      </GridLayoutItem>
      <GridLayoutItem row={1} col={11} className="cms-header_sucursales_nombre_sucursal">
        <p>
          {selectedSucursal.nombreProvincia}
        </p>
      </GridLayoutItem>
      <GridLayoutItem row={1} col={12} className="cms-header_sucursales_instagram">
        <a href={selectedSucursal.urlInstagram} target="_blank" rel="noreferrer" >
        <div style={{ width: "100px", height: "100px", backgroundColor: "blue" }}>

        </div>
        </a>
      </GridLayoutItem>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.status} - {error.statusText}
      </div>
    );
  }

  return (
    <>
      <div> Sin datos para este menú </div>
      <Outlet />
    </>
  );
}
