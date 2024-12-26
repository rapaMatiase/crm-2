import { Form, FormRenderProps } from '@progress/kendo-react-form';
import React, { useState } from 'react';

export default function Detalles() {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        codigo: '',
        tipoContenido: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Form render={(props: FormRenderProps) => (
            <div>
                <textarea
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ID"
                />
                <textarea
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <textarea
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Código"
                />
                <textarea
                    name="tipoContenido"
                    value={formData.tipoContenido}
                    onChange={handleChange}
                    placeholder="Tipo Contenido"
                />
            </div>
        )} />
    );
};

