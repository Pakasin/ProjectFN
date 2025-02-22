import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login1.css'; 

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }
        setValidated(true);
    }

    const doLogin = async () => {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        const data = await response.json();
        console.log(data);
        if (data.result) {
            navigate("home", { replace: false });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Form noValidate validated={validated} onSubmit={onLogin}>
                <Form.Group className="form-group">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        กรุณาป้อน Username ด้วย
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        กรุณาป้อน Password ด้วย
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className="btn-login" type="submit">Login</Button>

                <div className="signup-link">
                    <p><Link to="/signup">สมัครสมาชิก</Link></p>
                </div>
            </Form>
        </div>
    );
}