import React, { useState, useContext } from 'react';
import '../Fonts.css'
import axios from 'axios'
import { Tooltip } from '@mui/material';
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { toast } from 'react-toastify';
import MyCVEmployerRoles from './MyCVEmployerRoles';
import Tenure from './Tenure';

export default function MyCVEmployers({ mycvdata, employer_id, employer_name, employer_start, employer_end, employer_summary, checkForRecords, setCheckForRecords }) {

    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [editing, setEditing] = useState(false);
    const [employername, setEmployername] = useState();
    const [employerstart, setEmployerstart] = useState();
    const [employerend, setEmployerend] = useState();
    const [employersummary, setEmployersummary] = useState();

    const tenure = {employer_start} - {employer_end}

    const handleEdit = () => 
    {
        setEmployername(employer_name)
        setEmployerstart(employer_start)
        setEmployerend(employer_end)
        setEmployersummary(employer_summary)
        setEditing(true)
    }

    const onEditCancel = () => 
    {
        setEditing(false);
    }

    const onEditSave = async () => 
    {
        const updatedEmployer =
        {
            'employer_name': employername,
            'employer_start': employerstart,
            'employer_end': employerend,
            'employer_summary': employersummary,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtostep/update/${employer_id}`, updatedEmployer)
            .then((response) => {
                setCheckForRecords(!checkForRecords);
                toast.success(`${employer_name} updated.`)
            }
            )
        onEditCancel();
    }


    return (
        <>
            <div className="Font-Segoe-Large-Howto" >
                <div style={{ display: 'flex', float: 'right' }}>
                    <>
                        {editing === true ?
                            (
                                <>
                                    &nbsp;&nbsp;
                                    <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave()}><GiCheckMark style={{ color: '#D5441C', display: 'block', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>&nbsp;
                                    <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'block', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                </>
                            )
                            :
                            (
                                isExpanded && employer_name !== 'DONE' ?
                                    <Tooltip title='Edit Employer' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit() }}><AiOutlineEdit style={{ color: '#DDDDDD', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                                    :
                                    null
                            )
                        }
                    </>
                </div>

                {editing === true ?
                    <>
                        <i>Employer:</i>&nbsp;  &nbsp;

                        <input
                            required
                            defaultValue={employer_name}
                            onChange={(e) => setEmployername(e.target.value)}
                            style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '400px' }} />
                        <div className="Font-Spacer-White">Make this Spacer White</div>

                    </>
                    :
                    <i onClick={toggleAccordion}><b>{employer_name}</b></i>
                }&nbsp;&nbsp; <Tenure startYear={employer_start} endYear={employer_end} /> between {employer_start} and {employer_end}
                
            </div>

            {isExpanded &&
                <div>
                    <div className="Font-Segoe-Large-Howto" >

                        {mycvdata.employer_roles && mycvdata.employer_roles.map((role) =>
                        (
                            <tbody>
                                {

                                    <tr>
                                        <td>
                                        </td>
                                    </tr>

                                }
                            </tbody>
                        )
                        )
                        }

                        {editing === true ?
                            <><i>Summary:</i>&nbsp; &nbsp;<>
                                <textarea
                                    rows="1"
                                    required
                                    defaultValue={employer_id}
                                    onChange={(e) => setEmployersummary(e.target.value)}
                                    size='Large'
                                    style={{ fontFamily: 'Calibri', fontSize: 'Large', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '900px' }} />

                                <div className='Font-Spacer-White'>Make this Spacer White</div>
                            </>
                            </>
                            :
                            // <div> From {employer_start} to {employer_end}</div>
                            <div className='Font-Spacer-White'>Make this Spacer White</div>
                        }
                    </div>
                    <MyCVEmployerRoles mycvdata1={mycvdata} employer_id1={employer_id} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                </div>
            }
        </>
    );
}
