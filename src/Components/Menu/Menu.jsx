import React, { useEffect, useState } from "react";

const MenuPrincipal = () => {
    const[data, setData] = useState(null);

    useEffect(()=>{
        fetch("https://localhost:7252/api/Producto/listar")
        .then((response)=> response.json())
        .then((data)=> setData(data));
    },[]);

    return(
        <>
        <div className="catalog-container" style={{marginTop:'40px'}}>
            {data?.map((item) => (
                <div key={item.idProducto} className="product-item">
                    <img src={item.imagen} alt={item.nombre} />
                    <p>{item.nombre}</p>
                    <p>${item.precio}</p>
                </div>
            ))}
        </div>

        </>

    );

};
export default MenuPrincipal;