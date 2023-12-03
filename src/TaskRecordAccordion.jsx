import React, { useState } from 'react';
import TaskRecordCreate from './TaskRecordCreate';
import axios from "axios";
import { Tooltip } from '@mui/material';
import { MdOutlineCancel, MdOutlineInput, MdOutlineInsertComment, MdAddCircleOutline } from "react-icons/md";
import { AiOutlineFileAdd, AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { toast, Flip, ToastContainer } from 'react-toastify';


function TaskRecordAccordion({ alertCtx, project_handle, handle, asms_number, parentid, parenttask, checkForRecords, setCheckForRecords, taskstatus }) {
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const orderedTasks = parenttask.filter((task, key) => { return task.id === parentid });
    const taskRecords = orderedTasks[0].tasks.sort((a, b) => a.childid - b.childid);
    const [editing, setEditing] = useState(false);
    const [taskrecord, setTaskrecord] = useState(null);
    const [parentids, setParentids] = useState(parentid); //This is a constraint on the Taskrecords table and must collerate to an entry in Tasks
    const [handlenew, setHandlenew] = useState(); //This will become the Sequence Number of the TaskRecord
    const date = new Date();

    const handleEdit = (id, childrecord, handle) => {
        setEditing(id);
        setTaskrecord(childrecord);
        setHandlenew(handlenew);
    }

    const onEditCancel = () => {
        setEditing(false);
        // setTaskrecord(null);
        // setHandles();
    }

    const onEditSave = async (childid) => {

        const updatedTaskRecord = {
            'parentid': parentids, //This is a constraint on the Taskrecords table and must collerate to an entry in Tasks
            'childrecord': taskrecord,
            'date': date,
            'handle': handlenew,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
        // const response = await axios.put(`http://localhost:8000/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
        setCheckForRecords(!checkForRecords)
        toast.success(`Step Record amended.`)
        onEditCancel();
    }
    console.log(orderedTasks)
    function editableTaskRecord(childid, childrecord, parentid, status, date, asms, handle, checkForRecords, setCheckForRecords) {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div>{editing === childid ?
                        <>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <textarea
                                cols="1"
                                variant="outlined"
                                defaultValue={handle}
                                rows={1}
                                onChange={(e) => setHandlenew(e.target.value)}>
                            </textarea> */}

                            <input
                                required
                                defaultValue={handle} //passed in from above
                                onChange={(e) => setHandlenew(e.target.value)}
                                style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px' }} />

                            &nbsp;&nbsp;&nbsp;
                            {/* <textarea
                                cols="150"
                                variant="outlined"
                                defaultValue={childrecord}
                                rows={1}
                                onChange={(e) => setTaskrecord(e.target.value)}>
                            </textarea> */}

                            <input
                                required
                                defaultValue={childrecord} //passed in from above
                                onChange={(e) => setTaskrecord(e.target.value)}
                                style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
                        </>
                        :
                        <div className="Font-Calibri-Large-Howto">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{handle}.&nbsp;&nbsp;&nbsp;{childrecord}
                        </div>
                    }
                    </div>

                    <div style={{ display: 'flex', float: 'right' }}>
                        <>
                            {editing === childid ?
                                (
                                    <>
                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(childid)}><AiOutlineCheckCircle style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                                        <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                                    </>
                                )
                                :
                                (
                                    <Tooltip title='Edit Step Entry' placement="top-end">
                                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(childid, childrecord) }}>
                                            <AiOutlineEdit style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '18px' }} /></button>
                                    </Tooltip>
                                )
                            }
                        </>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="Font-Calibri-Large-Howto">
                {taskRecords.map(({ childid, childrecord, parentid, status, date, asms, handle, future }) => (editableTaskRecord(childid, childrecord, parentid, status, date, asms, handle, checkForRecords, setCheckForRecords)))}
            </div>

            <div className="Font-Verdana-Smaller_Insert">
                <Tooltip title='Insert Step Entry' placement="top-end">Insert an Additional Step Entry<button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={toggleAccordion}><MdAddCircleOutline style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
            </div>

            {isExpanded &&
                (
                    <div>
                        <TaskRecordCreate project_handle={project_handle} asms_number={asms_number} parentid={parentid} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                    </div>
                )
            }
        </div>
    );
}

export default TaskRecordAccordion;