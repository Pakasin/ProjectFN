const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = 8080;
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const md5 = require('md5');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-badminton-shop'
});

app.get('/getusers/:userID', (req, res) => {
    const userID = req.params.userID;
    pool.query("SELECT * FROM users WHERE user_id = ?", [userID], function (error, results, fields) {
        if (error) {
            console.error(error);
            return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
        }
        res.json(results);
    });
});

app.get('/users', (req, res) => {
    pool.query("SELECT * FROM users", function (error, results, fields) {
        console.log("supergirl");
        if (error) {
            console.error(error);
            return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
        }
        res.json(results);
    });
});

app.get('/getusersbyname/:userID', (req, res) => {
    const userID = req.params.userID;
    pool.query("SELECT * FROM users WHERE first_name = ?", [userID], function (error, results, fields) {
        if (error) {
            console.error(error);
            return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
        }
        res.json(results);
    });
});

app.post('/add_users', (req, res) => {
    const input = req.body;

    if (!input.user_name || !input.user_pwd || !input.first_name || !input.last_name || !input.email) {
        return res.status(400).json({ result: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    pool.query(
        "INSERT INTO users (user_name, user_pwd, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)",
        [
            input.user_name,
            md5(input.user_pwd || ""),
            input.first_name,
            input.last_name,
            input.email
        ],
        function (error, results, fields) {
            if (error) {
                console.error(error);
                return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
            }
            res.json({ result: true, message: "สมัครสมาชิกสำเร็จ" });
        }
    );
});

app.post('/add_usersdelete', (req, res) => {
    const input = req.body;
    pool.query(
        "DELETE FROM users WHERE user_name = ?",
        [input.user_name],
        function (error, results, fields) {
            if (error) {
                console.error(error);
                return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
            }
            res.json(results);
        }
    );
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ result: false, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
    }

    console.log("Login Request: ", username, password);

    pool.query(
        "SELECT * FROM users WHERE user_name = ? AND user_pwd = ?",
        [username, md5(password || "")],
        function (error, results, fields) {
            if (error) {
                console.error(error);
                return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
            }
            if (results.length > 0) {
                res.json({ result: true, message: "ล็อกอินสำเร็จ" });
            } else {
                res.json({ result: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
            }
        }
    );
});


app.post('/Signup1', (req, res) => {
    const { user_name, user_pwd, first_name, last_name, email } = req.body;

    if (!user_name || !user_pwd || !first_name || !last_name || !email) {
        return res.status(400).json({ result: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const hashedPassword = md5(user_pwd || ""); // ป้องกัน undefined

    pool.query(
        "SELECT * FROM users WHERE user_name = ?",
        [user_name],
        function (error, results) {
            if (error) {
                return res.status(500).json({ result: false, message: "เกิดข้อผิดพลาด" });
            }
            if (results.length > 0) {
                return res.status(400).json({ result: false, message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
            }
            // ถ้าไม่มี user อยู่แล้ว ให้เพิ่มเข้าไป
            pool.query(
                "INSERT INTO users (user_name, user_pwd, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)",
                [user_name, hashedPassword, first_name, last_name, email],
                function (insertError, insertResults) {
                    if (insertError) {
                        return res.status(500).json({ result: false, message: "สมัครสมาชิกไม่สำเร็จ" });
                    }
                    res.json({ result: true, message: "สมัครสมาชิกสำเร็จ" });
                }
            );
        }
    );
});

app.post("/api/authen_request",(req,res)=>{
    const sql = "select * from users where md5(user_name) = ?";
    pool.query(sql,[req.body.username],(error,results)=>{
      var response;
      if (error){
        response = {
          result:false,
          message:error.message
        }
      } else {
          if (results.length){
            var payload = {username:req.body.username};
            var secretKey = "MySecretKey";
            const authToken = jwt.sign(payload,secretKey);
            console.log("display");
            console.log(payload);
            console.log(secretKey);
            console.log(authToken);
            console.log(jwt.decode(authToken));
            response = {
              result:true,
              data: {
                auth_token : authToken
              }
            }
        } else {
             response = {
              result:false,
              message: "username ไม่ถูกต้อง",
              data: { auth_token : "No token" }
            } 
        }
      }
      res.json(response);
    });
});

app.post("/api/access_request",(req,res)=>{
    const authenSignature= req.body.auth_signature;
    const authToken = req.body.auth_token;
    
    console.log(authenSignature);
    var decoded = jwt.verify(authToken,"MySecretKey");
    console.log("decoded");
    console.log(decoded)
    if (decoded) {
      const sql = "select a.user_id,a.user_name,a.first_name,a.last_name,a.email,a.role_id,b.role_name"
       + " from users a join roles b on a.role_id = b.role_id where md5(concat(user_name,'&',user_pwd)) = ?";
    pool.query(sql,[authenSignature],(error,results)=>{
      var response;
      if (error){
        console.log("cccc");
        console.log(error.message);
        console.log("dddd");
        response = {
          result:false,
          message:error.message
        }
      } else {
          console.log("bbb");
          if (results.length){
            var payload = {user_id:results[0].user_id, user_name:results[0].user_name,
              first_name:results[0].first_name, last_name:results[0].last_name,
              email:results[0].email, 
              role_id:results[0].role_id, role_name:results[0].role_name 
            };
            var secretKey = "MysecretKey";
            const accessToken = jwt.sign(payload,secretKey);
            response = {
              result:true,
              data: {
                access_token: accessToken, account_info:payload
              }
            }
          } else {
             response = {
              result:false,
              message: "username password ไม่ถูกต้อง",
              data: {
                access_token : "No access token"
              }
             } 
          }
      }
  
      res.json(response);
    });
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
