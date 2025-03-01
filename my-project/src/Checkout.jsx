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

  // Load cart items and calculate total amount when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  // Handle form submission for checkout
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !phone || !postalCode) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
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

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    setTimeout(() => {
      alert("การสั่งซื้อสำเร็จ! ขอบคุณที่สั่งซื้อสินค้ากับเรา");
      localStorage.removeItem("cart");
      navigate("/ordersummary");  // Navigate to order summary page
    }, 2000);
  };

  return (
    <div className="checkout-container">
      <h1 className="title">สรุปคำสั่งซื้อ</h1>

      {/* Cart item list */}
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-details">
              <h3>{item.name}</h3>
              <p>฿{item.price} x {item.quantity}</p>
              <p>รวม: ฿{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="total">
          <strong>ราคารวม: ฿{totalAmount}</strong>
        </div>
      </div>

      {/* Form to collect customer information */}
      <form onSubmit={handleSubmit} className="form-container">
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
