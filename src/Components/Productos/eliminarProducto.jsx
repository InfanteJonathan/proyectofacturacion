import React from "react";
import { Button, Card } from "react-bootstrap";
import { useParams,useNavigate } from "react-router-dom";

const EliminarProducto = () =>{
    const {id}  = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`https://localhost:7252/api/Producto/eliminar/${id}`,{
            method: 'DELETE',
        })
        .then(res => {
            if(res.ok){
                navigate('/productos');
                alert('Producto Eliminado con Exito');
                
            }else{
                alert('Hubo un error al eliminar el producto');
            }
        })
        .catch(err=> console.log(err));
    }

    return(
        <Card>
            <div>
                ¿Esta Seguro de Eliminar el producto?
            </div>
            <Button className="btn btn-danger" onClick={handleDelete}>
                Eliminar Producto
            </Button>

        </Card>
        
    )
}

export default EliminarProducto;