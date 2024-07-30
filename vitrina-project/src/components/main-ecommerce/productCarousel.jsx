import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import car01 from '../../assets/img/car01.jpg';
import car02 from '../../assets/img/car02.jpg';
import car03 from '../../assets/img/car03.jpg';
import './productCarousel.css';

const ProductCarousel = () => {
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, quaerat!</p>
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
          <p>Lorem ipsum dolor sit amet, consectetur adipisc eli.</p>
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
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
