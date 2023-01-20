import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Subscribe() {
    // state
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [passwordVerification, setPasswordVerification] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [firstname, setFirstname] = useState([]);

    // function
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangePasswordVerification = (e) => {
        setPasswordVerification(e.target.value)
    }

    const handleChangeLastname = (e) => {
        setLastname(e.target.value)
    }

    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value)
    }

    const handleSubmitSubscribeForm = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/subscribe', {
            "email": email,
            "password": password,
            "passwordVerification": passwordVerification,
            "lastname": lastname,
            "firstname": firstname,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // render
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold">Todolist.com</h2>
            <form onSubmit={handleSubmitSubscribeForm} className="bg-[#99582A] h-1/2 w-1/3 rounded-xl shadow-lg shadow-[#432818] flex flex-col items-center mt-32">
                <h2 className="text-center m-4 font-bold text-xl">Inscrivez-Vous</h2>

                <div className="flex flex-col w-3/4 h-3/4 justify-around">

                    <div className="flex flex-col">
                        <label className="mb-2">Email</label>
                        <input type="email" required onChange={handleChangeEmail} value={email} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2">Mot de passe</label>
                        <input type="password" required onChange={handleChangePassword} value={password} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2">Confirmez le mot de passe</label>
                        <input type="password" required onChange={handleChangePasswordVerification} value={passwordVerification} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2">Nom</label>
                        <input type="text" required onChange={handleChangeLastname} value={lastname} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2">Prenom</label>
                        <input type="text" required onChange={handleChangeFirstname} value={firstname} className="rounded"/>
                    </div>
                    
                </div>
                
                <button type="submit" className="mt-1 p-2 border border-solid border-white bg-white rounded hover:shadow-inner hover:shadow-black">Inscription</button>
                <Link to="../login" className="m-4 hover:text-white">Déja un compte ? Connecter vous !</Link>
            </form>
        </div>
    )
}

export default Subscribe;