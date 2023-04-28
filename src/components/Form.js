import React, { useState } from "react";


function Form({ addTask }) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            return;
        }
        addTask(name);
        setName("");
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>

            <div style={styles.container}>
                <input
                    type="text"
                    style={styles.inputTxt}
                    name="text"
                    autoComplete="off"
                    value={name}
                    onChange={handleChange}
                />

                <button style={styles.btn} type="submit">
                    Add
                </button>
            </div>

        </form>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

    inputTxt: {
        paddingLeft: '5px',
        paddingRight: '5px',
        marginRight: '10px',
        width: '90%'
    },

    btn: {
        height: '10%',
        width: '20%'
    }
};


export default Form;
