import React from 'react';
import './Carrito.css';

const Carrito = ({ cart, handleIncrement, handleDecrement }) => {
  
  const total = cart.reduce((sum, item) => {
    const itemPrice = item.price || 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      <ul className="list-group mb-3">
        {cart.map(item => (
          <li key={item.id} className="list-group-item cart-item">
            <div>
              <img src={item.img} alt={item.name} className="item-image" />
              <strong>{item.name}</strong>
              <p className="mb-1">Cantidad: {item.quantity}</p>
              <p className="mb-1">Precio: ${item.price ? item.price.toLocaleString() : 'N/A'}</p>
            </div>
            <div className="d-flex align-items-center">
              <button onClick={() => handleDecrement(item.id)} className="btn btn-danger btn-sm mx-2">-</button>
              <button onClick={() => handleIncrement(item.id)} className="btn btn-success btn-sm">+</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total de la compra: ${total.toLocaleString()}</h3>
      <button className="btn btn-primary">Contactarse!</button>
    </div>
  );
};

export default Carrito;
