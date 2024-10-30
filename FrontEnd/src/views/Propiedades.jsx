
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
       
        await axios.get(`${VITE_API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setIsAuthenticated(true); 
      } catch (error) {
        setIsAuthenticated(false); 
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
     
      {isAuthenticated ? <NavbarLogged /> : <NavbarHome />}

      <div className="content">
        <h2>Nuestras propiedades en venta</h2>
        <CardList propiedades={propiedades} />
      </div>

      
      <Footer />
    </div>
  );
};

export default PropiedadesPublicas;
