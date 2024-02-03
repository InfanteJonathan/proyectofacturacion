import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

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
                Id Familia:
                <select value={idFamilia} onChange={e => setIdFamilia(e.target.value)}>
                    {familias.map(familia => (
                        <option key={familia.idFamilia} value={familia.idFamilia}>
                            {familia.nombre}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Precio:
                <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
            </label>
            <label>
                Stock:
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} />
            </label>
            <label>
                Activo:
                <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)} />
            </label>
            <button type="submit">Crear Producto</button>
        </form>
    );

}

export default CrearProductoFormulario;