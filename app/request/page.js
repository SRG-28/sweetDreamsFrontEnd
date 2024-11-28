// pages/request.js
"use client"; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './request.css'; // Archivo CSS que describiré abajo

const Request = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState('');

  const handleSendRequest = () => {
    if (orderDetails) {
      // Aquí puedes integrar la lógica con IA, o simplemente enviarlo por ahora
      console.log('Order submitted:', orderDetails);
      router.push('/request-to-buy'); // Redirige a la página de confirmación
    } else {
      alert('Please describe your order');
    }
  };

  const handleCancel = () => {
    router.push('/admin/homeproductsClient'); // Redirige al home de productos
  };

  return (
    <div className={styles.container}>
      <h1>Sweet Dreams Bakery</h1>
      <h2>Request to order any especial product</h2>
      <p>Describe your order with all details</p>
      <textarea
        value={orderDetails}
        onChange={(e) => setOrderDetails(e.target.value)}
        placeholder="Describe your order here"
        className={styles.textArea}
      />
      <div className={styles.buttonContainer}>
        <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        <button onClick={handleSendRequest} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default Request;
