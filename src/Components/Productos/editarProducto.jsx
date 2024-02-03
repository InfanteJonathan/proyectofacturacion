import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        codigo: '',
        nombre: '',
        idFamilia: '',
        precio: '',
        stock: '',
        activo: true,
    });

    useEffect(() => {
        fetch(`https://localhost:7252/api/Producto/obtener/${id}`)
            .then(res => res.json())
            .then(data => {
                setProducto(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setProducto({ ...producto, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7252/api/Producto/editar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/productos');
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
                <input type="text" name="codigo" value={producto.codigo} onChange={handleChange} />
            </label>
            <label>
                Nombre:
                <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
            </label>
            <label>
                Id Familia:
                <input type="number" name="idFamilia" value={producto.idFamilia} onChange={handleChange} />
            </label>
            <label>
                Precio:
                <input type="number" name="precio" value={producto.precio} onChange={handleChange} />
            </label>
            <label>
                Stock:
                <input type="number" name="stock" value={producto.stock} onChange={handleChange} />
            </label>
            <label>
                Activo:
                <input type="checkbox" name="activo" checked={producto.activo} onChange={handleChange} />
            </label>
            <input type="submit" value="Actualizar" />
        </form>
    );
}

export default EditarProducto;
