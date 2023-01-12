import React, { useState } from "react";

function TodoList() {
    // state
    const [task, setTask] = useState([
        {id: 1, task: "laver la vaiselle"},
        {id: 2, task: "Vider les poubelles"},
        {id: 3, task: "sortir le chien"}
    ]);

    // comportement

    // render
    return (
        <div className="flex items-center flex-col">
            <h1 className="text-3xl">TodoList</h1>
            {task.map((task) => 
            <div className="flex justify-center w-3/4 border border-black border-solid rounded h-8 items-center my-3">
                <p className="grow text-center">{task.task}</p>
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