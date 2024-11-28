import React, { useState } from 'react';
import HowtoStepRecordCreate from './HowtoStepRecordCreate';
import axios from "axios";
import '../Fonts.css'
import { Tooltip } from '@mui/material';
import { MdAddCircleOutline } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete
import { BsPencil } from 'react-icons/bs'; //Edit
import { ImageUpload } from '../ImageUpload';
import { toast } from 'react-toastify';

function HowtoStepRecordAccordion({ howtodata, step_idd, step_number, step_name, checkForRecords, setCheckForRecords }) {
    const date = new Date();
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [editing, setEditing] = useState(false);
    const [steprecord_number, setStepRecord_number] = useState();
    const [steprecord, setStepRecord] = useState();
    const [steprecord_date, setStepRecord_date] = useState(date);
    const filteredSteps = howtodata.howto_steps.filter((task, key) => { return task.step_id === step_idd });
    const SortedStepRecords = filteredSteps[0].step_records.sort((a, b) => a.steprecord_number - b.steprecord_number);

    const handleEdit = (steprecord_id, newsteprecordnumber, newsteprecord) => 
    {
        setEditing(steprecord_id);
        setStepRecord_number(newsteprecordnumber);
        setStepRecord(newsteprecord);
        setStepRecord_date(date);
    }

    const onEditCancel = () => 
    {
        setEditing(false);
    }

    const onEditSave = async (steprecord_id) => 
    {

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
            .then((response) => {
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
                                <input
                                    required
                                    defaultValue={steprecord_number}
                                    onChange={(e) => setStepRecord_number(e.target.value)}
                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px', padding: 0, paddingLeft: '9px', }} />
                                &nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={steprecord}
                                    onChange={(e) => setStepRecord(e.target.value)}
                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1200px' }} />
                            </>
                            :
                            <div className="Font-Segoe-Large-Howto">
                                <span style={{ fontSize: 'medium', color: 'black', cursor: 'pointer' }}>{step_number}.{steprecord_number})</span>
                                &nbsp;
                                <span className="steprecordhover">{steprecord}</span>
                                &nbsp;&nbsp;&nbsp;
                            </div>
                        }
                    </div>

                    <div style={{ display: 'flex', float: 'right' }}>
                        <>
                            {editing === steprecord_id ?
                                (
                                    <>&nbsp;&nbsp;
                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(steprecord_id)}><GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Purge' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditDelete(steprecord_id)}>< FaRegTrashAlt style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                    </>
                                )
                                :
                                (
                                    <Tooltip title={`Edit StepRecord: ${steprecord_id}`} placement="top-end">
                                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(steprecord_id, steprecord_number, steprecord) }}>
                                            <BsPencil style={{ color: '#C0C0C0', display: 'round', margin: 'auto', fontSize: '15px' }} /></button>
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
                <Tooltip title='Insert an additional Step Record' placement="top"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={toggleAccordion}><MdAddCircleOutline style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>

                <ImageUpload stepidfk={step_idd} parentstepname={step_name} parentstepid={step_idd} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
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

export default HowtoStepRecordAccordion;