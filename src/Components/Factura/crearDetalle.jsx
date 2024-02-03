import React,{useEffect, useState} from 'react';
import DetallesFacturaId from './listarDetalle';

const CrearDetalle = () =>{
    const[idItem, setIdItem] = useState('');
    const[idFactura, setIdFactura] = useState('');
    const[idProducto, setIdProducto] = useState('');
    const[codigoProducto, setCodigoProducto] = useState('');
    const[nombreProducto, setNombreProducto] = useState('');
    const[precio, setPrecio] = useState('');
    const[cantidad, setCantidad] = useState('');

    const[productos,setProductos] = useState([]);

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

        }catch(error){
            console.error('Hubo un error al crear la categoria:',error);
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
        const productoSeleccionado = productos.find(producto => producto.idProducto === idProducto);
        if (productoSeleccionado) {
            setCodigoProducto(productoSeleccionado.codigo);
            setNombreProducto(productoSeleccionado.nombre);
            setPrecio(productoSeleccionado.precio);
        }
    }, [idProducto]);
      

    return (
        <form onSubmit={handleSubmit}>
            <label>
                ID Item:
                <input type="text" value={idItem} onChange={e => setIdItem(e.target.value)} />
            </label>
            <label>
                Id Factura:
                <input type="number" value={idFactura} onChange={e => setIdFactura(e.target.value)} />
            </label>
            <label>
                ID Producto:
                <select value={idProducto} onChange={handleProductoChange}>
                    {productos.map(producto => (
                        <option key={producto.idProducto} value={producto.idProducto}>
                            {producto.idProducto}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Codigo Producto:
                <input type="text" value={codigoProducto} onChange={() => {}}/>
            </label>
            <label>
                Nombre Producto:
                <input type="text" value={nombreProducto} onChange={() => {}} />
            </label>
            <label>
                Precio:
                <input type="number" value={precio} onChange={() => {}}/>
            </label>
            <label>
                Cantidad:
                <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} />
            </label>
            <div>
                <button type="submit">Crear Factura</button>            
            </div>  

            
        </form>
    );

}

export default CrearDetalle;