import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cr.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load data from localStorage and update state
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Handle removing item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle increasing item quantity
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle decreasing item quantity
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      {/* ปุ่มกลับไปหน้าแรก */}
      <Link to="/Home" className="go-home-btn">
        กลับไปที่หน้าแรก
      </Link>

      <h1 className="text-2xl font-bold text-center my-4">ตะกร้าของคุณ</h1>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p>ตะกร้าของคุณยังไม่มีสินค้า</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-right">
                    <h3>{item.name}</h3>
                    <p>฿{item.price}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      ลบ
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Display total price */}
            <div className="total-price">
              <h2 className="font-bold">รวมราคาทั้งหมด: ฿{totalPrice}</h2>
            </div>

            <Link to="/checkout" className="checkout-btn">
              ไปที่การชำระเงิน
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
