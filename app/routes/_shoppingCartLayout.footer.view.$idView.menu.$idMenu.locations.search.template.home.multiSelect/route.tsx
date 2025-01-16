import { GridLayoutItem } from "@progress/kendo-react-layout";
import { Outlet } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { useState } from "react";
import { ComboBox, ComboBoxChangeEvent } from "@progress/kendo-react-dropdowns";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

const jsonHarcodeado = [
  "Real Madrid",
  "Barcelona",
  "Manchester United",
  "Bayern Munich",
  "Juventus",
];

export default function Component() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleComboBoxChange = (event: ComboBoxChangeEvent) => {
    setInputValue(event.value || ""); 
  };

const handleAddTeam = () => {
    if (inputValue.trim() && !selectedTeams.includes(inputValue)) {
        setSelectedTeams(prevTeams => [...prevTeams, inputValue]);
        setInputValue("");
    }
};

  return (
    <>
      <div style={{ marginBottom: "50px", display: "flex", alignItems: "center" }}>
        <MultiSelect
          data={jsonHarcodeado.concat(selectedTeams.filter((team) => !jsonHarcodeado.includes(team)))}
          value={selectedTeams}
          onChange={(event) => setSelectedTeams(event.target.value)}
          placeholder="Selecciona equipos"
        />
      </div>

      <ComboBox style={{ marginBottom: "50px", display: "flex", alignItems: "center" }}
        data={jsonHarcodeado.concat(selectedTeams.filter((team) => !jsonHarcodeado.includes(team)))}
        value={inputValue}
        onChange={handleComboBoxChange}
        placeholder="Escribe o selecciona un equipo"
        allowCustom={true} 
      />
      <Button onClick={handleAddTeam}style={{ marginBottom: "50px", display: "flex", alignItems: "center" }}>
        Agregar nuevo equipo
      </Button>

      <GridLayoutItem
        row={3}
        col={1}
        colSpan={12}
        style={{ height: 100 }}
        className="cms-home_scrollView"
      >
        
      </GridLayoutItem>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <div>{error.status} - {error.statusText}</div>;
  }

  return (
    <>
      <div>Error en el scrollView</div>
      <Outlet />
    </>
  );
}
