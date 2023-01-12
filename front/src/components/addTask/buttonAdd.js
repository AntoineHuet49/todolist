import React, { useState, useEffect } from "react";

function ButtonAdd() {
    // state
    const [show, setShow] = useState(false);
    // comportement
    const handleClick = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    // Modal
    const Modal = () => {
        return (
        <div show={show}>
            <div>
                <h2>Nouvelle tache</h2>
                <button onClick={handleClose}>close</button>
            </div>
        </div>)
    }

    // render
    return (
        <div>
            <button onClick={handleClick}>Ajouter une tache</button>
            {show ? <Modal /> : null}
        </div>
    )
}

export default ButtonAdd;