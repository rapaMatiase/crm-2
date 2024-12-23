//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import { ScrollView } from '@progress/kendo-react-scrollview';
import { Outlet, useLoaderData } from '@remix-run/react';
import { isRouteErrorResponse, LoaderFunction, useRouteError } from 'react-router-dom';
import { getImage, getImagenesTipoEntidad, postCarruselConfig } from '~/api/apiContentSettings';
import sinImagen from '/templateHome/ScrollView/images.jpeg';


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
              try{
                const idSinPunto = removeFirstPartUntilPoint(IdItem);
                  const image = await getImage({ request, id: idSinPunto });
                  return { ...item, image };
              }catch{
                const image =   sinImagen
                return { ...item, image };
              }
          })
      );
      data.Items = dataWithImages;

      return  {data} ;
}



export default function ScrollViewComponent() {

    const {data,} = useLoaderData<{ dataWithImages: any }>();

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
            <GridLayoutItem className='cms-home-body-grid_scrollView'>
                <ScrollView
                    className='cms-home-body_scrollView'
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