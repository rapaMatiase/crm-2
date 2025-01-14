// components/VideoGrid.tsx
import { GridLayoutItem } from '@progress/kendo-react-layout';

interface VideoGridProps {
    videos: Array<{ Url: string; Orden: number }>;
}

export default function VideoGrid ({ videos }: VideoGridProps)  {
    const formattedVideos = videos.map(video => video.Url.replace("watch?v=", "embed/"));

    return (
        <>
            <GridLayoutItem className='cms-home-body_videos-principal' row={3} col={1} colSpan={1} rowSpan={3} style={{ backgroundColor: "black" }}>
                <iframe src={`${formattedVideos[0]}`} title="YouTube video player" />
            </GridLayoutItem>
            {formattedVideos.slice(1).map((url, index) => (
                <GridLayoutItem
                    key={index}
                    className='cms-home-body_videos-secundarios'
                    row={2 + index}
                    col={2}
                    colSpan={1}
                    style={{ backgroundColor: ["blue", "yellow", "red"][index] }}
                >
                    <iframe src={url} title={`YouTube video player ${index + 1}`} />
                </GridLayoutItem>
            ))}
        </>
    );
};
