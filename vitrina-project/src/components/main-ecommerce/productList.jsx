import React, { useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import img01 from '../../assets/img/img01.jpeg';
import img02 from '../../assets/img/img02.jpeg';
import img03 from '../../assets/img/img03.jpeg';
import img04 from '../../assets/img/img04.jpeg';
import img05 from '../../assets/img/img05.jpeg';
import img06 from '../../assets/img/img06.jpeg';
import img07 from '../../assets/img/img07.jpeg';
import img08 from '../../assets/img/img08.jpg';
import img09 from '../../assets/img/img09.jpg';
import img10 from '../../assets/img/img10.jpg';
import img11 from '../../assets/img/img11.jpg';
import img12 from '../../assets/img/img12.jpg';
import img13 from '../../assets/img/img13.jpg';
import img14 from '../../assets/img/img14.jpg';
import img15 from '../../assets/img/img15.jpg';
import img16 from '../../assets/img/img16.jpeg';
import img17 from '../../assets/img/img17.jpeg';
import img18 from '../../assets/img/img18.jpeg';
import img19 from '../../assets/img/img19.jpeg';
import img20 from '../../assets/img/img20.jpeg';
import img21 from '../../assets/img/img21.jpeg';
import img22 from '../../assets/img/img22.png';
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
    { id: 2, name: 'Pink ankara mixed gown', img: img02 },
    { id: 3, name: 'A-shaped gown', img: img03 },
    { id: 4, name: 'Blouse and belt-skirt', img: img04 },
    { id: 5, name: 'Ankara suit', img: img05 },
    { id: 6, name: 'Brown ball gown', img: img06 },
    { id: 7, name: 'Male Suit', img: img07 },
    { id: 8, name: 'Flared gown', img: img08 },
    { id: 9, name: 'Blouse and belt-skirt', img: img09 },
    { id: 10, name: 'Pink ankara mixed gown', img: img10 },
    { id: 11, name: 'A-shaped gown', img: img11 },
    { id: 12, name: 'Blouse and belt-skirt', img: img12 },
    { id: 13, name: 'Ankara suit', img: img13 },
    { id: 14, name: 'Brown ball gown', img: img14 },
    { id: 15, name: 'Male Suit', img: img15 },
    { id: 16, name: 'Flared gown', img: img16 },
    { id: 17, name: 'Extra Product 1', img: img17 },
    { id: 18, name: 'Extra Product 2', img: img18 }, 
    { id: 19, name: 'Extra Product 3', img: img19 }, 
    { id: 21, name: 'Extra Product 5', img: img20 }, 
    { id: 22, name: 'Extra Product 6', img: img21 },
    { id: 23, name: 'Extra Product 7', img: img22 } 
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
