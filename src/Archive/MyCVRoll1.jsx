import React, { useState } from 'react';
import HowtoStepRecordCreate from './HowtoStepRecordCreate';
import axios from "axios";
import './Fonts.css'
import { Tooltip } from '@mui/material';
import { MdAddCircleOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from 'react-toastify';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete

function MyCVRoll1({ howtodata, step_idd, step_number, checkForRecords, setCheckForRecords }) {
    const date = new Date();
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const filteredSteps = howtodata.howto_steps.filter((task, key) => { return task.step_id === step_idd });
    const SortedStepRecords = filteredSteps[0].step_records.sort((a, b) => a.steprecord_number - b.steprecord_number);
    const [editing, setEditing] = useState(false);
    const [steprecord_number, setStepRecord_number] = useState();
    const [steprecord, setStepRecord] = useState();
    const [steprecord_date, setStepRecord_date] = useState(date);

    const handleEdit = (steprecord_id, newsteprecordnumber, newsteprecord ) => {
        setEditing(steprecord_id);
        setStepRecord_number(newsteprecordnumber);
        setStepRecord(newsteprecord);
        setStepRecord_date(date);
    }

    const onEditCancel = () => 
    {
        setEditing(false);
    }

    const onEditSave = async (steprecord_id) => {

        const StepRecordPUT = 
        {
            'steprecord_number': steprecord_number,
            'steprecord': steprecord,
            'steprecord_date': steprecord_date,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/update/${steprecord_id}`, StepRecordPUT)
        setCheckForRecords(!checkForRecords)
        toast.success(`Step Record amended.`)
        onEditCancel();
    }

    const onEditDelete = (steprecord_id) => {
        axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/delete/${steprecord_id}`)
          .then((response) => 
          {
            window.alert('Are you sure you want to delete');
            setCheckForRecords(!checkForRecords);
            toast.success(`${steprecord_id} purged.`)
          }
          )
      };

    function editableStepRecord(steprecord_id, steprecord_number, steprecord, checkForRecords, setCheckForRecords) {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div>
                        {editing === steprecord_id ?
                            <>
                                {/* &nbsp;&nbsp;&nbsp; */}

                                <input
                                    required
                                    defaultValue={steprecord_number}
                                    onChange={(e) => setStepRecord_number(e.target.value)}
                                    style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px', padding: 0, paddingLeft: '9px', }} />
                                &nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={steprecord}
                                    onChange={(e) => setStepRecord(e.target.value)}
                                    style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1200px' }} />
                            </>
                            :
                            <div className="Font-Segoe-Large-Howto">
                                <b style={{ fontSize: 'medium', color: 'black'}}>{step_number}.{steprecord_number})</b>
                                &nbsp;&nbsp;&nbsp;
                                {steprecord}
                                &nbsp;&nbsp;&nbsp;
                            </div>
                        }
                    </div>

                    <div style={{ display: 'flex', float: 'right' }}>
                        <>
                            {editing === steprecord_id ?
                                (
                                    <>&nbsp;&nbsp;
                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(steprecord_id)}><GiCheckMark  style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Purge' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditDelete(steprecord_id)}>< FaRegTrashAlt style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                    </>
                                )
                                :
                                (
                                    <Tooltip title='Edit Step Record' placement="top-end">
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
        <div>
            <div>
                {SortedStepRecords.map(({ steprecord_id, steprecord_number, steprecord }) => (editableStepRecord(steprecord_id, steprecord_number, steprecord, checkForRecords, setCheckForRecords)))}
            </div>

            <div className='Font-Verdana-Small'>
                <Tooltip title='Insert an additional Step Record' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={toggleAccordion}><MdAddCircleOutline style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button>&nbsp;Insert an additional Step Record</Tooltip>
            </div>

            {isExpanded &&
                (
                    <div>
                        <HowtoStepRecordCreate step_idd={step_idd} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                    </div>
                )
            }
        </div>
    );
}

export default MyCVRoll1;