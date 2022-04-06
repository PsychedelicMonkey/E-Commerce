import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { items, removeFromCart } = useContext(CartContext);

  return (
    <div className="container">
      <Head>
        <title>Cart - ECommerce</title>
      </Head>

      <section>
        {items.length > 0 ? (
          <>
            <h1>My Cart</h1>

            <table>
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

            <Link href="#">
              <a className="button">Proceed to checkout</a>
            </Link>
          </>
        ) : (
          <h3 className="empty">Your cart is empty</h3>
        )}
      </section>
    </div>
  );
};

export default Cart;
