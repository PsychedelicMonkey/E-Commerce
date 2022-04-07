import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import CheckoutButton from '../components/CheckoutButton';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { items, removeFromCart } = useContext(CartContext);

  const getTotal = () => {
    let total = 0.0;
    items.map((item) => {
      total += item.price;
    });

    return parseFloat(total).toFixed(2);
  };

  return (
    <div className="container">
      <Head>
        <title>Cart - ECommerce</title>
      </Head>

      {items.length > 0 ? (
        <section className="table-wrap">
          <h1>My Cart</h1>

          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Image
                      src={`http://localhost:1337${item.image.url}`}
                      width={item.image.width}
                      height={item.image.height}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="sm red"
                      onClick={removeFromCart.bind(this, item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="total">Order total: ${getTotal()}</h3>

          {user ? (
            <CheckoutButton />
          ) : (
            <Link href="/login">
              <a id="checkout-btn" className="button">
                Log In to checkout
              </a>
            </Link>
          )}
        </section>
      ) : (
        <div className="empty-text">
          <h3 className="empty">Your cart is empty</h3>
          <Link href="/">Back to home</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
