import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ModalDetailDonaciones.css';

const ModalDetailDonaciones = ({ show, handleClose, product, handleAddToCart }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleContactClose = () => {
    setShowContactForm(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(`Mensaje enviado por ${name}: ${message}`);
    console.log(`Teléfono: ${phoneNumber}`);
    handleContactClose(); // Cerrar el formulario después de enviar el mensaje
  };

  if (!product) {
    return (
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Error: Producto no encontrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>El producto no está disponible.</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
            <div className="image-section">
              <img src={product.img} alt={product.name} className="product-image" />
            </div>
            <div className="details-section">
              <h3>{product.name}</h3>
              <p className="price">GRATIS</p>
              <div className="size-section">
                <p>Tamaño: <strong>Large</strong></p>
                <div className="size-options">
                  <Button variant="outline-secondary" size="sm">L</Button>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Button 
                  variant="primary" 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart({ ...product, price: 0 })}>
                  Agregar al Carrito
                </Button>
                <Button variant="primary" onClick={handleContactClick}>
                  Contactar
                </Button>
              </div>
              <div className="description-section">
                <p className="description-title">Descripción</p>
                <p className="description-text">{product.description || 'Descripción no disponible'}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showContactForm} onHide={handleContactClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Enviar mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendMessage}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Teléfono*</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingresa tu número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                defaultValue={`Me interesa el anuncio "${product.name}" que tienes publicado. Por favor comunícate conmigo.`}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar mensaje
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDetailDonaciones;
