import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/PerfilSection.css';
import axios from 'axios';

const PerfilSection = ({ nombreUsuario }) => {
  
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [propiedades, setPropiedades] = useState([]);

  const { VITE_API_URL } = import.meta.env;

  
  const manejarCargaImagenPerfil = (e) => {
    setImagenPerfil(URL.createObjectURL(e.target.files[0]));
  };

  
  useEffect(() => {
    const obtenerPropiedades = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VITE_API_URL}/api/properties/mis-propiedades`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Propiedades obtenidas:', response.data);
        setPropiedades(response.data);
      } catch (error) {
        console.error('Error al obtener propiedades:', error);
      }
    };
  
    obtenerPropiedades();
  }, []);
  

  
  const eliminarPropiedad = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${VITE_API_URL}/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPropiedades(propiedades.filter((propiedad) => propiedad.propiedades_id !== id));
    } catch (error) {
      console.error('Error al eliminar la propiedad:', error);
    }
  };

  return (
    <div className="perfil-section">
      <div className="header-perfil">
        {/* Imagen de perfil */}
        <div className="imagen-perfil">
          <input type="file" accept="image/*" onChange={manejarCargaImagenPerfil} />
          {imagenPerfil && <img src={imagenPerfil} alt="Imagen de perfil" />}
        </div>

        {/* Datos del usuario */}
        <div className="datos-usuario">
          <h2>{nombreUsuario || "nombreUsuario"}</h2>
        </div>
      </div>

      {/* Publicaciones del usuario con opciones */}
      <div className="publicaciones">
  <h3>Mis Propiedades</h3>
  {propiedades.length > 0 ? (
    propiedades.map((propiedad) => (
      <div key={propiedad.propiedades_id} className="publicacion">
        <img
          src={propiedad.imagen}
          
          alt={`Propiedad ${propiedad.propiedades_id}`}
          className="publicacion-imagen"
        />
        <h4>{propiedad.titulo}</h4>
        <div className="opciones">
          <Link to={`/editar-propiedad/${propiedad.propiedades_id}`}>
            <button>Modificar</button>
          </Link>
          <button onClick={() => eliminarPropiedad(propiedad.propiedades_id)}>Eliminar</button>
        </div>
      </div>
    ))
  ) : (
    <p>No hay publicaciones</p>
  )}
</div>
      {/* Botón para agregar una nueva publicación */}
      <div className="agregar-publicacion">
        <Link to="/carga-publicacion">
          <button className="btn-agregar">Agregar Publicación</button>
        </Link>
      </div>
    </div>
  );
};

export default PerfilSection;
