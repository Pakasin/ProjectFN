import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import { Swiper, SwiperSlide } from 'swiper/react'; // นำเข้าสไลด์
import 'swiper/swiper-bundle.css'; // นำเข้า CSS ของ Swiper
import md5 from 'md5';
import './Login1.css'; // นำเข้าไฟล์ CSS

// ข้อมูลสินค้า (นำมาจาก Home1.jsx)
const products = [
  { id: 1, name: "YONEX Astrox 99", image: "/images/astrox99.jpg" },
  { id: 2, name: "VICTOR Thruster K 9900", image: "/images/thruster_k9900.jpg" },
  { id: 3, name: "Kawasaki King K8", image: "/images/king_k8.jpg" },
  { id: 4, name: "YONEX Nanoflare 700", image: "/images/nanoflare700.jpg" },
  { id: 5, name: "VICTOR Auraspeed 90K", image: "/images/auraspeed90k.jpg" },
  { id: 6, name: "YONEX Duora 10", image: "/images/duora10.jpg" },
  { id: 7, name: "VICTOR Brave Sword 12", image: "/images/bravesword12.jpg" },
  { id: 8, name: "Kawasaki Honor S6", image: "/images/honors6.jpg" },
  { id: 9, name: "YONEX Voltric Z Force II", image: "/images/voltriczforce2.jpg" },
  { id: 10, name: "VICTOR Hypernano X 900", image: "/images/hypernanox900.jpg" },
];

export default function Login1() {
    const [show, setShow] = useState(false); // สถานะการแสดง Modal
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

    const handleClose = () => setShow(false); // ปิด Modal
    const handleShow = () => setShow(true); // เปิด Modal

    const onLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // จำลองการเรียก API
            const authTokenData = await getAuthenToken();
            if (!authTokenData || !authTokenData.data || !authTokenData.data.auth_token) {
                throw new Error("ไม่สามารถรับ Token ได้");
            }

            const accessTokenData = await getAcessToken(authTokenData.data.auth_token);
            if (!accessTokenData || !accessTokenData.data || !accessTokenData.data.access_token) {
                throw new Error("ไม่สามารถเข้าสู่ระบบได้");
            }

            // บันทึกข้อมูลผู้ใช้ (ตัวอย่าง)
            localStorage.setItem("access_token", accessTokenData.data.access_token);
            localStorage.setItem("user_name", username);

            handleClose(); // ปิด Modal หลังจากเข้าสู่ระบบสำเร็จ
            navigate("/home"); // นำทางไปยังหน้า Home1 ทันที
        } catch (error) {
            setError("เกิดข้อผิดพลาด: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getAuthenToken = async () => {
        // จำลองการเรียก API
        return { data: { auth_token: "sample_token" } };
    };

    const getAcessToken = async (authToken) => {
        // จำลองการเรียก API
        return { data: { access_token: "sample_access_token", account_info: { user_name: username } } };
    };

    return (
        <>
            {/* Navbar */}
            <Navbar bg="purple" expand="lg" variant="dark">
                <Navbar.Brand href="/">ร้านขายไม้แบดมินตัน</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">หน้าหลัก</Nav.Link>
                        <Nav.Link onClick={handleShow}>เข้าสู่ระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Login Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#6a1b9a', color: 'white' }}>
                    <Modal.Title>เข้าสู่ระบบ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={onLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>ชื่อผู้ใช้</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ชื่อผู้ใช้"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>รหัสผ่าน</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" disabled={isLoading} style={{ width: '100%' }}>
                            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* สไลด์รูปสินค้า */}
            <div className="login-slider">
                <h2 className="slider-title">สินค้าแนะนำ</h2>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    className="swiper-container"
                >
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
        </>
    );
}