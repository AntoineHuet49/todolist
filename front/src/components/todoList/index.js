import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonAdd from "./buttonAdd";
import Modal from "../modal/modal";
import Task from "./task";
import ButtonLogout from "../logout/buttonLogout";
import DeleteModal from "../modal/deleteModal";

function TodoList() {
    // state
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    //task State
    const [taskToDelete, setTaskToDelete] = useState([]);
    

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

    const handleShowDeleteModal = (e) => {
        setShowDeleteModal(true);
    }

    // render
    return (
        <div className="flex items-center flex-col static">

            <ButtonLogout className="md:absolute self-end md:right-3 md:top-3" />

            <h1 className="text-3xl m-4">TodoList</h1>

            <ButtonAdd setShow={setShow} show={show} />

            {show ? <Modal 
            setShow={setShow} 
            setTasks={setTasks}
            tasks={tasks}
            /> : null}

            {showDeleteModal ? 
            <DeleteModal 
                taskToDelete={taskToDelete}
                tasks={tasks}
                setTasks={setTasks}
                setShowDeleteModal={setShowDeleteModal}
            />
            : null}

            {tasks.map((task) => 
                <Task key={task.id}
                    task={task} 
                    tasks={tasks}
                    setTasks={setTasks}
                    handleShowDeleteModal={handleShowDeleteModal}
                    setTaskToDelete={setTaskToDelete}
                />
            )}
        </div>
    )
}

export default TodoList;