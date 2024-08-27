import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './modalDetail.css';

const ModalDetail = ({ show, handleClose, product, handleAddToCart }) => {
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/enviar-solicitud-contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID_Publicacion: product.ID_Publicacion,
          Nombre_Solicitante: name,
          Apellido_Solicitante: 'Apellido',  // Cambia esto según cómo quieras manejar los apellidos
          Correo_Solicitante: 'correo@example.com',  // Usa el correo del usuario autenticado
          Contactame: phoneNumber,
          Descripcion_Solicitud: message,
        }),
      });

      if (response.ok) {
        alert('Solicitud enviada correctamente.');
        handleContactClose();
      } else {
        alert('Error al enviar la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la solicitud.');
    }
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
          <Modal.Title>{product.Nombre_Publicacion}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
            <div className="image-section">
              <img src={`http://localhost:5000${product.Imagen_Publicacion_Rutas}`} alt={product.Nombre_Publicacion} className="product-image" />
            </div>
            <div className="details-section">
              <h3>{product.Nombre_Publicacion}</h3>
              <p className="price">GRATIS</p>
              <div className="size-section">
                <p>Tamaño: <strong>{product.ID_Talla || 'No especificado'}</strong></p>
              </div>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="primary" 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart(product)}>

                  Agregar al Carrito
                </Button>
                <Button variant="primary" className="contact-seller" onClick={handleContactClick}>
                  Contactar
                </Button>
              </div>
              <div className="description-section">
                <p className="description-title">Descripción</p>
                <p className="description-text">{product.Descripcion_Publicacion || 'Descripción no disponible'}</p>
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
                defaultValue={`Me interesa el anuncio "${product.Nombre_Publicacion}" que tienes publicado. Por favor comunícate conmigo.`}
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
