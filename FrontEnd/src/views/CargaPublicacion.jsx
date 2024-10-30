import React from 'react';
import NavbarLogged from '../components/NavbarLogged';
import Footer from '../components/Footer';
import IngresoPropiedad from '../components/IngresoPropiedad';
import '../css/CargaPublicacion.css';

function CargaPublicacion() {
  return (
    <>
    <NavbarLogged/>
    <div className='IngresoPropiedadSection ms-5 me-5 mt-5'>
    <IngresoPropiedad/>
    </div>
    <Footer/>
    </>
  );
}

export default CargaPublicacion;