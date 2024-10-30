import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bell } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

function NavbarLogged() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/inicio-sesion'); 
    };

    
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Navbar bg="light" expand="lg" className='ps-5'>
            <Navbar.Brand onClick={() => navigate(isAuthenticated ? '/home-logged' : '/')} className='ms-5' style={{ cursor: 'pointer' }}>
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
                <Nav className="ms-auto d-flex align-items-center">
                    <Button variant="link" className="me-4">
                        <Bell size={30} style={{ color: '#ffffff' }} />
                    </Button>
                    <Button variant="outline-secondary" className="p-0 border-0 bg-transparent" href='/mi-perfil'>
                        <img
                            src="https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk="
                            width="50"
                            height="50"
                            className="rounded-circle me-5"
                            alt="Profile"
                        />
                    </Button>
                    <Button variant="outline-danger" className="me-5" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarLogged;
