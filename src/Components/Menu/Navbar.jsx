import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MyNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#"> Sistema Facturacion</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="*">Inicio</Nav.Link>
                    <NavDropdown title="Catálogos" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/productos">Producto</NavDropdown.Item>
                        <NavDropdown.Item href="/categorias">Familia de Productos</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Documentos" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/facturas">Factura</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
