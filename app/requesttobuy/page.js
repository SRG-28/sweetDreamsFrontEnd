"use client"; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OrderForm = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    phone: '',
    email: '',
    deliveryDate: '',
    productName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMoreProducts = () => {
    router.push('/products');  // Redirige a la página de productos
  };

  const handleCancel = () => {
    router.back();  // Regresa a la página anterior
  };

  const handleComplete = () => {
    // Aquí podrías implementar lógica para guardar la orden o enviarla a un backend
    router.push('/complete');  // Redirige a la página de confirmación
  };

  return (
    <div className="form-container">
      <h1>Request to Buy</h1>
      <form>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label>User Name</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Date to be delivered</label>
        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
        />
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </form>
      
      <div className="buttons">
        <button onClick={handleAddMoreProducts}>Add more products</button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleComplete}>Complete</button>
      </div>
    </div>
  );
};

export default OrderForm;
