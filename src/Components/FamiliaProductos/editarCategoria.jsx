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
        <>
        <h1 style={{margin:'10px 0 20px 0'}}>Editar Categoria</h1>
        <form onSubmit={handleSubmit} className="row g-3 flex-column">
            <div className="col-md-4">
                <label htmlFor="codigo" className="form-label">Código:</label>
                <input type="text" id="codigo" className="form-control" name="codigo" value={familiaProducto.codigo} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input type="text" id="nombre" className="form-control" name="nombre" value={familiaProducto.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
                <label htmlFor="activo" className="form-check-label">Activo:</label>
                <div className="form-check">
                    <input type="checkbox" id="activo" className="form-check-input" name="activo" checked={familiaProducto.activo} onChange={handleChange} />
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </div>
        </form>
        </>
    );
}

export default EditarFamiliaProducto;
