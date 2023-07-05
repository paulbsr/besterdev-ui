import React, { useState } from 'react'

const AlertContext = React.createContext({
    alertStatus: null,
    alertMessage: null,
    success: () => {},
    error: () => {},
    warning: () => {},
});

const STATES ={
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
};

const AlertProvider = (props) => {
    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const success = (text) => {
        setAlertMessage(text);
        setAlertStatus(STATES.SUCCESS);
    }

    const error = (text) => {
        setAlertMessage(text);
        setAlertStatus(STATES.ERROR)
    }

    const warning = (text) => {
        setAlertMessage(text)
        setAlertStatus(STATES.WARNING)
    }

    const clear = () => {
        setAlertMessage("")
        setAlertStatus("")
    }

    return(
        <AlertContext.Provider value={{success,error,warning,clear,alertStatus,alertMessage}}>{props.children}</AlertContext.Provider>
    )
}

export { AlertProvider };
export default AlertContext;
