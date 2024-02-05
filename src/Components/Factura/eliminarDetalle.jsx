const eliminarDetalle = async (idItem) => {
    try {
        const response = await fetch(`https://localhost:7252/api/Detalles/eliminar/${idItem}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            alert('Item Eliminado con Exito');
        }
    } catch (error) {
        console.error('Error al eliminar detalle de factura', error);
        alert('Hubo un error al eliminar el Item');
    }
};

export default eliminarDetalle;
