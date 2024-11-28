'use client';

import { useEffect, useState } from "react";

const Carrito = () => {
  const [cart, setCart] = useState<any[]>([]);

  // Cargar los productos del carrito desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Eliminar un producto del carrito
  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter(product => product.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Enviar pedido y vaciar el carrito
  const handleSendOrder = () => {
    // Recuperar pedidos anteriores
    const previousOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    // Agregar el nuevo pedido
    const updatedOrders = [...previousOrders, ...cart];

    // Guardar en localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Vaciar el carrito
    setCart([]);
    localStorage.removeItem('cart');

    alert('Pedido enviado correctamente.');
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">No hay productos en tu carrito.</div>
      ) : (
        cart.map((product, index) => (
          <div 
            key={`${product.productId}-${index}`} 
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <h3 className="text-2xl">{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(product.productId)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        ))
      )}

      <div className="mt-6 text-center">
        <button 
          onClick={handleSendOrder}
          className="bg-green-500 text-white px-8 py-2 rounded-lg mr-4"
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  );
};

export default Carrito;
