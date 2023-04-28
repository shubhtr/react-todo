import React, { useEffect, useRef, useState } from "react";
import Toast from "./Toast";


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newName.trim()) {
            setToastMsg('No changes were made');
            setShowToast(true);
            return;
        }
        console.log(props);
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);

        setToastMsg('Changes saved');
        setShowToast(true);
    }

    const editingTemplate = (
        <form style={styles.formStyle} onSubmit={handleSubmit}>
            <div style={styles.inputDiv}>
                <input
                    id={props.id}
                    type="text"
                    value={newName || props.name}
                    onChange={handleChange}
                    ref={editFieldRef}
                    style={styles.input}
                />
            </div>

            <div style={styles.rightDiv}>
                <button type="button" onClick={() => setEditing(false)}>&nbsp;Cancel&nbsp;</button>
                &nbsp;&nbsp;
                <button type="submit">&nbsp;Save&nbsp;</button>
            </div>
        </form>
    );

    const viewTemplate = (
        <>
            <div style={styles.labelDiv}>
                <label style={styles.label} htmlFor={props.id}>{props.name}</label>
            </div>

            <div style={styles.rightDiv}>
                <button type="button" onClick={() => setEditing(true)} ref={editButtonRef}>&nbsp;Edit&nbsp;</button>
                &nbsp;&nbsp;
                <button type="button" onClick={() => props.deleteTask(props.id)}>&nbsp;Remove&nbsp;</button>
            </div>
        </>
    );


    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);


    return (
        <>
            <li style={styles.liStyle}>{isEditing ? editingTemplate : viewTemplate}</li>

            {
                showToast && <Toast message={toastMsg} setShowToast={setShowToast}/>
            }
        </>
    );
};

const styles = {
    liStyle: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: '15px'
    },

    formStyle: {
        width: '100%',
    },

    label: {
        width: '75%',
        display: 'inline-block'
    },
    labelDiv: {
        width: '75%'
    },

    input: {
        width: '100%',
        display: 'inline-block'
    },
    inputDiv: {
        width: '100%'
    },
};

export default Todo;
