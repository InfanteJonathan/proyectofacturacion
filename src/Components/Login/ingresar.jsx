import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const [contador, setContador] = useState(0);
    const [bloqueoHasta, setBloqueoHasta] = useState(new Date());
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (new Date() < bloqueoHasta) {
            setError('Cuenta Bloqueada. Por favor, espera unos segundos antes de intentarlo de nuevo');
            return;
        }
        let intentosFallidos = contador + 1;

        try {
            const response = await fetch(`https://localhost:7252/api/Usuario/validar/${nombre}/${contrasenia}`);
            if (!response.ok) {
                throw new Error('Nombre de usuario o contraseña incorrectos');
            }
            setError('');
            intentosFallidos = 0;
            setBloqueoHasta(new Date());
            navigate('*');
        } catch (error) {
            setError(error.message);         
        }

        setContador(intentosFallidos);

        if(intentosFallidos>=3){
            setBloqueoHasta(new Date().setMinutes(new Date().getSeconds()+1));
            setContador(0);

        }
    };

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{backgroundColor:'lightgrey',borderRadius:'5%',padding:'4em'}} >
                <form className='row g-4 flex-column' onSubmit={handleSubmit}>
                    <div className="col-mb-8" controlId="formBasicEmail">
                        <label style={{fontWeight:'bold'}} className="form-label">Usuario</label>
                        <input className="form-control" type="text" placeholder="Ingresa tu usuario" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                    </div>

                    <div className="col-mb-8" controlId="formBasicPassword">
                        <label style={{fontWeight:'bold'}} className="form-label">Contraseña</label>
                        <input className="form-control" type="password" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                    </div>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ width: '150px' }} variant="primary" type="submit">
                            Ingresar
                        </Button>
                    </div>

                </form>
            </div>
        </div>

            
        </>
    );
};

export default LoginComponent;
