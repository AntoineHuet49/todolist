import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ButtonDelete from "./buttonDelete";
import ButtonEdit from "./buttonEdit";

/**
 *  Affichage d'une tache
 *
 * @param {*} props
 * @return {*} 
 */
function Task(props) {
    /**
     * * State
     */
    const [showInput, setShowInput] = useState(false);
    const [task, setTask] = useState(props.task);
    const [taskEdited, setTaskEdited] = useState(task);

    const token = localStorage.getItem('token');

    const validBtn = useRef();
    const validSpan = useRef();
    const editForm = useRef();

    const editFormulaire = document.getElementById('edit__form')

    /**
     * * Function
     */
    const handleShowInputTrue = () => {
        setShowInput(true);
        document.addEventListener('mouseup', handleBlurForm);
    };

    // useEffect(() => {
    //     if (showInput) {


    //         // editForm.current.addEventListener('blur', handleBlurForm);
    //     }
    // }, [showInput]);

    const handleBlurForm = (e) => {
        console.log(e.target);
        console.log(validBtn.current);

        if (e.target !== validBtn.current && e.target !== validSpan.current) {
            setShowInput(false);
            document.removeEventListener('mouseup', handleBlurForm);
        }
    }

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
            setShowInput(false);
            setTask(response.data);

            setTaskEdited(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDeleteTask = (e) => {
        props.setTaskToDelete(task)
        props.handleShowDeleteModal()
    }

    return (
            <div className="flex w-3/4 border justify-center border-black border-solid rounded h-auto items-center my-3">
                <div className="grow break-all">
                    {showInput ? 
                    <form id="edit__form" ref={editForm} onSubmit={handleSubmitEdit} className="grow h-full rounded-l-sm flex" >
                        <input value={taskEdited.body} onChange={handleChangeInputEdit} className="p-2 w-full grow h-full rounded-l-sm text-center" autoFocus /> 
                        <button ref={validBtn} type="submit" className="border-l border-solid border-black px-1"><span ref={validSpan} className="material-symbols-outlined w-full">done</span></button>
                    </form>
                    : <p className="block flex-wrap text-center p-2 w-full">{task.body}</p>}
                </div>
                
                {showInput === false ? 
                <div className="flex h-fit grow-0">
                    <ButtonEdit 
                        handleShowInputTrue={handleShowInputTrue}
                    />
                    <ButtonDelete 
                        handleDeleteTask={handleDeleteTask}
                    />
                </div>
                : null}
            </div>
        )
}

export default Task;