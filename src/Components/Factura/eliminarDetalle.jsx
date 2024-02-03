import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EliminarDetalle = () => {
    const { id } = useParams();


    useEffect(() => {
        fetch(`https://localhost:7252/api/Detalles/eliminar/${id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                alert('Item Eliminado con Exito');
            } else {
                alert('Hubo un error al eliminar el Item');
            }
        })
        .catch(err => console.log(err));
    }, [id]); // Dependencias del efecto

    return null; // No renderiza nada
};

export default EliminarDetalle;
