import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Subscribe() {
    // state
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [passwordVerification, setPasswordVerification] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [firstname, setFirstname] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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

        axios.post(process.env.REACT_APP_API_LINK + '/api/subscribe', {
            "email": email,
            "password": password,
            "passwordVerification": passwordVerification,
            "lastname": lastname,
            "firstname": firstname,
        })
        .then((response) => {
            navigate("/login");
        })
        .catch((error) => {
            console.log(error);
            navigate("/");
        });
    }

    const checkToken = () => {
        axios.get(process.env.REACT_APP_API_LINK + '/api/checktoken', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
            navigate("/todolist");
        })
        .catch((error) => {
            
        })
    }

    useEffect(() => {
        checkToken();
    }, [localStorage.getItem('token')]);

    // render
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold">Todolist.com</h2>
            <form onSubmit={handleSubmitSubscribeForm} className="bg-[#99582A] h-auto lg:w-1/3 rounded-xl shadow-lg shadow-[#432818] flex flex-col items-center mt-32 md:w-2/3">
                <h2 className="text-center m-4 font-bold text-xl">Inscrivez-Vous</h2>

                <div className="flex flex-col w-3/4 h-3/4 justify-around">

                    <div className="flex flex-col">
                        <label className="mb-1 mt-4">Email</label>
                        <input type="email" required onChange={handleChangeEmail} value={email} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 mt-4">Mot de passe</label>
                        <input type="password" required onChange={handleChangePassword} value={password} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 mt-4">Confirmez le mot de passe</label>
                        <input type="password" required onChange={handleChangePasswordVerification} value={passwordVerification} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 mt-4">Nom</label>
                        <input type="text" required onChange={handleChangeLastname} value={lastname} className="rounded"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 mt-4">Prenom</label>
                        <input type="text" required onChange={handleChangeFirstname} value={firstname} className="rounded"/>
                    </div>
                    
                </div>
                
                <button type="submit" className="mt-4 p-2 border border-solid border-white bg-white rounded hover:shadow-inner hover:shadow-black">Inscription</button>
                <Link to="../login" className="m-4 hover:text-white">Déja un compte ? Connecter vous !</Link>
            </form>
        </div>
    )
}

export default Subscribe;