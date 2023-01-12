import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonAdd from "./buttonAdd";
import ButtonEdit from "./buttonEdit";
import Modal from "./modal";

function TodoList() {
    // state
    const [task, setTask] = useState([]);
    const [show, setShow] = useState(false);

    // comportement
    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
        .then((response) => {
            setTask(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [task]);

    // render
    let props = {
        stateChanger: setTask,
        show: show
    }

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-3xl m-4">TodoList</h1>
            <ButtonAdd {...props} />
            {show ? <Modal /> : null}
            {}
            {task.map((task) => 
            <div key={task.id} className="flex justify-center w-3/4 border border-black border-solid rounded h-8 items-center my-3">
                <p className="grow text-center">{task.body}</p>
                <div className="flex h-full">
                    <ButtonEdit />
                    <button className="px-2 block h-full border-l border-black"><span class="material-symbols-outlined">delete</span></button>
                </div>
            </div>
            )}
        </div>
    )
}

export default TodoList;