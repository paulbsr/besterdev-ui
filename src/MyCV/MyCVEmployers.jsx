import React, { useState, useContext } from 'react';
import '../Fonts.css'
import axios from 'axios'
import { Tooltip } from '@mui/material';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { toast } from 'react-toastify';
import MyCVEmployerRoles from './MyCVEmployerRoles';
import Tenure from './Tenure';
import { BsPencil } from "react-icons/bs";
import GM from './GM.png'
import { MdReadMore } from "react-icons/md";
import { Image } from 'react-bootstrap';



export default function MyCVEmployers({ mycvdata, employer_id, employer_name, employer_start, employer_end, employer_desc, checkForRecords, setCheckForRecords }) {

    const [editing, setEditing] = useState(false);
    const [employerdesc, setEmployerdesc] = useState();
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };

    const tenure = {employer_start} - {employer_end}

    const handleEdit = () => 
    {
        setEmployerdesc(employer_desc)
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
            'employer_desc': employerdesc
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employer_desc/update/${employer_id}`, updatedEmployer)
            .then((response) => {
                setCheckForRecords(!checkForRecords);
                toast.success(`${employer_name} updated.`)
            }
            )
        onEditCancel();
    }

    const employerImages = 
    {
        "General Motors IT Services Ireland (GMISI)": require('./GM.png'),
        "Hewlett Packard": require('./HP.png'),
        "Dell Inc.": require('./DELL.png'),
        "Bryan S Ryan": require('./BSR.jpg'),
    };
      


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
                                isExpanded && employer_name ?
                                    <Tooltip title='Edit Employer' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit() }}><BsPencil style={{ color: '#DDDDDD', display: 'block', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
                                    :
                                    null
                            )
                        }
                    </>
                </div>

                {editing === true ?
                    <>
                        {/* <i>Employer:</i>&nbsp;  &nbsp;

                        <input
                            required
                            defaultValue={employer_name}
                            onChange={(e) => setEmployername(e.target.value)}
                            style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '400px' }} />
                        <div className="Font-Spacer-White">Make this Spacer White</div> */}

                    </>
                    :
                    <>
                    <i style={{ cursor: 'pointer' }} onClick={toggleAccordion}>
                        {/* <img src={GM} width="25" height="25" />&nbsp;&nbsp;<b>{employer_name}</b> */}
                    <Image src={employerImages[employer_name]} width="40" height="40" alt="Employer Logo" />&nbsp;&nbsp;<b>{employer_name}</b>
                    </i>
                    </>
                }
                
                &nbsp;&nbsp; <Tenure startYear={employer_start} endYear={employer_end} /> between {employer_start} and {employer_end}
                
            </div>

            {isExpanded &&
            
                <div>{employer_desc}
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
                            <><>
                                <textarea
                                    rows="5"
                                    required
                                    defaultValue={employer_desc}
                                    onChange={(e) => setEmployerdesc(e.target.value)}
                                    size='Large'
                                    style={{ fontFamily: 'Calibri', fontStyle: 'italic',fontSize: 'Large', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1150px' }} />

                                <div className='Font-Spacer-White'>Make this Spacer White</div>
                            </>
                            </>
                            :
                            <div className='Font-Spacer-White'>Make this Spacer White</div>
                        }
                    </div>
                    <MyCVEmployerRoles mycvdata1={mycvdata} employer_id1={employer_id} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                </div>
            }
        </>
    );
}
