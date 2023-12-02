import React, { useState } from 'react';
import TaskRecordCreate from './TaskRecordCreate';
import TaskRecordStatusByColourLong from './TaskRecordStatusByColourLong';
import { getStatusByColourTaskText } from './getStatusByColourTaskText'
import axios from "axios";
import { Tooltip } from '@mui/material';
import { MdOutlineCancel, MdOutlineInput, MdOutlineInsertComment, MdAddCircleOutline } from "react-icons/md";
import { AiOutlineFileAdd, AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";


function TaskRecordAccordion({ alertCtx, project_handle, asms_number, parentid, parenttask, checkForRecords, setCheckForRecords, taskstatus }) {
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const orderedTasks = parenttask.filter((task, key) => { return task.id === parentid });
    // const orderedTasks = parenttask.filter((task, key) => { return task.id === parentid });
    const taskRecords = orderedTasks[0].tasks.sort((a, b) => a.childid - b.childid);
    // const taskRecords = orderedTasks.sort((a, b) => a.childid - b.childid);
    // const taskRecords = orderedTasks;
    // const taskRecords = orderedTasks;
    const [editing, setEditing] = useState(false);
    const [taskrecord, setTaskrecord] = useState(null);
    const date = new Date();
    console.log(parenttask) //so parenttask is good and contains the "tasks"
    console.log(orderedTasks)
    console.log(taskRecords)


    const handleEdit = (id, childrecord) => {
        setEditing(id)
        setTaskrecord(childrecord)
    }

    const onEditCancel = () => {
        setEditing(false);
        setTaskrecord(null);
    }

    const onEditSave = async (childid) => {

        const updatedTaskRecord = {
            'childrecord': taskrecord,
            'date': date,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)

            .catch((error) => { alertCtx.error(error.message); })
        setCheckForRecords(!checkForRecords)
        alertCtx.success(`TaskRecord has been memorialized`);
        onEditCancel();
    }

    function editableTaskRecord(alertCtx, childid, childrecord, parentid, status, date, asms, handle, future, checkForRecords, setCheckForRecords) {
        return (
            <div>
                <div style={{ display: 'flex' }}>
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
                                    status !== 'DONE' ?
                                        <Tooltip title='Edit Step Entry' placement="top-end">
                                            <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(childid, childrecord) }}>
                                                <AiOutlineEdit style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '18px' }} /></button></Tooltip>
                                        :
                                        null
                                )
                            }
                        </>
                    </div>

                    <div>{editing === childid ?
                        <textarea
                            cols="150"
                            variant="outlined"
                            defaultValue={childid}
                            rows={3}
                            onChange={(e) => setTaskrecord(e.target.value)}
                        ></textarea>
                        :
                        <div>
                            {/* <TaskRecordStatusByColourLong childid={childid} childrecord={childrecord} parentid={parentid} status={status} date={date} asms={asms} handle={handle} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
                        {childid}
                        </div>
                    }
                    </div>
                </div>
            </div>
        )
    }

    // if (taskRecords.length > 0) {
    //     if (taskRecords[0].status === 'DONE') {
    //         return (
    //             <div>
    //                 <TaskRecordStatusByColourLong childid={taskRecords[0].childid} childrecord={taskRecords[0].childrecord} parentid={taskRecords[0].parentid} status={taskRecords[0].status} date={taskRecords[0].date} asms={taskRecords[0].asms} handle={taskRecords[0].handle} future={taskRecords[0].future} checkForRecords={taskRecords[0].checkForRecords} setCheckForRecords={taskRecords[0].setCheckForRecords} />
    //                 <div>{taskRecords.slice(1).map(({ childid, childrecord, parentid, date, asms, handle, future }) => (<TaskRecordStatusByColourLong alertCtx={alertCtx} childid={childid} childrecord={childrecord} parentid={parentid} status={'ARCHIVE'} date={date} asms={asms} handle={handle} future={future} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />))}</div>
    //             </div>
    //         )
    //     }
    // }

    return (
        <div>
            <div className='Verdana'>
                {taskRecords.map(({ childid, childrecord, parentid, status, date, asms, handle, future }) => (editableTaskRecord(childid, childrecord, parentid, status, date, asms, handle, checkForRecords, setCheckForRecords)))}
            </div>

            <div>
                {/* <MdAddCircleOutline style={{ color: '#D5441C', fontSize: '20px' }} /> */}
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