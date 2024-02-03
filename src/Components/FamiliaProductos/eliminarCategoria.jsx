import React from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EliminarFamiliaProducto = () =>{
    const navigate = useNavigate();
    const {id}  = useParams();

    const handleDelete = () => {
        fetch(`https://localhost:7252/api/Familia/eliminar/${id}`,{
            method: 'DELETE',
        })
        .then(res => {
            if(res.ok){
                alert('Categoria Eliminada con Exito');
                navigate("/categorias")
            }else{
                alert('Hubo un error al eliminar la categoria');
            }
        })
        .catch(err=> console.log(err));
    }

    return(
        <Card>
            <div>
                ¿Esta Seguro de Eliminar la categoria?
            </div>
            <Button className="btn btn-danger" onClick={handleDelete}>
                Eliminar Categoria
            </Button>

        </Card>
        
    )
}

export default EliminarFamiliaProducto;