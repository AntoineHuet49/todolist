import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "./modal";

function ButtonAdd({stateChanger, show}) {
    // state    

    // comportement
    const handleClick = () => {
        stateChanger(true);
    };

    // render
    return (
        <div className="flex flex-col items-center w-1/2">
                {show === false ? <button className="p-1 border-solid border-black border rounded-lg bg-[#BB9457]" onClick={handleClick}>Ajouter une tache</button> : null}
        </div>
    )
}

export default ButtonAdd;