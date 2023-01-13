import React from "react";

function ButtonAdd(props) {
    // state    

    // comportement
    const handleClick = () => {
        props.setShow(true);
    };

    // render
    return (
        <div className="flex flex-col items-center w-1/2">
                {props.show === false ? <button className="p-1 border-solid border-black border rounded-lg bg-[#BB9457] mb-3
                " onClick={handleClick}>Ajouter une tache</button> : null}
        </div>
    )
}

export default ButtonAdd;