
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HouseDoorFill, BadgeWc } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  
import '../css/DetallePublicacion.css';

const DetallePublicacion = ({ propiedades_id }) => {
  const [publicacion, setPublicacion] = useState(null);  
  const [error, setError] = useState(null);  
  const { VITE_API_URL } = import.meta.env;

  useEffect(() => {
    if (!propiedades_id || isNaN(parseInt(propiedades_id))) {
      setError("ID de propiedad no válido");
      return;
    }
  
    const fetchPublicacion = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/properties/${propiedades_id}`);
        setPublicacion(response.data);
      } catch (error) {
        console.error("Error al cargar la publicación:", error);
        setError("No se pudo cargar la publicación.");
      }
    };
  
    fetchPublicacion();
  }, [propiedades_id]);
  
  
  if (error) {
    return <p>{error}</p>;  
  }

  if (!publicacion) {
    return <p>Cargando publicación...</p>;
  }

  return (
    <Container className="my-5 details-container">
  <Row>
    <Col md={8}>
      <img
        src={publicacion.imagen || "https://via.placeholder.com/800x400"}
        className="img-fluid mb-3"
        alt="Publicación"
      />
    </Col>
    <Col md={4} className="details-section">
      <h2>{publicacion.titulo}</h2>
      <p><strong>Precio:</strong> ${publicacion.precio}</p>
      <p><strong>Comuna:</strong> {publicacion.comuna}</p>
      <p><HouseDoorFill className="icon" /> {publicacion.habitaciones} Habitaciones</p>
      <p><BadgeWc className="icon" /> {publicacion.banos} Baños</p>
      <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
    </Col>
  </Row>
</Container>
  );
};

export default DetallePublicacion;
