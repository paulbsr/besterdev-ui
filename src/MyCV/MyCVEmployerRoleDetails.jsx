import React, { useState } from 'react';
import axios from "axios";
import '../Fonts.css'
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete
import { BsPencil } from "react-icons/bs";
import MyCVEmployerRoleDetailsCreate from './MyCVEmployerRoleDetailsCreate';
import { MdAddCircleOutline } from "react-icons/md";


function MyCVEmployerRoleDetails({ mycvdata2, employer_id2, role_id2, role_idd, role_desc, role_name, checkForRecords, setCheckForRecords }) {
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [editing, setEditing] = useState(false);
    const [roledetail_name, setRoledetail_name] = useState();
    const [roledetail_desc, setRoledetail_desc] = useState();
    const filteredEmployers = mycvdata2.filter(employer => employer.employer_id === employer_id2); //HIERDIE WERK GOED, HY RETURN SLEGS DIE EMPLOYER WAAROP JY KLIEK!
    const filteredRoles = filteredEmployers[0].employer_roles.sort((a, b) => b.role_id - a.role_id); //HIERDIE WER GOED,  HY RETURN SLEGS DIE ROLLE VIR DIE GEGEWE EMPLOYER!
    const specificRole = filteredRoles.filter((detail, key) => { return detail.role_id === role_idd });
    const filteredRoleDetails = specificRole[0].role_detail.sort((a, b) => b.roledetail_id - a.roledetail_id);


    const handleEdit = (roledetail_id, newroledetailname, newroledetaildesc) => {
        setEditing(roledetail_id);
        setRoledetail_name(newroledetailname);
        setRoledetail_desc(newroledetaildesc);
    }

    const onEditCancel = () => {
        setEditing(false);
    }

    const onEditSave = async (roledetail_id) => {
        const RoleDetailPUT =
        {
            'roledetail_name': roledetail_name,
            'roledetail_desc': roledetail_desc,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/role_detail/update/${roledetail_id}`, RoleDetailPUT)
        setCheckForRecords(!checkForRecords)
        toast.success(`Role Detail amended. ${roledetail_id} ${roledetail_name} ${roledetail_desc}`)
        onEditCancel();
    }


    const onEditDelete = (roledetail_id) => {
        axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/delete/${roledetail_id}`)
            .then((response) => 
            {
                window.alert('Are you sure you want to delete');
                setCheckForRecords(!checkForRecords);
                toast.success(`${roledetail_id} purged.`)
            }
            )
    };

    function editableEmployerRoleDetails(roledetail_id, roledetail_name, roledetail_desc, checkForRecords, setCheckForRecords) {
        return (
            <div >
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <div>
                        {editing === roledetail_id ?
                            <>&nbsp;
                                <GiCheckMark style={{ color: '#336791', display: 'round', margin: 'auto', fontSize: '10px' }} />
                                &nbsp;&nbsp;
                                <input
                                    required
                                    defaultValue={roledetail_name}
                                    onChange={(e) => setRoledetail_name(e.target.value)}
                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '200px', padding: 0, paddingLeft: '2px', }} />
                                &nbsp;&nbsp;

                                <input
                                    required
                                    defaultValue={roledetail_desc}
                                    onChange={(e) => setRoledetail_desc(e.target.value)}
                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '800px', padding: 0, paddingLeft: '9px', }} />
                            </>
                            :
                            <div className="mycvhover">
                                &nbsp;
                                <GiCheckMark style={{ color: '#336791', display: 'round', margin: 'auto', fontSize: '10px' }} />
                                &nbsp;&nbsp;
                                {roledetail_name}&nbsp; - &nbsp;{roledetail_desc}
                            </div>
                        }
                    </div>

                    <div style={{ display: 'flex', float: 'right' }}>
                        <>
                            {editing === roledetail_id ?
                                (
                                    <>&nbsp;&nbsp;
                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(roledetail_id)}><GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                        <Tooltip title='Purge' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditDelete(roledetail_id)}>< FaRegTrashAlt style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                    </>
                                )
                                :
                                (
                                    <Tooltip title='Edit Role Detail' placement="top-end">&nbsp;&nbsp;
                                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(roledetail_id, roledetail_name, roledetail_desc) }}>
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
            <div className="mycvhover" style={{ cursor: 'pointer' }}>{role_desc}</div>

            {filteredRoleDetails.map(({ roledetail_id, roledetail_name, roledetail_desc }) => (
                <div>
                    {editableEmployerRoleDetails(roledetail_id, roledetail_name, roledetail_desc, checkForRecords, setCheckForRecords)}
                </div>
            )
            )
            }

            <div className='Font-Verdana-Small'>
                <Tooltip title='Insert additional Role Deatil' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={toggleAccordion}><MdAddCircleOutline style={{ color: '#DDDDDD', display: 'block', margin: 'auto', fontSize: '20px' }} /></button>&nbsp;Insert additional Role Deatil</Tooltip>
            </div>

            {isExpanded &&
                (
                    <div>
                        <MyCVEmployerRoleDetailsCreate parent_role_id1={role_idd} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                    </div>
                )
            }
        </div>
    );
}

export default MyCVEmployerRoleDetails;