import { Button } from "@progress/kendo-react-buttons";
import { ScrollView } from "@progress/kendo-react-scrollview";
import { Key, useState } from "react";
import { createComponent } from "~/utils/ParseHtmlInjeccion";


const Card = ({ item, dataHtml }: { item: { image: string; ProductName: string; content: string }; dataHtml: any }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            style={{ width: 200, height: 384, margin: 10 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={item.image || 'https://via.placeholder.com/200x184'}
                alt={item.ProductName || 'Producto'}
                style={{ width: 200, height: 184, margin: 10 }}
                draggable={false}
            />
            {createComponent(dataHtml.body[0], item)}
        </div>
    );
};

export const ScrollViewComponent = (props: any) => {

    return (
        <div>
            <ScrollView
                style={{ width: "100vw", height: 404, backgroundColor: 'grey',  }}
            >
                {props.data.map((item: { image: string; ProductName: string; content: string; }, index: Key | null | undefined) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card item={item} dataHtml={props.dataHtml} />
                        <Card item={item} dataHtml={props.dataHtml} />
                    </div>
                ))}
            </ScrollView>
        </div>
    );
};
