const eliminarDetalle = (idItem) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`https://localhost:7252/api/Detalles/eliminar/${idItem}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                alert('Item Eliminado con Exito');
                resolve(); // Resuelve la promesa cuando la eliminación se ha completado
            }
        } catch (error) {
            console.error('Error al eliminar detalle de factura', error);
            alert('Hubo un error al eliminar el Item');
            reject(error); // Rechaza la promesa con el error
        }
    });
};

export default eliminarDetalle;
