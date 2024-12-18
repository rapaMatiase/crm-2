//REMIX
import { Outlet } from '@remix-run/react';
//TELERIK
import { GridLayoutItem } from '@progress/kendo-react-layout';
import {
    StackLayout,
    Card,
    CardBody,
    CardImage,
} from '@progress/kendo-react-layout';


const json = {
    titulo: "Productos destacados",
    items: [
        { url: "/templateHome/productMain/1.jpeg", alt: "Banner 1", content: "Texto descriptivo 1 - con html injectable" },
        { url: "/templateHome/productMain/2.jpg", alt: "Banner 2", content: "Texto descriptivo 2 - con html injectable" },
        { url: "/templateHome/productMain/3.jpeg", alt: "Banner 3", content: "Texto descriptivo 3 - con html injectable" },
        { url: "/templateHome/productMain/4.jpg", alt: "Banner 4", content: "Texto descriptivo 4 - con html injectable" },
        { url: "/templateHome/productMain/5.jpg", alt: "Banner 5", content: "Texto descriptivo 5 - con html injectable" },
        { url: "/templateHome/productMain/6.jpeg", alt: "Banner 6", content: "Texto descriptivo 6 - con html injectable" },
    ]
}

export default function ScrollViewComponent() {


    return (
        <>
            <GridLayoutItem className='cms-home-body-grid_productos-destacados-titulo'>
                <h3 className='cms-home-body_productos-destacados-titulo'> {json.titulo} </h3>
            </GridLayoutItem>
            <GridLayoutItem className='cms-home-body-grid_productos-destacados-lista' >
                <StackLayout className='cms-home-body_productos-destacados-lista' orientation={'horizontal'}>
                    {json.items.map((item, index) => (
                        <Card key={`productosdestacados-${index}`} style={{ height : "100%"}} className='cms-home-body_productos-destacados-lista-card'>
                            <CardImage src={item.url} />
                            <CardBody>
                                {item.content}
                            </CardBody>
                        </Card>))}
                </StackLayout>
            </GridLayoutItem>
            <Outlet />
        </>
    )
}


// https://www.telerik.com/kendo-react-ui/components/scrollview/api/scrollviewprops
// https://www.telerik.com/kendo-react-ui/components/layout/card