import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for navigation in React Router v6
import "./Checkout.css";
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // คำนวณราคารวมของตะกร้า
    const total = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ตรวจสอบข้อมูลที่กรอก
    if (!name || !address || !phone) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    // ทำการยืนยันการชำระเงิน (ในกรณีจริงอาจมีการเรียก API)
    setTimeout(() => {
      alert("การสั่งซื้อสำเร็จ! ขอบคุณที่สั่งซื้อสินค้ากับเรา");

      // เคลียร์ตะกร้าหลังการซื้อ
      localStorage.removeItem("cart");

      // ใช้ navigate แทน useHistory เพื่อเปลี่ยนหน้า
      navigate("/"); // เปลี่ยนหน้าไปที่หน้า Home
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">สรุปคำสั่งซื้อ</h1>

      {/* แสดงรายการสินค้าจากตะกร้า */}
      <div>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3>{item.name}</h3>
                <p>฿{item.price} x {item.quantity}</p>
                <p>รวม: ฿{item.price * item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* แสดงราคารวม */}
        <div className="flex justify-between mb-4">
          <strong>ราคารวม: ฿{totalAmount}</strong>
        </div>
      </div>

      {/* ฟอร์มกรอกข้อมูลการสั่งซื้อ */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="mb-4">
          <label htmlFor="name">ชื่อผู้สั่งซื้อ</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address">ที่อยู่</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">ยืนยันการชำระเงิน</button>
      </form>
    </div>
  );
}
