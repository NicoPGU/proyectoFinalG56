import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../css/FormularioRegistro.css';

const FormularioRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const validarInput = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      setError(true);
      return;
    }

    setError(false);

    const usuario = {
      nombre,
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', usuario);
      console.log('Usuario registrado en el backend:', response.data);
      setSuccess(true);
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error('Error al registrar el usuario en el backend:', error);
      setError(true);
    }
  };

  return (
    <Form id="registro-form" onSubmit={validarInput}>
      {error && <Alert variant='danger'>Completa todos los campos correctamente</Alert>}
      {success && <Alert variant='success'>Usuario registrado correctamente</Alert>}

      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Nombre de Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
  );
};

export default FormularioRegistro;
