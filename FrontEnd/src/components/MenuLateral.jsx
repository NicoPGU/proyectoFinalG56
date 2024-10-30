
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMessage, faSliders, faUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import '../css/MenuLateral.css';
import { Link, useNavigate } from 'react-router-dom';

const MenuLateral = () => {
  const navigate = useNavigate();


  const manejarClickPerfil = () => {
    const token = localStorage.getItem('token'); 
    if (token) {
      navigate('/mi-perfil');  
    } else {
      navigate('/inicio-sesion');  
    }
  };
   
    const manejarClickPublicacion = () => {
      const token = localStorage.getItem('token'); 
      if (token) {
        
        navigate('/carga-publicacion');
      } else {
      
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
      <div className="menu-item" onClick={manejarClickPublicacion}> 
        <FontAwesomeIcon icon={faUpload} />
        <span>Publica una Propiedad</span>
      </div>
    </div>
  );
};

export default MenuLateral;
