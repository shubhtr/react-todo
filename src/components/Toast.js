import { useEffect } from 'react';


function Toast({ message, setShowToast }) {
    let timeoutId = null;

    useEffect(() => {
        //remove previous timeout if any
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        // create a timeout to remove it
        timeoutId = setTimeout(() => {
            setShowToast(false);
        }, 3000);

        // cleanup
        return () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        }
    }, []);

    return (
        <div style={styles.snackbar}>
            {message}
        </div>
    );
};

const styles = {
    snackbar: {
        display: 'block',
        minWidth: "250px",
        marginLeft: "-125px",
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "16px",
        position: "fixed",
        zIndex: "1",
        left: "50%",
        bottom: "30px",
        fontSize: "17px",
        borderRadius: "10px",
        opacity: '30%',
    },
};

export default Toast;
