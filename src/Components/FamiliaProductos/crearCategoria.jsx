import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioCategoria = () =>{

    const navigate = useNavigate();

    const[codigo, setCodigo] = useState('');
    const[nombre,setNombre] = useState('');
    const[activo,setActivo] = useState(false);


    const handleSubmit = async(event)=>{
        event.preventDefault();

        const categoria = {
            Codigo : codigo,
            Nombre : nombre,
            Activo : activo,
        };

        try{
            const response = await fetch("https://localhost:7252/api/Familia/crear",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(categoria)
            });
            const data = await response.json();
            console.log(data);
            navigate("/categorias")

        }catch(error){
            console.error('Hubo un error al crear la categoria:',error);
        }
    };

    return (
        <>
        <br></br>
        <h1>Nueva Categoria</h1>
        <br></br>
        <form onSubmit={handleSubmit} className="row g-3 flex-column">
            <div className="col-md-4">
                <label htmlFor="codigo" className="form-label">Código:</label>
                <input type="text" id="codigo" placeholder='Ejem: FP001' className="form-control" value={codigo} onChange={e => setCodigo(e.target.value)} required />
            </div>
            <div className="col-md-4">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input type="text" id="nombre" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-4">
                <label htmlFor="activo" className="form-check-label">Activo:</label>
                <div className="form-check">
                    <input type="checkbox" id="activo" className="form-check-input" checked={activo} onChange={e => setActivo(e.target.checked)} />
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Crear categoría</button>
            </div>
        </form>

        </>
        
    );

}

export default FormularioCategoria;