//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';
import data from './data.json';
import { Grid } from "@progress/kendo-react-grid";

export default function Home() {


    return (
        <>
            <GridLayoutItem row={2} col={2} rowSpan={4} colSpan={3} style={{ backgroundColor: "red" }}>
                <img src={`${data.url}`} style={{ width: "100%" }} />
            </GridLayoutItem>
            <GridLayoutItem row={2} col={5} /* rowSpan={3} */ colSpan={4} style={{ backgroundColor: "green" }}>
                <h2>Fratachadora Tripulada Roadway RWMG248C </h2>
                <h5>Incluye 2 juego de paletas de terminacion.</h5>
                <p>Código Producto: 001626</p>
                
            </GridLayoutItem>
            <GridLayoutItem row={3} col={5} colSpan={4} style={{ backgroundColor: "yellow" }}>
                <h3>Elementos de seguridad recomendados</h3>
                <div style={{ display: "flex" }}>
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/casco/1ahaKg2tzB5mTd3X2lXljTfCvmYJj9TRxD5cSiH8.png" style={{ width: "80px" }} />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/zapato/J5vgVBxHOQzF7AdKWI0DotD4XxtABiPQn9coRHL4.png" style={{ width: "80px" }} />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/auriculares/cHmr7cwkRyN1IyfOnC94lYgQ7qutXZO1WNtNN6gL.png" style={{ width: "80px" }} />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/guantes/zREh2mxvgWLt90rCfFk0wMUtsZWNowfJKMWmOdVq.png" style={{ width: "80px" }} />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/antiparras/K8WJxuW83aBkpVEqYDolD97y2o6CMlcK8xS9ETkN.png" style={{ width: "80px" }} alt="" />
                </div>
            </GridLayoutItem>
            <GridLayoutItem row={4} col={5}  colSpan={4} style={{ backgroundColor: "pink" }}>
                <h3>Transporte mínimo</h3>
                <img src="https://www.leiten.com.ar/storage/transportes/220-mts-1000-kg/qv5ofxpTJ8XjyVr1HTPOnp0vTb7c6vJIOtfQhaZy.png" alt="" style={{ width: "80px" }} />
            </GridLayoutItem>
            <GridLayoutItem row={5} col={5} colSpan={4} style={{ backgroundColor: "blue" }}>
                <img src="https://www.leiten.com.ar/storage/garantias/producto/2/t2578igk57MpfhoyKfsJunbRYaZ2Snrn4TCi3tSJ.png" alt="" style={{ width: "80px" }} />
                <img src="https://www.leiten.com.ar/storage/garantias/repuesto/10/K3h7zgf7rs85C3OchMpD58er0rG5Io5Leu8IkeCb.png" alt="" style={{ width: "80px" }}  />
            </GridLayoutItem>
            <GridLayoutItem row={2} col={9} colSpan={3} rowSpan={4} style={{ backgroundColor: "purple" }}>
                <div style={{backgroundColor: "purple", height : "500px"}}>
                    Injectar codigo html acá
                </div>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}