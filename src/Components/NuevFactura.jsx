import React, { useState } from 'react';

const Factura = () => {
    const [factura, setFactura] = useState({
        NumeroFactura: '',
        RucCliente: '',
        RazonSocial: '',
        PorcentajeIGV: 0.18,
    });
    const [detalles, setDetalles] = useState([]);

    const handleFacturaChange = (e) => {
        setFactura({
            ...factura,
            [e.target.name]: e.target.value
        });
    };

    const handleDetalleChange = (index, e) => {
        const newDetalles = [...detalles];
        newDetalles[index][e.target.name] = e.target.value;
        setDetalles(newDetalles);
    };

    const agregarFactura = async () => {
        const response = await fetch('https://localhost:7252/api/Factura/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(factura)
        });

        const data = await response.json();
        setFactura(data);
    };

    const crearDetalle = async (index) => {
        const response = await fetch('https://localhost:7252/api/Detalles/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(detalles[index])
        });

        const data = await response.json();
        setDetalles(prevDetalles => [...prevDetalles, data]);
    };

    return (
        <div>
            <h2>Factura</h2>
            <input type="text" name="NumeroFactura" value={factura.NumeroFactura} onChange={handleFacturaChange} placeholder="Número de Factura" />
            <input type="text" name="RucCliente" value={factura.RucCliente} onChange={handleFacturaChange} placeholder="RUC del Cliente" />
            <input type="text" name="RazonSocial" value={factura.RazonSocial} onChange={handleFacturaChange} placeholder="Razón Social" />
            <input type="number" name="Subtotal" value={factura.Subtotal} onChange={handleFacturaChange} placeholder="Subtotal" />
            <button onClick={agregarFactura}>Agregar Factura</button>

            <h2>Detalles</h2>
            {detalles.map((detalle, index) => (
                <div key={index}>
                    <input type="text" name="CodigoProducto" value={detalle.CodigoProducto} onChange={(e) => handleDetalleChange(index, e)} placeholder="Código de Producto" />
                    <input type="text" name="NombreProducto" value={detalle.NombreProducto} onChange={(e) => handleDetalleChange(index, e)} placeholder="Nombre de Producto" />
                    <input type="number" name="Precio" value={detalle.Precio} onChange={(e) => handleDetalleChange(index, e)} placeholder="Precio" />
                    <input type="number" name="Cantidad" value={detalle.Cantidad} onChange={(e) => handleDetalleChange(index, e)} placeholder="Cantidad" />
                    <button onClick={() => crearDetalle(index)}>Agregar Detalle</button>
                </div>
            ))}
            <button onClick={() => setDetalles(prevDetalles => [...prevDetalles, {}])}>Nuevo Detalle</button>
        </div>
    );
};

export default Factura;
