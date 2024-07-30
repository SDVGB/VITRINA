import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modalDetail.css';

const modalDetail = ({ show, handleClose, product }) => {
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
            <Button variant="primary" className="add-to-cart">Contactar</Button>
            <div className="description-section">
              <p className="description-title">Descripción</p>
              <p className="description-text">La chaqueta está como nueva</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default modalDetail;
