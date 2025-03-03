// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // ตรวจสอบสถานะล็อกอิน

    if (!isLoggedIn) {
        // หากยังไม่ได้ล็อกอิน ให้ redirect ไปที่หน้า Login
        return <Navigate to="/" replace />;
    }

    // หากล็อกอินแล้ว ให้แสดง children (หน้าเป้าหมาย)
    return children;
};

export default ProtectedRoute;
