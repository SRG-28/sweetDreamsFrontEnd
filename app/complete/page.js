"use client"; 

import { useRouter } from 'next/navigation';

const Complete = () => {
  const router = useRouter();

  const handleComplete = () => {
    // Lógica para redirigir o completar la orden
    router.push('/');  // Redirige a la página principal o donde desees
  };

  return (
    <div className="complete-container">
      <div className="header">
        <img src="/logo.png" alt="Sweet Dreams Bakery" className="logo" />
      </div>
      <h2>Complete the request</h2>
      <div className="product-info">
        <div className="product-image">
          {/* Aquí va la imagen generada por la IA */}
          <img src="/mnt/data/A_bakery_product_request_completion_page_with_a_la.png" alt="Generated Product" className="ai-image"/>
        </div>
        <div className="product-details">
          <p><strong>Product Name:</strong> <span>Your Product</span></p>
        </div>
      </div>
      <h1 className="confirmation-text">Request completed!</h1>
      <div className="complete-button">
        <button onClick={handleComplete}>Complete</button>
      </div>
    </div>
  );
};

export default Complete;
