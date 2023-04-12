import React from "react";

function ButtonEdit(props) {
    // state

    // comportement
    const handleClickEdit = (e) => {
        props.handleShowInputTrue()
    }

    // render
    return (
        <button onClick={handleClickEdit} id="edit__button" className="px-2 block h-full border-l border-black"><span id="edit__span" className="material-symbols-outlined">edit</span></button>
    )
}

export default ButtonEdit;