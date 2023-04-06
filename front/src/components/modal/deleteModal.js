import axios from "axios";
import React from "react";

function DeleteModal (props) {
    //state
    const token = localStorage.getItem('token');

    //function
    const handleClickDelete = (e) => {
        const taskId = props.taskToDelete.id;

        axios.delete(process.env.REACT_APP_API_LINK +'/api/tasks/' + taskId, {
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

        props.setShowDeleteModal(false);
    }

    const handleHiddenDeleteModal = () => {
        props.setShowDeleteModal(false);
    }

    //render
    return (
        <div className="absolute w-full h-screen bg-black bg-opacity-50 flex justify-center">
            <div className="w-2/3 lg:w-1/3 text-center absolute opacity-100 top-1/3 bg-[#BB9457] p-2 rounded border-black border border-solid shadow-md shadow-black">
                <p className="mt-4">Êtes vous sûr de vouloir supprimer cette tâche ?</p>
                <div className="flex justify-around m-8">
                    <button onClick={handleClickDelete} className="w-1/4 bg-green-600 p-2 border border-solid border-black rounded">Oui</button>
                    <button onClick={handleHiddenDeleteModal} className="w-1/4 bg-red-600 p-2 border border-solid border-black rounded">Non</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;