import { LoaderFunction } from "@remix-run/node";
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { data } from './data.ts';
import { useLoaderData } from "@remix-run/react";
import { codeSnippetIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";


export const loader: LoaderFunction = async ({ request }) => {
    // Your logic to load data goes here
    return { data };
};


function searchWord(characteristics){
    
    const matchedImage = data.images.find(image => {
        return characteristics.every(char => image.characteristics.includes(char));
    });


    /* const matchedImage = data.images.find(image => {
        return characteristics.every(char => image.characteristics.includes(char));
    }); */

  

    return matchedImage;
}


export default function Component() {

    const { data } = useLoaderData();

    const [characteristics, setCharacteristics ] = useState(data.images[0].characteristics);
    const [product, setProduct] = useState(data.images[0]);

    const handleCharacteristics = (option) => {
        const charactAux = characteristics;
        charactAux[option.index] = option.value;
        
        setCharacteristics(charactAux)
        console.log("option", characteristics);

        const productAux = searchWord(characteristics);
        console.log(productAux);
        setProduct(productAux);

    }



    return (
        <>
            <GridLayout
                cols={[{ width: "70%" }, { width: "30%" }]}
            >
                <GridLayoutItem row={1} col={1} style={{ backgroundColor: "red", height: "100px" }}>
                    <img src={product.image} alt="product" style={{ width: "100%", height: "500px" }} />
                </GridLayoutItem>
                <GridLayoutItem row={1} col={2} style={{ backgroundColor: "blue", height: "50px" }}>
                    {data.caracteristicas.map((item, index) => {
                        return (
                            <div key={`caracteristica-${index}`}>
                                <h3>{item.title}</h3>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>


                                    {item.type === "seleccionUnicaColor" && item.options.map((option, indexOption) => {
                                        return (
                                            <div key={`option-${indexOption}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <div onClick={()=> handleCharacteristics({title : item.title, value : option.value, index : index})} style={{ backgroundColor: option.value, width: "50px", height: "50px", borderRadius: "50px" }}></div>
                                                <h5>{option.name}</h5>
                                            </div>
                                        )
                                    })}

                                   {/*  {item.type === "seleccionUnicaTexto" && item.options.map((option, indexOption) => {
                                        return (
                                            <div key={`option-${indexOption}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <div onClick={()=> handleCharacteristics({title : item.title, value : option.name})} style={{ fontFamily: option.value, width: "50px", height: "50px", borderRadius: "50px" }}>
                                                    {option.name}
                                                </div>
                                            </div>
                                        )
                                    })} */}

                                </div>
                            </div>
                        )
                    })}
                </GridLayoutItem>
            </GridLayout>
        </>
    )
}