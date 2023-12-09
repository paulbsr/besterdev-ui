import React, { useState } from 'react';
import New_TaskRecordCreate from './New_TaskRecordCreate';
import axios from "axios";
import './Fonts.css'
import { Tooltip } from '@mui/material';
import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { toast } from 'react-toastify';


function New_TaskRecordAccordion({ howtodata, step_idd, checkForRecords, setCheckForRecords }) {
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const filteredSteps1 = howtodata.howto_steps.filter((steps) => steps.step_id === step_idd);
    const filteredSteps = howtodata.howto_steps.filter((task, key) => { return task.step_id === step_idd });
    const SortedStepRecords = filteredSteps[0].step_records.sort((a, b) => a.steprecord_number - b.steprecord_number);
    const [editing, setEditing] = useState(false);
    const [taskrecord, setTaskrecord] = useState(null);
    const [handle, setHandle] = useState(); 
    const date = new Date();

    const handleEdit = (id, childrecord, handle) => {
        setEditing(id);
        setTaskrecord(childrecord);
        setHandle(handle);
    }

    const onEditCancel = () => {
        setEditing(false);
        // setTaskrecord(null);
        // setHandles();
    }

    const onEditSave = async (childid) => {

        // const updatedTaskRecord = {
        //     'parentid': parentids,
        //     'childrecord': taskrecord,
        //     'date': date,
        //     'handle': handle,
        // }

        // const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
        // const response = await axios.put(`http://localhost:8000/api/v1/taskrecords/update/${childid}`, updatedTaskRecord)
        setCheckForRecords(!checkForRecords)
        toast.success(`Step Record amended.`)
        onEditCancel();
    }

    function editableStepRecord(steprecord_id, steprecord_number, steprecord, checkForRecords, setCheckForRecords) {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div>
                        {editing === steprecord_id ?
                            <>
                                &nbsp;&nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={steprecord_number} //passed in from above
                                    onChange={(e) => setHandle(e.target.value)}
                                    style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px', padding: 0, paddingLeft: '9px', }} />
                                &nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={steprecord} //passed in from above
                                    onChange={(e) => setTaskrecord(e.target.value)}
                                    style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
                            </>
                            :
                            <div className="Font-Calibri-Large-Howto">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{steprecord_number}.&nbsp;&nbsp;&nbsp;{steprecord}
                            </div>
                        }
                    </div>

                    <div style={{ display: 'flex', float: 'right' }}>
                        <>
                            {editing === steprecord_id ?
                                (
                                    <>&nbsp;&nbsp;
                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(steprecord_number)}><AiOutlineCheckCircle style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>&nbsp;
                                        <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                                    </>
                                )
                                :
                                (
                                    <Tooltip title='Edit Step Entry' placement="top-end">
                                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(steprecord_id, steprecord_number, steprecord) }}>
                                            <AiOutlineEdit style={{ color: '#DDDDDD', display: 'round', margin: 'auto', fontSize: '18px' }} /></button>
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
        <div className='Font-Verdana-XSmall'>
            <div>
                {SortedStepRecords.map(({ steprecord_id, steprecord_number, steprecord }) => (editableStepRecord(steprecord_id, steprecord_number, steprecord, checkForRecords, setCheckForRecords)))}
            </div>

            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip title='Insert Step Entry' placement="top-end">Insert an additional Step Entry<button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={toggleAccordion}><MdAddCircleOutline style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
            </div>

            {isExpanded &&
                (
                    <div>
                        {/* <New_TaskRecordCreate project_handle={project_handle} asms_number={asms_number} parentid={parentid} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
                    </div>
                )
            }
        </div>
    );

    
}

export default New_TaskRecordAccordion;