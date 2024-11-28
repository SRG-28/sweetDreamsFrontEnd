"use client"; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';
const ResultAI = () => {
  const router = useRouter();
  const [flavor, setFlavor] = useState('');
  const [filling, setFilling] = useState('');
  const [frosting, setFrosting] = useState('');
  const [fruits, setFruits] = useState('');
  const [portions, setPortions] = useState('');
  const [levels, setLevels] = useState('');

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  const handleRequestToOrder = () => {
    router.push('/requesttobuy'); // Redirect to the requesttobuy page
  };

  return (
    <div className="order-container">
      <div className="header">
        <img src="/logo.png" alt="Sweet Dreams Bakery" className="logo" />
        <h2>Order of any special product</h2>
      </div>
      <div className="order-content">
        <div className="preview-section">
          <h3>Preview of your idea</h3>
          <div className="preview-box">
            {/* Placeholder for the AI-generated image */}
            <img src="/placeholder-image.png" alt="Product preview" />
          </div>
        </div>
        <div className="description-section">
          <h3>Description</h3>
          <ul>
            <li>Flavor: {flavor}</li>
            <li>Filling: {filling}</li>
            <li>Frosting: {frosting}</li>
            <li>Fruits: {fruits}</li>
            <li>Portions: {portions}</li>
            <li>Levels: {levels}</li>
          </ul>
          <p className="disclaimer">
            *Making the request does not guarantee that it will be fulfilled, therefore you must keep abreast of Sweet Dreams' indications and suggestions.
          </p>
        </div>
      </div>
      <div className="button-group">
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        <button className="request-btn" onClick={handleRequestToOrder}>Request to Order</button>
      </div>
    </div>
  );
};

export default ResultAI;
