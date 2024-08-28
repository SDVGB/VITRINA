import React from 'react';
import ProductCarouselDonaciones from '../Main-Donaciones/ProductCarouselDonaciones';
import ProductListDonaciones from '../Main-Donaciones/ProductListDonaciones';

const MainContentDonaciones = ({ handleAddToCart }) => {
  return (
    <div>
      <ProductCarouselDonaciones />
      <ProductListDonaciones handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default MainContentDonaciones;
