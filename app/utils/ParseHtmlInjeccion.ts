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

function convertAttributes(attributes) {
    const { style, class: className, ...rest } = attributes;
    const styleObject = style ? parseStyle(style) : {};
    return {
        ...rest,
        style: styleObject,
        className: className ? className : '',
    };
}

function createComponentLeaf(dataHtml, dataItem) {
    const { Tag, Attributes, Text } = dataHtml;

    const contenido = Text.replace(/#(\w+)#/g, (_: string, key: string) => {

        return dataItem[key.toLowerCase()] !== undefined ? dataItem[key.toLowerCase()] : `#${key}#`;
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
    return React.createElement(
        Tag,
        convertAttributes(Attributes),
        contente
    );
}

export function createComponent(dataHtml, dataItem) {
    if (dataHtml?.Text) {
        return createComponentLeaf(dataHtml, dataItem);
    }

    if (dataHtml?.Children) {
        return createComponentContainer(dataHtml, dataItem);
    }
}