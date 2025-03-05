import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios
import "./Checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);  // เก็บข้อมูลสินค้าที่อยู่ในตะกร้า
  const [name, setName] = useState("");  // ชื่อผู้สั่งซื้อ
  const [address, setAddress] = useState("");  // ที่อยู่
  const [postalCode, setPostalCode] = useState("");  // รหัสไปรษณีย์
  const [phone, setPhone] = useState("");  // เบอร์โทรศัพท์
  const [totalAmount, setTotalAmount] = useState(0);  // ราคารวม
  const [orderSuccess, setOrderSuccess] = useState(false);  // สถานะการสั่งซื้อสำเร็จ
  const navigate = useNavigate();

  // ดึงข้อมูลตะกร้าจาก localStorage หรือเซ็ตเป็นอาร์เรย์ว่างถ้าไม่มีข้อมูล
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // คำนวณราคารวมของตะกร้า
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  // การตรวจสอบข้อมูลที่กรอกก่อนส่งคำสั่งซื้อ
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบการกรอกข้อมูล
    if (!name || !address || !phone || !postalCode || cart.length === 0) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    // จัดเตรียมข้อมูลคำสั่งซื้อ
    const orderDetails = { name, address, postalCode, phone, cart, totalAmount };
    console.log("Order Details:", orderDetails);

    try {
      // ส่งข้อมูลคำสั่งซื้อไปยังเซิร์ฟเวอร์
      const response = await axios.post('http://localhost:8080/api/checkout', orderDetails);

      if (response.data.result) {
        // เก็บข้อมูลคำสั่งซื้อใน localStorage
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

        // ล้างข้อมูลในตะกร้าหลังจากการชำระเงินสำเร็จ
        localStorage.removeItem("cart");

        // ตั้งค่าให้แสดงข้อความสั่งซื้อสำเร็จ
        setOrderSuccess(true);

        // ไปยังหน้าสรุปคำสั่งซื้อ (Order-Summary) หลังจาก 2 วินาที
        setTimeout(() => {
          navigate("/Order-Summary");
        }, 2000);
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ");
      }
    } catch (error) {
      console.error("Error during order submission:", error);
      alert("ไม่สามารถทำการสั่งซื้อได้ในขณะนี้");
    }
  };

  return (
    <div className="checkout-container">
      <h1>หน้าชำระเงิน</h1>

      <div className="cart-summary">
        <h2>รายการสินค้า</h2>
        {cart.length === 0 ? (
          <p>ไม่มีสินค้าในตะกร้า</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>฿{item.price} x {item.quantity}</p>
                <p>รวม: ฿{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
        <div className="total">
          <strong>ราคารวม: ฿{totalAmount}</strong>
        </div>
      </div>

      {orderSuccess && (
        <div className="order-success-message">
          <p>สั่งซื้อสำเร็จ!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-field">
          <label htmlFor="name">ชื่อผู้สั่งซื้อ</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="address">ที่อยู่</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="postalCode">รหัสไปรษณีย์</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">ยืนยันการชำระเงิน</button>
      </form>
    </div>
  );
}
