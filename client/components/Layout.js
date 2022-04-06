import React from 'react';
import Header from './Header';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

const Layout = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default Layout;
