import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import './Login1.css';

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // เพิ่ม state สำหรับ loading
    const [error, setError] = useState(""); // เพิ่ม state สำหรับข้อผิดพลาด
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
    };

    const getAuthenToken = async () => {
        const response = await fetch("http://localhost:8080/api/authen_request", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: md5(username)
            })
        });
        if (!response.ok) {
            throw new Error("Failed to fetch authentication token");
        }
        const data = await response.json();
        return data;
    };

    const getAccessToken = async (authToken) => {
        const baseString = username + "&" + md5(password);
        const authenSignature = md5(baseString);
        const response = await fetch("http://localhost:8080/api/access_request", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                auth_signature: authenSignature,
                auth_token: authToken
            })
        });
        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }
        const data = await response.json();
        return data;
    };

    const doLogin = async () => {
        setLoading(true); // เริ่ม loading
        setError(""); // เคลียร์ข้อผิดพลาดเก่า
        try {
            // เคลียร์ localStorage ก่อน login ใหม่
            localStorage.clear();

            const data1 = await getAuthenToken();
            const authToken = data1.data.auth_token;
            const data2 = await getAccessToken(authToken);

            // บันทึกข้อมูลใน localStorage
            localStorage.setItem("access_token", data2.data.access_token);
            localStorage.setItem("user_id", data2.data.account_info.user_id);
            localStorage.setItem("user_name", data2.data.account_info.user_name);
            localStorage.setItem("first_name", data2.data.account_info.first_name);
            localStorage.setItem("last_name", data2.data.account_info.last_name);
            localStorage.setItem("email", data2.data.account_info.email);
            localStorage.setItem("role_id", data2.data.account_info.role_id);
            localStorage.setItem("role_name", data2.data.account_info.role_name);

            // นำทางไปยังหน้า home
            navigate("home", { replace: false });
        } catch (err) {
            setError("Login failed. Please check your username and password."); // แสดงข้อผิดพลาด
            console.error(err);
        } finally {
            setLoading(false); // หยุด loading
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* แสดงข้อผิดพลาด */}
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

                <Button className="btn-login" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"} {/* แสดงข้อความขณะ loading */}
                </Button>

                <div className="signup-link">
                    <p><Link to="/signup">สมัครสมาชิก</Link></p>
                </div>
            </Form>
        </div>
    );
}