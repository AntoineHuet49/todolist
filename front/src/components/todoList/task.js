import axios from "axios";
import React, { useState } from "react";
import ButtonDelete from "./buttonDelete";
import ButtonEdit from "./buttonEdit";

function Task(props) {
    // state
    const [showInput, setShowInput] = useState(false);
    const [task, setTask] = useState(props.task);
    const [taskEdited, setTaskEdited] = useState(task);

    const token = localStorage.getItem('token');
    
    // function
    const toggleShowInput = () => {setShowInput(showInput => !showInput)};

    const handleChangeInputEdit = (e) => {
        setTaskEdited(e.target.value);
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        const taskId = task.id;

        axios.put(process.env.REACT_APP_API_LINK + '/api/tasks/' + taskId, {
            body: taskEdited,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            toggleShowInput();
            setTask(response.data);

            setTaskEdited(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleBlurEditInput = (e) => {
        setShowInput(false);
    }

    const handleDeleteTask = (e) => {
        props.setTaskToDelete(task)
        props.handleShowDeleteModal()
    }

    return (
            <div className="flex w-3/4 border justify-center border-black border-solid rounded h-auto items-center my-3">
                <div className="grow break-all">
                    {showInput ? 
                    <form onSubmit={handleSubmitEdit} className="grow h-full rounded-l-sm flex" >
                        <input id="editInput" value={taskEdited.body} onChange={handleChangeInputEdit} onBlur={handleBlurEditInput} className="p-2 w-full grow h-full rounded-l-sm text-center" autoFocus /> 
                        <button type="submit" className="bg-white border-l border-solid border-black px-1"><span className="material-symbols-outlined">done</span></button>
                    </form>
                    : <p className="block flex-wrap text-center p-2 w-full">{task.body}</p>}
                </div>
                
                <div className="flex h-fit grow-0">
                    <ButtonEdit toggleShowInput={toggleShowInput} />
                    <ButtonDelete 
                        handleDeleteTask={handleDeleteTask}
                    />
                </div>
            </div>
        )
}

export default Task;