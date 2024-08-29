import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.ID_Publicacion === product.ID_Publicacion);
      if (existingProduct) {
        return prevCart.map(item =>
          item.ID_Publicacion === product.ID_Publicacion ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setShowConfirmation(true); // Mostrar el mensaje de confirmación
    setTimeout(() => {
      setShowConfirmation(false); // Ocultar el mensaje después de 3 segundos
    }, 3000);
  };

  const handleIncrement = (ID_Publicacion) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.ID_Publicacion === ID_Publicacion ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (ID_Publicacion) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.ID_Publicacion === ID_Publicacion ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]); // Limpiar el carrito
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    showConfirmation,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    clearCart, // Agregamos la función clearCart
    totalItemsInCart
  };
};