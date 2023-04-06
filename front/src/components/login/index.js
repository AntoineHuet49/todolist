import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    // state
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [showErrorMessage, setShowErrorMessage] = useState([false]);

    const navigate = useNavigate();
    // function
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmitLoginForm = (e) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_LINK + '/api/login_check', {
            "username": email,
            "password": password
        })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            navigate("/todolist");
        })
        .catch((error) => {
            setShowErrorMessage(true);
            navigate('/login');
        })
    }

    //render
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold">Todolist.com</h2>
        {showErrorMessage === true ?
        <div className="bg-red-700 p-2 rounded border-solid border border-black absolute top-1/3">
            <p>L'email ou le mot de passe ne sont pas correct</p>
        </div>
        : null }
            <form onSubmit={handleSubmitLoginForm} className="bg-[#99582A] h-1/3 w-1/3 rounded-xl shadow-lg shadow-[#432818] flex flex-col items-center mt-32">
                <h2 className="text-center m-4 font-bold text-xl">Connexion</h2>

                <div className="flex flex-col w-3/4 h-3/4 justify-around">

                    <div className="flex flex-col">
                        <label className="mb-2">Email</label>
                        <input type="email" required onChange={handleChangeEmail} value={email} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2">Mot de passe</label>
                        <input type="password" required onChange={handleChangePassword} value={password} className="rounded"/>
                    </div>

                </div>
                
                <button type="submit" className="mt-1 p-2 border border-solid border-white bg-white rounded hover:shadow-inner hover:shadow-black">Connexion</button>
                <Link to="../" className="m-4 hover:text-white">Pas de compte ? Inscrivez-vous !</Link>
            </form>
        </div>
    );
}

export default Login;