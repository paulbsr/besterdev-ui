import React, { useEffect, useState, useContext } from "react";
import MouseoverPopover from "../MouseoverPopover";
import { MdTask } from "react-icons/md";
import GradientLineRusty from "../gradientlines/GradientLineRusty";
import "../Fonts.css";
import "./TaskOverview.css";
import Task from "./Task";
import TaskCreate from "./TaskCreate";
import { TaskContext } from "../Contexts";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import ObjectSupport from "dayjs/plugin/objectSupport";
// import { Tooltip } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'



class TaskStatusCounter {
    constructor() {
        this.START = [];
        this.WIP = [];
        this.DONE = [];
        this.PROBLEM = [];
    }
}



const projectNameMap = {
    113092: "NetworkSecurity",
    14718: "EnterpriseSecurity",
    181268: "ComputerCloudSecurity",
    171593: "AppliedCryptography",
    168272: "Dissertation",
    // 188660: "TELEFONICA",
    // 190860: "MediaGen",
    // 191076: "TeamsDMV",
    // 221193: "VehicleDNA",
    188118: "UserStory",
    // 111111: "BesterDev",
};


const projectAsmsMap = {
    NetworkSecurity: "113092",
    EnterpriseSecurity: "14718",
    ComputerCloudSecurity: "181268",
    AppliedCryptography: "171593",
    Dissertation: "168272",
    // TELEFONICA: "188660",
    // MediaGen: "190860",
    // TeamsDMV: "191076",
    // VehicleDNA: "221193",
    UserStory: "188118",
    // BesterDev: "111111",
};



