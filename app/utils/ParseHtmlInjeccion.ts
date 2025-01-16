import { data } from "@remix-run/node";
import React from "react";

function parseStyle(style: string): React.CSSProperties {
    return style.split(";").reduce((acc, rule) => {
        const [key, value] = rule.split(":").map(str => str.trim());
        if (key && value) {
            const camelCaseKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
            acc[camelCaseKey] = value;
        }
        return acc;
    }, {} as React.CSSProperties);
}

function convertAttributes(attributes, additionalAttributes = "") {
    const { style, class: className, ...rest } = attributes;
    const styleObject = style ? parseStyle(style) : {};
    return {
        ...rest,
        style: styleObject,
        className: className ? `${className} ${additionalAttributes}` : `${additionalAttributes}`,
    };
}


function createComponentLeaf(dataHtml, dataItem) {
    const { Tag, Attributes, Text } = dataHtml;
    if (Tag === "a" && Text.includes("#comprar#") && dataItem.esVendible === true) {
        const contenido = "Comprar"
        return React.createElement(
            Tag,
            convertAttributes(Attributes, "cms-boton-comprar"),
            contenido
        );
    }

    if (Tag === "a" && Text.includes("#alquilar#") && dataItem.esAlquilable === true) {
        const contenido = "Alquilar"
        return React.createElement(
            Tag,
            convertAttributes(Attributes, "cms-boton-alquilar"),
            contenido
        );
    }

    if (Tag === "a" && Text.includes("#oferta#") && dataItem.esOferta === true) {
        const contenido = "Oferta"
        return React.createElement(
            Tag,
            convertAttributes(Attributes, "cms-boton-oferta"),
            contenido
        );
    }

    const listaDeKeys =  Object.keys(dataItem) ;
    

    const upperCaseKeys = listaDeKeys.map(key => key.toUpperCase());

    const contenido = Text.replace(/#(\w+)#/g, (_: string, key: string) => {

        const position  = upperCaseKeys.indexOf(key.toUpperCase());

        return position === -1 ? `#${key}#` : dataItem[listaDeKeys[position]]  ;
    })

    return React.createElement(
        Tag,
        convertAttributes(Attributes),
        contenido
    );
}

function createComponentContainer(dataHtml, dataItems) {
    const { Tag, Attributes, Children } = dataHtml;
    const contente = Children.map((child) => (createComponent(child, dataItems)));
    const elemento = React.createElement(
        Tag,
        convertAttributes(Attributes),
        contente.map((child, index) => React.cloneElement(child, { key: index }))
    );
    return elemento
}
 
export function createComponent(dataHtml, dataItem) {
    const { Tag, Attributes, Text } = dataHtml;

    if (dataHtml?.Text) {
        return createComponentLeaf(dataHtml, dataItem);
    }

    if (dataHtml?.Children) {
        return createComponentContainer(dataHtml, dataItem);
    }
}