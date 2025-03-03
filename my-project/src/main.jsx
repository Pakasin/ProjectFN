import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomNavbar from './Navbar';
import Login1 from './Login1';
import Home1 from './Home1';
import Signup1 from './Signup1';
import Cart from './Cart';
import OrderSummary from './OrderSummary';
import ProtectedRoute from './ProtectedRoute';
import './login1.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <CustomNavbar /> {/* เรียกใช้ Navbar ที่นี่เพียงครั้งเดียว */}
            <Routes>
                <Route path="/" element={<Login1 />} />
                <Route path="/home" element={<Home1 />} />
                <Route path="/signup" element={<Signup1 />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order-summary" element={<OrderSummary />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);