import React, { useContext, useState } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import { getToken, getRandomQues } from '../CodeEditor/service';

const Login = () => {
    const [hidden, setHidden] = useState(true)
    const navigate = useNavigate()
    const register = () => {

    }

    const login = async () => {
        let queue = getRandomQues(0,9)    
        if(!sessionStorage.getItem("queue")){
         await sessionStorage.setItem("queue", queue)
        }
        navigate("main")
    }

    const toRegister = () => {
        setHidden(false)
    }

    const toLogin = () => {
        setHidden(true)
    }
    return (
        <div className="loginContainer">
            <div className="form-box">
                <div className={hidden ? "register-box hidden" : "register-box"}>
                    <h1>register</h1>
                    <input type="text" placeholder="username"></input>
                    <input type="email" placeholder="email"></input>
                    <input type="password" placeholder="password"></input>
                    <input type="password" placeholder="confirm your password"></input>
                    <button onClick={register}>register</button>
                </div>
                <div className={hidden ? "login-box" : "login-box hidden"}>
                    <h1>login</h1>
                    <input type="text" placeholder="username"></input>
                    <input type="password" placeholder="password"></input>
                    <button onClick={login}>login</button>
                </div>
            </div>
            <div className={hidden ? "hidden" : "con-box right-box"}>
                <h2>welcome</h2>
                <p>code test</p>
                <p>already have an account? </p>
                <button id="login" onClick={toLogin}>login</button>
            </div>
            <div className={hidden ? "con-box right-box" : "hidden"}>
                <h2>welcome</h2>
                <p>code test</p>
                <p>don't have an account? </p>
                <button id="register" onClick={toRegister}>register</button>
            </div>
        </div>
    )
}

export default Login;