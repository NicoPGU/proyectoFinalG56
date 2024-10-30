
import React from 'react';

const PropertyCard = ({ propiedad }) => {

  const imagenURL = propiedad.imagen && propiedad.imagen.length > 0 ? JSON.parse(propiedad.imagen)[0] : '/default-image.jpg'; // Mostrar la primera imagen
  
  return (
    <div className="card">
      <img src={imagenURL} alt="Propiedad" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{propiedad.titulo}</h5>
        <p className="card-text">Ubicación: {propiedad.comuna}</p>
        <p className="card-text">Precio: ${propiedad.precio}</p>
        <a href={`/propiedades/${propiedad.propiedades_id}`} className="btn btn-primary">Ver más</a>
      </div>
    </div>
  );
}

export default PropertyCard;
