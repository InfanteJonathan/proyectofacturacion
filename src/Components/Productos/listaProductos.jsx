import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import  {Button}  from 'react-bootstrap';

function ListaProductos(){
    const [data, setData]  = useState(null);

  useEffect(()=>{
    fetch("https://localhost:7252/api/Producto/listar")
    .then((response) => response.json())
    .then((data) => setData(data));
  },[]);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <br></br>
      <div>
      <Link className='btn btn-success' to={`/crearProducto`}>Nuevo Producto</Link>
      </div>
      
      <br></br>
      <div>          
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">ID Categoria</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Activo</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item)=>(
              <tr key={item.idProducto}>
                <td>{item.idProducto}</td>  
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>{item.idFamilia}</td>
                <td>{item.precio}</td>
                <td>{item.stock}</td>
                <td>{item.activo? 'Si':'No'}</td>
                <td className='d-flex'>
                  <Link className='btn btn-secondary' to={`/editarProducto/${item.idProducto}`}>Editar</Link>
                  <br></br> 
                  <Link className='btn btn-danger'  to={`/eliminarProducto/${item.idProducto}`}>Eliminar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
      </div>    
  );
}

export default ListaProductos;