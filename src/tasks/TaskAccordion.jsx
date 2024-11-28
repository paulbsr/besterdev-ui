import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCreate from "./TaskCreate";
import Task from "./Task";
import "./Fonts.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaTasks } from "react-icons/fa";
import GradientLineRusty from "./GradientLineRusty";
import TaskEdit from "./TaskEdit";


// function TaskAccordion({asms_number, project_handle, ppm_id,}) {
    function TaskAccordion({props}) {
    
    const [checkForRecords, setCheckForRecords] = useState(true); // update this value to be the opposite of its current value, every time a new CR is added
    const [isExpanded, setExpanded] = useState(false);
    const [parenttask, setParenttask] = useState([]);
    const [error, setError] = useState(null);
    const [isExpanded_1, setExpanded_1] = useState(false);
    const [open, setOpen] = useState(false);    
    
    const toggleAccordion = () => {
        setExpanded(!isExpanded);
    };
    

    
    const doneList = parenttask
        .filter((status) => status.taskstatus === "DONE")
        .sort((a, b) =>
            a.tasks[0].date.join(":") > b.tasks[0].date.join(":") ? -1 : 1
        );
    
   
    
    const toggleAccordion_1 = () => 
    {
        setExpanded_1(!isExpanded_1);
    };



        useEffect(() => {
            axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/asms/${asms_number}`)
                .then((response) => {
                    setParenttask(response.data.sort((a, b) => b.id - a.id));
                    setCheckForRecords(!checkForRecords);
                    setError(null);
                })
                .catch(setError);
        },
            // [checkForRecords]
        );
        if (error) return <p>An error in TaskAccordion occurred</p>;

    
    return (
        <>
            <div>
                <div onClick={toggleAccordion_1}>
                    &nbsp; &nbsp;
                    <FaTasks
                        style={{ color: "#336791", fontSize: "30px", cursor: "pointer" }}
                    />
                    &nbsp;
                    <b>
                        <a className="Font-Verdana-Medium-Postgres">
                            &nbsp; Tasks & Actions{" "}
                        </a>
                    </b>
                    <a className="Font-Verdana-Medium-Rusty">
                        {" "}
                        PPMID#{ppm_id}: {project_handle}/{asms_number}
                    </a>
                </div>
                {isExpanded_1 && (
                    <div>
                        <div>&nbsp;</div>
                        <div>
                            <TaskCreate
                                asms_number={asms_number}
                                project_handle={project_handle}
                                checkForRecords={checkForRecords}
                                setCheckForRecords={setCheckForRecords}
                            />
                            <TaskEdit parenttask={parenttask} />
                            {parenttask
                                .filter((status) => status.taskstatus === "PROBLEM")
                                .map(
                                    ({
                                        id,
                                        taskname,
                                        taskrequirement,
                                        taskowner,
                                        tasktargetdate,
                                        taskstatus,
                                        asms,
                                        tasks,
                                        taskcreatedate,
                                    }) => (
                                        <div style={{ marginTop: 10 }}>
                                            {
                                                <Task
                                                    project_handle={project_handle}
                                                    id={id}
                                                    taskname={taskname}
                                                    taskrequirement={taskrequirement}
                                                    taskowner={taskowner}
                                                    asms={asms}
                                                    tasktargetdate={tasktargetdate}
                                                    taskstatus={taskstatus}
                                                    parenttask={parenttask}
                                                    checkForRecords={checkForRecords}
                                                    setCheckForRecords={setCheckForRecords}
                                                />
                                                
                                            }
                                        </div>
                                    )
                                )}
                            <div className="flex-container">
                                <div className="flex-box">
                                    <table className="Table8 fill Table8hover">
                                        <thead>
                                            <tr>
                                                <th>TO START</th>
                                            </tr>
                                        </thead>
                                        {parenttask
                                            .filter((status) => status.taskstatus === "START")
                                            .map(
                                                ({
                                                    id,
                                                    taskname,
                                                    taskrequirement,
                                                    taskowner,
                                                    tasktargetdate,
                                                    taskstatus,
                                                    asms,
                                                    tasks,
                                                    taskcreatedate,
                                                }) => (
                                                    <tbody>
                                                        {
                                                            <tr>
                                                                <td>
                                                                    <Task
                                                                        project_handle={project_handle}
                                                                        id={id}
                                                                        taskname={taskname}
                                                                        taskrequirement={taskrequirement}
                                                                        taskowner={taskowner}
                                                                        asms={asms}
                                                                        tasktargetdate={tasktargetdate}
                                                                        taskstatus={taskstatus}
                                                                        parenttask={parenttask}
                                                                        checkForRecords={checkForRecords}
                                                                        setCheckForRecords={setCheckForRecords}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                )
                                            )}
                                    </table>
                                </div>
                                <div className="flex-box">
                                    <table className="Table8 fill Table8hover" style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>WIP</th>
                                            </tr>
                                        </thead>
                                        {parenttask
                                            .filter((status) => status.taskstatus === "WIP")
                                            .map(
                                                ({
                                                    id,
                                                    taskname,
                                                    taskrequirement,
                                                    taskowner,
                                                    tasktargetdate,
                                                    taskstatus,
                                                    asms,
                                                    tasks,
                                                    taskcreatedate,
                                                }) => (
                                                    <tbody>
                                                        {
                                                            <tr>
                                                                <td>
                                                                    <Task
                                                                        project_handle={project_handle}
                                                                        id={id}
                                                                        taskname={taskname}
                                                                        taskrequirement={taskrequirement}
                                                                        taskowner={taskowner}
                                                                        asms={asms}
                                                                        tasktargetdate={tasktargetdate}
                                                                        taskstatus={taskstatus}
                                                                        parenttask={parenttask}
                                                                        checkForRecords={checkForRecords}
                                                                        setCheckForRecords={setCheckForRecords}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                )
                                            )
                                        }

                                    </table>
                                </div>
                                <div className="flex-box">
                                    <table className="Table8 fill Table8hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div style={{ display: "flex", height: 17 }}>
                                                        <div className="doneflex">
                                                            DONE - {doneList.length}
                                                        </div>
                                                        <div
                                                            className="doneflex"
                                                            onClick={() => setOpen(!open)}
                                                            style={{
                                                                cursor: "pointer",
                                                                textAlign: "right",
                                                                padding: 0,
                                                            }}
                                                        >
                                                            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {open && (
                                            <tbody className="done" style={{ width: "100%" }}>
                                                {doneList.map(
                                                    ({
                                                        id,
                                                        taskname,
                                                        taskrequirement,
                                                        taskowner,
                                                        tasktargetdate,
                                                        taskstatus,
                                                        asms,
                                                        tasks,
                                                        taskcreatedate,
                                                    }) => (
                                                        <tr>
                                                            <td style={{ width: "100%" }} colSpan="2">
                                                                <Task
                                                                    project_handle={project_handle}
                                                                    id={id}
                                                                    taskname={taskname}
                                                                    taskrequirement={taskrequirement}
                                                                    taskowner={taskowner}
                                                                    asms={asms}
                                                                    tasktargetdate={tasktargetdate}
                                                                    taskstatus={taskstatus}
                                                                    parenttask={parenttask}
                                                                    checkForRecords={checkForRecords}
                                                                    setCheckForRecords={setCheckForRecords}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                            <div>&nbsp;</div>
                            <GradientLineRusty />
                            <div>&nbsp;</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default Task_Accordion;