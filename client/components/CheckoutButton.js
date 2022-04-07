import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutButton = () => {
  const checkout = async () => {
    const stripe = await stripePromise;

    const res = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      credentials: 'same-origin',
    });
    const data = await res.json();

    await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <button id="checkout-btn" className="button" onClick={checkout}>
      Proceed to checkout
    </button>
  );
};

export default CheckoutButton;
