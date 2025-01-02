//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { ScrollView } from '@progress/kendo-react-scrollview';
import { Outlet, useLoaderData } from '@remix-run/react';
import { isRouteErrorResponse, LoaderFunction, useNavigate, useRouteError } from 'react-router-dom';
import { getImage, postCarruselConfig } from '~/api/apiContentSettings';
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";
import json from "~/api/apiWhatsapp";
import { Button } from '@progress/kendo-react-buttons';

/* falta la api de whatsapp */
const whatsappData = {
    url: "https://fakewhatsapp.com/chat",
    image: json.whatsapp.icon
};

function removeFirstPartUntilPoint(str: string): string {
    const pointIndex = str.indexOf('.');
    if (pointIndex === -1) {
        return str; // Return the original string if no point is found
    }
    return str.substring(pointIndex + 1);
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const idVista = params.idView ?? '';
    const data = await postCarruselConfig({ request, idVista, data: {} });

    const dataWithImages = await Promise.all(
        data.Items.map(async (item: any) => {
            const { IdItem } = item;
            const image = await getImage({ request, id: IdItem });
            return { ...item, image };
        })
    );
    data.Items = dataWithImages;

    return { data };
}



export default function ScrollViewComponent() {

    const { data } = useLoaderData<{ data: any }>();
    const navigate = useNavigate();
    const { idView, idMenu } = data;
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

    const handleSelectMenu = (action) => {
        const actionAnalyzer = new menuActionAnalyzer();
        console.log(action)
        actionAnalyzer.analyze(action, navigate, "", idView, idMenu);
    }

    return (

        <>
            <GridLayoutItem className='cms-home-body-grid_scrollView'>
                <ScrollView
                    style={{ width: "100%", height: "100%" }}
                    arrows={Arrows} //Determina si tengo flechas para moverme
                    activeView={ActiveView} //Este determina en la posicion que arranca el scrollView
                    automaticViewChange={AutomaticViewChange} //Este determina si se cambia automaticamente
                    automaticViewChangeInterval={AutomaticViewChangeInterval} //El tiempo que tarda en cambiar 
                    endless={Endless} //Determina si se puede volver al principio
                    pageable={Pageable} //Determina si tengo o no los puntintos para moverme
                    pagerOverlay={PagerOverlay} // [none, light, dark] Agrega sombreado a los puntos
                    className='cms-home-body_scrollView'
                >
                    {Items.map((item, index) => {
                        return (
                            <div className='cms-home-body_scrollView-detalle' style={{ position: "relative", width: "100%", height: "100%" }} key={index}>
                                <div style={{ position: "absolute", backgroundColor: "", height: "40%", width: "35%", color: "white", background: "rgba(0,100,150,0.6)", top: "25%" }}>
                                    {item.Content}
                                    {item.Url === '' ? "" : <Button onClick={() => handleSelectMenu(item.Url)} > Mas detalle </Button>}
                                </div>
                                <img
                                    src={item.image}
                                    alt={`${item.Alt}`}
                                    style={{ width: "100%", height: "100%" }}
                                    draggable={false}
                                />
                            </div>
                        );
                    })}
                </ScrollView>
            </GridLayoutItem>
            <div
                className='cms-home-body_whatsapp'
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 1000,
                }}
            >
                <a href={whatsappData.url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={whatsappData.image}
                        alt="WhatsApp"
                        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                    />
                </a>
            </div>
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