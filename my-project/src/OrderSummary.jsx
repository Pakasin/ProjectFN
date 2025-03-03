import React, { useEffect, useState } from 'react';

const OrderSummary = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const savedOrderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    setOrderDetails(savedOrderDetails);
  }, []);

  if (!orderDetails) {
    return <div>ข้อมูลคำสั่งซื้อไม่พบ</div>;
  }

  const { name, address, postalCode, phone, cart, totalAmount } = orderDetails;

  return (
    <div className="order-summary-container">
      <h1>สรุปคำสั่งซื้อ</h1>
      <div className="order-details">
        <h2>ข้อมูลผู้สั่งซื้อ</h2>
        <p>ชื่อ: {name}</p>
        <p>ที่อยู่: {address}</p>
        <p>รหัสไปรษณีย์: {postalCode}</p>
        <p>เบอร์โทรศัพท์: {phone}</p>

        <h3>รายการสินค้า</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ฿{item.price} x {item.quantity} = ฿{item.price * item.quantity}
            </li>
          ))}
        </ul>

        <div className="total">
          <strong>รวมทั้งหมด: ฿{totalAmount}</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
