import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Or.css";  // สไตล์ของหน้าสรุปการสั่งซื้อ

export default function OrderSummary() {
  const [orderDetails, setOrderDetails] = useState(null);  // เก็บข้อมูลการสั่งซื้อ
  const navigate = useNavigate();  // ใช้ navigate สำหรับการเปลี่ยนเส้นทาง

  // ดึงข้อมูลการสั่งซื้อจาก localStorage เมื่อคอมโพเนนต์นี้โหลด
  useEffect(() => {
    const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (storedOrderDetails) {
      setOrderDetails(storedOrderDetails);  // ถ้ามีข้อมูลให้เก็บใน state
    } else {
      alert("ไม่พบข้อมูลการสั่งซื้อ");
      navigate("/");  // ถ้าไม่มีข้อมูลให้กลับไปหน้าหลัก
    }
  }, [navigate]);

  // ฟังก์ชันสำหรับยกเลิกการสั่งซื้อ
  const cancelOrder = () => {
    localStorage.removeItem("orderDetails");  // ลบข้อมูลการสั่งซื้อจาก localStorage
    alert("การสั่งซื้อถูกยกเลิกแล้ว");
    navigate("/");  // กลับไปหน้าหลัก
  };

  // ฟังก์ชันสำหรับกลับไปดูสินค้าทั้งหมด (ไปหน้า Home1.js)
  const goToProducts = () => {
    navigate("/home");  // ไปที่หน้าสินค้า (เส้นทาง /Home1)
  };

  // ถ้ายังไม่มีข้อมูลการสั่งซื้อ จะแสดงข้อความกำลังโหลด
  if (!orderDetails) return <div>กำลังโหลด...</div>;

  return (
    <div className="order-summary-container">
      <h1>สรุปการสั่งซื้อ</h1>
      <div className="order-details">
        <h2>ข้อมูลผู้สั่งซื้อ</h2>
        <p>ชื่อ: {orderDetails.name}</p>
        <p>ที่อยู่: {orderDetails.address}</p>
        <p>รหัสไปรษณีย์: {orderDetails.postalCode}</p>
        <p>เบอร์โทรศัพท์: {orderDetails.phone}</p>

        <h2>รายการสินค้า</h2>
        {orderDetails.cart.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-details">
              <h3>{item.name}</h3>
              <p>฿{item.price} x {item.quantity}</p>
              <p>รวม: ฿{item.price * item.quantity}</p>
            </div>
          </div>
        ))}

        <h3>ราคารวมทั้งหมด: ฿{orderDetails.totalAmount}</h3>
      </div>

      {/* ปุ่มสำหรับยกเลิกการสั่งซื้อ */}
      <div className="cancel-order">
        <button onClick={cancelOrder}>ยกเลิกการสั่งซื้อ</button>
      </div>

      {/* ปุ่มสำหรับกลับไปดูสินค้าทั้งหมด */}
      <div className="go-to-products">
        <button onClick={goToProducts}>กลับไปดูสินค้า</button>
      </div>
    </div>
  );
}
