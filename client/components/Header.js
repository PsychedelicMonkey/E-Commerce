import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { user, loading, logoutUser } = useContext(AuthContext);
  const { items } = useContext(CartContext);

  return (
    <>
      {!loading ? (
        <header>
          <nav className="navbar">
            <Link href="/">Home</Link>
            <div>
              <Link href="#">
                <a>Cart ({items.length})</a>
              </Link>
              {user ? (
                <a href="#" onClick={logoutUser}>
                  Log Out
                </a>
              ) : (
                <Link href="/login">Log In</Link>
              )}
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
};

export default Header;
