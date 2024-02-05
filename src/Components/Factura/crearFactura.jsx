import React, { useState, useEffect } from 'react';
import CrearDetalle from './crearDetalle';
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
        <>
        <div >
            <div  style={{display:'flex', justifyContent:"center"}}>
                <h1 style={{fontWeight:'bold',fontFamily:'-moz-initial'}}>
                    Factura
                </h1>                 
            </div>
            <form className='rounded p-3 border' style={{backgroundColor: "lightblue"}} onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-3" style={{fontWeight:'bold'}}>
                        <div style={{display:'flex', justifyContent:"center"}}>
                           Num Factura 
                        </div>                        
                        <input type="text" value={numeroFactura}
                            onChange={e => setNumeroFactura(e.target.value)}
                            className="form-control" placeholder="Ejem: F001" aria-label="City" required />
                    </div>
                    <div className="col-sm" style={{fontWeight:'bold'}}>
                        <div style={{display:'flex', justifyContent:"center"}}>
                            Ruc Cliente 
                        </div>                       
                        <input type="text" value={rucCliente}
                            onChange={e => setRucCliente(e.target.value)}
                            className="form-control" aria-label="City" required />
                    </div>
                    <div className="col-sm" style={{fontWeight:'bold'}}>
                        <div style={{display:'flex', justifyContent:"center"}}>
                           Razón Social 
                        </div>                        
                        <input type="text"
                            value={razonSocial}
                            onChange={e => setRazonSocial(e.target.value)}
                            className="form-control"  aria-label="State" required />
                    </div>
                    <div className="col-sm" style={{fontWeight:'bold'}}>
                        <div style={{display:'flex', justifyContent:"center"}}>
                           Porcentaje IGV 
                        </div>
                        
                        <input type="number" value={porcentajeIgv}
                            onChange={e => setPorcentajeIgv(e.target.value)}
                            className="form-control" placeholder="Ejem: 0.18" min="0" step="0.01" required />
                    </div>
                </div>
                <br />
                <div  >
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <button style={{fontWeight:'bold',color:'whitesmoke'}} className='btn btn-primary' type="submit">Nueva Factura</button>
                    </div>                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <li className="list-group" style={{fontWeight:"bold", marginRight: "40px"}}>ID FACTURA :  {nuevoDatoId}</li>
                    </div>
                </div>
                
                {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div>
                        <ul >
                            
                        </ul>
                    </div>
                </div> */}
            </form>
            <CrearDetalle />         
        </div>
        </>
    );

}

export default CrearFactura;