import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonLogout(props) {
    // state
    const navigate = useNavigate();

    // function
    const handleClickButtonLogout = (e) => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    // render
    return (
        <button onClick={handleClickButtonLogout} className={props.className + " p-1 border-solid border-black border rounded-lg bg-[#BB9457] m-3"}>Déconnexion</button>
    )
}

export default ButtonLogout;