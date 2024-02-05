import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EliminarDetalle from './eliminarDetalle';
import ObtenerFactura from "./obtenerFactura";



const DetallesFacturaId = ({ id }) => {
    const [detalles, setDetalles] = useState([]);
    const [ultimaFactura, setUltimaFactura] = useState(null);

    const obtenerDetalles = async (id) => {
        try{
            const response = await fetch(`https://localhost:7252/api/Detalles/listarporidfactura/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setDetalles(data);
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

    useEffect(()=>{
        fetch('https://localhost:7252/api/Factura/ultimaFactura')
          .then(res => res.json())
          .then(data => { setUltimaFactura(data);})
          .catch(err => console.error(err));
    
      },[]);


    return (
        <>
            {detalles.length>0 && <ObtenerFactura id={ultimaFactura} actualizar={obtenerDetalles} />}
            <div style={{ maxHeight: '300px', overflow: 'scroll' }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>IdItem</th>
                            <th>IdFactura</th>
                            <th>CodigoProducto</th>
                            <th>NombreProducto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>SubTotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map(detalle => {
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
                                    <button className="btn btn-danger" onClick={() => handleEliminar(detalle.idItem)}>Eliminar</button>
                                    </td>
                                </tr>
                                
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </>
    );

}

export default DetallesFacturaId;