export default function TaskOverview() {
    const [checkForRecords, setCheckForRecords] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setExpanded] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("START");
    const [currentAsms, setCurrentAsms] = useState("113092");
    const [currentName, setCurrentName] = useState("CVCP");
    const [modalState, setModalState] = useState(null);
    dayjs.extend(ObjectSupport);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const allTask = useContext(TaskContext);
    const startTasks = allTask.filter(task => task.taskstatus === 'START');
    const wipTasks = allTask.filter(task => task.taskstatus === 'WIP');
    const problemTasks = allTask.filter(task => task.taskstatus === 'PROBLEM');
    const doneTasks = allTask.filter(task => task.taskstatus === 'DONE');
    const startTasksCount = startTasks.length;
    const wipTasksCount = wipTasks.length;
    const problemTasksCount = problemTasks.length;
    const doneTasksCount = doneTasks.length;


    const projectTaskStatusCounters = {
        NetworkSecurity: new TaskStatusCounter(),
        EnterpriseSecurity: new TaskStatusCounter(),
        ComputerCloudSecurity: new TaskStatusCounter(),
        AppliedCryptography: new TaskStatusCounter(),
        Dissertation: new TaskStatusCounter(),
        UserStory: new TaskStatusCounter(),
        // MediaGen: new TaskStatusCounter(),
        // TeamsDMV: new TaskStatusCounter(),
        // VehicleDNA: new TaskStatusCounter(),
        // BesterDev: new TaskStatusCounter(),
    };
    
    for (const task of allTask) {
        let status = task.taskstatus;
        let asms = task.asms;
        let name = projectNameMap[asms];
        if (name in projectTaskStatusCounters) {
            if (status in projectTaskStatusCounters[name]) {
                projectTaskStatusCounters[name][status].push(task);
            }
        } else {
            projectTaskStatusCounters[name] = new TaskStatusCounter();
            if (status in projectTaskStatusCounters[name]) {
                projectTaskStatusCounters[name][status].push(task);
            }
        }
    }
    if (error) return <p>An error in TaskOverview occurred</p>;
    
    const dateSorter = (list) => {
        return list.sort((a, b) => {
            const aCompareValue = a.tasks.length
                ? new Date(a.tasks[0].date)
                : new Date(a.taskcreatedate);
            const bCompareValue = b.tasks.length
                ? new Date(b.tasks[0].date)
                : new Date(b.taskcreatedate);
            return aCompareValue > bCompareValue ? -1 : 1;
        });
    };
    
    const setTable = (currentName, currentAsms, currentStatus) => {
        setCurrentName(currentName);
        setCurrentAsms(currentAsms);
        setCurrentStatus(currentStatus);
    };
    
    const handleModal = (taskname, modalData) => {
        setModalState({
            taskname: taskname,
            modalData: modalData,
        });
    };



    return (
        <div>
            <div>&nbsp;</div>

            <Tooltip id="insert" />
            <div className='Font-Verdana-Medium-Postgres' onClick={toggleAccordion}>
                &nbsp; &nbsp; <MdTask style={{ color: '#336791', fontSize: '38px', cursor: 'pointer' }} />
                &nbsp;<b>The Task Manager ({allTask.length})</b>
            </div>
            <div>&nbsp;</div>

            <div>
                <div>
                    <div><TaskCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /></div>
                </div>

                <div>&nbsp;</div>
                <div>&nbsp;</div>

                <div>
                    <div style={{ overflow: "auto" }}>
                        <div style={{ display: "flex" }}>
                            <div>
                                <table className="Table8 Table8hover">
                                    <thead>
                                        <th style={{ minWidth: "10vw", maxWidth: "40vw" }}>COMPANY</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw", whiteSpace: "nowrap" }}>START ({startTasksCount})</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw" }}>WIP ({wipTasksCount})</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw" }}>ISSUE ({problemTasksCount})</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw" }}>DONE ({doneTasksCount})</th>
                                    </thead>
                                    <tbody>
                                        {Object.keys(projectTaskStatusCounters).map((project_name) => {
                                            let rowdata = projectTaskStatusCounters[project_name];
                                            return (
                                                <tr>
                                                    <td style={{ fontSize: 13, height: 24 }}>{project_name}</td>
                                                    <td>
                                                        <div
                                                            style={{ width: "100%" }}
                                                            className="overview-box start-color"
                                                            onClick={() =>
                                                                setTable(
                                                                    project_name,
                                                                    projectAsmsMap[project_name],
                                                                    "START"
                                                                )
                                                            }
                                                        >
                                                            <MouseoverPopover
                                                                see={rowdata.START.length}
                                                                read={
                                                                    rowdata.START.length > 0
                                                                        ? dateSorter(rowdata.START).map(
                                                                            ({ taskname }) => (
                                                                                <div>{taskname}</div>
                                                                            )
                                                                        )
                                                                        : "No Tasks"
                                                                }
                                                            >
                                                            </MouseoverPopover>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            style={{ width: "100%" }}
                                                            className="overview-box wip-color"
                                                            onClick={() =>
                                                                setTable(
                                                                    project_name,
                                                                    projectAsmsMap[project_name],
                                                                    "WIP"
                                                                )
                                                            }
                                                        ><MouseoverPopover
                                                                see={rowdata.WIP.length}
                                                                read={
                                                                    rowdata.WIP.length > 0
                                                                        ? dateSorter(rowdata.WIP).map(
                                                                            ({ taskname }) => (
                                                                                <div>{taskname}</div>
                                                                            )
                                                                        )
                                                                        : "No Tasks"
                                                                }
                                                            ></MouseoverPopover>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div
                                                            style={{ width: "100%" }}
                                                            className="overview-box problem-color"
                                                            onClick={() =>
                                                                setTable(
                                                                    project_name,
                                                                    projectAsmsMap[project_name],
                                                                    "PROBLEM"
                                                                )
                                                            }
                                                        ><MouseoverPopover
                                                                see={rowdata.PROBLEM.length}
                                                                read={
                                                                    rowdata.PROBLEM.length > 0
                                                                        ? dateSorter(rowdata.PROBLEM).map(
                                                                            ({ taskname }) => (
                                                                                <div>{taskname}</div>
                                                                            )
                                                                        )
                                                                        : "No Tasks"
                                                                }
                                                            ></MouseoverPopover>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div
                                                            style={{ width: "100%" }}
                                                            className="overview-box done-color"
                                                            onClick={() =>
                                                                setTable(
                                                                    project_name,
                                                                    projectAsmsMap[project_name],
                                                                    "DONE"
                                                                )
                                                            }
                                                        ><MouseoverPopover
                                                                see={rowdata.DONE.length}
                                                                read={
                                                                    rowdata.DONE.length > 0
                                                                        ? dateSorter(rowdata.DONE).map(
                                                                            ({ taskname }) => (
                                                                                <div>{taskname}</div>
                                                                            )
                                                                        )
                                                                        : "No Tasks"
                                                                }
                                                            ></MouseoverPopover>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="fill" style={{ marginLeft: "15px" }}>
                                <table className="Table8 Table8hover fill">
                                    <thead>
                                        <tr>
                                            <th>
                                                {currentName}: {currentStatus}
                                            </th>
                                        </tr>
                                    </thead>
                                    {allTask
                                        .filter(
                                            (task) =>
                                                task.asms === currentAsms &&
                                                task.taskstatus === currentStatus
                                        )
                                        .map(
                                            ({
                                                id,
                                                project_handle,
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
                                                        <tr style={{ height: "20px" }}>
                                                            <td>
                                                                <MouseoverPopover
                                                                    see={
                                                                        <Task
                                                                            key={id}
                                                                            project_handle={project_handle}
                                                                            id={id}
                                                                            taskname={taskname}
                                                                            taskrequirement={taskrequirement}
                                                                            taskowner={taskowner}
                                                                            asms={asms}
                                                                            tasktargetdate={tasktargetdate}
                                                                            taskstatus={taskstatus}
                                                                            parenttask={allTask}
                                                                            checkForRecords={checkForRecords}
                                                                            setCheckForRecords={setCheckForRecords}
                                                                            handleModal={handleModal}
                                                                        />
                                                                    }

                                                                ></MouseoverPopover>
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            )
                                        )}
                                </table>
                            </div>
                        </div>
                        <div>&nbsp;</div>
                        <GradientLineRusty />
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>

            <Dialog
                maxWidth={false}
                open={modalState}
                onClose={() => setModalState(null)}
            >
                <DialogTitle style={{ fontSize: 20 }}>
                    <b>{modalState && modalState.taskname}</b>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText
                        style={{ overflowWrap: "break-word", minWidth: "90vw" }}
                    >
                        {modalState && modalState.modalData}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalState(null)}>Close pop-up</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}