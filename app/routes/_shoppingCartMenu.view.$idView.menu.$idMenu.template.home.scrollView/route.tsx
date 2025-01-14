//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { ScrollView } from '@progress/kendo-react-scrollview';
import { Outlet, useLoaderData } from '@remix-run/react';
import { isRouteErrorResponse, LoaderFunction, useNavigate, useRouteError } from 'react-router-dom';
import { getImage, postCarruselConfig } from '~/api/apiContentSettings';
import menuActionAnalyzer from "~/utils/menuActionAnalyzer";
import json from "~/api/apiWhatsapp";
import jsonYotube from '~/api/apiYoutube';
import { Button } from '@progress/kendo-react-buttons';
import jsonRedesSociales from '~/api/apiInstagram';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import ScrollViewCarrouselComponent from '~/components/scrollViewCarrousel-components';

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

    const handleSelectMenu = (action: string) => {
        const actionAnalyzer = new menuActionAnalyzer();
        actionAnalyzer.analyze(action, navigate, "", idView, idMenu);
    }

    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_scrollView'>
            <ScrollViewCarrouselComponent
                    Arrows={Arrows}
                    ActiveView={ActiveView}
                    AutomaticViewChange={AutomaticViewChange}
                    AutomaticViewChangeInterval={AutomaticViewChangeInterval}
                    Endless={Endless}
                    Pageable={Pageable}
                    PagerOverlay={PagerOverlay}
                    Items={Items}
                />
            </GridLayoutItem>
            <div
                className='cms-home-body_whatsapp'
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 1000,
                    display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px"
                }}
            >
                <a href={whatsappData.url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={whatsappData.image}
                        alt="WhatsApp"
                        style={{ width: "40px", height: "40px", borderRadius: "30%" }}
                    />
                </a>
                <a href={jsonYotube[0].url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={jsonYotube[0].iconoBase64}
                        alt="YouTube"
                        style={{ width: "40px", height: "40px", borderRadius: "30%" }}
                    />
                </a>
                <a href={jsonRedesSociales[0].url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={jsonRedesSociales[0].iconoBase64}
                        alt="Instagram"
                        style={{ width: "40px", height: "40px", borderRadius: "30%" }}
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
        <div> El error esta en el scrollView </div>
        <Outlet />
    </>
}
// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops