import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ch.css"; // ปรับให้ใช้ CSS ที่เหมาะสม

export default function Cart() {
  const [cart, setCart] = useState([]);  // เก็บข้อมูลสินค้าที่อยู่ในตะกร้า
  const [totalAmount, setTotalAmount] = useState(0);  // ราคารวม
  const navigate = useNavigate(); // ใช้สำหรับการนำทางไปยังหน้าอื่น

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

  // ฟังก์ชันเพิ่มจำนวนสินค้าในตะกร้า
  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // ฟังก์ชันลดจำนวนสินค้าในตะกร้า
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(updatedCart);
  };

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  // อัพเดตข้อมูลใน localStorage และสถานะของตะกร้า
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // ฟังก์ชันยืนยันการชำระเงิน (ไม่ต้องติดต่อกับเซิร์ฟเวอร์)
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("ตะกร้าของคุณว่างเปล่า กรุณาเพิ่มสินค้าก่อนดำเนินการชำระเงิน");
      return; // ถ้าตะกร้าว่าง จะไม่ดำเนินการ
    }

    // แค่แสดงข้อมูลการสั่งซื้อ ไม่ต้องส่งไปยังเซิร์ฟเวอร์
    const orderDetails = { cart, totalAmount };

    console.log("Order Details: ", orderDetails);  // Log ข้อมูลการสั่งซื้อเพื่อการดีบั๊ก

    // นำทางไปยังหน้า Checkout โดยไม่ต้องติดต่อกับเซิร์ฟเวอร์
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>ตะกร้าสินค้า</h1>
      <div className="cart-list">
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <h3>ไม่มีสินค้าในตะกร้า</h3>
            <p>กรุณาเลือกสินค้าเพื่อทำการสั่งซื้อ</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>฿{item.price} x {item.quantity}</p>
                <p>รวม: ฿{item.price * item.quantity}</p>
              </div>
              <div className="quantity-controls">
                <button className="btn btn-increase" onClick={() => increaseQuantity(item.id)}>เพิ่ม</button>
                <button className="btn btn-decrease" onClick={() => decreaseQuantity(item.id)}>ลด</button>
                <button className="btn btn-remove" onClick={() => removeItem(item.id)}>ลบ</button>
              </div>
            </div>
          ))
        )}
        <div className="total">
          <strong>ราคารวม: ฿{totalAmount}</strong>
        </div>
      </div>

      {/* ปุ่มยืนยันการชำระเงิน */}
      <button onClick={handleCheckout} className="submit-btn">ยืนยันการชำระเงิน</button>
    </div>
  );
}
