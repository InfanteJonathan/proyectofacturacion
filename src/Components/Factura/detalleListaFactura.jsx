import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EliminarDetalle from './eliminarDetalle';

const DetalleListaFactura = () => {

    const {id} = useParams();
    const [detalleFactura, setDetalleFactura] = useState([]);

    const obtenerDetalles = async (id) => {
        try{
            const response = await fetch(`https://localhost:7252/api/Detalles/listarporidfactura/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setDetalleFactura(data);

            }
        }catch(error){
            console.error('Error al obtener detalles de factura',error);
        }
    };

    const handleEliminar = async (idItem) => {
        await EliminarDetalle(idItem);
        // Luego de eliminar, actualiza los detalles de la factura
        obtenerDetalles(id);
    };

    useEffect(() => {
        if(id){
            obtenerDetalles(id);
        }
        
    }, [id]);

    return (
        <div>
            <br></br>
            <h2>Detalle de la Factura </h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID Item</th>
                        <th>ID Factura</th>
                        <th>Codigo Producto</th>
                        <th>Nombre Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {detalleFactura?.map(detalle => {
                        return (
                            <tr key={detalle.idItem}>
                                <td>{detalle.idItem}</td>
                                <td>{detalle.idFactura}</td>
                                <td>{detalle.codigoProducto}</td>
                                <td>{detalle.nombreProducto}</td>
                                <td>{detalle.precio}</td>
                                <td>{detalle.cantidad}</td>
                                <td>{detalle.subtotal}</td>
                                <td>
                                    <button onClick={() => handleEliminar(detalle.idItem)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DetalleListaFactura;
