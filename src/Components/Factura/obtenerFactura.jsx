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
    <>
      {/* <div className='form'>
        <p>ID Factura: {facturaData.idFactura}</p>
        <p>NumFactura: {facturaData.numeroFactura}</p>
        <p>IGV: {facturaData.igv}</p>
        <p>Total: {facturaData.total}</p>
      </div> */}
      {/* <div class="mb-1 row">
        <label  class="col-sm-18 col-form-label">SubTotal :</label>
        <div class="col-sm-1">
          <input type="number" readonly class="form-control-plaintext"  value={facturaData.subtotal}/>
        </div>
      </div>
      <div class="mb-1 row">
        <label  class="col-sm-18 col-form-label">IGV :</label>
        <div class="col-sm-4">
          <input type="number" readonly class="form-control-plaintext"  value={facturaData.igv}/>
        </div>
      </div>
      <div class="mb-1 row">
        <label  class="col-sm-18 col-form-label">Total :</label>
        <div class="col-sm-4">
          <input type="number" readonly class="form-control-plaintext" value={facturaData.total}/>
        </div>
      </div> */}
      <br></br>
      <div>
        <ul className="list-group">
          <li className="list-group">SubTotal :  {facturaData.subtotal}</li>
          <li className="list-group">IGV      :  {facturaData.igv}</li>
          <li className="list-group">Total    :  {facturaData.total}</li>
        </ul>
      </div>
      
     
      
    </>
  );
};

export default ObtenerFactura;
