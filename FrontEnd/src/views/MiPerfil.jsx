
import React, { useEffect, useState } from 'react';
import PerfilSection from '../components/PerfilSection';
import Footer from '../components/Footer';
import NavbarLogged from '../components/NavbarLogged';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;
function MiPerfil() {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      
      axios.get(`${VITE_API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setNombreUsuario(response.data.nombre); 
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
    }
  }, []);

  return (
    <>
      <NavbarLogged/>
      <div className='containerSectionPerfil'>
        <h2>Sesión iniciada como: {nombreUsuario}</h2>
        <PerfilSection nombreUsuario={nombreUsuario}/>
      </div>
      <Footer/>
    </>
  );
}

export default MiPerfil;
