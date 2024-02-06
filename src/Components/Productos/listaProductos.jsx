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
      <br></br>
      <h1>Lista de Productos</h1>
      <br></br>
      <div style={{display:'flex',justifyContent:'center'}}>
        <Link className='btn btn-success' to={`/crearProducto`}>Nuevo Producto</Link>
      </div>
      
      <br></br>
      <div style={{display:'flex',justifyContent:'center',maxHeight: '600px', overflow: 'scroll'}}>          
        <table className="table table-striped" style={{width:'80%'}}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">ID Categoria</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Activo</th>
              <th style={{display:'flex',justifyContent:'center'}} scope='col'>Acciones</th>
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
                <td >
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <Link className='btn btn-secondary' style={{marginRight:'15px'}} to={`/editarProducto/${item.idProducto}`}>Editar</Link>
                    <Link className='btn btn-danger'  to={`/eliminarProducto/${item.idProducto}`}>Eliminar</Link>
                  </div>
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