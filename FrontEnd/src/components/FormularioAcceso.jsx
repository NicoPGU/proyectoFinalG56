
import React, { useState } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import axios from 'axios';  // Importar Axios para la conexión con el backend
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para redirección
import '../css/FormularioAcceso.css';

const FormularioAcceso = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();  // Hook para redirigir al usuario
  const { VITE_API_URL } = import.meta.env;

  // Función para manejar el envío del formulario
  const validarAcceso = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

    // Validar que el email y password estén completos
    if (!email || !password) {
      setError(true);
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    setError(false);

    try {
      // Enviar los datos de inicio de sesión al backend
      const response = await axios.post(`${VITE_API_URL}:3000/api/users/login`, {
        email,
        password
      });

      // Guardar el token en el localStorage
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Redirigir al usuario a la vista de HomepageLogged
      navigate('/home-logged');

    } catch (err) {
      // Mostrar mensaje de error si el inicio de sesión falla
      console.error('Error en el inicio de sesión:', err);
      setError(true);
      setErrorMessage("Credenciales incorrectas");
    }
  };

  return (
    <Form onSubmit={validarAcceso}>
      {error && <Alert variant="danger">{errorMessage}</Alert>}

      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm={3}>Email</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPassword">
        <Form.Label column sm={3}>Contraseña</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default FormularioAcceso;
