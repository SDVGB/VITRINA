import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './loginmodal.css';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, handleClose, setIsAuthenticated }) => {
  // Estado para los campos de entrada de inicio de sesión
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Estado para los campos de entrada de registro
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: email,
      password: password
    };

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.token);
        if (result.token) {
          localStorage.setItem('token', result.token);
          setLoginSuccessful(true);
          setIsAuthenticated(true); // Notifica que el usuario está autenticado
          navigate('/logeado');  // Redirige a la ruta de Logeado       
          handleClose(); // Cierra el modal de inicio de sesión
       



          // Redirige al componente Logeado
        } else {
          setLoginSuccessful(false);
          setLoginError(data.message || 'Error en el inicio de sesión');
        }
      })
      .catch(error => {
        setLoginError('Error durante el inicio de sesión');
        console.error('Error during login:', error);
      });
  };

  // Función para manejar el envío del formulario de registro
  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerPassword !== confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }

    const data = {
      email: registerEmail,
      password: registerPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setRegisterError('');
        setRegisterSuccess('Usuario creado exitosamente');
        // Limpiar los campos después de un registro exitoso
        setRegisterEmail('');
        setRegisterPassword('');
        setConfirmPassword('');
      } else {
        setRegisterError(result.message || 'Error en el registro');
        setRegisterSuccess('');
      }
    } catch (error) {
      setRegisterError('Error durante el registro');
      setRegisterSuccess('');
      console.error('Error durante el registro:', error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="d-flex flex-column align-items-center">
            <h5 className="mb-4 text-primary">Iniciar sesión</h5>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </Button>
                </InputGroup>
              </Form.Group>
              {loginError && <p className="text-danger mt-3">{loginError}</p>}
              <Button variant="primary" type="submit" className="mt-4 w-100">
                Ingresar
              </Button>
              <Form.Text className="text-muted mt-3">
                <a href="#">¿Olvidaste tu contraseña? Click aquí</a>
              </Form.Text>
            </Form>
          </Col>
          <Col md={6} className="d-flex flex-column align-items-center">
            <h5 className="mb-4 text-secondary">Crear cuenta</h5>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formRegisterEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formRegisterPassword" className="mt-3">
                <Form.Label>Crear Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="password"
                    placeholder="Debes tener al menos 8 caracteres"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repita contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {registerError && <p className="text-danger mt-3">{registerError}</p>}
              {registerSuccess && <p className="text-success mt-3">{registerSuccess}</p>}
              <Button variant="dark" type="submit" className="mt-4 w-100">
                Crear
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
