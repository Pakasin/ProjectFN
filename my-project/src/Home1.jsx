//Home1.jsx
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Home1.css";

const productsData = [
  { id: 1, name: "YONEX Astrox 99", brand: "YONEX", type_id: 1, type_name: "Racket", price: 5000, image: "/images/astrox99.jpg" },
  { id: 2, name: "VICTOR Thruster K 9900", brand: "VICTOR", type_id: 1, type_name: "Racket", price: 4500, image: "/images/thruster_k9900.jpg" },
  { id: 3, name: "Kawasaki King K8", brand: "Kawasaki", type_id: 1, type_name: "Racket", price: 3200, image: "/images/king_k8.jpg" },
  { id: 4, name: "YONEX Nanoflare 700", brand: "YONEX", type_id: 1, type_name: "Racket", price: 4800, image: "/images/nanoflare700.jpg" },
  { id: 5, name: "VICTOR Auraspeed 90K", brand: "VICTOR", type_id: 1, type_name: "Racket", price: 4600, image: "/images/auraspeed90k.jpg" },
  { id: 6, name: "YONEX Duora 10", brand: "YONEX", type_id: 1, type_name: "Racket", price: 5200, image: "/images/duora10.jpg" },
  { id: 7, name: "VICTOR Brave Sword 12", brand: "VICTOR", type_id: 1, type_name: "Racket", price: 4700, image: "/images/bravesword12.jpg" },
  { id: 8, name: "Kawasaki Honor S6", brand: "Kawasaki", type_id: 1, type_name: "Racket", price: 3300, image: "/images/honors6.jpg" },
  { id: 9, name: "YONEX Voltric Z Force II", brand: "YONEX", type_id: 1, type_name: "Racket", price: 5600, image: "/images/voltriczforce2.jpg" },
  { id: 10, name: "VICTOR Hypernano X 900", brand: "VICTOR", type_id: 1, type_name: "Racket", price: 4800, image: "/images/hypernanox900.jpg" },
  { id: 11, name: "Kawasaki Power Control X", brand: "Kawasaki", type_id: 1, type_name: "Racket", price: 3500, image: "/images/powercontrolx.jpg" },
  { id: 12, name: "YONEX ArcSaber 11", brand: "YONEX", type_id: 1, type_name: "Racket", price: 5400, image: "/images/arcsaber11.jpg" },
  { id: 13, name: "YONEX Aerosensa 50", brand: "YONEX", type_id: 2, type_name: "Shuttlecock", price: 1200, image: "/images/aerosensa50.jpg" },
  { id: 14, name: "VICTOR Master Ace", brand: "VICTOR", type_id: 2, type_name: "Shuttlecock", price: 1300, image: "/images/masterace.jpg" },
  { id: 15, name: "Kawasaki Shuttle", brand: "Kawasaki", type_id: 2, type_name: "Shuttlecock", price: 1000, image: "/images/kawasaki_shuttle.jpg" },
  { id: 16, name: "VICTOR Power Cushion 65Z", brand: "VICTOR", type_id: 3, type_name: "Shoes", price: 4100, image: "/images/cushion65z.jpg" },
  { id: 17, name: "VICTOR P9200III", brand: "VICTOR", type_id: 3, type_name: "Shoes", price: 4200, image: "/images/victor_p9200iii.jpg" },
  { id: 18, name: "Kawasaki Court Control", brand: "Kawasaki", type_id: 3, type_name: "Shoes", price: 3800, image: "/images/kawasaki_shoes.jpg" },
  { id: 19, name: "YONEX BG66 Ultimax", brand: "YONEX", type_id: 4, type_name: "String", price: 250, image: "/images/bg66ultimax.jpg" },
  { id: 20, name: "VICTOR VBS-68", brand: "VICTOR", type_id: 4, type_name: "String", price: 550, image: "/images/vbs68.jpg" },
  { id: 21, name: "Kawasaki Nano String", brand: "Kawasaki", type_id: 4, type_name: "String", price: 480, image: "/images/kawasaki_string.jpg" },
  { id: 22, name: "YONEX Aerosensa 40", brand: "YONEX", type_id: 2, type_name: "Shuttlecock", price: 1100, image: "/images/aerosensa40.jpg" },
  { id: 23, name: "VICTOR Gold Champion", brand: "VICTOR", type_id: 2, type_name: "Shuttlecock", price: 1250, image: "/images/goldchampion.jpg" },
  { id: 24, name: "Kawasaki Shuttle 500", brand: "Kawasaki", type_id: 2, type_name: "Shuttlecock", price: 1000, image: "/images/shuttle500.jpg" },
  { id: 25, name: "YONEX Power Cushion 88 Dial", brand: "YONEX", type_id: 3, type_name: "Shoes", price: 4200, image: "/images/cushion88dial.jpg" },
  { id: 26, name: "VICTOR S821I", brand: "VICTOR", type_id: 3, type_name: "Shoes", price: 4300, image: "/images/s821i.jpg" },
  { id: 27, name: "Kawasaki Pro Speed", brand: "Kawasaki", type_id: 3, type_name: "Shoes", price: 3900, image: "/images/prospeed.jpg" },
  { id: 28, name: "YONEX BG80 Power", brand: "YONEX", type_id: 4, type_name: "String", price: 550, image: "/images/bg80power.jpg" },
  { id: 29, name: "VICTOR VBS-63", brand: "VICTOR", type_id: 4, type_name: "String", price: 500, image: "/images/vbs63.jpg" },
  { id: 30, name: "Kawasaki Super Tension", brand: "Kawasaki", type_id: 4, type_name: "Racket", price: 4400, image: "/images/supertension.jpg" },
];

function ProductList() {
  const [products, setProducts] = useState(productsData); // ใช้ข้อมูลตัวอย่างในตัวแปร productsData
  const [filterBrand, setFilterBrand] = useState('');
  const [filterType, setFilterType] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`เพิ่ม ${product.name} ลงตะกร้าแล้ว!`);
  };

  // กรองสินค้าตามตัวกรองที่เลือก
  const filteredProducts = products.filter((product) =>
    (filterBrand === '' || product.brand === filterBrand) &&
    (filterType === '' || product.type_name === filterType) &&
    product.price >= minPrice &&
    product.price <= maxPrice
  );

  // ดึงข้อมูลจาก localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="home-container">
      <h1 className="home-title">เลือกซื้ออุปกรณ์สำหรับกีฬาแบดมินตัน</h1>

      {/* ปุ่มตะกร้า */}
      <div className="cart-button-container">
        <Link to="/cart" className="cart-btn">
          <button className="cart-button">
            ตะกร้าสินค้า ({cartItemCount})
          </button>
        </Link>
      </div>

      <div className="filter-container">
        <select onChange={(e) => setFilterBrand(e.target.value)} className="filter-select">
          <option value="">ทุกแบรนด์</option>
          <option value="YONEX">YONEX</option>
          <option value="VICTOR">VICTOR</option>
          <option value="Kawasaki">Kawasaki</option>
        </select>

        <select onChange={(e) => setFilterType(e.target.value)} className="filter-select">
          <option value="">ทุกประเภท</option>
          <option value="Racket">Racket</option>
          <option value="Shuttlecock">Shuttlecock</option>
          <option value="Shoes">Shoes</option>
          <option value="String">String</option>
        </select>

        <input type="number" placeholder="ราคาขั้นต่ำ" className="filter-input" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
        <input type="number" placeholder="ราคาสูงสุด" className="filter-input" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="no-products">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-info">{product.brand} - {product.type_name}</p>
              <p className="product-price">฿{product.price}</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
