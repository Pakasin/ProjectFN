//signup1.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    const onSignup = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doSignup();
        }
        setValidated(true);
    }

    const doSignup = async () => {
        // Send data to the backend API
        const response = await fetch("http://localhost:8080/add_users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: username,
                user_pwd: password,
                first_name: firstname,
                last_name: lastname,
                email: email,
            })
        });

        const data = await response.json();
        if (data) {
            alert("สมัครสมาชิกสำเร็จ");
            navigate("/");
        } else {
            alert(`สมัครสมาชิกไม่สำเร็จ`);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={onSignup}>
            <Row>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <Form.Control.Feedback type="invalid">กรุณาป้อน Username ด้วย</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Form.Control.Feedback type="invalid">กรุณาป้อน Password ด้วย</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => { setFirstname(e.target.value) }}
                    />
                    <Form.Control.Feedback type="invalid">กรุณาป้อน Firstname ด้วย</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => { setLastname(e.target.value) }}
                    />
                    <Form.Control.Feedback type="invalid">กรุณาป้อน Lastname ด้วย</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"  // Make sure to use type="email" for email validation
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Form.Control.Feedback type="invalid">กรุณาป้อน Email ด้วย</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Button type="submit">Register</Button>
            </Row>
        </Form>
    );
}
