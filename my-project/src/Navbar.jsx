import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { login } from './authService';

const CustomNavbar = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // ตรวจสอบค่าเป็นสตริง 'true'
    const navigate = useNavigate();
    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate("/", { replace: true });
    };

    const handleShowLogin = () => setShowLoginModal(true);
    const handleHideLogin = () => setShowLoginModal(false);

    const handleLogin = async ({ username, password }) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await login({ username, password });
            if (!data.result) throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');

            localStorage.setItem('isLoggedIn', 'true'); // ตั้งค่าเป็นสตริง 'true'
            navigate('/home');
            setShowLoginModal(false);
        } catch (err) {
            setError('เกิดข้อผิดพลาด: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" className="custom-navbar">
                <Navbar.Brand as={Link} to="/">🏸 ร้านขายไม้แบดมินตัน</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">🏠 หน้าหลัก</Nav.Link>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/home">🏠 หน้า Home</Nav.Link>
                                <Nav.Link as={Link} to="/cart">🛒 ตะกร้าสินค้า</Nav.Link>
                                <Nav.Link as={Link} to="/checkout">💳 ชำระเงิน</Nav.Link>
                                <Nav.Link as={Link} to="/order-summary">📦 สรุปคำสั่งซื้อ</Nav.Link>
                                <Nav.Link onClick={handleLogout}>🚪 ออกจากระบบ</Nav.Link>
                                <Nav.Link disabled>✅ ล็อกอินสำเร็จ</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/signup">📝 สมัครสมาชิก</Nav.Link>
                                <Nav.Link onClick={handleShowLogin} style={{ cursor: 'pointer' }}>🔑 เข้าสู่ระบบ</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <LoginModal 
                show={showLoginModal} 
                onHide={handleHideLogin} 
                onLogin={handleLogin}
                isLoading={isLoading}    
                error={error}         
            />
        </>
    );
};

export default CustomNavbar;