import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginUser = async (email, password) => {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    setUser(data.user);
    setLoading(false);
    router.push('/');
  };

  const loadUser = async () => {
    let user = null;

    const res = await fetch('http://localhost:3000/api/loadUser', {
      credentials: 'same-origin',
    });
    const data = await res.json();

    if (res.status === 200) {
      user = data;
    }

    setUser(user);
    setLoading(false);
  };

  const logoutUser = async () => {
    const res = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });
    await res.json();

    if (res.status === 200) {
      setUser(null);
      router.push('/');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
