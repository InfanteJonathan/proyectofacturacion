import React, { createContext, useState } from 'react';

// Crear un nuevo contexto
const FacturaContext = createContext();

// Crear un componente de proveedor de contexto
export const FacturaProvider = ({ children }) => {
  const [detalles, setDetalles] = useState([]);

  return (
    <FacturaContext.Provider value={{ detalles, setDetalles }}>
      {children}
    </FacturaContext.Provider>
  );
};

export default FacturaContext;
