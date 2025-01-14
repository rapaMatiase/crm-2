import { ScrollView } from '@progress/kendo-react-scrollview';

export default function ScrollViewCarrouselComponent(props: { Arrows: any; ActiveView: any; AutomaticViewChange: any; AutomaticViewChangeInterval: any; Endless: any; Pageable: any; PagerOverlay: any; Items: any; className?: "cms-home-body_scrollView" | undefined; }) {
    const {
        Arrows,
        ActiveView,
        AutomaticViewChange,
        AutomaticViewChangeInterval,
        Endless,
        Pageable,
        PagerOverlay,
        Items,
        className = 'cms-home-body_scrollView',
    } = props;

    return (
        <ScrollView
            style={{ width: "100%", height: "100%" }}
            arrows={Arrows}
            activeView={ActiveView}
            automaticViewChange={AutomaticViewChange}
            automaticViewChangeInterval={AutomaticViewChangeInterval}
            endless={Endless}
            pageable={Pageable}
            pagerOverlay={PagerOverlay}
            className={className}
        >
            {Array.isArray(Items) && Items.map((item, index) => (
                <div
                    className='cms-home-body_scrollView-detalle'
                    style={{ position: "relative", width: "100%", height: "100%" }}
                    key={index}
                >
                    <img
                        src={item.image}
                        alt={item.Alt}
                        style={{ width: "100%", height: "100%" }}
                        draggable={false}
                    />
                </div>
            ))}
        </ScrollView>
    );
}
