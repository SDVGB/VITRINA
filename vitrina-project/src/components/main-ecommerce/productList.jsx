import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import img01 from '../../assets/img/01.png';
import ModalDetail from './modal/modalDetail';
import './productList.css'; // Asegúrate de que la ruta es correcta

const ProductList = () => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const products = [
    { id: 1, name: 'Blouse and belt-skirt', img: img01 },
    { id: 2, name: 'Pink ankara mixed gown', img: img01 },
    { id: 3, name: 'A-shaped gown', img: img01 },
    { id: 4, name: 'Blouse and belt-skirt', img: img01 },
    { id: 5, name: 'Ankara suit', img: img01 },
    { id: 6, name: 'Brown ball gown', img: img01 },
    { id: 7, name: 'Male Suit', img: img01 },
    { id: 8, name: 'Flared gown', img: img01 },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div className="col-md-3" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Button variant="primary" className="custom-button" onClick={() => handleShow(product)}>
                  Ver en detalle
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <ModalDetail show={show} handleClose={handleClose} product={selectedProduct} />
    </div>
  );
};

export default ProductList;
