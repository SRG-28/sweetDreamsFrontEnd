"use client"; 
import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

import Layout from './login.css';
import styles from './login.module.css';

const Login = () => {
  const router = useRouter();
  const {login, user} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log("Login component rendered"); // Añade un mensaje de depuración

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      login(username, password);
      if (user?.role === 'admin') {
        router.push('/adminDashboard');
      } else {
        router.push('/admin/homeProductsClient');
      }
      // console.log("Logged in");
      router.push('/admin/homeProductsClient');
    } else {
      alert('Please enter both username and password');
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Layout>
    <div className={styles.container}>
      <h1 className={styles.title}>Login Sweet Dreams Bakery</h1>
      <div className={styles.loginForm}>
        <label className={styles.label}>User name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className={styles.input}
        />
        <label className={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button onClick={handleBack} className={styles.backButton}>Back</button>
          <button onClick={handleLogin} className={styles.loginButton}>Login</button>
          <button onClick={handleSignUp} className={styles.signUpButton}>Sign Up</button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
