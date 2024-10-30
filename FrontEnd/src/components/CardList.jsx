
import React from 'react';
import MyCard from './Card'; // Importamos el componente MyCard
import '../css/CardList.css'

const CardList = ({ propiedades }) => {
  console.log('Propiedades en CardList:', propiedades); // Verificar si se pasa correctamente al componente CardList

  if (!Array.isArray(propiedades) || propiedades.length === 0) {
    return <p>No hay propiedades disponibles.</p>;
  }

  return (
    <div className="property-container row g-4 my-3">
      {propiedades.map((propiedad) => (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 card-container" key={propiedad.propiedades_id}>
          <MyCard
            propiedades_id={propiedad.propiedades_id}
            title={propiedad.titulo}
            location={propiedad.comuna}
            price={propiedad.precio}
            imagen={Array.isArray(propiedad.imagen) ? propiedad.imagen[0] : propiedad.imagen}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
