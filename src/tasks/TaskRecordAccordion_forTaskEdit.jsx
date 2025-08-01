import { useState } from "react";
import { getStatusByColourTaskText } from "../getStatusByColourTaskText";
import { toast } from 'react-toastify';
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { Tooltip } from "@mui/material";
import { BsArrowCounterclockwise, BsPencil } from "react-icons/bs"; //revert
import { GiCheckMark } from "react-icons/gi"; //Commit
import axios from "axios";
import TaskRecordCreate from "./TaskRecordCreate";
import TaskRecordStatusByColourLong_forTaskEdit from "./TaskRecordStatusByColourLong_forTaskEdit";
import "../Fonts.css";

function TaskRecordAccordion_forTaskEdit({
    project_handle,
    asms_number,
    parentid,
    parenttask,
    checkForRecords,
    setCheckForRecords,
    taskstatus,
}

)
{

    const [isExpanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [taskrecord, setTaskrecord] = useState(null);
    const date = new Date();
    
    const toggleAccordion = () => {
        setExpanded(!isExpanded);
    };
    
    const orderedTasks = parenttask;
    
    const taskRecords = orderedTasks.tasks.sort(
        (a, b) =>
            new Date(b.date[0], b.date[1], b.date[2]) -
            new Date(a.date[0], a.date[1], a.date[2]) || b.childid - a.childid
    );
    
   
    const handleEdit = (id, childrecord) => {
        setEditing(id);
        setTaskrecord(childrecord);
    };
    
    const onEditCancel = () => {
        setEditing(false);
        setTaskrecord(null);
    };
    
    const onEditSave = async (childid) => {
        const updatedTaskRecord =
        {
            childrecord: taskrecord,
        };

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
        // const response = await axios.put(`http://localhost:8000/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
        if (response.status === 202) {
            setCheckForRecords(!checkForRecords); 
            toast.success(`Task Record updated.`);
        }
        else {
            toast.error('Task Record not updated.');
        }
    };
    function editableTaskRecord(
        childid,
        childrecord,
        parentid,
        status,
        date,
        asms,
        handle,
        future,
        checkForRecords,
        setCheckForRecords
    ) {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", float: "right" }}>
                        <>
                            {editing === childid ? (
                                <>
                                    <Tooltip title="Commit" placement="top-end">
                                        <div onClick={() => onEditSave(childid)}>
                                            <GiCheckMark style={{ color: "#336791", fontSize: "15px", cursor: 'pointer' }} />
                                        </div>
                                    </Tooltip>
                                    &nbsp;&nbsp;
                                    <Tooltip title="Revert" placement="top-end">
                                        <div onClick={() => onEditCancel()}>
                                            <BsArrowCounterclockwise style={{ color: "#336791", fontSize: "17px", cursor: 'pointer' }} />
                                        </div>
                                    </Tooltip>
                                    &nbsp;&nbsp;
                                </>
                            ) : status !== "DONE" ? (
                                <Tooltip title={`Edit Task Record: ${childid}`} placement="top-end">
                                    <div onClick={() => { handleEdit(childid, childrecord); }}>
                                        <BsPencil style={{ color: "#336791", fontSize: "15px", cursor: 'pointer' }} />
                                    </div>
                                </Tooltip>
                            ) : null}
                        </>
                    </div>
                    <div>
                        {editing === childid ? (
                            <textarea
                                // cols="140"
                                // variant="outlined"
                                defaultValue={taskrecord}
                                // rows={5}
                                onChange={(e) => setTaskrecord(e.target.value)}
                                style={{
                                    width: 1000,
                                    height: "80px",
                                    marginBottom: "15px",
                                    marginTop: "5px",
                                    display: "flex",
                                    border: "1px dotted grey"
                                }}
                            ></textarea>
                        ) : (
                            <div>
                                <TaskRecordStatusByColourLong_forTaskEdit
                                    childid={childid}
                                    childrecord={childrecord}
                                    parentid={parentid}
                                    status={status}
                                    date={date}
                                    asms={asms}
                                    handle={handle}
                                    future={future}
                                    checkForRecords={checkForRecords}
                                    setCheckForRecords={setCheckForRecords}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    if (taskRecords.length > 0) {
        if (taskRecords[0].status === "DONE") {
            return (
                <div>
                    <TaskRecordStatusByColourLong_forTaskEdit
                        childid={taskRecords[0].childid}
                        childrecord={taskRecords[0].childrecord}
                        parentid={taskRecords[0].parentid}
                        status={taskRecords[0].status}
                        date={taskRecords[0].date}
                        asms={taskRecords[0].asms}
                        handle={taskRecords[0].handle}
                        future={taskRecords[0].future}
                        checkForRecords={taskRecords[0].checkForRecords}
                        setCheckForRecords={taskRecords[0].setCheckForRecords}
                    />
                    <div>
                        {taskRecords
                            .slice(1)
                            .map(
                                ({
                                    childid,
                                    childrecord,
                                    parentid,
                                    date,
                                    asms,
                                    handle,
                                    future,
                                }) => (
                                    <TaskRecordStatusByColourLong_forTaskEdit
                                        childid={childid}
                                        childrecord={childrecord}
                                        parentid={parentid}
                                        status={"ARCHIVE"}
                                        date={date}
                                        asms={asms}
                                        handle={handle}
                                        future={future}
                                        checkForRecords={checkForRecords}
                                        setCheckForRecords={setCheckForRecords}
                                    />
                                )
                            )}
                    </div>
                </div>
            );
        }
    }
    return (
        <div>
            <div style={{ color: getStatusByColourTaskText(taskstatus) }} onClick={toggleAccordion}>
                <u>STATUS</u>:&nbsp;
                <Tooltip title="xxxxxxxxxxx" placement="top-end">
                    <BiSolidMessageRoundedAdd style={{ color: "#336791", fontSize: "20px" }} />
                </Tooltip>
            </div>
            {isExpanded && (
                <div>
                    <TaskRecordCreate
                        project_handle={project_handle}
                        asms_number={asms_number}
                        parentid={parentid}
                        checkForRecords={checkForRecords}
                        setCheckForRecords={setCheckForRecords}
                    />
                </div>
            )}
            <div className="Verdana">
                {taskRecords.map(
                    ({
                        childid,
                        childrecord,
                        parentid,
                        status,
                        date,
                        asms,
                        handle,
                        future,
                    }) =>
                        editableTaskRecord(
                            childid,
                            childrecord,
                            parentid,
                            status,
                            date,
                            asms,
                            handle,
                            future,
                            checkForRecords,
                            setCheckForRecords
                        )
                )}
            </div>
        </div>
    );
}
export default TaskRecordAccordion_forTaskEdit;