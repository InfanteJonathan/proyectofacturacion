import React, { useEffect, useState } from "react";

const MenuPrincipal = () => {
    const[data, setData] = useState(null);
    const[categoria,setCategoria] = useState(null);

    useEffect(()=>{
        fetch("https://localhost:7252/api/Producto/listar")
        .then((response)=> response.json())
        .then((data)=> setData(data));
    },[]);

    useEffect(()=>{
        fetch("https://localhost:7252/api/Familia")
        .then((response) => response.json())
        .then((categoria)=> setCategoria(categoria));
    },[]);

    return(
        <>
        <div style={{display:'flex'}}>
            <div >
            <div style={{ marginTop: '80px', marginRight: '20px', padding: '20px', borderRadius: '8px', height: 'auto' }}>
            CATEGORIAS
            <div>
                {categoria?.map(item => (
                <div key={item.idFamilia}>
                    <a href={`/categoria/${item.id}`}> {/* Usar <a> en lugar de <link> */}
                    <p>{item.nombre}</p> {/* Usar <p> para mostrar texto */}
                    </a>
                </div>
                ))}
            </div>
            </div>

                
            </div>
            
            <div className="catalog-container" style={{marginTop:'80px',backgroundColor:'whitesmoke',padding:'10px',borderRadius:'10px'}}>
                {data?.map((item) => (
                    <div key={item.idProducto} className="product-item">
                        <img src={item.imagen} alt={item.nombre} />
                        <p>{item.nombre}</p>
                        <p>${item.precio}</p>
                    </div>
                ))}
            </div>            
        </div>     

        </>

    );

};
export default MenuPrincipal;