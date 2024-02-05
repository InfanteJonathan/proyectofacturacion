import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ListaCategoria from './Components/FamiliaProductos/listaCategoria';
import FormularioCategoria from './Components/FamiliaProductos/crearCategoria';
import EditarFamiliaProducto from './Components/FamiliaProductos/editarCategoria';
import EliminarFamiliaProducto from './Components/FamiliaProductos/eliminarCategoria';
import ListaProductos from './Components/Productos/listaProductos';
import EditarProducto from './Components/Productos/editarProducto';
import CrearProductoFormulario from './Components/Productos/crearProducto';
import EliminarProducto from './Components/Productos/eliminarProducto';
import ListaFacturas from './Components/Factura/listaFactura';
import CrearFactura from './Components/Factura/crearFactura';
import CrearDetalle from './Components/Factura/crearDetalle';
import DetallesFacturaId from './Components/Factura/listarDetalle';
import ObtenerFactura from './Components/Factura/obtenerFactura';
import MenuPrincipal from './Components/Menu/Menu';
import LoginComponent from './Components/Login/ingresar';
import DetalleListaFactura from './Components/Factura/detalleListaFactura';
import EliminarDetalle from './Components/Factura/eliminarDetalle';

import './App.css'
import Navbar from './Components/Menu/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path='*' element={<MenuPrincipal/>} />
              <Route path='categorias' element={<ListaCategoria/>} />
              <Route path='crear' element={<FormularioCategoria/>}/>
              <Route path='editar/:id' element={<EditarFamiliaProducto/>}/>
              <Route path='eliminar/:id' element={<EliminarFamiliaProducto/>}/>
              <Route path='productos' element={<ListaProductos/>} />
              <Route path='editarProducto/:id' element={<EditarProducto/>}/>
              <Route path='crearProducto' element={<CrearProductoFormulario/>}/>
              <Route path='eliminarProducto/:id' element={<EliminarProducto/>}/>
              <Route path='facturas' element={<ListaFacturas/>} />
              <Route path='crearFactura' element={<CrearFactura/>}/>
              <Route path='crearDetalle' element={<CrearDetalle/>}/>
              <Route path='listarDetalle' element={<DetallesFacturaId/>}/>
              <Route path='obtenerfactura' element={<ObtenerFactura/>}/>
              <Route path='detallefactura/:id' element={<DetalleListaFactura/>}/>
              <Route path='eliminarDetalle/:id' element={<EliminarDetalle/>}/>
              
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App
