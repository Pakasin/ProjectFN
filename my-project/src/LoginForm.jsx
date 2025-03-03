import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = ({ onSubmit, isLoading, error }) => {
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password });  // เรียกใช้ฟังก์ชันจาก props
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}  {/* แสดงข้อผิดพลาด */}
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>  
                <Form.Control
                    type="text"  
                    placeholder="Enter username"
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)}  
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
        </Form>
    );
};

export default LoginForm;
