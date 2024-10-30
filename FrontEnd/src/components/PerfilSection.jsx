import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/PerfilSection.css';
import axios from 'axios';

const PerfilSection = ({ nombreUsuario }) => {
  const [propiedades, setPropiedades] = useState([]);
  const { VITE_API_URL } = import.meta.env;
  const navigate = useNavigate(); 

  useEffect(() => {
    const obtenerPropiedades = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${VITE_API_URL}/api/properties/mis-propiedades`, {
          headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setPropiedades(propiedades.filter((propiedad) => propiedad.propiedades_id !== id));
    } catch (error) {
      console.error('Error al eliminar la propiedad:', error);
    }
  };

  const eliminarUsuario = async () => {
    const confirmacion = window.confirm('¿Está seguro que desea eliminar su usuario?');
    if (confirmacion) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${VITE_API_URL}/api/users/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('token'); // Elimina el token
        navigate('/'); // Redirige a la página principal o de inicio de sesión
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  return (
    <div className="perfil-section">
      <div className="header-perfil">
        <div className="datos-usuario">
          <h2>{nombreUsuario || 'nombreUsuario'}</h2>
        </div>

        {/* Botón para eliminar usuario */}
        <div className="opciones">
          <button className="btn-modificar" onClick={eliminarUsuario}>
            Eliminar Usuario
          </button>
        </div>
      </div>

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
                <button onClick={() => eliminarPropiedad(propiedad.propiedades_id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay publicaciones</p>
        )}
      </div>

      <div className="agregar-publicacion">
        <Link to="/carga-publicacion">
          <button className="btn-agregar">Agregar Publicación</button>
        </Link>
      </div>
    </div>
  );
};

export default PerfilSection;
