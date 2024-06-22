import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AlertContext from "./Generic/Alerts/AlertContext";
import "./Fonts.css";
import "./Task.css";
import TaskRecordAccordion from "./TaskRecordAccordion";
import { getStatusByColourTaskText } from "./getStatusByColourTaskText";
import { Autocomplete } from "@mui/material";
import { BsArrowCounterclockwise, BsPencil } from "react-icons/bs"; //Revert & Pencil grey
import { GiCheckMark } from "react-icons/gi"; //Commit grey
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import ObjectSupport from "dayjs/plugin/objectSupport";
import TextField from "@mui/material/TextField";
import TaskPopOut from "./TaskPopOut";


export default function Task({
    project_handle,
    id,
    taskname,
    taskrequirement,
    taskowner,
    tasktargetdate,
    taskstatus,
    asms,
    childrecord,
    parenttask,
    checkForRecords,
    setCheckForRecords
}) {
    
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => {setExpanded(!isExpanded);};
    const [editing, setEditing] = useState(false);
    const [requirement, setRequirement] = useState(null);
    const [owner, setOwner] = useState(null);
    const [newTargetDate, setNewTargetDate] = useState(null);
    const [name, setName] = useState(null);
    const [error, setError] = useState(null);
    const [duration, setDuration] = useState(null);
    const alertCtx = useContext(AlertContext);
    //send request for the task taskDuration if the task has been completed
    useEffect(() => {
        if (taskstatus === "DONE") {
            axios(
                `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/duration/${id}`
            )
                .then((response) => {
                    setDuration(response.data);
                    setError(null);
                })
                .catch(setError)
        }
    }, []);
    // if the duration was less than 1 whole day,
    // set the duration to display as 1 day
    if (duration === 0) {
        setDuration(1);
    }
    const handleEdit = () => {
        setOwner(taskowner);
        setRequirement(taskrequirement);
        setNewTargetDate(new Date(tasktargetdate));
        setName(taskname);
        setEditing(true);
    };
    const onEditCancel = () => {
        setEditing(false);
        setRequirement(null);
        setOwner(null);
        setNewTargetDate(null);
        setName(null);
    };
    const deadlineDaysRemaining = getDeadlineInDays(tasktargetdate);
    const deadlineColor = calculateDeadlineTextColor(deadlineDaysRemaining);
    const handleChange = (e, newVal) => setOwner(newVal);
    const onEditSave = async () => {
        let updatedDetails = [];
        let noDetails = [];
        // Check field changes
        if (newTargetDate !== tasktargetdate) updatedDetails.push("Due Date");
        if (owner !== taskowner) updatedDetails.push("Owner");
        if (requirement !== taskrequirement) updatedDetails.push("Requirement");
        if (name !== taskname) updatedDetails.push("Task Name");
        //Check fields are not null
        if (!newTargetDate) noDetails.push("Due Date");
        if (!owner?.trim()) noDetails.push("Owner");
        if (!requirement?.trim()) noDetails.push("Requirement");
        if (!name?.trim()) noDetails.push("Task Name");
        const updatedTask = {
            tasktargetdate: newTargetDate,
            taskrequirement: requirement,
            taskowner: owner,
            taskname: name,
        };
        // using conditional on length evaluates whether or not it's a truthy value,
        // so if noDetails.length doesn't return a truthy value(i.e. if its null, undefined, or 0),
        // the enclosed code is never executed.
        if (noDetails.length) {
            alertCtx.warning(`Please fill in ${noDetails.join(", ")}`);
            return;
        }
        const response = await axios
            .put(
                `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/update/taskdetails/${id}`,
                updatedTask
            )
            .then((response) => {
                updatedDetails.length
                    ? alertCtx.success(
                        ` "${taskname}" task successfully updated ${updatedDetails.join(
                            ", "
                        )}`
                    )
                    : alertCtx.warning(`No changes in "${taskname}"`);
            })
            .catch((error) => {
                alertCtx.error(error.message);
            });
        setCheckForRecords(!checkForRecords);
        onEditCancel();
    };
    const ownerOptions = [
        { name: "Brian O Rourke" },
        { name: "Bren Keenan" },
        { name: "Conor Lynch" },
        { name: "Declan Lawless" },
        { name: "Julia Temple" },
        { name: "Keex Nenyiaba" },
        { name: "Kieran Hayter" },
        { name: "Liam Cearbhaill" },
        { name: "Monique Borje" },
        { name: "Patrick Haugh" },
        { name: "Paul Bester" },
        { name: "Ray Egan" },
        { name: "Rosie Curran" },
        { name: "Saoirse Seeber" },
        { name: "Simon Dowling" },
        { name: "Stefan Manole" },
    ];
    // return number of days until/after deadline
    function getDeadlineInDays(deadline) {
        // add object support to dayjs
        dayjs.extend(ObjectSupport);
        // current time
        const now = dayjs();
        // create js Date object using
        const t = new Date(deadline[0], deadline[1], deadline[2]);
        // convert date object into a dayjs object
        let targetdate = dayjs(t);
        // Subtract extra month which is there for some reason TODO: fix it
        targetdate = targetdate.subtract(1, 'month');
        //return negative if the deadline has already passed.
        if (now.unix() - targetdate.unix() > 0) {
            return -1 * now.diff(targetdate, "day");
        } else {
            return targetdate.diff(now, "day");
        }
    }
    // return a hex color to be used in styling based on days until/after deadline
    function calculateDeadlineTextColor(noOfDays) {
        if (noOfDays > 5) {
            return "#212121";
        } else if (noOfDays <= 5 && noOfDays > 0) {
            return "#ed8a09";
        } else if (noOfDays < 0) {
            return "#e32929";
        } else {
            return "#212121";
        }
    }
    return (
        <>
            <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                <div style={{ float: "right" }}>
                    &nbsp;
                    <TaskPopOut
                        alertCtx={alertCtx}
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
                </div>
                <div style={{ display: "flex", float: "right" }}>
                    {taskstatus !== "DONE" && ( // only render this div if the task is not already done.
                        <div className="deadline" style={{ color: deadlineColor }}>
                            {deadlineDaysRemaining < 0
                                ? -deadlineDaysRemaining + " days overdue" // minus symbol to invert value from negative
                                : deadlineDaysRemaining + " days remaining"}
                        </div>
                    )
                    }
                    {taskstatus === "DONE" && duration !== null && duration >= 0 ? ( // render time taken to complete if task is DONE
                        <div className="task-finished">
                            {"Days to completion: " + duration}
                        </div>
                    ) : null}
                    <>
                        {editing === true ? (
                            <>
                                <Tooltip title="Commit" placement="top-end">
                                    <div onClick={() => onEditSave()}>
                                        &nbsp;<GiCheckMark style={{ color: "C0C0C0", fontSize: "15px", cursor: "pointer" }} />
                                    </div>
                                </Tooltip>
                                <Tooltip title="Revert" placement="top-end">
                                    <div onClick={() => onEditCancel()}>
                                        &nbsp;<BsArrowCounterclockwise style={{ color: "C0C0C0", fontSize: "17px", cursor: "pointer" }} />
                                    </div>
                                </Tooltip>
                            </>
                        ) : isExpanded && taskstatus !== "DONE" ? (
                            <Tooltip title="Edit Task" placement="top-end">
                                <div style={{ cursor: "pointer" }} onClick={() => { handleEdit(); }}>
                                    &nbsp;&nbsp;<BsPencil style={{ color: "#C0C0C0", fontSize: "15px" }} />
                                </div>
                            </Tooltip>
                        ) : null}
                    </>
                </div>
                {editing === true ? (
                    <>
                        <>
                            <u>TASK NAME</u>:
                            <TextField
                                required
                                defaultValue={taskname}
                                onChange={(e) => setName(e.target.value)}
                                size="small"
                                style={{
                                    width: 575,
                                    height: "30px",
                                    marginBottom: "15px",
                                    marginTop: "5px",
                                    display: "flex",
                                }}
                            />
                        </>
                    </>
                ) : (
                    <u onClick={toggleAccordion}>
                        <b>{taskname}</b>
                    </u>
                )}
            </div>
            {isExpanded && (
                <div>
                    <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                        <u>REQUIREMENT</u>:
                        {editing === true ? (
                            <TextField
                                freeSolo
                                required
                                defaultValue={taskrequirement}
                                onChange={(e) => setRequirement(e.target.value)}
                                size="small"
                                style={{
                                    width: 575,
                                    height: "30px",
                                    marginBottom: "15px",
                                    marginTop: "5px",
                                    display: "flex",
                                }}
                            />
                        ) : (
                            taskrequirement
                        )}
                    </div>
                    <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                        <u>OWNER</u>:{" "}
                        {editing === true ? (
                            <Autocomplete
                                value={taskowner}
                                freeSolo
                                size="small"
                                style={{ width: 575, height: "30px", marginBottom: "15px", marginTop: "5px" }}
                                id="Taskowner"
                                onChange={handleChange}
                                options={ownerOptions.map((option) => option.name)}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        onChange={(e) => {
                                            setOwner(e.target.value);
                                        }}
                                        {...params}
                                    />
                                )}
                            ></Autocomplete>
                        ) : (
                            taskowner
                        )}
                    </div>
                    <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                        <u>DUE</u>:{" "}
                        {editing === true ? (
                            <div style={{ paddingBottom: "10px", marginTop: "5px" }}>
                                <DatePicker
                                    selected={newTargetDate}
                                    onChange={(date) => setNewTargetDate(date)}
                                    dateFormat="yyyy.MM.dd"
                                />
                            </div>
                        ) : (
                            tasktargetdate[0] +
                            "." +
                            (tasktargetdate[1] < 10
                                ? "0" + tasktargetdate[1]
                                : tasktargetdate[1]) +
                            "." +
                            (tasktargetdate[2] < 10
                                ? "0" + tasktargetdate[2]
                                : tasktargetdate[2])
                        )}
                    </div>
                    <TaskRecordAccordion
                        alertCtx={alertCtx}
                        project_handle={project_handle}
                        taskstatus={taskstatus}
                        parentid={id}
                        asms_number={asms}
                        parenttask={parenttask}
                        checkForRecords={checkForRecords}
                        setCheckForRecords={setCheckForRecords}
                    />
                </div>
            )}
        </>
    );
}