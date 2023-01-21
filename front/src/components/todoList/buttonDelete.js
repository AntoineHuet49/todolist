import axios from "axios";
import React from "react";

function ButtonDelete(props) {
    // state
    const token = localStorage.getItem('token');

    // function
    const handleClickDelete = (e) => {
        const taskId = props.task.id;

        axios.delete('http://localhost:8080/api/tasks/' + taskId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {})
        .catch((error) => {
            console.log(error);
        })

        const filterdTasks = props.tasks.filter((task) => task.id !== taskId);

        props.setTasks(filterdTasks);
    }

    // render
    return (
        <button onClick={handleClickDelete} className="px-2 block h-full border-l border-black"><span className="material-symbols-outlined">delete</span></button>
    );
}

export default ButtonDelete;