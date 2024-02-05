import React,{useEffect, useState} from 'react';
import DetallesFacturaId from './listarDetalle';
import ObtenerFactura from './obtenerFactura';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CrearDetalle = () =>{
    const[idItem, setIdItem] = useState('');
    const[idFactura, setIdFactura] = useState('');
    const[idProducto, setIdProducto] = useState('');
    const[codigoProducto, setCodigoProducto] = useState('');
    const[nombreProducto, setNombreProducto] = useState('');
    const[precio, setPrecio] = useState('');
    const[cantidad, setCantidad] = useState('');

    const[productos,setProductos] = useState([]);
    const [key, setKey] = useState(0);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const[nuevoDatoId, setNuevoDatoId] = useState(null);
    

    const handleProductoChange = (e) => {
        const idProductoSeleccionado = Number(e.target.value);
        const productoSeleccionado = productos.find(producto => producto.idProducto === idProductoSeleccionado);
        if (productoSeleccionado) {
            setIdProducto(productoSeleccionado.idProducto);
            setCodigoProducto(productoSeleccionado.codigo);
            setNombreProducto(productoSeleccionado.nombre);
            setPrecio(productoSeleccionado.precio);
        }
    };

    

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const categoria = {
            IdItem : idItem,
            IdFactura : idFactura,
            IdProducto : idProducto,
            CodigoProducto : codigoProducto,
            NombreProducto : nombreProducto,
            Precio : precio,
            Cantidad : cantidad,
        };

        try{
            const response = await fetch("https://localhost:7252/api/Detalles/crear",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(categoria)
            });
            const data = await response.json();
            console.log(data);
            setNuevoDatoId(data.idFactura);
            // setIsButtonClicked(true);
            setKey(prevkey => prevkey + 1);


        }catch(error){
            console.error('Hubo un error al crear el Detalle:',error);
        }
    };

    useEffect(() => {
        fetch('https://localhost:7252/api/Producto/listar')
            .then(res => res.json())
            .then(data => {
                setProductos(data);
                if (data[0]) {
                    setIdProducto(data[0].idProducto);
                }
            })
            .catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
        if(nuevoDatoId){
            console.log('Nuevo dato ID:',nuevoDatoId);
        }
    },[nuevoDatoId]);
    
    useEffect(() => {
        const productoSeleccionado = productos.find(producto => producto.idProducto === idProducto);
        if (productoSeleccionado) {
            setCodigoProducto(productoSeleccionado.codigo);
            setNombreProducto(productoSeleccionado.nombre);
            setPrecio(productoSeleccionado.precio);
        }
    }, [idProducto]);
      

    return (
        <>
            <ObtenerFactura id={nuevoDatoId} key={key}/>
        <h2>DETALLES</h2>       
            <form className='rounded p-3 border' style={{backgroundColor: "lightblue"}} onSubmit={handleSubmit}>
                <div className='row g-3'>
                    <div className='col-sm-2'>
                        ID Item
                        <input type="text" className="form-control" placeholder='Ejem: 0001' value={idItem} onChange={e => setIdItem(e.target.value)} />
                    </div>
                    <div className='col-sm'>
                        Id Factura
                        <input type="number" className="form-control" value={idFactura} onChange={e => setIdFactura(e.target.value)} />
                    </div>
                    <div className='col-sm'>
                        Nombre Producto
                        <select value={idProducto} className="form-control" onChange={handleProductoChange}>
                            {productos.map(producto => (
                                <option key={producto.idProducto} value={producto.idProducto}>
                                    {producto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='col-sm'>
                        Codigo Producto
                        <input type="text" className="form-control" value={codigoProducto} onChange={() => {}}/>
                    </div>
                    <div className='col-sm'>
                        Precio
                        <input type="number" className="form-control" value={precio} onChange={() => {}}/>
                    </div>
                    <div className='col-sm'>
                        Cantidad
                        <input type="number" className="form-control" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                    </div>
                    <div className='col-sm d-flex'>
                        <button className='btn btn-success' type="submit">Agregar</button>              
                    </div>
                           
                    
                    
                </div>
            </form>
            <div>
                <DetallesFacturaId id={nuevoDatoId} key={key} />
            </div>
            
            <br></br>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Link className='btn btn-secondary' to={"/facturas"}>SALIR</Link>
            </div>
            
        </>
    );

}

export default CrearDetalle;