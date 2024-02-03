import React, { useState, useEffect } from 'react';

const ObtenerFactura = ({ id }) => {
  const [facturaData, setFacturaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7252/api/Factura/obtener/${id}`);
        const data = await response.json();
        setFacturaData(data);
      } catch (error) {
        console.error('Error al obtener los datos de la factura:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!facturaData) return <div>Cargando...</div>;

  return (
    <div>
      <p>ID Factura: {facturaData.idFactura}</p>
      <p>NumFactura: {facturaData.numeroFactura}</p>
      <p>IGV: {facturaData.igv}</p>
      <p>Total: {facturaData.total}</p>
    </div>
  );
};

export default ObtenerFactura;
