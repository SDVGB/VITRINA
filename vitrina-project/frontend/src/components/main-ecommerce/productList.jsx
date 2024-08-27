import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import ModalDetail from './modal/modalDetail';
import './productList.css';

const ProductList = ({ handleAddToCart }) => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const productsPerPage = 8;

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  useEffect(() => {
    fetch('http://localhost:5000/publicaciones?tipo=TP01')  // Filtra para ventas
      .then(res => res.json())
      .then(data => setProducts(data.publicaciones))
      .catch(err => console.error('Error fetching sales:', err));
  }, []);

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
          <div className="col-md-3 mb-4" key={product.ID_Publicacion}>
            <Card className="h-100">
              <Card.Img variant="top" src={`http://localhost:5000${product.Imagen_Publicacion_Rutas}`} />
              <Card.Body>
                <Card.Title>{product.Nombre_Publicacion}</Card.Title>
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
        <ModalDetail 
          show={show} 
          handleClose={handleClose} 
          product={selectedProduct} 
          handleAddToCart={handleAddToCart} 
        />
      )}
    </div>
  );
};

export default ProductList;
