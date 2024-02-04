import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import  {Button}  from 'react-bootstrap';

function ListaCategoria(){
    const [data, setData]  = useState(null);

  useEffect(()=>{
    fetch("https://localhost:7252/api/Familia")
    .then((response) => response.json())
    .then((data) => setData(data));
  },[]);

  return (
    <div>
      <h1>Lista de Categorias</h1>
      <br></br>
      <Button className='btn btn-success'>
        <Link  to={`/crear/`} style={{ textDecoration: 'none', color: 'inherit' }}>Nueva Categoria</Link>
      </Button>
      <div>
        <br></br>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">IdCategoria</th>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Activo</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item)=>(
              <tr key={item.idFamilia}>
                <td>{item.idFamilia}</td>
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>{item.activo? 1:0}</td>
                <td>
                  <Button className='btn btn-secondary'>
                    <Link  to={`/editar/${item.idFamilia}`} style={{ textDecoration: 'none', color: 'inherit' }} >Editar</Link> 
                  </Button>         
                  /
                  <Button className='btn btn-danger'>
                    <Link  to={`/eliminar/${item.idFamilia}`} style={{ textDecoration: 'none', color: 'inherit' }}>Eliminar</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>    
  );
}

export default ListaCategoria;