import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './loginmodal.css'; // Importa un archivo CSS para estilos personalizados

const LoginModal = ({ show, handleClose }) => {
  // Manejo de estado para los campos de entrada
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    // Imprimir los valores como un objeto estructurado
    console.log({
      email: email,
      password: password
    });
    // Aquí puedes agregar la lógica para procesar el inicio de sesión
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} dialogClassName="custom-modal">
      <Modal.Header closeButton>
      </Modal.Header>
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
              <Button variant="primary" type="submit" className="mt-4 w-100">Ingresar</Button>
              <Form.Text className="text-muted mt-3">
                <a href="#">¿Olvidaste tu contraseña? Click aquí</a>
              </Form.Text>
            </Form>
          </Col>
          <Col md={6} className="d-flex flex-column align-items-center">
            <h5 className="mb-4 text-secondary">Crear cuenta</h5>
            <Form>
              <Form.Group controlId="formRegisterEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="example@gmail.com" />
              </Form.Group>
              <Form.Group controlId="formRegisterPassword" className="mt-3">
                <Form.Label>Crear Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control type="password" placeholder="Debes tener al menos 8 caracteres" />
                  <Button variant="outline-secondary">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Repita contraseña" />
              </Form.Group>
              <Form.Group controlId="formNotifications" className="mt-3">
                <Form.Check type="switch" label="Recibir notificaciones" />
              </Form.Group>
              <Button variant="dark" className="mt-4 w-100">Crear</Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
