
import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';  // Importar Axios
import { storage } from '../firebase';  // Importar Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Funciones para subir imágenes
import '../css/IngresoPropiedad.css';

const IngresoPropiedad = () => {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [comuna, setComuna] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);  // Un array para almacenar las imágenes seleccionadas
  const [imagenesURL, setImagenesURL] = useState([]); // Un array para almacenar las URLs de Firebase
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { VITE_API_URL } = import.meta.env;

  // Función para manejar la selección de múltiples imágenes
  const manejarImagenes = (e) => {
    setImagenes([...e.target.files]);  // Guardar múltiples imágenes seleccionadas
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!titulo || !precio || !comuna || !habitaciones || !banos || !descripcion || imagenes.length === 0) {
      setError(true);
      return;
    }

    setError(false);

    const urls = [];  // Array para almacenar las URLs de las imágenes
    try {
      for (let i = 0; i < imagenes.length; i++) {
        const imagenRef = ref(storage, `imagenes/${imagenes[i].name}`);
        await uploadBytes(imagenRef, imagenes[i]);
        const url = await getDownloadURL(imagenRef);
        urls.push(url);  // Almacenar la URL de cada imagen
      }

      setImagenesURL(urls);  // Guardar todas las URLs de las imágenes

      // Obtener el token JWT del almacenamiento local (o de donde se esté guardando)
      const token = localStorage.getItem('token');  // Asegúrate de que 'token' es la clave correcta
      
      // Datos de la propiedad que se enviarán al backend, incluyendo las URLs de las imágenes
      const propiedad = {
        titulo,
        precio,
        comuna,
        habitaciones,
        banos,
        descripcion,
        imagenes: urls  // Enviar las URLs de las imágenes como un array
      };

      await axios.post(`${VITE_API_URL}/api/properties`, propiedad, {
        headers: {
          'Authorization': `Bearer ${token}`  // Enviar el token en la cabecera
        }
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error al guardar la propiedad:", error);
      setError(true);
    }
  };

  return (
    <Form onSubmit={manejarEnvio}>
      {/* Campo para Título */}
      <Form.Group as={Row} className="mb-3" controlId="formTitulo">
        <Form.Label column sm={2}>Título</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Ingrese el título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Campo para Precio */}
      <Form.Group as={Row} className="mb-3" controlId="formPrecio">
        <Form.Label column sm={2}>Precio</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            placeholder="Ingrese el precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Campo para Comuna */}
      <Form.Group as={Row} className="mb-3" controlId="formComuna">
        <Form.Label column sm={2}>Comuna</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Ingrese la comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Campo para Habitaciones */}
      <Form.Group as={Row} className="mb-3" controlId="formHabitaciones">
        <Form.Label column sm={2}>Habitaciones</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            placeholder="Número de habitaciones"
            value={habitaciones}
            onChange={(e) => setHabitaciones(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Campo para Baños */}
      <Form.Group as={Row} className="mb-3" controlId="formBaños">
        <Form.Label column sm={2}>Baños</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            placeholder="Número de baños"
            value={banos}
            onChange={(e) => setBanos(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Campo para Descripción */}
      <Form.Group as={Row} className="mb-3" controlId="formDescripcion">
        <Form.Label column sm={2}>Descripción</Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descripción de la propiedad"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Selección de imágenes */}
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Seleccionar imágenes</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={manejarImagenes}  // Permitir seleccionar múltiples imágenes
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar Propiedad
      </Button>
      
      {error && <Alert variant="danger">Completa todos los campos correctamente</Alert>}
      {success && <Alert variant="success">Propiedad guardada exitosamente</Alert>}
    </Form>
  );
};

export default IngresoPropiedad;
