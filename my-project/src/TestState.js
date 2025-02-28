import { useState } from "react";

export default function TestHello() {
    const [username, setUsername] = useState('');
    const [digit, setDigit] = useState(1);

    return (
        <>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            />
    
            <h1>Your username is {username}</h1>
            <h1>Your number is {digit}</h1>
    
            <input 
                type="button"
                value="เพิ่มค่า"
                onClick={() => setDigit(digit + 1)} 
            />
    
            <input 
                type="button"
                value="ลดค่า"
                onClick={() => setDigit(digit - 1)} 
            />
        </>
    );
}
