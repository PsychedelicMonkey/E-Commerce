import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';

const CartForm = ({ product }) => {
  const [disabled, setDisabled] = useState(false);
  const { items, addToCart } = useContext(CartContext);

  useEffect(() => {
    const findItem = items.find((i) => i.id === product.id);

    findItem ? setDisabled(true) : setDisabled(false);
  }, [items]);

  const onSubmit = (e) => {
    e.preventDefault();

    addToCart(product);
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit" disabled={disabled}>
        Add to Cart
      </button>
    </form>
  );
};

export default CartForm;
