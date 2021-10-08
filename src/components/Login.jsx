import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";
import {loginAdmin} from '../thunk/index'
// import {login} from '../services/login'
import '../styles/Login.css';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const handleLogin = () => {
        let admin = {
            userName: email,
            password: password
        }
        props.auth(admin)
        history.push('/adminPage')
    }

    return (
        <div className="loginContainer">
            <div className="loginBlock">
                <div>
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <p>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Log in</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin : state.admin
});

const mapDispatchToProps = (dispatch ) => ({
    auth: (data) => {dispatch(loginAdmin(data))},
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

