import React, { useState } from 'react';
import axios from "axios";
import '../Fonts.css'
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete
import Tenure from './Tenure';
import MyCVEmployerRoleDetails from './MyCVEmployerRoleDetails';
import { BsPencil } from "react-icons/bs";

function MyCVEmployerRoles({ mycvdata1, employer_id1, role_id1, step_number, checkForRecords, setCheckForRecords }) {
    const date = new Date();
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [editing, setEditing] = useState(false);
    const [role_name, setRole_name] = useState();
    const [role_desc, setRole_desc] = useState();
    const [roledesc1, setRoledesc1] = useState("BALSAKKE");
    const filteredEmployers = mycvdata1.filter(employer => employer.employer_id === employer_id1);
    const filteredRoles = filteredEmployers[0].employer_roles;
    const sortedRoles = filteredRoles.sort((a, b) => b.role_id - a.role_id);

    const handleEdit = (steprecord_id, newsteprecordnumber, newsteprecord) => {
        setEditing(steprecord_id);
        setRole_name(date);
        setRole_desc(newsteprecordnumber);
    }

    const onEditCancel = () => {
        setEditing(false);
    }

    const onEditSave = async (steprecord_id) => {
        const MyCVEmployerRolePUT =
        {
            'role_name': role_name,
            'role_desc': role_desc,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/update/${steprecord_id}`, MyCVEmployerRolePUT)
        setCheckForRecords(!checkForRecords)
        toast.success(`Employer Role amended.`)
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

    function editableEmployerRole(role_id, role_name, role_desc, role_start, role_end) {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div>
                        {editing === role_id ?
                            <>
                                <input
                                    required
                                    defaultValue={role_name}
                                    onChange={(e) => setRole_name(e.target.value)}
                                    style={{ fontFamily: 'Calibri', fontStyle: 'Italic', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '250px' }} />
                                &nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={role_desc}
                                    onChange={(e) => setRole_desc(e.target.value)} 
                                    style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '9px', width: '800px' }} />
                            </>
                            :
                            <div className="Font-Segoe-Medium-Howto-CV">
                                <i onClick={toggleAccordion}><b>{role_name}</b></i>&nbsp; &nbsp;(<Tenure startYear={role_start} endYear={role_end} />)
                            </div>
                        }
                    </div>

                    <div style={{ display: 'flex', float: 'right' }}>
                        <>
                            {editing === role_id ?
                                (
                                    <>&nbsp;&nbsp;
                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(role_id)}><GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Purge' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditDelete(role_id)}>< FaRegTrashAlt style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                    </>
                                )
                                :
                                (
                                    <Tooltip title='Edit Step Record' placement="top-end">
                                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(role_id, role_desc) }}>
                                            <BsPencil style={{ color: '#DDDDDD', display: 'round', margin: 'auto', fontSize: '15px' }} /></button>
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
            <div >
            </div>


            
            {sortedRoles.map(({ role_id, role_name, role_desc, role_start, role_end }) => (
                <React.Fragment>
                    {editableEmployerRole(role_id, role_name, role_desc, role_start, role_end)}
                    
                    {isExpanded &&
                        (
                            <div className='Font-Segoe-Medium-Howto-CV'>{role_desc}
                                <MyCVEmployerRoleDetails mycvdata2={mycvdata1} employer_id2={employer_id1} role_id2={role_id} role_idd={role_id}/>
                                &nbsp;
                            </div>
                        )
                    }
                </React.Fragment>
            )
            )
            }
            
        </div>
    </div>
);

}

export default MyCVEmployerRoles;

