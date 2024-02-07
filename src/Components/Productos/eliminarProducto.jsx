import React from "react";
import { Button, Card } from "react-bootstrap";
import { useParams,useNavigate, Link } from "react-router-dom";

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
        <div style={{display:'flex',justifyContent:'center',padding:'5em'}}>
            <div style={{backgroundColor:'whitesmoke',padding:'4em',borderRadius:'5px'}}>
                <div style={{fontWeight:'bold'}}>
                    ¿Esta Seguro de Eliminar el producto?
                </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
                    <Button  className="btn btn-danger" style={{marginRight:'10px'}} onClick={handleDelete}>
                        Eliminar
                    </Button>
                    <Link className="btn btn-primary" to={'/productos'}>Salir</Link>
                </div>
                
            </div>
        </div>
        
    )
}

export default EliminarProducto;