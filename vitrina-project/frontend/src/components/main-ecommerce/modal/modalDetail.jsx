import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './modalDetail.css';

const ModalDetail = ({ show, handleClose, product, handleAddToCart, userEmail }) => {
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
    // Aquí iría la lógica para enviar el mensaje
    console.log(`Mensaje enviado por ${name} (${userEmail}): ${message}`);
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

  const productPrice = product.price ? parseFloat(product.price) : 10000;

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
              <p className="price">Precio: ${productPrice.toLocaleString()}</p>
              <div className="size-section">
                <p>Tamaño: <strong>Large</strong></p>
                <div className="size-options">
                  <Button variant="outline-secondary" size="sm">L</Button>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="primary" className="add-to-cart" onClick={() => handleAddToCart({ ...product, price: productPrice })}>
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
          <Modal.Title>Enviar mensaje al vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendMessage}>
            <Form.Group controlId="formEmail">
              <Form.Label>Dirección de e-mail*</Form.Label>
              <Form.Control type="email" value={userEmail} readOnly />
            </Form.Group>

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
              <Form.Label>Número de teléfono*</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingresa tu número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRecaptcha">
              <Form.Check type="checkbox" label="No soy un robot" required />
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

export default ModalDetail;
