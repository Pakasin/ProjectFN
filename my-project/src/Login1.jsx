import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import md5 from 'md5';
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

    const getAuthenToken = async ()=>{
        const response = await fetch("http://localhost:8080/api/authen_request",
          {
            method:"POST",
            headers:{
              Accept:"application/json",
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              username: md5(username)
            })
          }
        );
        const data = await response.json();
        return data;
      };
    
    
      const getAcessToken = async (authToken)=>{
        var baseString = username + "&" + md5(password);
        var authenSignature = md5(baseString);
        const response = await fetch("http://localhost:8080/api/access_request",
          {
            method:"POST",
            headers:{
              Accept:"application/json",
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              auth_signature:authenSignature,
              auth_token:authToken
            })
          }
        );
        const data = await response.json();
        return data;
      };

      const doLogin = async() => {
        const data1 = await getAuthenToken();
        const authToken = data1.data.auth_token
        const data2 = await getAcessToken(authToken);
        console.log("zzz");
        console.log(authToken);
        localStorage.setItem("access_token",data2.data.access_token);
        localStorage.setItem("user_id",data2.data.account_info.user_id);
        localStorage.setItem("user_name",data2.data.account_info.user_name);
        localStorage.setItem("first_name",data2.data.account_info.first_name);
        localStorage.setItem("last_name",data2.data.account_info.last_name);
        localStorage.setItem("email",data2.data.account_info.email);
        localStorage.setItem("role_id",data2.data.account_info.role_id);
        localStorage.setItem("role_name",data2.data.account_info.role_name);
        console.log("setitem");
        console.log(localStorage.getItem("user_id"));
        console.log(localStorage.getItem("access_token"));
        navigate("home",{replace:false});
      }
      
    // const doLogin = async () => {
    //     const response = await fetch("http://localhost:8080/login", {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //         })
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     if (data.result) {
    //         navigate("home", { replace: false });
    //     }
    // };

    return (
      <div className="login-page">
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
      </div>
  );
  
}