
import React from 'react';
import DetallePublicacion from '../components/DetallePublicacion';
import NavbarHome from '../components/NavbarHome';
import MenuLateral from '../components/MenuLateral';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';  

function VistaDetallePublicacion() {
  const { propiedades_id } = useParams();
console.log('propiedades_id:', propiedades_id);
  return (
    <div>
      <>
      <NavbarHome/>
      <div className='containerSection fullpage'>
      <MenuLateral/>
      {/* Pass the propiedades_id to DetallePublicacion */}
      <DetallePublicacion propiedades_id={propiedades_id}/>
      </div>
      <Footer/>

      </>
    </div>
  );
}

export default VistaDetallePublicacion;
