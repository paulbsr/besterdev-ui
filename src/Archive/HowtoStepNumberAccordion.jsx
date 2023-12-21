
import React, { useState } from 'react';
import HowtoStepNumberCreate from './HowtoStepNumberCreate';
import TaskRecordStatusByColourLong from '../TaskRecordStatusByColourLong';
import { getStatusByColourTaskText } from '../getStatusByColourTaskText'
import axios from "axios";
import { Tooltip } from '@mui/material';
import { MdOutlineCancel, MdOutlineInput, MdOutlineInsertComment } from "react-icons/md";
import { AiOutlineFileAdd, AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { toast } from 'react-toastify';


function HowtoStepNumberAccordion({ alertCtx, project_handle, activeAccount, asms_number, parentid, parenttask, checkForRecords, setCheckForRecords, taskstatus }) {
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    // const orderedTasks = parenttask.filter((task, key) => { return task.id === parentid });
    // const taskRecords = orderedTasks[0].tasks.sort((a, b) => new Date(b.date[0], b.date[1], b.date[2]) - new Date(a.date[0], a.date[1], a.date[2]) || b.childid - a.childid);
    const [editing, setEditing] = useState(false);
    const [taskrecord, setTaskrecord] = useState(null);
    const date = new Date();

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

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
            .catch((error) => { alertCtx.error(error.message); })
        setCheckForRecords(!checkForRecords)
        alertCtx.success(`TaskRecord has been memorialized`);
        toast.success(`Toastify test.`)
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
                                        <Tooltip title='Edit Task Record' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(childid, childrecord) }}><AiOutlineEdit style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '18px' }} /></button></Tooltip>
                                        :
                                        null
                                )
                            }
                        </>
                    </div>

                    <div>{editing === childid ?
                        <textarea
                            cols="70"
                            variant="outlined"
                            defaultValue={taskrecord}
                            rows={3}
                            onChange={(e) => setTaskrecord(e.target.value)}
                        ></textarea>
                        :
                        <div><TaskRecordStatusByColourLong alertCtx={alertCtx} childid={childid} childrecord={childrecord} parentid={parentid} status={status} date={date} asms={asms} handle={handle} future={future} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                        </div>}
                    </div>
                </div>
            </div>
        )
    }

    // if (taskRecords.length > 0) {
    //     if (taskRecords[0].status === 'DONE') {
    //         return (
    //             <div>
    //                 <TaskRecordStatusByColourLong alertCtx={alertCtx} childid={taskRecords[0].childid} childrecord={taskRecords[0].childrecord} parentid={taskRecords[0].parentid} status={taskRecords[0].status} date={taskRecords[0].date} asms={taskRecords[0].asms} handle={taskRecords[0].handle} future={taskRecords[0].future} checkForRecords={taskRecords[0].checkForRecords} setCheckForRecords={taskRecords[0].setCheckForRecords} />
    //                 <div>{taskRecords.slice(1).map(({ childid, childrecord, parentid, date, asms, handle, future }) => (<TaskRecordStatusByColourLong alertCtx={alertCtx} childid={childid} childrecord={childrecord} parentid={parentid} status={'ARCHIVE'} date={date} asms={asms} handle={handle} future={future} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />))}</div>
    //             </div>
    //         )
    //     }
    // }


    // return (
    //     <div>
    //         {activeAccount.idTokenClaims.roles.includes('user.Read') || activeAccount.idTokenClaims.roles.includes('user.Manager') || activeAccount.idTokenClaims.roles.includes('user.Admin') ?
    //             <div style={{ color: getStatusByColourTaskText(taskstatus) }} onClick={toggleAccordion}><u>STATUS</u>:&nbsp;<Tooltip title='Edit Task Record' placement="top-end"><MdOutlineInsertComment style={{ color: '#D5441C', fontSize: '20px' }} /></Tooltip></div>
    //             :
    //             <div style={{ color: getStatusByColourTaskText(taskstatus) }}><u>STATUS</u>:&nbsp;<Tooltip title='Edit Task Record' placement="top-end"><MdOutlineInput fontSize='small' /></Tooltip></div>}

    //         {isExpanded && (
    //             <div>
    //                 <HowtoStepNumberCreate project_handle={project_handle} asms_number={asms_number} parentid={parentid} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /></div>)}
    //         <div className='Verdana'>{taskRecords.map(({ childid, childrecord, parentid, status, date, asms, handle, future }) => (editableTaskRecord(alertCtx, childid, childrecord, parentid, status, date, asms, handle, future, checkForRecords, setCheckForRecords)))}</div>
    //     </div>
    // );
}

export default HowtoStepNumberAccordion;