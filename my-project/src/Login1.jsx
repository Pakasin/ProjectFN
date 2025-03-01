import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Login1.css';

const products = [
  { id: 1, name: "YONEX Astrox 99", image: "/images/astrox99.jpg" },
  { id: 2, name: "VICTOR Thruster K 9900", image: "/images/thruster_k9900.jpg" },
  { id: 3, name: "Kawasaki King K8", image: "/images/king_k8.jpg" },
];

const getAuthenToken = async () => {
  // ตัวอย่างการเรียก API เพื่อรับ Token
  const response = await fetch('https://api.example.com/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

const getAcessToken = async (authToken) => {
  // ตัวอย่างการเรียก API เพื่อรับ Access Token
  const response = await fetch('https://api.example.com/access', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return response.json();
};

export default function Login1() {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const authTokenData = await getAuthenToken();
            if (!authTokenData.data.auth_token) throw new Error("ไม่สามารถรับ Token ได้");

            const accessTokenData = await getAcessToken(authTokenData.data.auth_token);
            if (!accessTokenData.data.access_token) throw new Error("ไม่สามารถเข้าสู่ระบบได้");

            localStorage.setItem("access_token", accessTokenData.data.access_token);
            localStorage.setItem("user_name", username);
            handleClose();
            navigate("/home");
        } catch (error) {
            setError("เกิดข้อผิดพลาด: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" className="custom-navbar">
                <Navbar.Brand href="/">FN BADMINTONSHOP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">🏠 หน้าหลัก</Nav.Link>
                        <Nav.Link onClick={handleShow} className="login-button">🔑 เข้าสู่ระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose} centered className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>🔐 เข้าสู่ระบบ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={onLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>ชื่อผู้ใช้</Form.Label>
                            <Form.Control type="text" placeholder="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>รหัสผ่าน</Form.Label>
                            <Form.Control type="password" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading} className="login-submit-button">
                            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className="login-slider">
                <h2 className="slider-title">🏆 สินค้าแนะนำ</h2>
                <Swiper spaceBetween={30} slidesPerView={3} navigation pagination={{ clickable: true }} loop={true} autoplay={{ delay: 3000 }} className="swiper-container">
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="slide-content">
                                <img src={product.image} alt={product.name} className="slide-image" />
                                <p className="slide-text">{product.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="custom-support">
            <p>📧 ติดต่อ: support@badmintonstore.com | ☎️ 081-234-5678</p>
            <p>© 2025 ร้านขายไม้แบดมินตัน. All Rights Reserved.</p>
                <p>📞 ติดต่อเรา: 081-234-5678</p>
            </div>
        </>
    );
}