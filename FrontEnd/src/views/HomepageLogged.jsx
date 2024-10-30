import React, { useEffect, useState } from 'react';
import NavbarLogged from '../components/NavbarLogged';
import MenuLateral from '../components/MenuLateral';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function HomepageLogged() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/properties/propiedades');
        console.log('Datos obtenidos desde el servidor:', response.data);
        setPropiedades(response.data);
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
      }
    };
    fetchProperties();
  }, []);
  return (
    <>
      <NavbarLogged />
      <div className='containerSection min-vh-100'>
        <MenuLateral />
        <CardList propiedades={propiedades} /> {/* Pasamos las propiedades al CardList */}
      </div>
      <Container className='min-vh-10'/>
      <Footer />
      <Container/>
    </>
  );
}

export default HomepageLogged;
