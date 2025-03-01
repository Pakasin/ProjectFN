import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login1 from './Login1';
import Home1 from './Home1';
import Signup1 from './Signup1';
import Crat from './Crat';  // ไฟล์ชื่อ Crat.jsx
import Checkout from './Checkout';
import OrderSummary from './OrderSummary';

// สร้าง root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render เนื้อหา
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/home" element={<Home1 />} />
        <Route path="/signup" element={<Signup1 />} />
        <Route path="/Cart" element={<Crat />} /> 
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/OrderSummary" element={<OrderSummary />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);