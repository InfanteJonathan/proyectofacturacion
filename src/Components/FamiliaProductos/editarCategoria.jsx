import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const EditarFamiliaProducto = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [familiaProducto, setFamiliaProducto] = useState({
        codigo: '',
        nombre: '',
        activo: false,
    });

    useEffect(() => {
        fetch(`https://localhost:7252/api/Familia/obtener/${id}`)
            .then(res => res.json())
            .then(data => {
                setFamiliaProducto(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFamiliaProducto({ ...familiaProducto, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7252/api/Familia/editar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(familiaProducto)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/categorias')
            })
            .catch(err => console.log(err));
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Código:
                <input type="text" name="codigo" value={familiaProducto.codigo} onChange={handleChange} />
            </label>
            <label>
                Nombre:
                <input type="text" name="nombre" value={familiaProducto.nombre} onChange={handleChange} />
            </label>
            <label>
                Activo:
                <input type="checkbox" name="activo" checked={familiaProducto.activo} onChange={handleChange} />
            </label>
            <input type="submit" value="Actualizar" />
        </form>
    );
}

export default EditarFamiliaProducto;
