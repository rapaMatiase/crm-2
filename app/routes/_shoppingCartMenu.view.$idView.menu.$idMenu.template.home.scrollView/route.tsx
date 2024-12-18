//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { ScrollView } from '@progress/kendo-react-scrollview';
import { Outlet } from '@remix-run/react';



const json = {
    arrows : true, //Booleano
    activeView : 1, //Numero entero
    automaticViewChange : true, //Booleano
    automaticViewChangeInterval : 5000, //Numero entero
    endless : true, //Booleano
    pageable : true, //Booleano
    pagerOverlay : "dark", // String [none, light, dark]
    items : [
        { url: "/templateHome/ScrollView/1.jpg", alt : "Banner 1", content : "Texto descriptivo 1 - con html injectable" },
        { url: "/templateHome/ScrollView/2.jpg", alt : "Banner 2", content : "Texto descriptivo 2 - con html injectable" },
        { url: "/templateHome/ScrollView/3.jpg", alt : "Banner 3", content : "Texto descriptivo 3 - con html injectable" },
        { url: "/templateHome/ScrollView/4.jpg", alt : "Banner 4", content : "Texto descriptivo 4 - con html injectable" },
        { url: "/templateHome/ScrollView/5.jpg", alt : "Banner 5", content : "Texto descriptivo 5 - con html injectable" }

    ]}

export default function ScrollViewComponent() {


    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_scrollView'>
                <ScrollView
                    style={{ width: "100%", height: "100%" }}
                    arrows={false}
                    activeView={3} //Este determina en la posicion que arranca el scrollView
                    automaticViewChange={true} //Este determina si se cambia automaticamente
                    automaticViewChangeInterval={3000} //El tiempo que tarda en cambiar 
                    endless={true} //Determina si se puede volver al principio
                    pageable={true} //Determina si tengo o no los puntintos para moverme
                    pagerOverlay="dark" // [none, light, dark] Agrega sombreado a los puntos
                    className='cms-home-body_scrollView'
                >
                    {json.items.map((item, index) => {
                        return (
                            <div  style={{position : "relative", width: "100%", height: "100%"}} key={index}>
                                <div style={{position : "absolute", backgroundColor : "", height : "40%", width : "35%", color : "white", background: "rgba(0,100,150,0.6)", top : "25%"}}>
                                    Esto tendria que se un html injectable{item.content} 
                                </div>
                                <img
                                    src={item.url}
                                    alt={`${item.alt}`}
                                    style={{ width: "100%", height: "100%" }}
                                    draggable={false}
                                />
                            </div>
                        );
                    })}
                </ScrollView>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops