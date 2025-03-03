import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { login } from './authService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import './login1.css';

const Login1 = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleLogin = async (credentials) => {
        setIsLoading(true);
        setError('');

        try {
            const data = await login(credentials);
            if (!data.result) throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');

            localStorage.setItem('isLoggedIn', 'true'); // ตั้งค่าเป็นสตริง 'true'
            alert("เข้าสู่ระบบสำเร็จ");
            handleCloseLogin();
            navigate("/home");
        } catch (error) {
            setError("เกิดข้อผิดพลาด: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const images = [
        { id: 1, src: '/images/logo_2025_webp.webp', alt: 'Slide 1' },
        { id: 2, src: '/images/m5vmkrfrizitP4WQN3e-o.jpg', alt: 'Slide 2' },
        { id: 3, src: '/images/fantome.webp', alt: 'Slide 3' },
        { id: 4, src: '/images/maxresdefault.jpg', alt: 'Slide 4' },
        { id: 5, src: '/images/victor-auraspeed-100x-ultra.webp', alt: 'Slide 5' },
    ];

    return (
        <>

            <LoginModal
                show={showLogin}
                onHide={handleCloseLogin}
                onLogin={handleLogin}
                isLoading={isLoading}
                error={error}
            />

            {/* ส่วนของสไลด์ */}
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

            {/* แถบติดต่อ */}
            <div className="custom-support">
                <p>📧 ติดต่อ: support@badmintonstore.com | ☎️ 081-234-5678</p>
                <p>© 2025 ร้านขายไม้แบดมินตัน. All Rights Reserved.</p>
            </div>
        </>
    );
};

export default Login1;