import React, { useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import img01 from '../../assets/img/01.png';
import ModalDetail from './modal/modalDetail';
import './productList.css';

const ProductList = () => {
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
    { id: 1, name: 'Blouse and belt-skirt', img: img01 },
    { id: 2, name: 'Pink ankara mixed gown', img: img01 },
    { id: 3, name: 'A-shaped gown', img: img01 },
    { id: 4, name: 'Blouse and belt-skirt', img: img01 },
    { id: 5, name: 'Ankara suit', img: img01 },
    { id: 6, name: 'Brown ball gown', img: img01 },
    { id: 7, name: 'Male Suit', img: img01 },
    { id: 8, name: 'Flared gown', img: img01 },
    { id: 9, name: 'Blouse and belt-skirt', img: img01 },
    { id: 10, name: 'Pink ankara mixed gown', img: img01 },
    { id: 11, name: 'A-shaped gown', img: img01 },
    { id: 12, name: 'Blouse and belt-skirt', img: img01 },
    { id: 13, name: 'Ankara suit', img: img01 },
    { id: 14, name: 'Brown ball gown', img: img01 },
    { id: 15, name: 'Male Suit', img: img01 },
    { id: 16, name: 'Flared gown', img: img01 },
    { id: 17, name: 'Extra Product 1', img: img01 },
    { id: 18, name: 'Extra Product 2', img: img01 }, 
    { id: 19, name: 'Extra Product 3', img: img01 }, 
    { id: 21, name: 'Extra Product 5', img: img01 }, 
    { id: 22, name: 'Extra Product 6', img: img01 },
    { id: 23, name: 'Extra Product 7', img: img01 } 
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

      <ModalDetail show={show} handleClose={handleClose} product={selectedProduct} />
    </div>
  );
};

export default ProductList;
