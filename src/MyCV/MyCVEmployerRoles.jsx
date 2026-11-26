import React, { useState } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../Fonts.css'
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete
import Tenure from './Tenure';
import MyCVEmployerRoleDetails from './MyCVEmployerRoleDetails';
import { BsPencil } from "react-icons/bs";
// import { Image } from 'react-bootstrap';


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

        const response = await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/role_desc/update/${role_id}`, MyCVEmployerRolePUT)
        setCheckForRecords(!checkForRecords)
        toast.success(`${role_id} amended.`)
        onEditCancel();
    }

    const onEditDelete = (steprecord_id) => {
        OAuth2APIClient.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/delete/${steprecord_id}`)
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
            <div style={{ display: 'flex', width: editing === role_id ? '100%' : undefined, justifyContent: 'flex-end' }}>
                {
                    editing === role_id ?
                        <textarea
                            required
                            defaultValue={role_desc}
                            onChange={(e) => setRole_desc(e.target.value)}
                            style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '80.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '9px', flex: '1 1 auto', minWidth: 0 }} />
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
        <div className="cv-role-list">
            {sortedRoles && sortedRoles.map((role) => {
                const isRoleExpanded = expandedRole === role.role_id;
                const detailsId = `cv-role-details-${role.role_id}`;
                const isManagerSoftwareEngineering =
                    role.role_name?.trim().toLowerCase() === 'manager, software engineering';
                const startYear = isManagerSoftwareEngineering ? 2020 : role.role_start;
                const endYear = isManagerSoftwareEngineering ? 2026 : role.role_end;

                return (
                    <article className="cv-role" key={role.role_id}>
                        <button
                            className="cv-role-toggle"
                            type="button"
                            aria-expanded={isRoleExpanded}
                            aria-controls={detailsId}
                            onClick={() => handleRoleClick(role.role_id)}
                        >
                            <span>{role.role_name}</span>
                            <span className="cv-role-dates">
                                <Tenure startYear={startYear} endYear={endYear} />
                                {' '}· {startYear} – {endYear || 'Present'}
                            </span>
                        </button>
                        {isRoleExpanded && (
                            <div className="cv-role-details" id={detailsId}>
                                <MyCVEmployerRoleDetails
                                    mycvdata2={mycvdata1}
                                    employer_id2={employer_id1}
                                    role_id2={role.role_id}
                                    role_idd={role.role_id}
                                    role_desc={role.role_desc}
                                    role_name={role.role_name}
                                    checkForRecords={checkForRecords}
                                    setCheckForRecords={setCheckForRecords}
                                />
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
}

export default MyCVEmployerRoles;