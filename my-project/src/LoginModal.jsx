import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const LoginModal = ({ show, onHide, onLogin, isLoading, error }) => {
    const [username, setUsername] = useState(''); // เปลี่ยนจาก email เป็น username
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { username, password }; // ส่ง username แทน email
        onLogin(formData); 
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>เข้าสู่ระบบ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formusername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // ใช้ setUsername แทน setEmail
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="กรอกรหัสผ่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <div style={{ color: 'red' }}>{error}</div>} {/* แสดง error ถ้ามี */}
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
