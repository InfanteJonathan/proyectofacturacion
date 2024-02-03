import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import  {Button}  from 'react-bootstrap';

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
      <Button className='btn btn-primary'>
        <Link  to={`/crearFactura`}>Crear</Link>
      </Button> 
      <hr/>               
      <table className="table table-dark table-striped">
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
          </tr>
        </thead>
        <tbody>
          {data?.map((item)=>(
            <tr key={item.idFactura}>
              <td>{item.idFactura}</td>  
              <td>{item.numeroFactura}</td>
              <td>{item.rucCliente}</td>
              <td>{item.razonSocial}</td>
              <td>{item.subTotal}</td>
              <td>{item.porcentajeIgv}</td>
              <td>{item.igv}</td>
              <td>{item.total}</td>              
              <td>
                <Button className='btn btn-danger'>
                  <Link  to={`/eliminarFactura/${item.idFactura}`}>Eliminar</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>    
  );
}

export default ListaFacturas;