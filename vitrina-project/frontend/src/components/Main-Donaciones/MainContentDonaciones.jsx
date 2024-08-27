import React from 'react';
import ProductCarouselDonaciones from '../Main-Donaciones/ProductCarouselDonaciones';
import ProductListDonaciones from '../Main-Donaciones/ProductListDonaciones';

const MainContentDonaciones = ({ handleAddToCart }) => {  // Recibir handleAddToCart como prop
  return (
    <div>
      <ProductCarouselDonaciones />
      <ProductListDonaciones handleAddToCart={handleAddToCart} />  {/* Pasar handleAddToCart */}
    </div>
  );
};

export default MainContentDonaciones;
