// pages/signup.js
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LayoutUser from '../layoutUser.js';
import styles from './signup.css'; // Cambiado a signup.css


const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Lógica para el registro
    if (fullName && userName && phone && email && password) {
      console.log("User registered");
      router.push('/dashboard');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1>Sweet Dreams Bakery</h1>
      <h2>Create an account</h2>
      <div className={styles.signUpForm}>
        <label>Full name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
        />
        <label>User name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your user name"
        />
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <div className={styles.buttonContainer}>
          <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleSignUp} className={styles.signUpButton}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
