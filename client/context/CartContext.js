import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    const findItem = items.find((i) => i.id === product.id);
    if (findItem) {
      return;
    }

    const { id, name, price, images } = product;
    let newItems = [...items];
    const newItem = {
      id,
      name,
      price,
      image: {
        url: images[0].formats.thumbnail.url,
        width: images[0].formats.thumbnail.width,
        height: images[0].formats.thumbnail.height,
      },
    };
    newItems.unshift(newItem);
    setItems(newItems);
    updateCookie(newItems);
  };

  const removeFromCart = (productId) => {
    const newItems = items.filter((i) => i.id !== productId);
    setItems(newItems);
    updateCookie(newItems);
  };

  const updateCookie = async (items) => {
    const res = await fetch('http://localhost:3000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
    await res.json();
  };

  const loadCart = async () => {
    const res = await fetch('http://localhost:3000/api/cart/load', {
      method: 'POST',
      credentials: 'same-origin',
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
