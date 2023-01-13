import React from "react";

function ButtonEdit(props) {
    // state

    // comportement
    const handleClickEdit = (e) => {
        props.toggleShowInput()
    }

    // render
    return (
        <button onClick={handleClickEdit} className="px-2 block h-full border-l border-black"><span className="material-symbols-outlined">edit</span></button>
    )
}

export default ButtonEdit;