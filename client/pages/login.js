import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password);
  };

  return (
    <div className="form-center">
      <Head>
        <title>Log In</title>
      </Head>

      <div className="auth-form">
        <h1>Log In</h1>

        <form onSubmit={onSubmit}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Log In</button>
        </form>

        <span className="register-link">
          Don't have an account? <Link href="#">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
