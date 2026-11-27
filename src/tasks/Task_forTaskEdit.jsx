import React, { useState, useEffect } from "react";
import "../Fonts.css";
import "./Task.css";
import { BsArrowCounterclockwise } from "react-icons/bs"; //Revert & Pencil grey
import { GiCheckMark } from "react-icons/gi"; //Commit grey
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import TaskRecordAccordion_forTaskEdit from "./TaskRecordAccordion_forTaskEdit";
import { parseTaskDate } from "./taskDate";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';


export default function Task_forTaskEdit({
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
    setCheckForRecords,
    taskUrl
}) {
    
    const [editing, setEditing] = useState(false);
    const [requirement, setRequirement] = useState(null);
    const [taskurl, setTaskurl] = useState(null);
    const [name, setName] = useState(null);
    const [error, setError] = useState(null);
    const [duration, setDuration] = useState(null);
    // const alertCtx = useContext(AlertContext);

    
    //send request for the task taskDuration if the task has been completed
    useEffect(() => {
        if (taskstatus === "DONE") {
            OAuth2APIClient.get(
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
        setTaskurl(taskUrl);
        setRequirement(taskrequirement);
        setName(taskname);
        setEditing(true);
    };
    const onEditCancel = () => {
        setEditing(false);
        setRequirement(null);
        setTaskurl(null);
        setName(null);
    };
    const onEditSave = async () => {
        if (!parseTaskDate(tasktargetdate)) {
            toast.error('Cannot save task: its due date is missing or invalid.');
            return;
        }
        const updatedTask = 
        {
            tasktargetdate,
            taskrequirement: requirement,
            taskname: name,
            taskUrl: taskurl,
        };
        try {
            const response = await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/update/taskdetails/${id}`, updatedTask);
            if (response.status === 202) {
                setCheckForRecords(!checkForRecords);
                toast.success('Task Updated.');
                onEditCancel();
            } else {
                toast.error('Task not Updated.');
            }
        } catch (saveError) {
            console.error('Failed to update task:', saveError);
            toast.error('Task not Updated.');
        }
    };
    
    return (
        <div className="task-editor-detail">
            <div className="task-editor-card-header">
                <div className="task-editor-heading">
                    <div className="task-editor-meta">
                        <span>Task #{id}</span>
                        <span className={`task-editor-status task-editor-status-${(taskstatus || '').toLowerCase()}`}>{taskstatus}</span>
                    </div>
                    {editing ? (
                        <label className="task-editor-field">
                            <span>Task name</span>
                            <textarea required defaultValue={taskname} onChange={(e) => setName(e.target.value)} rows={2} />
                        </label>
                    ) : (
                        <h2 className="task-editor-task-name">{taskname}</h2>
                    )}
                </div>
                <div className="task-editor-actions">
                    {taskstatus === "DONE" && duration !== null && duration >= 0 && (
                        <span className="task-editor-duration">Days to completion: {duration}</span>
                    )}
                    {editing ? (
                        <>
                            <Tooltip title="Commit" placement="top-end" describeChild>
                                <button className="task-editor-action" type="button" onClick={onEditSave}><GiCheckMark aria-hidden="true" /> Save</button>
                            </Tooltip>
                            <Tooltip title="Revert" placement="top-end" describeChild>
                                <button className="task-editor-action task-editor-action-secondary" type="button" onClick={onEditCancel}><BsArrowCounterclockwise aria-hidden="true" /> Cancel</button>
                            </Tooltip>
                        </>
                    ) : taskstatus !== "DONE" ? (
                        <Tooltip title={`Edit Task: ${id}`} placement="top-end" describeChild>
                            <button className="task-editor-action" type="button" onClick={handleEdit}>Edit task</button>
                        </Tooltip>
                    ) : null}
                </div>
            </div>

                <div className="task-editor-content">
                    <div className="task-editor-field">
                        <span>Requirement</span>
                        {editing ? (
                            <textarea aria-label="Requirement" required defaultValue={taskrequirement} onChange={(e) => setRequirement(e.target.value)} rows={8} />
                        ) : <p>{taskrequirement}</p>}
                    </div>
                    <div className="task-editor-field">
                        <span>URL</span>
                        {editing ? (
                            <textarea aria-label="URL" required defaultValue={taskUrl} onChange={(e) => setTaskurl(e.target.value)} rows={2} />
                        ) : <a href={taskUrl} target="_blank" rel="noopener noreferrer">{taskUrl}</a>}
                    </div>
                    <div className="task-editor-records">
                        <h2>Progress and status</h2>
                        <TaskRecordAccordion_forTaskEdit
                            project_handle={project_handle}
                            taskstatus={taskstatus}
                            parentid={id}
                            asms_number={asms}
                            parenttask={parenttask}
                            checkForRecords={checkForRecords}
                            setCheckForRecords={setCheckForRecords}
                        />
                    </div>
                </div>
        </div>
    );
}