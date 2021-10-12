import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { login } from '../services/index'
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emptyInput, setEmptyInput] = useState(false);
    const [wrongCred, setWrongCred ] = useState(false);

    let history = useHistory();

    const handleLogin = async() => {
        if(!email || !password){
            return setEmptyInput(true)
        }
        let admin = {
            userName: email,
            password: password
        }
        const res = await login(admin);
        if(!res){
           return setWrongCred(true)
        }else{
            localStorage.setItem("token", res);
            history.push('/adminPage')
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginBlock">
                <div>
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="type your email here..." className="emailInput" />
                </div>
                <div>
                    <p>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="type your password here..." className="passwordInput" type="password" />
                </div>
                <button onClick={handleLogin} className="loginButton" >Log in</button>
                {emptyInput && (!email || !password) ? <div className="loginError">Email and password are requared fields</div> : null }
                {wrongCred ? <div className="loginError">Such user doesn't exist. Check your credentials</div> : null }
            </div>
        </div>
    )
}

export default Login
