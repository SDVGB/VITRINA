import React, { useState } from 'react';

const Carrito = ({ items }) => {
  const [cartItems, setCartItems] = useState(items);

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}€
              <button onClick={() => removeFromCart(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrito;
