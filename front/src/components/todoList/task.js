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

        axios.put('http://localhost:8080/api/tasks/' + taskId, {
            body: taskEdited,
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

    return (
            <div className="flex justify-center w-3/4 border border-black border-solid rounded h-8 items-center my-3">

                {showInput ? 
                <form onSubmit={handleSubmitEdit} className="grow h-full rounded-l-sm flex" >
                    <input id="editInput" value={taskEdited.body} onChange={handleChangeInputEdit} onBlur={handleBlurEditInput} className="grow h-full rounded-l-sm text-center" autoFocus /> 
                    <button type="submit" className="bg-white border-l border-solid border-black px-1"><span className="material-symbols-outlined">done</span></button>
                </form>
                : <p className="grow text-center">{task.body}</p>}
                
                <div className="flex h-full">
                    <ButtonEdit toggleShowInput={toggleShowInput} />
                    <ButtonDelete 
                        task={task} 
                        setTask={setTask} 
                        tasks={props.tasks}
                        setTasks={props.setTasks}
                    />
                </div>
            </div>
        );
}

export default Task;