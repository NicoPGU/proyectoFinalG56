
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import NavbarHome from '../components/NavbarHome';
import NavbarLogged from '../components/NavbarLogged';

const { VITE_API_URL } = import.meta.env;
const PropiedadesPublicas = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        // Solicitud al backend para verificar autenticación usando el middleware verifyToken
        await axios.get(`${VITE_API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token en el encabezado
          },
        });
        setIsAuthenticated(true); // Usuario autenticado
      } catch (error) {
        setIsAuthenticated(false); // Usuario no autenticado
      }
    };

    const obtenerPropiedadesPublicas = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/properties/propiedades`);
        setPropiedades(response.data);
      } catch (error) {
        console.error('Error al obtener las propiedades:', error.response ? error.response.data : error.message);
      }
    };

    verificarAutenticacion();
    obtenerPropiedadesPublicas();
  }, []);

  return (
    <div className="main-container">
      {/* Navbar: Mostrar según autenticación basada en verifyToken */}
      {isAuthenticated ? <NavbarLogged /> : <NavbarHome />}

      <div className="content">
        <h2>Nuestras propiedades en venta</h2>
        <CardList propiedades={propiedades} />
      </div>

      {/* Footer siempre en la parte inferior */}
      <Footer />
    </div>
  );
};

export default PropiedadesPublicas;
