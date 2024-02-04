import React, { useState, useEffect } from 'react';
import CrearDetalle from './crearDetalle';



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
            <br></br>
            <h1>
                Crear Factura
            </h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-3">
                        Num Factura
                        <input type="text" value={numeroFactura}
                            onChange={e => setNumeroFactura(e.target.value)}
                            className="form-control" placeholder="Ejem: F001" aria-label="City" />
                    </div>
                    <div className="col-sm">
                        Ruc Cliente
                        <input type="text" value={rucCliente}
                            onChange={e => setRucCliente(e.target.value)}
                            className="form-control" placeholder="Ruc Cliente" aria-label="City" />
                    </div>
                    <div className="col-sm">
                        Razón Social
                        <input type="text"
                            value={razonSocial}
                            onChange={e => setRazonSocial(e.target.value)}
                            className="form-control" placeholder="Razon Social" aria-label="State" />
                    </div>
                    <div className="col-sm">
                        Porcentaje Igv
                        <input type="number" value={porcentajeIgv}
                            onChange={e => setPorcentajeIgv(e.target.value)}
                            className="form-control" placeholder="Ejem: 0.18" />
                    </div>

                </div>
                <br></br>
                <div className="col-sm-2">
                        ID Factura
                    <input type="number" value={nuevoDatoId}s
                            className="form-control" readOnly />
                </div>
                <br></br>
                <button className='btn btn-primary' type="submit">Nueva Factura</button>


            </form>
            <br></br>
            {/* <div className='label'>
               {nuevoDatoId && <ObtenerFactura id={nuevoDatoId}/>}
            </div> */}
            
            <CrearDetalle />         
            

        </div>
    );

}

export default CrearFactura;