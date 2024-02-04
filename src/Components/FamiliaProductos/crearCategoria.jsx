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
            <form onSubmit={handleSubmit}>
                <label>
                    Código:
                    <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} />
                </label>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                </label>
                <label>
                    Activo:
                    <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)} />
                </label>
                <button type="submit">Crear categoría</button>
            </form>
        </>
        
    );

}

export default FormularioCategoria;