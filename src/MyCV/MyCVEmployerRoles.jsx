import React, { useState } from 'react';
import HowtoStepRecordCreate from '../HowtoStepRecordCreate';
import axios from "axios";
import '../Fonts.css'
import { Tooltip } from '@mui/material';
import { MdAddCircleOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from 'react-toastify';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete

function MyCVEmployerRoles({ mycvdata1, employer_id1, role_id1, step_number, checkForRecords, setCheckForRecords }) {
    const date = new Date();
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    // const filteredRoles = mycvdata1.employer_roles.filter((task, key) => { return task.role_id === role_id1 });
    // const SortedStepRecords = filteredRoles[0].step_records.sort((a, b) => a.steprecord_number - b.steprecord_number);
    const [editing, setEditing] = useState(false);
    const [steprecord_number, setStepRecord_number] = useState();
    const [steprecord, setStepRecord] = useState();
    const [steprecord_date, setStepRecord_date] = useState(date);

    const role_id11 = employer_id1; // Replace with the desired role_id

    const filteredRoles = mycvdata1.reduce((accumulator, currentEmployer) => {
    const filteredRolesForEmployer = currentEmployer.employer_roles.filter(role => role.role_id === role_id11);
    return accumulator.concat(filteredRolesForEmployer);
    }, []);


// const SortedRoles = filteredRoles[0].employer_roles.sort((a, b) => a.role_id - b.role_id);
const sortedRoles = filteredRoles.sort((a, b) => a.role_id - b.role_id);


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

        const MyCVEmployerRolePUT = 
        {
            'steprecord_number': steprecord_number,
            'steprecord': steprecord,
            'steprecord_date': steprecord_date,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/update/${steprecord_id}`, MyCVEmployerRolePUT)
        setCheckForRecords(!checkForRecords)
        toast.success(`Employer Role amended.`)
        onEditCancel();
    }

    const onEditDelete = (steprecord_id) => {
        axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/delete/${steprecord_id}`)
          .then((response) => {
            setCheckForRecords(!checkForRecords);
            toast.success(`${steprecord_id} purged.`)
          }
          )
      };

    function editableStepRecord(steprecord_id, steprecord_number, steprecord, role_id, role_desc, checkForRecords, setCheckForRecords) {
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
                                    style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px', padding: 0, paddingLeft: '9px', }} />
                                &nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={steprecord_number}
                                    onChange={(e) => setStepRecord(e.target.value)}
                                    style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1010px' }} />
                            </>
                            :
                            <div className="Font-Segoe-Large-Howto">
                                <b style={{ fontSize: 'medium', color: 'black'}}>{role_id}Uitstaande.{steprecord})</b>
                                &nbsp;&nbsp;&nbsp;Hierdie is korrek: {steprecord_number}{role_desc}
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

console.log(sortedRoles)
    return (
        <div>
            <div>
                {sortedRoles.map(({ role_id, role_name, role_desc, role_start, role_end }) => (editableStepRecord(role_id, role_name, role_desc, role_start, role_end, checkForRecords, setCheckForRecords)))}
            </div>

            <div className='Font-Verdana-Small'>
                <Tooltip title='Insert an additional Role' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={toggleAccordion}><MdAddCircleOutline style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button>&nbsp;Insert an additional Role</Tooltip>
            </div>

            {isExpanded &&
                (
                    <div>
                        <HowtoStepRecordCreate role_id={role_id1} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                    </div>
                )
            }
        </div>
    );
}

export default MyCVEmployerRoles;