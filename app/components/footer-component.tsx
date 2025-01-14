// components/Footer.tsx
import React from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

interface CentroOperacion {
    idCentrosOperaciones: string;
    nombre: string;
    activo: boolean;
}

interface FooterProps {
    centrosDeOperacion: CentroOperacion[];
}

const Footer: React.FC<FooterProps> = ({ centrosDeOperacion }) => {
    return (
        <footer>
            <GridLayout className="cms-footer-grid cms-footer">
                <GridLayoutItem className="cms-footer-grid_titulo cms-footer_titulo">
                    <h1>Titulo</h1>
                </GridLayoutItem>
                {centrosDeOperacion.map((item, index) => (
                    <GridLayoutItem
                        key={`footer-${index}`}
                        className={`cms-footer-grid_item-${index} cms-footer_item-todos`}
                    >
                        <span>{item.idCentrosOperaciones}</span>
                        <span>{item.nombre}</span>
                        <span>{item.activo ? "Activo" : "Inactivo"}</span>
                    </GridLayoutItem>
                ))}
            </GridLayout>
        </footer>
    );
};

export default Footer;

