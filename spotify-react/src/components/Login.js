import React from 'react';
import './Login.css';
import { loginUrl } from '../spotify';

const Login = () => {
    return (
        <div className="login">
            <img
                src="https://i.pinimg.com/originals/46/2e/87/462e8760149728015a5e671e05becc6d.gif"
                alt=""
            />
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login;
