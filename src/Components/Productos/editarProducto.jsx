import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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
        <>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit} className="row g-3 flex-column">
                <div className="col-md-3">
                    <label htmlFor="codigo" className="form-label">Código:</label>
                    <input type="text" id="codigo" className="form-control" name="codigo" value={producto.codigo} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input type="text" id="nombre" className="form-control" name="nombre" value={producto.nombre} onChange={handleChange} required />
                </div>
                <div className="col-md-2">
                    <label htmlFor="idFamilia" className="form-label">Id Familia:</label>
                    <input type="number" id="idFamilia" className="form-control" name="idFamilia" value={producto.idFamilia} onChange={handleChange} required />
                </div>
                <div className="col-md-2">
                    <label htmlFor="precio" className="form-label">Precio:</label>
                    <input type="number" id="precio" className="form-control" name="precio" value={producto.precio} onChange={handleChange} min="0.0" step="0.01" required />
                </div>

                <div className="col-md-2">
                    <label htmlFor="stock" className="form-label">Stock:</label>
                    <input type="number" id="stock" className="form-control" name="stock" value={producto.stock} onChange={handleChange} min="0" required />
                </div>
                <div className="col-md-2">
                    <label htmlFor="activo" className="form-label">Activo:</label>
                    <div className="form-check">
                        <input type="checkbox" id="activo" className="form-check-input" name="activo" checked={producto.activo} onChange={handleChange} />
                        <label htmlFor="activo" className="form-check-label">Activo</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" style={{margin:'10px'}}>Actualizar</button>
                    <Link to={'/productos'} className='btn btn-secondary'>Salir</Link>
                </div>
            </form>

        </>
    );
}

export default EditarProducto;
