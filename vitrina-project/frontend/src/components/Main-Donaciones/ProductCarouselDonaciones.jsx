import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import car01 from '../../assets/img/car01.jpg';
import car02 from '../../assets/img/car02.jpg';
import car03 from '../../assets/img/car03.jpg';
import './ProductListDonaciones.css';

const ProductCarouselDonaciones = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car01}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Elige ropa de segunda mano!</h3>
          <p>Dale una segunda vida a la ropa que no ocuparás</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car02}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Evita el FastFashion!</h3>
          <p>Compra menos, elige bien, hazlo durar.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car03}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Moda de segundo uso</h3>
          <p>El “fast fashion” no es gratis. Alguien, en algún lugar, está pagando.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarouselDonaciones;
