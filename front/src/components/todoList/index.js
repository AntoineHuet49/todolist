import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonAdd from "../addTask/buttonAdd";

function TodoList() {
    // state
    const [task, setTask] = useState([]);

    // comportement
    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
        .then((response) => {
            setTask(response.data.tasks);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    // render
    return (
        <div className="flex items-center flex-col">
            <h1 className="text-3xl">TodoList</h1>
            <ButtonAdd />
            {task.map((task) => 
            <div key={task.id} className="flex justify-center w-3/4 border border-black border-solid rounded h-8 items-center my-3">
                <p className="grow text-center">{task.body}</p>
                <div className="flex h-full">
                    <button className="px-2 block h-full border-l border-black">edit</button>
                    <button className="px-2 block h-full border-l border-black">delete</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default TodoList;