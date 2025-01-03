import { Button } from "@progress/kendo-react-buttons";
import { ScrollView } from "@progress/kendo-react-scrollview";
import { Key, useState } from "react";
import { createComponent } from "~/utils/ParseHtmlInjeccion";

const Card = ({ item, dataHtml }: { item: { image: string; ProductName: string; content: string }; dataHtml: any }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                width: 220,
                height: 304,
                margin: "10px 10px", // Espaciado horizontal entre cards
                textAlign: "center",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={item.image || "https://via.placeholder.com/200x184"}
                alt={item.ProductName || "Producto"}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
                draggable={false}
            />
            <div style={{ padding: "10px" }}>
                {createComponent(dataHtml.body[0], item)}
                {isHovered && <Button style={{ width: "100%", marginTop: "10px" }}>Comprar</Button>}
            </div>
        </div>
    );
};

export const ScrollViewComponent = ({ data, dataHtml }: { data: any[]; dataHtml: any }) => {
    return (
        <div>
            <ScrollView
                style={{ width: "98vw", height: 350, backgroundColor: "grey", padding: "10px 0" }}
                arrows={true}
            >
                {data.map((item, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "center" }}>
                        <Card item={item} dataHtml={dataHtml} />
                        <Card item={item} dataHtml={dataHtml} />

                    </div>
                ))}
            </ScrollView>
        </div>
    );
};
