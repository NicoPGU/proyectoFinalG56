import React, { useEffect, useState } from 'react';
import NavbarHome from '../components/NavbarHome';
import MenuLateral from '../components/MenuLateral';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const { VITE_API_URL } = import.meta.env;
function Homepage() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/properties/propiedades`);
        setPropiedades(response.data);
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <NavbarHome />
      <div className='containerSection min-vh-100'>
        <MenuLateral />
        <CardList propiedades={propiedades} /> 
      </div>
      <Container className='min-vh-10'/>
      <Footer />
    </>
  );
}

export default Homepage;
