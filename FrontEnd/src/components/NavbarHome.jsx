import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';

function NavbarHome() {
  return (
    <div className='navbarflex'>
      <Navbar bg="light" expand="lg" className='navbar-custom'>
        <Navbar.Brand href="/">
          <img
           src="https://i.imgur.com/nifaeBv.jpeg"
           width="150"
           height="70"
            className="d-inline-block align-top"
            alt="Logo"
          />
          
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> 
            <Link to="/inicio-sesion">
              <Button variant="outline-primary" className="me-4 rounded-button">Acceder</Button>
            </Link>
            <Link to="/registro">
              <Button variant="primary" className="me-5 rounded-button">Registro</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarHome;
