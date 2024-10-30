import React from 'react';
import NavbarHome from '../components/NavbarHome'
import FormularioAcceso from '../components/FormularioAcceso';
import Footer from '../components/Footer';
import '../css/FormularioAcceso.css'


function InicioSesion() {
  return (
    <>
    <NavbarHome/>
    <h1 className='text-center'>Inicio Sesion</h1>
    <div className='loginview ms-5 me-5 mt-5'>
    <FormularioAcceso/>
    </div>
    <Footer/>
    </>
    
  );
}

export default InicioSesion;