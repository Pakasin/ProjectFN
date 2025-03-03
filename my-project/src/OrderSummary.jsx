import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Or.css";

export default function OrderSummary() {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    console.log("Stored Order Details:", storedOrderDetails);

    if (
      storedOrderDetails &&
      storedOrderDetails.cart &&
      storedOrderDetails.cart.length > 0 &&
      storedOrderDetails.totalAmount
    ) {
      setOrderDetails(storedOrderDetails);
    } else {
      alert("ไม่พบข้อมูลการสั่งซื้อหรือไม่มีสินค้าที่สั่ง");
      navigate("/");  // เปลี่ยนเส้นทางไปหน้าแรก
    }
  }, [navigate]);

  const cancelOrder = () => {
    localStorage.removeItem("orderDetails");
    alert("การสั่งซื้อถูกยกเลิกแล้ว");
    navigate("/");  // กลับไปหน้าแรก
  };

  const goToProducts = () => {
    navigate("/home");
  };

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
        {orderDetails.cart && orderDetails.cart.length > 0 ? (
          orderDetails.cart.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>฿{item.price} x {item.quantity}</p>
                <p>รวม: ฿{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <div>ไม่พบรายการสินค้า</div>
        )}

        <h3>ราคารวมทั้งหมด: ฿{orderDetails.totalAmount}</h3>
      </div>
      <div className="cancel-order">
        <button onClick={cancelOrder}>ยกเลิกการสั่งซื้อ</button>
      </div>
      <div className="go-to-products">
        <button onClick={goToProducts}>กลับไปดูสินค้า</button>
      </div>
    </div>
  );
}
