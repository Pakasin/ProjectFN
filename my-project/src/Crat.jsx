import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


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

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">ตะกร้าของคุณ</h1>
      <div className="p-4">
        {cart.length === 0 ? (
          <p>ตะกร้าของคุณยังไม่มีสินค้า</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h3>{item.name}</h3>
                    <p>฿{item.price}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="decrease-btn"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="increase-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    ลบ
                  </button>
                </li>
              ))}
            </ul>

            <Link to="/cart" className="checkout-btn">
              ไปที่การชำระเงิน
            </Link>

          </div>
        )}
      </div>
    </div>
  );
}
