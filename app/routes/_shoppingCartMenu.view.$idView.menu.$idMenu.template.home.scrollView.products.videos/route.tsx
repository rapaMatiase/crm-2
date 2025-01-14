import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from '@remix-run/react';
import { GridLayoutItem, GridLayout } from '@progress/kendo-react-layout';
import { LoaderFunction } from '@remix-run/node';
import { postVideosConfig } from '~/api/apiContentSettings';
import VideoGrid from '~/components/videoGrid-component'; 
import { Params } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request, params }: { request: Request, params: Params }) => {
    const { idView } = params;
    if (!idView) {
        throw new Error("idView is required");
    }
    const response = await postVideosConfig({ request, idView });
    const { videosData } = response;
    return { videosData };
};

export default function ScrollViewComponent() {
    const { videosData } = useLoaderData<{ videosData: any }>();

    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_videos'>
                <GridLayout className='cms-home-body_videos'>
                    <GridLayoutItem className='cms-home-body_videos-titulo' row={1} col={1} colSpan={2}>
                        <h2>Nuestros videos</h2>
                    </GridLayoutItem>
                    <VideoGrid videos={videosData.Videos} />
                </GridLayout>
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

    return <>
        <div>El error está en videos</div>
    </>;
}