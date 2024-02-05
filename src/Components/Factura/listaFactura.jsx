import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListaFacturas(){
    const [data, setData]  = useState(null);

  useEffect(()=>{
    fetch("https://localhost:7252/api/Factura/listar")
    .then((response) => response.json())
    .then((data) => setData(data));
  },[]);

  return (
    <div>
      <h1>Lista de Facturas</h1>
        <Link className='btn btn-success'  to={`/crearFactura`}>Crear</Link>
      <br></br>
      <div style={{maxHeight:'500px',overflow:'scroll'}}>               
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">NumeroFactura</th>
              <th scope="col">Ruc Cliente</th>
              <th scope="col">Razon Social</th>
              <th scope="col">Sub Total</th>
              <th scope="col">Porcentaje IGV</th>
              <th scope="col">IGV</th>
              <th scope='col'>Total</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item)=>(
              <tr key={item.idFactura}>
                <td>{item.idFactura}</td>  
                <td>{item.numeroFactura}</td>
                <td>{item.rucCliente}</td>
                <td>{item.razonSocial}</td>
                <td>{item.subtotal}</td>
                <td>{item.porcentajeIgv}</td>
                <td>{item.igv}</td>
                <td>{item.total}</td>              
                <td>
                    <Link className='btn btn-secondary'  to={`/detallefactura/${item.idFactura}`}>Detalles</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>    
  );
}

export default ListaFacturas;