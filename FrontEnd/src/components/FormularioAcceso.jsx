
import React, { useState } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import '../css/FormularioAcceso.css';

const FormularioAcceso = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();  
  const { VITE_API_URL } = import.meta.env;

  
  const validarAcceso = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

   
    if (!email || !password) {
      setError(true);
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    setError(false);

    try {
      
      const response = await axios.post(`${VITE_API_URL}/api/users/login`, {
        email,
        password
      });

      
      const { token } = response.data;
      localStorage.setItem('token', token);

      
      navigate('/home-logged');

    } catch (err) {
      
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
