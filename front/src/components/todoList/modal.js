import axios from "axios";
import React, { useState } from "react";

function Modal({stateChanger}) {
    // state
    const [newTask, setNewTask] = useState([]);

    // comportement
    const handleClose = () => {
        stateChanger(false);
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
            stateChanger(false);
            setNewTask('');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // render
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
        </div>
    )
}

export default Modal;