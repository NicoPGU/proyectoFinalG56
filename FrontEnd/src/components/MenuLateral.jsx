
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMessage, faSliders, faUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import '../css/MenuLateral.css';
import { Link, useNavigate } from 'react-router-dom';

const MenuLateral = () => {
  const navigate = useNavigate();

  // Función para manejar la redirección al hacer clic en "Mi Perfil"
  const manejarClickPerfil = () => {
    const token = localStorage.getItem('token');  // Verificar si hay un token almacenado
    if (token) {
      navigate('/mi-perfil');  // Redirigir a la vista de perfil si el token está presente
    } else {
      navigate('/inicio-sesion');  // Redirigir a la vista de inicio de sesión si no hay token
    }
  };
    // Función para manejar el click en "Publicar una Propiedad"
    const manejarClickPublicacion = () => {
      const token = localStorage.getItem('token'); // Verificamos si hay token de autenticación
      if (token) {
        // Si el usuario está autenticado, redirigimos a la página de carga de propiedad
        navigate('/carga-publicacion');
      } else {
        // Si no está autenticado, redirigimos a la página de inicio de sesión
        navigate('/inicio-sesion');
      }
    };
  

  return (
    <div className="menu-lateral">
    
      <div className="menu-item">
      <Link to="/propiedades" className='menu-item'>
        <FontAwesomeIcon icon={faHouse}/>
        <span>Propiedades</span>
      </Link>
      </div>
      <hr />
      <div className="menu-item">
        <FontAwesomeIcon icon={faMessage} />
        <span>Mensajería</span>
      </div>
      <div className="menu-item">
        <FontAwesomeIcon icon={faSliders} />
        <span>Configuración</span>
      </div>
      <hr />
      <div className='menu-item' onClick={manejarClickPerfil}>
        <FontAwesomeIcon icon={faUser} /> 
        <span>Mi Perfil</span>
      </div>
      <div className="menu-item" onClick={manejarClickPublicacion}> {/* Manejar el click */}
        <FontAwesomeIcon icon={faUpload} />
        <span>Publica una Propiedad</span>
      </div>
    </div>
  );
};

export default MenuLateral;
