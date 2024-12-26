//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { ScrollView } from '@progress/kendo-react-scrollview';
import { Outlet, useLoaderData } from '@remix-run/react';
import { isRouteErrorResponse, LoaderFunction, useRouteError } from 'react-router-dom';
import { postCarruselConfig } from '~/api/apiContentSettings';

interface ScrollViewData {
  Arrows: boolean;
  ActiveView: number;
  AutomaticViewChange: boolean;
  AutomaticViewChangeInterval: number;
  Endless: boolean;
  Pageable: boolean;
  PagerOverlay: string;
  Items: { Content: string; Url: string; Alt: string }[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const idVista = params.idView ?? ''; 
  const data = await postCarruselConfig({ request, idVista, data: {} });
  return data;
}

export default function ScrollViewComponent() {

    const data = useLoaderData<ScrollViewData>();
    const {
        Arrows,
        ActiveView,
        AutomaticViewChange,
        AutomaticViewChangeInterval,
        Endless,
        Pageable,
        PagerOverlay,
        Items 
    } = data;


    return (

        <>
            <GridLayoutItem row={1} col={1} colSpan={10} rowSpan={3} style={{ backgroundColor: "red" }}>
                <ScrollView
                    style={{ width: "100%", height: "100%" }}
                    arrows={Arrows} //Determina si tengo flechas para moverme
                    activeView={ActiveView} //Este determina en la posicion que arranca el scrollView
                    automaticViewChange={AutomaticViewChange} //Este determina si se cambia automaticamente
                    automaticViewChangeInterval={AutomaticViewChangeInterval} //El tiempo que tarda en cambiar 
                    endless={Endless} //Determina si se puede volver al principio
                    pageable={Pageable} //Determina si tengo o no los puntintos para moverme
                    pagerOverlay={PagerOverlay} // [none, light, dark] Agrega sombreado a los puntos
                >
                    {Items.map((item, index) => {
                        return (
                            <div  style={{position : "relative", width: "100%", height: "100%"}} key={index}>
                                <div style={{position : "absolute", backgroundColor : "", height : "40%", width : "35%", color : "white", background: "rgba(0,100,150,0.6)", top : "25%"}}>
                                    Esto tendria que se un html injectable{item.Content} 
                                </div>
                                <img
                                    src={item.Url}
                                    alt={`${item.Alt}`}
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

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>{error.status} - {error.statusText}</div>
    }

    return <>
        <div> El error ersta en el scrollView </div>
        <Outlet />
    </>
}
// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops