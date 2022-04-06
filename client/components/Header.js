import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, loading, logoutUser } = useContext(AuthContext);

  return (
    <>
      {!loading ? (
        <header>
          <nav className="navbar">
            <Link href="/">Home</Link>
            <div>
              <Link href="#">Cart</Link>
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
