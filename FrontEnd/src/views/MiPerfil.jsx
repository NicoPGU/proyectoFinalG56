
import React, { useEffect, useState } from 'react';
import PerfilSection from '../components/PerfilSection';
import Footer from '../components/Footer';
import NavbarLogged from '../components/NavbarLogged';
import axios from 'axios';

function MiPerfil() {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Hacer una solicitud al backend para obtener los datos del usuario
      axios.get('http://localhost:3000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setNombreUsuario(response.data.nombre); // Asignar el nombre del usuario
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
