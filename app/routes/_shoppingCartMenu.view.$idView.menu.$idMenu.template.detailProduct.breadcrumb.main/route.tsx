//REMIX
import { Outlet } from "@remix-run/react";
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import data from './data.json';

export default function Home() {


    return (
        <>
            <GridLayoutItem className="cms-body-grid_imagen">
                <img src={`${data.url}`} className="cms-body_imagen" />
            </GridLayoutItem>
            <GridLayoutItem className="cms-body-grid_titulo cms-body_titulo">
                <h2>Fratachadora Tripulada Roadway RWMG248C </h2>
                <h5>Incluye 2 juego de paletas de terminacion.</h5>
                <p>Código Producto: 001626</p>
            </GridLayoutItem>
            <GridLayoutItem className="cms-body-grid_seguridad cms-body_seguridad">
                <h3>Elementos de seguridad recomendados</h3>
                <div className="cms-body_seguridad-lista" >
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/casco/1ahaKg2tzB5mTd3X2lXljTfCvmYJj9TRxD5cSiH8.png"  />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/zapato/J5vgVBxHOQzF7AdKWI0DotD4XxtABiPQn9coRHL4.png"  />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/auriculares/cHmr7cwkRyN1IyfOnC94lYgQ7qutXZO1WNtNN6gL.png" />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/guantes/zREh2mxvgWLt90rCfFk0wMUtsZWNowfJKMWmOdVq.png" />
                    <img src="https://www.leiten.com.ar/storage/requisitos-de-seguridad/antiparras/K8WJxuW83aBkpVEqYDolD97y2o6CMlcK8xS9ETkN.png" alt="" />
                </div>
            </GridLayoutItem>
            <GridLayoutItem className="cms-body-grid_transporte cms-body_trasporte">
                <h3>Transporte mínimo</h3>
                <div className="cms-body_transporte-lista">
                    <img src="https://www.leiten.com.ar/storage/transportes/220-mts-1000-kg/qv5ofxpTJ8XjyVr1HTPOnp0vTb7c6vJIOtfQhaZy.png" alt="" />
                </div>
            </GridLayoutItem>
            <GridLayoutItem className="cms-body-grid_cretificados cms-body_cretificados">
                <img src="https://www.leiten.com.ar/storage/garantias/producto/2/t2578igk57MpfhoyKfsJunbRYaZ2Snrn4TCi3tSJ.png" alt="" />
                <img src="https://www.leiten.com.ar/storage/garantias/repuesto/10/K3h7zgf7rs85C3OchMpD58er0rG5Io5Leu8IkeCb.png" alt=""/>
            </GridLayoutItem>
            <GridLayoutItem className="cms-body-grid_opciones cms-body_opciones">
                {/* HTML DINAMICO - INICIO */}
                    Injectar codigo html acá
                {/* HTML DINAMICO - FIN */}
            </GridLayoutItem>
            <Outlet />
        </>
    )
}