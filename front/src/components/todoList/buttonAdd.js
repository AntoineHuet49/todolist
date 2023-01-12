import axios from "axios";
import React, { useState, useEffect } from "react";

function ButtonAdd() {
    // state
    const [show, setShow] = useState(false);
    const [newTask, setNewTask] = useState([]);

    // comportement
    const handleClick = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleNewTask = (e) => {
        setNewTask(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/tasks', {
            body: newTask
        })
        .then((response) => {
            console.log(response);
            setShow(false);
            setNewTask('');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // Modal
    const Modal = () => {
        return (
        <div className="w-full border border-solid border-black mt-2 rounded-xl">
            <div className="flex m-2 justify-between border-b border-solid border-black">
                <h2 className="text-center self-center block">Nouvelle tache</h2>
                <button className="self-center" onClick={handleClose}><span class="material-symbols-outlined">close</span></button>
            </div>
            <form className="flex justify-center mb-2" onSubmit={handleSubmit}>
                <input className="w-3/4 border border-solid border-black rounded-lg"
                    autoFocus
                    value={newTask}
                    onChange={handleNewTask}
                />
                <button type="submit" className=""><span class="material-symbols-outlined">done</span></button>
            </form>
        </div>)
    }

    // render
    return (
        <div className="flex flex-col items-center w-1/2">
            <div>
                {show === false ? <button className="p-1 border-solid border-black border rounded-lg bg-[#BB9457]" onClick={handleClick}>Ajouter une tache</button> : null}
            </div>
                {show ? <Modal /> : null}
        </div>
    )
}

export default ButtonAdd;