import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
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
        <div style={{display:'flex',justifyContent:'center',padding:'5em'}}>
            <div style={{backgroundColor:'whitesmoke',padding:'4em',borderRadius:'5px'}}>
                <div style={{fontWeight:'bold'}}>
                    ¿Esta Seguro de Eliminar el producto?
                </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
                    <Button  className="btn btn-danger" style={{marginRight:'10px'}} onClick={handleDelete}>
                        Eliminar
                    </Button>
                    <Link className="btn btn-primary" to={'/categorias'}>Salir</Link>
                </div>
                
            </div>
        </div>
        
    )
}

export default EliminarFamiliaProducto;