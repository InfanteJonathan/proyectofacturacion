import React, { useState, useEffect } from 'react';

const ObtenerFactura = ({ id, actualizar }) => {
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
  }, [id,actualizar]);

  if (!facturaData) return <div>Cargando...</div>;

  return (
    <>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
            <ul className='d-flex flex-row rounded p-3 border-0' style={{ alignItems: 'flex-start'}}>
                <div>
                    <li className="list-group" style={{ fontWeight:"bold", marginRight: "20px"}}>SUBTOTAL :  {facturaData.subtotal}</li>
                </div>
                <div>
                    <li className="list-group" style={{fontWeight:"bold", marginRight: "20px"}}>IGV      :  {parseFloat(facturaData.igv).toFixed(2)}</li>
                </div>
                <div>
                    <li className="list-group" style={{fontWeight:"bold", marginRight: "20px"}}>TOTAL    :  {parseFloat(facturaData.total).toFixed(2)}</li>
                </div>
            </ul>
        </div>
      </div>
    </>
  );
};

export default ObtenerFactura;
