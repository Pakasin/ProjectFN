import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Form, Row, Col, button, Button } from 'react-bootstrap';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // console.log(event.correntTarget);
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }
        setValidated(true);
    }

    const doLogin = async () => {
        // console.log("ตรวจสอบในฐานข้อมูล");
        const response = await fetch("http://localhost:8080/login",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,

                })
            }
        );
        const data = await response.json()
        console.log(data);
        if (data.result) {
            navigate("home", { replace: false });
        }
    };


    return (
        <Form noValidate validated={validated} onSubmit={onLogin}>
            <Row>
                <Form.Group>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder='Username'
                        onChange={(e) => { setUsername(e.target.value) }} >


                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        กรุณาป้อน Username ด้วย
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>


            <Row>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder='Password'
                        onChange={(e) => { setPassword(e.target.value) }} >

                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        กรุณาป้อน Password ด้วย
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>



            <Row>
                <Button type="submit"> Login </Button>
            </Row>
            <Row>
            <p><Link to="/signup">สมัครสมาชิก</Link></p>
            </Row>
        </Form>
    )
}