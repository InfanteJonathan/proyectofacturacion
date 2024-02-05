import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';



const CrearProductoFormulario = () =>{

    const navigate = useNavigate();

    const[codigo, setCodigo] = useState('');
    const[nombre,setNombre] = useState('');
    const[idFamilia,setIdFamilia] = useState('');
    const[precio,setPrecio] = useState('');
    const[stock,setStock] = useState('');
    const[activo,setActivo] = useState(false);
    const[familias,setFamilias] = useState([]);


    const handleSubmit = async(event)=>{
        event.preventDefault();

        const categoria = {
            Codigo : codigo,
            Nombre : nombre,
            IdFamilia : idFamilia,
            Precio : precio,
            Stock : stock,
            Activo : activo,
        };        

        try{
            const response = await fetch('https://localhost:7252/api/Producto/crear',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(categoria)
            });
            const data = await response.json();
            console.log(data);
            navigate('/productos');

        }catch(error){
            console.error('Hubo un error al crear la categoria:',error);
        }
    };

    useEffect(()=>{
        fetch('https://localhost:7252/api/Familia')
        .then(res=>res.json())
        .then(data => {
            setFamilias(data);
            setIdFamilia(data[0].idFamilia);
        })
        .catch(err=>console.error(err));
    },[]);

    return (
        <>
        <br></br>
        <h1>Nuevo Producto</h1>
        <form className='row g-3 flex-column' onSubmit={handleSubmit}>
            <div className="col-md-3">
                <label htmlFor="codigo" className="form-label">Código</label>
                <input type="text" id="codigo" className="form-control" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder='Ejem: P0001' required />
            </div>
            <div className="col-md-4">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" id="nombre" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-4">
                <label htmlFor="categoria" className="form-label">Categoría</label>
                <select id="categoria" className="form-select" value={idFamilia} onChange={e => setIdFamilia(e.target.value)} required>
                    {familias.map(familia => (
                        <option key={familia.idFamilia} value={familia.idFamilia}>
                            {familia.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input type="number" id="precio" className="form-control" value={precio} onChange={e => setPrecio(e.target.value)} min="0" required />
            </div>
            <div className="col-md-2">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input type="number" id="stock" className="form-control" value={stock} onChange={e => setStock(e.target.value)} min="0" required />
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input type="checkbox" id="activo" className="form-check-input" checked={activo} onChange={e => setActivo(e.target.checked)} />
                    <label htmlFor="activo" className="form-check-label">Activo</label>
                </div>
            </div>
            
            <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{margin:'10px'}}>Crear Producto</button>
                <Link to={'/productos'} className='btn btn-secondary'>Salir</Link>
            </div>
        </form>

   
  
        </>
        
    );

}

export default CrearProductoFormulario;