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
import img02 from '../../assets/img/02.png';
import ModalDetailDonaciones from '../Main-Donaciones/modal/ModalDetailDonaciones';
import './ProductListDonaciones.css';


const ProductListDonaciones = () => {
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
    { id: 1, name: 'Blouse and belt-skirt', img: imgd01 },
    { id: 2, name: 'Pink ankara mixed gown', img: imgd02 },
    { id: 3, name: 'A-shaped gown', img: imgd03 },
    { id: 4, name: 'Blouse and belt-skirt', img: imgd04 },
    { id: 5, name: 'Ankara suit', img: imgd05 },
    { id: 6, name: 'Brown ball gown', img: imgd06 },
    { id: 7, name: 'Male Suit', img: imgd07 },
    { id: 8, name: 'Flared gown', img: imgd08},
    { id: 9, name: 'Blouse and belt-skirt', img: imgd09 },
    { id: 10, name: 'Pink ankara mixed gown', img: imgd10 },
    { id: 11, name: 'A-shaped gown', img: imgd11 },
    { id: 12, name: 'Blouse and belt-skirt', img: imgd12 },
    { id: 13, name: 'Ankara suit', img: imgd13 },
    { id: 14, name: 'Brown ball gown', img: imgd14 },
    { id: 15, name: 'Male Suit', img: imgd15 },
    { id: 16, name: 'Flared gown', img: imgd16 },
    { id: 17, name: 'Extra Product 1', img: img02 },
    { id: 18, name: 'Extra Product 2', img: img02 }, 
    { id: 19, name: 'Extra Product 3', img: img02 }, 
    { id: 21, name: 'Extra Product 5', img: img02 }, 
    { id: 22, name: 'Extra Product 6', img: img02 },
    { id: 23, name: 'Extra Product 7', img: img02 } 
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

      <ModalDetailDonaciones show={show} handleClose={handleClose} product={selectedProduct} />
    </div>
  );
};

export default ProductListDonaciones;
