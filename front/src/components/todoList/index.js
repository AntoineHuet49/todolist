import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonAdd from "./buttonAdd";
import Modal from "./modal";
import Task from "./task";
import ButtonLogout from "../logout/buttonLogout";

function TodoList() {
    // state
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);

    const token = localStorage.getItem('token')

    // comportement
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_LINK + '/api/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setTasks(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    // render
    return (
        <div className="flex items-center flex-col static">

            <ButtonLogout className="absolute right-3 top-3" />

            <h1 className="text-3xl m-4">TodoList</h1>

            <ButtonAdd setShow={setShow} show={show} />

            {show ? <Modal 
            setShow={setShow} 
            setTasks={setTasks}
            tasks={tasks}
            /> : null}

            {tasks.map((task) => 
                <Task key={task.id}
                    task={task} 
                    tasks={tasks}
                    setTasks={setTasks}    
                />
            )}

        </div>
    )
}

export default TodoList;