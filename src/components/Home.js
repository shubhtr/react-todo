import React, { useState, useRef, useEffect } from "react";
import Toast from "./Toast";
import Form from "./Form";
import Todo from "./Todo";


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function Home(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks
        .map((task) => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    function addTask(name) {
        const newTask = { id: "t" + Date.now(), name: name };
        setTasks([...tasks, newTask]);

        setToastMsg("New task added");
        setShowToast(true);
    }

    const headingText = `Total: ${taskList.length}`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <>
            <div style={styles.container}>

                <h1>ToDo</h1>

                <br /><br />

                <div style={styles.containerInner}>
                    <Form addTask={addTask} />
                    <br />
                    <h3 tabIndex="-1" ref={listHeadingRef}>
                        {headingText}
                    </h3>
                    <br />
                    <ul style={styles.list}>
                        {taskList}
                    </ul>
                </div>

            </div>

            {
                showToast && <Toast message={toastMsg} setShowToast={setShowToast} />
            }
        </>
    );
};

const styles = {
    container: {
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        border: '1px solid blue',
        paddingTop: '5%',
        paddingLeft: '35%',
        paddingRight: '35%',
        height: '99.7vh',
    },

    containerInner: {
        textAlign: 'left',
        justifyContent: 'left',
        borderRadius: '5px',
    },

    task: {
        boxShadow: '2px 2px 2px 2px #888888',
    },

    list: {
        listStyleType: 'none',
    }
};


export default Home;
