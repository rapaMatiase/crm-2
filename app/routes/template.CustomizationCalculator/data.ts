/* 
{

caracteristicas : [
    {
        title : "color",
        type : "seleccionUnicaCirculos"
        options : [
            {
                name : rojo,
                color : red,
                url : "https://www.google.com"
            }
        ]
    }

]

}

*/
//import holaColorNegroFondoBlanco from '/CustomizationCalculator/fondo/hola-color-azul-fondo-amarillo.png';

import holaColorNegroFondoBlanco from '/CustomizationCalculator/color/hola-color-negro.png';
import holaColorRojoFondoBlanco from '/CustomizationCalculator/color/hola-color-rojo.png';
import holaColorAzulFondoBlanco from '/CustomizationCalculator/color/hola-color-azul.png';
import holaColorVerdeFondoBlanco from '/CustomizationCalculator/color/hola-color-verde.png';

import holaColorAzulFondoAmarilla from '/CustomizationCalculator/fondo/hola-color-azul-fondo-amarillo.png';
import holaColorAzulFondoNaranja from '/CustomizationCalculator/fondo/hola-color-azul-fondo-naranja.png';
import holaColorAzulFondoRosa from '/CustomizationCalculator/fondo/hola-color-azul-fondo-rosa.png';

import holaColorNegroFondoAmarilla from '/CustomizationCalculator/fondo/hola-color-negro-fondo-amarillo.png';
import holaColorNegroFondoNaranja from '/CustomizationCalculator/fondo/hola-color-negro-fondo-naranja.png';
import holaColorNegroFondoRosa from '/CustomizationCalculator/fondo/hola-color-negro-fondo-rosa.png';

import holaColorRojoFondoAmarilla from '/CustomizationCalculator/fondo/hola-color-rojo-fondo-amarillo.png';
import holaColorRojoFondoNaranja from '/CustomizationCalculator/fondo/hola-color-rojo-fondo-naranja.png';
import holaColorRojoFondoRosa from '/CustomizationCalculator/fondo/hola-color-rojo-fondo-rosa.png';

import holaColorVerdeFondoAmarilla from '/CustomizationCalculator/fondo/hola-color-verde-fondo-amarillo.png';
import holaColorVerdeFondoNaranja from '/CustomizationCalculator/fondo/hola-color-verde-fondo-naranja.png';
import holaColorVerdeFondoRosa from '/CustomizationCalculator/fondo/hola-color-verde-fondo-rosa.png';





export const data = {
    caracteristicas: [
        {
            title: "color de letra",
            type: "seleccionUnicaColor",
            options: [
                {
                    name: "Negro",
                    value: "black",
                },
                {
                    name: "Rojo",
                    value: "red",
                },
                {
                    name: "Azul",
                    value: "blue",
                },
                ,
                {
                    name: "Verde",
                    value: "green",
                }
            ]
        },
        {
            title: "color de fondo",
            type: "seleccionUnicaColor",
            options: [
                {
                    name: "Naranja",
                    value: "orange",
                },
                {
                    name: "Rosa",
                    value: "pink",
                },
                {
                    name: "Amarillo",
                    value: "yellow",
                },
            ]
        },
        {
            title: "Fuente de la letra",
            type: "seleccionUnicaTexto",
            options: [
                {
                    name: "Cursive",
                    value: "cursive",
                },
                {
                    name: "Ui-monospace",
                    value: "ui-monospace",
                }
            ]
        },


    ],

    images : [
       
        {image : holaColorNegroFondoBlanco , characteristics : ["black","white"]},
        {image : holaColorRojoFondoBlanco , characteristics : ["red","white"]},
        {image : holaColorAzulFondoBlanco , characteristics : ["blue","white"]},
        {image : holaColorVerdeFondoBlanco , characteristics : ["green","white"]},
        {image : holaColorVerdeFondoBlanco , characteristics : ["green","white"]},
        {image : holaColorAzulFondoAmarilla , characteristics : ["blue","yellow"]},
        {image : holaColorAzulFondoNaranja , characteristics : ["blue","orange"]},
        {image : holaColorAzulFondoRosa , characteristics : ["blue","pink"]},
        {image : holaColorNegroFondoAmarilla , characteristics : ["black","yellow"]},
        {image : holaColorNegroFondoNaranja , characteristics : ["black","orange"]},
        {image : holaColorNegroFondoRosa , characteristics : ["black","pink"]},
        {image : holaColorRojoFondoAmarilla , characteristics : ["red","yellow"]},
        {image : holaColorRojoFondoNaranja , characteristics : ["red","orange"]},
        {image : holaColorRojoFondoRosa , characteristics : ["red","pink"]},
        {image : holaColorVerdeFondoAmarilla , characteristics : ["green","yellow"]},
        {image : holaColorVerdeFondoNaranja , characteristics : ["green","orange"]},
        {image : holaColorVerdeFondoRosa , characteristics : ["green","pink"]},
    ]

}
