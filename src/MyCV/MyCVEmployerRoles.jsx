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
import { Image } from 'react-bootstrap';


function MyCVEmployerRoles({ mycvdata1, employer_id1, employer_name, checkForRecords, setCheckForRecords }) {
    const [editing, setEditing] = useState(false);
    const [roledesc, setRole_desc] = useState();
    const [expandedRole, setExpandedRole] = useState(null);
    const toggleAccordionRoles = () => { setExpandedRoles(!isExpandedRoles); };
    const [isExpandedRoles, setExpandedRoles] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };

    const filteredEmployers = mycvdata1.filter(employer => employer.employer_id === employer_id1);

    const filteredRoles = filteredEmployers[0].employer_roles;

    const sortedRoles = filteredRoles.sort((a, b) => b.role_id - a.role_id);

    const handleRoleClick = (role_id) => { setExpandedRole(expandedRole === role_id ? null : role_id); };

    const handleEdit = (role_id, role_desc) => {
        setEditing(role_id);
        setRole_desc(role_desc);
    }

    const onEditCancel = () => { setEditing(false); }

    const onEditSave = async (role_id, role_name) => {
        const MyCVEmployerRolePUT =
        {
            'role_desc': roledesc
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/role_desc/update/${role_id}`, MyCVEmployerRolePUT)
        setCheckForRecords(!checkForRecords)
        toast.success(`${role_id} amended.`)
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

    const employerImages =
    {
        "GM": require('./GM.png'),
        "HP": require('./HP.png'),
        "DELL": require('./DELL.png'),
        "BSR": require('./BSR.jpg'),
    };

    function editableEmployerRole(role_id, role_desc) {
        return (
            <div style={{ display: 'flex', float: 'right' }}>
                {
                    editing === role_id ?
                        <textarea
                            required
                            defaultValue={role_desc}
                            onChange={(e) => setRole_desc(e.target.value)}
                            style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '80.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '9px', width: '1150px' }} />
                        :
                        null
                }


                <div style={{ display: 'flex', float: 'right' }}>

                    {editing === role_id ?
                        (
                            <>
                                <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(role_id)}><GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                <Tooltip title='Purge' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditDelete(role_id)}>< FaRegTrashAlt style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                            </>
                        )
                        :
                        (
                            <Tooltip title='Edit the Role Description' placement="top-end">
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(role_id, role_desc) }}>
                                    <BsPencil style={{ color: '#DDDDDD', display: 'round', margin: 'auto', fontSize: '15px' }} /></button>
                            </Tooltip>
                        )
                    }
                </div>
            </div>
        )
    }


    return (
        <table className="TableCV" style={{ width: '1350px' }}>
            {sortedRoles && sortedRoles.map((role) => (
                <tbody>
                    {
                        <tr>

                            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={() => handleRoleClick(role.role_id)} style={{ cursor: 'pointer' }}>
                                <Image src={employerImages[role.role_employer]} width="27" height="27" alt="Employer Logo" />
                                    &nbsp;&nbsp;
                                    {role.role_name}
                                
                                &nbsp;-&nbsp;
                                <Tenure startYear={role.role_start} endYear={role.role_end} /> from {role.role_start} to {role.role_end}
                            </div>


                            {expandedRole === role.role_id &&
                                <i className="Font-Segoe-Large-Howto">
                                    <MyCVEmployerRoleDetails mycvdata2={mycvdata1} employer_id2={employer_id1} role_id2={role.role_id} role_idd={role.role_id} role_desc={role.role_desc} role_name={role.role_name} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                                </i>
                            }
                        
                        </tr>
                    }
                    <div>&nbsp;</div>
                </tbody>
            )
            )
            }
        </table>
    );
}

export default MyCVEmployerRoles;