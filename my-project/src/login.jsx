import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { Spinner, Alert } from 'react-bootstrap';  // ใช้ Spinner และ Alert

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // ฟังก์ชัน handleSubmit
    const handleLogin = async ({ username, password }) => {
        console.log('Logging in with:', { username, password });  // ดูว่า username, password ถูกส่งมาหรือไม่
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await login({ username, password });
            if (response.success) {
                localStorage.setItem('isLoggedIn', true);
                navigate('/home');
                setShowLoginModal(false);  // ปิด modal
            } else {
                setError('ข้อมูลเข้าสู่ระบบไม่ถูกต้อง');
            }
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="login-container">
            <h1>เข้าสู่ระบบ</h1>
            {isLoading ? (
                <div className="spinner-container">
                    <Spinner animation="border" variant="primary" />
                    <p>กำลังเข้าสู่ระบบ...</p> {/* ข้อความแสดงในระหว่างที่โหลด */}
                </div>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>} {/* แสดงข้อผิดพลาด */}
                    <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
                </>
            )}
        </div>
    );
};

export default Login;
