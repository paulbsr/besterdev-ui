import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [parenttask, setParenttask] = useState([]);

    return (
        <TaskContext.Provider value={{ parenttask, setParenttask }}>
            {children}
        </TaskContext.Provider>
    );
};