import React from 'react';
import Header from './Header';
import { AuthProvider } from '../context/AuthContext';

const Layout = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>{children}</main>
      </AuthProvider>
    </>
  );
};

export default Layout;
