import React from 'react';
import ProductCarousel from './productCarousel';
import ProductList from './productList';

const MainContent = ({ handleAddToCart }) => {
  return (
    <div>
      <ProductCarousel />
      <ProductList handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default MainContent;