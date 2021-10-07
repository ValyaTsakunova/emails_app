import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const handleLogin = () => {
        history.push('/adminPage')
    }

    return (
        <div className="loginContainer">
            <div>
                <div><p>Email </p><input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><p>Password </p><input value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <button onClick={handleLogin}>Log in</button>
            </div>
        </div>
    )
}

export default Login
