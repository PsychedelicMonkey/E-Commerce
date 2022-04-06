import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Link href="/">Home</Link>
        <div>
          <Link href="#">Cart</Link>
          <Link href="#">Log In</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
