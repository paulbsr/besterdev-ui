import React, { useEffect, useState, useContext } from "react";
import MouseoverPopover from "./MouseoverPopover";
import { MdTask } from "react-icons/md";
import GradientLineRusty from "./GradientLineRusty";
import "./Fonts.css";
import Task from "./Task";
import { TaskContext } from "./Contexts";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import "./TaskOverview.css";
import dayjs from "dayjs";
import ObjectSupport from "dayjs/plugin/objectSupport";
import Task_Create from "./Task_Create";
import { Tooltip } from '@mui/material';




class TaskStatusCounter {
    constructor() {
        this.START = [];
        this.WIP = [];
        this.DONE = [];
        this.PROBLEM = [];
    }
}



const projectNameMap = {
    113092: "AppDashboard",
    14718: "CCDNManagement",
    181268: "DSTracker",
    171593: "GMVCTracker",
    168272: "MABRescue",
    188660: "MediaCast",
    190860: "MediaGen",
    191076: "TeamsDMV",
    221193: "VehicleDNA",
    188118: "WANVisualizer",
    111111: "BesterDev",
};
const projectAsmsMap = {
    AppDashboard: "113092",
    CCDNManagement: "14718",
    DSTracker: "181268",
    GMVCTracker: "171593",
    MABRescue: "168272",
    MediaCast: "188660",
    MediaGen: "190860",
    TeamsDMV: "191076",
    VehicleDNA: "221193",
    WANVisualizer: "188118",
    BesterDev: "111111",
};



export default function TaskOverview() {
    const [checkForRecords, setCheckForRecords] = useState(true);
    const [error, setError] = useState(null);
    //const [allTask, setAlltask] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("START");
    const [currentAsms, setCurrentAsms] = useState("113092");
    const [currentName, setCurrentName] = useState("AppDashboard");
    const [modalState, setModalState] = useState(null);
    //   const [tasks, setTasks] = useState([]);
    const [problems, setProblems] = useState([]);
    dayjs.extend(ObjectSupport);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const allTask = useContext(TaskContext);
    console.log('TaskOverview se alltask:', allTask)


    const projectTaskStatusCounters = {
        AppDashboard: new TaskStatusCounter(),
        CCDNManagement: new TaskStatusCounter(),
        DSTracker: new TaskStatusCounter(),
        GMVCTracker: new TaskStatusCounter(),
        MABRescue: new TaskStatusCounter(),
        MediaCast: new TaskStatusCounter(),
        MediaGen: new TaskStatusCounter(),
        TeamsDMV: new TaskStatusCounter(),
        VehicleDNA: new TaskStatusCounter(),
        WANVisualizer: new TaskStatusCounter(),
        BesterDev: new TaskStatusCounter(),
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
                &nbsp;<b>The Task Manager</b>
            </div>
            <div>&nbsp;</div>

            <div>
                <div>
                    <div><Task_Create allTasks={allTask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /></div>
                </div>

                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>
                    <div style={{ overflow: "auto" }}>
                        <div style={{ display: "flex" }}>
                            <div>
                                <table className="Table8 Table8hover">
                                    <thead>
                                        <th style={{ minWidth: "10vw", maxWidth: "40vw" }}>APPLICATIONS</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw", whiteSpace: "nowrap" }}>START</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw" }}>WIP</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw" }}>PROBLEM</th>
                                        <th style={{ minWidth: "5vw", maxWidth: "20vw" }}>DONE</th>

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
                                                        ><MouseoverPopover
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
                                                            ></MouseoverPopover>
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
                                                                // read={
                                                                //   tasks.length > 0
                                                                //     ? "Last updated: " +
                                                                //       tasks[0].date[0] +
                                                                //       "." +
                                                                //       tasks[0].date[1] +
                                                                //       "." +
                                                                //       tasks[0].date[2]
                                                                //     : "Created: " +
                                                                //       taskcreatedate[0] +
                                                                //       "." +
                                                                //       taskcreatedate[1] +
                                                                //       "." +
                                                                //       taskcreatedate[2]
                                                                // }
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