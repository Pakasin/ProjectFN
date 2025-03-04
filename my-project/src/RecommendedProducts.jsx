import React from 'react';
import './RecommendedProducts.css';

const RecommendedProducts = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: "VICTOR Brave Sword 12",
      brand: "VICTOR",
      originalPrice: 5980.00,
      discountedPrice: 4700.00,
      image: "/images/bravesword12.jpg",
      date: "01 มิถุนายน 2566",
    },
    {
      id: 2,
      name: "YONEX Duora 10",
      brand: "YONEX",
      originalPrice: 5000.00,
      discountedPrice: 4600.00,
      image: "/images/auraspeed90k.jpg",
      date: "13 มิถุนายน 2565",
    },
    {
      id: 3,
      name: "YONEX Astrox 99",
      brand: "YONEX",
      originalPrice: 5000.00,
      discountedPrice: 4500.00,
      image: "/images/astrox99.jpg",
      date: "15 ตุลาคม 2566",
    },
    {
      id: 4,
      name: "VICTOR Thruster K 9900",
      brand: "VICTOR",
      originalPrice: 4500.00,
      discountedPrice: 4000.00,
      image: "/images/thruster_k9900.jpg",
      date: "20 กันยายน 2566",
    },
  ];

  return (
    <div id="recommended-section">
      <h2 className="recommended-title">สินค้าแนะนำ</h2>
      <div className="products-horizontal-scroll">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="product-box">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <div className="price-container">
                <p className="original-price">฿{product.originalPrice.toFixed(2)}</p>
                <p className="discounted-price">฿{product.discountedPrice.toFixed(2)}</p>
              </div>
              <p className="product-date">{product.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
