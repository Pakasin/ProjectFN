import React, { useEffect, useState } from 'react';

export default function Home1() {
  const [products, setProducts] = useState([]);

  // ฟังก์ชันดึงข้อมูลจาก API
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>เลือกซื้อไม้แบดมินตัน</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.product_id} className="product">
            <img src={product.image_url} alt={product.product_name} />
            <h3>{product.product_name}</h3>
            <p>แบรนด์: {product.brand_name}</p>
            <p>ราคา: {product.price} บาท</p>
            <p>สต็อก: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
