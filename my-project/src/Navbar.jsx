import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // ตรวจสอบสถานะล็อกอิน
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // ลบสถานะล็อกอิน
        navigate("/"); // redirect ไปที่หน้า Login
    };

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="custom-navbar">
            <Navbar.Brand as={Link} to="/">🏸 ร้านขายไม้แบดมินตัน</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">🏠 หน้าหลัก</Nav.Link>

                    {/* เมนูที่แสดงขึ้นอยู่กับสถานะล็อกอิน */}
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
                            <Nav.Link as={Link} to="/login">🔑 เข้าสู่ระบบ</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
