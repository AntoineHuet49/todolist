import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonAdd from "./buttonAdd";
import Modal from "./modal";
import Task from "./task";

function TodoList() {
    // state
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);

    // comportement
    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
        .then((response) => {
            setTasks(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    // render
    return (
        <div className="flex items-center flex-col">
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