import React from "react";
import './login.css'

const Login = () => {
    return (
        <body>
        <div className="loginContainer">
            <div className="form-box">
                <div className="register-box hidden">
                    <h1>register</h1>
                    <input type="text" placeholder="username"></input>
                    <input type="email" placeholder="email"></input>
                    <input type="password" placeholder="password"></input>
                    <input type="password" placeholder="confirm your password"></input>
                    <button>register</button>
                </div>
                <div className="login-box">
                    <h1>login</h1>
                    <input type="text" placeholder="username"></input>
                    <input type="password" placeholder="password"></input>
                    <button>login</button>
                </div>
            </div>
            <div className="con-box left-box">
                <h2>welcome</h2>
                <p>code test</p>
                <p>already have an account? </p>
                <button id="login">login</button>
            </div>
            <div className="con-box right-box">
                <h2>welcome</h2>
                <p>code test</p>
                <p>don't have an account? </p>
                <button id="register">register</button>
            </div>
        </div>
        </body>
    )
}

export default Login;