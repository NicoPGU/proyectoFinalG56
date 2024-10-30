import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
return (
<footer className="bg-dark text-white text-center py-3">
    <Container>
    <p className="footer-text mb-0">SuCasa App &copy; Marca Registrada</p>
    <p style={{fontSize: '12px', color:'white'}}>Juan Cid, Nicolás Perez y Pablo Araya</p>
    </Container>
</footer>
);
};

export default Footer;