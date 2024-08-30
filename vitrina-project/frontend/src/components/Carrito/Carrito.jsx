import React from 'react';
import './Carrito.css';

const Carrito = ({ cart, handleIncrement, handleDecrement, clearCart }) => {
  
  const total = cart.reduce((sum, item) => {
    const itemPrice = item.price || 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    alert('Formularios enviados');
    clearCart(); // Limpiar el carrito
  };

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      <ul className="list-group mb-3">
        {cart.map(item => (
          <li key={item.ID_Publicacion} className="list-group-item cart-item">
            <div>
              <img src={`http://localhost:5000${item.Imagen_Publicacion_Rutas}`} alt={item.Nombre_Publicacion} className="item-image" />
              <strong>{item.Nombre_Publicacion}</strong>
              <p className="mb-1">Cantidad: {item.quantity}</p>
              <p className="mb-1">Precio: ${item.price ? item.price.toLocaleString() : 'N/A'}</p>
            </div>
            <div className="d-flex align-items-center">
              <button onClick={() => handleDecrement(item.ID_Publicacion)} className="btn btn-danger btn-sm mx-2">-</button>
              <button onClick={() => handleIncrement(item.ID_Publicacion)} className="btn btn-success btn-sm">+</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total de la compra: ${total.toLocaleString()}</h3>
      <button onClick={handleCheckout} className="btn btn-primary">Contactarse!</button>
    </div>
  );
};

export default Carrito;