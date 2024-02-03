import React, { useState, useEffect } from 'react';
import "./style.css";
import CrearDetalle from './crearDetalle';
import DetallesFacturaId from './listarDetalle';
import ObtenerFactura from './obtenerFactura';


const CrearFactura = () => {
    const [numeroFactura, setNumeroFactura] = useState('');
    const [rucCliente, setRucCliente] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [porcentajeIgv, setPorcentajeIgv] = useState('');

    const [nuevoDatoId,setNuevoDatoId] = useState(null);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const factura = {
            NumeroFactura: numeroFactura,
            RucCliente: rucCliente,
            RazonSocial: razonSocial,
            PorcentajeIGV: porcentajeIgv,
        };

        try {
            const response = await fetch('https://localhost:7252/api/Factura/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(factura)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                setNuevoDatoId(data.idFactura);
            }
        } catch (error) {
            console.error('Hubo un error al crear la categoria:', error);
        }
    };


    useEffect(() => {
        if (nuevoDatoId) {
            console.log('Nuevo dato ID:', nuevoDatoId);
        }
    }, [nuevoDatoId]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-4">
                        <input type="text" value={numeroFactura}
                            onChange={e => setNumeroFactura(e.target.value)}
                            className="form-control" placeholder="N° Factura" aria-label="City" />
                    </div>
                    <div className="col-sm">
                        <input type="text" value={rucCliente}
                            onChange={e => setRucCliente(e.target.value)}
                            className="form-control" placeholder="Ruc Cliente" aria-label="City" />
                    </div>
                    <div className="col-sm">
                        <input type="text"
                            value={razonSocial}
                            onChange={e => setRazonSocial(e.target.value)}
                            className="form-control" placeholder="Razon Social" aria-label="State" />
                    </div>
                    <div className="col-sm">
                        <input type="number" value={porcentajeIgv}
                            onChange={e => setPorcentajeIgv(e.target.value)}
                            className="form-control" placeholder="Porcentaje IGV" />
                    </div>
                </div>
                <button type="submit">Nueva Factura</button>

            </form>
            <div className='label'>
               {nuevoDatoId && <ObtenerFactura id={nuevoDatoId}/>}
            </div>
            <CrearDetalle />         
            

        </div>
    );

}

export default CrearFactura;