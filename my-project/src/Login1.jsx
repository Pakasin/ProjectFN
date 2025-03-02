import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import './Login1.css';
import LoginModal from './LoginModal'; 
import RegisterModal from './RegisterModal'; 

const images = [
    { id: 1, src: '/images/logo_2025_webp.webp', alt: 'Slide 1' },
    { id: 2, src: '/images/m5vmkrfrizitP4WQN3e-o.jpg', alt: 'Slide 2' },
    { id: 3, src: '/images/fantome.webp', alt: 'Slide 3' },
    { id: 4, src: '/images/maxresdefault.jpg', alt: 'Slide 4' },
    { id: 5, src: '/images/victor-auraspeed-100x-ultra.webp', alt: 'Slide 5' },
];

export default function Login1() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const onLogin = async (formData) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!data.result) throw new Error(data.message);

            alert("เข้าสู่ระบบสำเร็จ");
            handleCloseLogin();
            navigate("/home");
        } catch (error) {
            setError("เกิดข้อผิดพลาด: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onRegister = async (formData) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:8080/Signup1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!data.result) throw new Error(data.message);

            alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
            handleCloseRegister();
        } catch (error) {
            setError("เกิดข้อผิดพลาด: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" className="custom-navbar">
                <Navbar.Brand href="/">🏸 ร้านขายไม้แบดมินตัน</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">🏠 หน้าหลัก</Nav.Link>
                        <Nav.Link onClick={handleShowRegister} className="register-button">📝 สมัครสมาชิก</Nav.Link>
                        <Nav.Link onClick={handleShowLogin} className="login-button">🔑 เข้าสู่ระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* ใช้ LoginModal */}
            <LoginModal
                show={showLogin}
                onHide={handleCloseLogin}
                onLogin={onLogin}
                isLoading={isLoading}
                error={error}
            />

            {/* ใช้ RegisterModal */}
            <RegisterModal
                show={showRegister}
                onHide={handleCloseRegister}
                onRegister={onRegister}
                isLoading={isLoading}
                error={error}
            />

            {/* สไลด์อัตโนมัติ */}
            <div className="login-slider">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="swiper-container"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <div className="slide-content">
                                <img src={image.src} alt={image.alt} className="slide-image" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Footer */}
            <div className="custom-support">
                <p>📧 ติดต่อ: support@badmintonstore.com | ☎️ 081-234-5678</p>
                <p>© 2025 ร้านขายไม้แบดมินตัน. All Rights Reserved.</p>
            </div>
        </>
    );
}