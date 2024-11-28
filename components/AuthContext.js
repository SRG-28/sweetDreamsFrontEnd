// AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

const AuthContext = createContext( []);

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Almacena el usuario y su rol
  const router = useRouter();

  useEffect(() => {
    // Cargar el usuario almacenado (si existe)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Cargar el usuario desde localStorage
    }
  }, []);

  const login = (username, password) => {
    // Lógica de autenticación básica para demo
    if (username === 'admin' && password === 'adminpass') {
      const userData = { username, role: 'admin' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
    } else if (username === 'client' && password === 'clientpass') {
      const userData = { username, role: 'client' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
    } else {
      alert('Invalid username or password'); // Lógica adicional según el caso
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
    router.push('/login');
  };

  //const isAuthenticated = () => !!user; 

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* <AuthContext.Provider value={{ user, login, logout,isAuthenticated  }}> */}
      {children}
    </AuthContext.Provider>
  );
}