import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MyCard.css';

const MyCard = ({ propiedades_id, title, location, price, imagen }) => {
  console.log('Props en MyCard:', { propiedades_id, title, location, price, imagen });

  const imagenURL = Array.isArray(imagen) ? imagen[0] : imagen; 

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagenURL} style={{ maxHeight: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Ubicación: {location}</Card.Text>
        <Card.Text>Precio: UF {price}</Card.Text>
        <Link to={`/detalle-publicacion/${propiedades_id}`}>
          <button>Ver más</button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MyCard;