import React,{useState, useEffect} from "react";
import  {Button}  from "react-bootstrap";


const DetallesFacturaId = ({id}) => {
    const [detalles,setDetalles] = useState([]);

    const obtenerDetalles = async () => {
        try{
            const response = await fetch(`https://localhost:7252/api/Detalles/listarporidfactura/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log('Datos recibidos de la API:', data);
                setDetalles(data);
            }
        }catch(error){
            console.error('Error al obtener detalles de factura',error);
        }
    };

    const eliminarDetalle = (idItem) => {
        fetch(`https://localhost:7252/api/Detalles/eliminar/${idItem}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                alert('Item Eliminado con Exito');
                obtenerDetalles();
            } else {
                alert('Hubo un error al eliminar el Item');
            }
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        obtenerDetalles();
    }, [id]);

    

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>IdItem</th>
                    <th>IdFactura</th>
                    <th>CodigoProducto</th>
                    <th>NombreProducto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {detalles.map(detalle => {
                console.log('Renderizando detalle:', detalle);
                return (
                    <tr key={detalle.idItem}>
                        <td>{detalle.idItem}</td>
                        <td>{detalle.idFactura}</td>
                        <td>{detalle.codigoProducto}</td>
                        <td>{detalle.nombreProducto}</td>
                        <td>{detalle.precio}</td>
                        <td>{detalle.cantidad}</td>
                        <td>
                        <Button className='btn btn-danger' onClick={() => eliminarDetalle(detalle.idItem)}>
                            Quitar
                        </Button>
                        </td>
                    </tr>
                );
            })}

            </tbody>
        </table>
    );

}

export default DetallesFacturaId;
