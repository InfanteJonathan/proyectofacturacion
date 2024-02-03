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
      <Button className='btn btn-primary'>
        <Link  to={`/crearProducto`}>Crear</Link>
      </Button> 
      <hr/>               
      <table className="table table-dark table-striped">
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
              <td>{item.activo? 'No':'Si'}</td>
              <td>
                <Button className='btn btn-success'>
                  <Link  to={`/editarProducto/${item.idProducto}`}>Editar</Link> 
                </Button>
                /
                <Button className='btn btn-danger'>
                  <Link  to={`/eliminarProducto/${item.idProducto}`}>Eliminar</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>    
  );
}

export default ListaProductos;