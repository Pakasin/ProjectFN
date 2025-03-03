import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ch.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const updateCartTotal = (updatedCart) => {
    const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartTotal(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartTotal(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartTotal(updatedCart);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !phone || !postalCode) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    if (cart.length === 0) {
      alert("ตะกร้าสินค้าไม่มีสินค้า");
      return;
    }

    const orderDetails = {
      name,
      address,
      postalCode,
      phone,
      cart,
      totalAmount,
    };

    console.log("Cart items being sent:", cart);

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // การยืนยันคำสั่งซื้อ
    fetch("http://localhost:8080/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),  // ส่งข้อมูลการยืนยัน
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          alert("การสั่งซื้อสำเร็จ! ขอบคุณที่สั่งซื้อสินค้ากับเรา");
          localStorage.removeItem("cart"); // ลบข้อมูลใน Local Storage
          navigate("/ordersummary");
        } else {
          alert("เกิดข้อผิดพลาด: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error during the request:", error);
        alert("เกิดข้อผิดพลาดในการติดต่อกับเซิร์ฟเวอร์");
      });

  };

  return (
    <div className="checkout-container">
      <h1 className="title">สรุปคำสั่งซื้อ</h1>
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

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-field">
          <label htmlFor="name">ชื่อผู้สั่งซื้อ</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="address">ที่อยู่</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="postalCode">รหัสไปรษณีย์</label>
          <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="phone">เบอร์โทรศัพท์</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">ยืนยันการชำระเงิน</button>
      </form>
    </div>
  );
}
