//registermodal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const RegisterModal = ({ show, onHide, onRegister, isLoading, error }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>📝 สมัครสมาชิก</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                        <Form.Control type="text" name="username" placeholder="ชื่อผู้ใช้" value={formData.username} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <Form.Control type="password" name="password" placeholder="รหัสผ่าน" value={formData.password} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="ชื่อ" value={formData.firstName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>นามสกุล</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="นามสกุล" value={formData.lastName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>อีเมล</Form.Label>
                        <Form.Control type="email" name="email" placeholder="อีเมล" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RegisterModal;