import React, { useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import imgd01 from '../../assets/img/imgd01.jpg';
import imgd02 from '../../assets/img/imgd02.jpg';
import imgd03 from '../../assets/img/imgd03.jpg';
import imgd04 from '../../assets/img/imgd04.jpg';
import imgd05 from '../../assets/img/imgd05.jpg';
import imgd06 from '../../assets/img/imgd06.jpg';
import imgd07 from '../../assets/img/imgd07.jpg';
import imgd08 from '../../assets/img/imgd08.jpg';
import imgd09 from '../../assets/img/imgd09.jpg';
import imgd10 from '../../assets/img/imgd10.png';
import imgd11 from '../../assets/img/imgd11.jpg';
import imgd12 from '../../assets/img/imgd12.jpg';
import imgd13 from '../../assets/img/imgd13.jpg';
import imgd14 from '../../assets/img/imgd14.jpg';
import imgd15 from '../../assets/img/imgd15.png';
import imgd16 from '../../assets/img/imgd16.png';
import imgd17 from '../../assets/img/imgd17.jpg';
import imgd18 from '../../assets/img/imgd18.png';
import imgd19 from '../../assets/img/imgd19.jpg';
import imgd20 from '../../assets/img/imgd20.jpg';
import imgd21 from '../../assets/img/imgd21.jpg';
import imgd22 from '../../assets/img/imgd22.jpg';
import imgd23 from '../../assets/img/imgd23.jpg';

import ModalDetailDonaciones from '../Main-Donaciones/modal/ModalDetailDonaciones';
import './ProductListDonaciones.css';

const ProductListDonaciones = ({ handleAddToCart }) => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const products = [
    { id: 1, name: 'Conjuntos de short y crop top', img: imgd01 },
    { id: 2, name: 'Blazer negro', img: imgd02 },
    { id: 3, name: 'Camisa verano', img: imgd03 },
    { id: 4, name: 'Vestido vintage', img: imgd04 },
    { id: 5, name: 'Polera tipo polo beige', img: imgd05 },
    { id: 6, name: 'Polera a rayas', img: imgd06 },
    { id: 7, name: 'Polera tipo polo roja', img: imgd07 },
    { id: 8, name: 'Conjunto deportivo verano', img: imgd08 },
    { id: 9, name: 'Conjunto vintage', img: imgd09 },
    { id: 10, name: 'Conjunto niña', img: imgd10 },
    { id: 11, name: 'Conjunto deportivo verano', img: imgd11 },
    { id: 12, name: 'Falda negra', img: imgd12 },
    { id: 13, name: 'Conjunto vintage', img: imgd13 },
    { id: 14, name: 'Crop top manga larga', img: imgd14 },
    { id: 15, name: 'Conjunto niña', img: imgd15 },
    { id: 16, name: 'Conjunto niña', img: imgd16 },
    { id: 17, name: 'Blusa/vestido', img: imgd17 },
    { id: 18, name: 'Blazer', img: imgd18 },
    { id: 19, name: 'Chaqueta delgada', img: imgd19 },
    { id: 20, name: 'Chaqueta', img: imgd20 },
    { id: 21, name: 'Falda larga negra', img: imgd21 },
    { id: 22, name: 'Blazer gris', img: imgd22 },
    { id: 23, name: 'Blazer gris', img: imgd23 }
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, pageNumbers.length));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {currentProducts.map(product => (
          <div className="col-md-3 mb-4" key={product.id}>
            <Card className="h-100">
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

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} disabled={currentPage === pageNumbers.length} />
      </Pagination>

      {selectedProduct && (
        <ModalDetailDonaciones
          show={show}
          handleClose={handleClose}
          product={selectedProduct}
          handleAddToCart={handleAddToCart} // Pasar la función de agregar al carrito
        />
      )}
    </div>
  );
};

export default ProductListDonaciones;
