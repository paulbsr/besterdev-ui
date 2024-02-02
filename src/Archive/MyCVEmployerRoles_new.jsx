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

export default function MyCVEmployerRoles_new({ mycvdata1, employer_id1, role_id1, step_number, checkForRecords, setCheckForRecords, role_id, role_start, role_end }) {


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
    // sortedRoles.map(({ role_id, role_name, role_desc, role_start, role_end });
    {sortedRoles && sortedRoles.map(option => (
      <option key={option.role_id} value={option.role_id}>{option.role_desc}</option>
    ))}


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
            .then((response) => {
                setCheckForRecords(!checkForRecords);
                toast.success(`${steprecord_id} purged.`)
            }
            )
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
                isExpanded && role_name !== 'DONE' ?
                  <Tooltip title='Edit Step Header' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit() }}><GiCheckMark style={{ color: '#DDDDDD', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
              :
              null
              )
            }
          </>
        </div>

        {editing === true ?
          <><i>Step Number:</i>&nbsp;&nbsp;<>
            <input
              required
              defaultValue={role_name}
              onChange={(e) => setRole_desc(e.target.value)}
              style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '25px' }} />

            <>&nbsp;&nbsp;<i>Step Name:</i>&nbsp;&nbsp;<>
              <input
                required
                defaultValue={role_desc}
                onChange={(e) => setRole_desc(e.target.value)}
                style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '970px' }} />
              <div className="Font-Spacer-White">Make this Spacer White</div>
            </>
            </>
          </>
          </>
          :
          <>
          <i onClick={toggleAccordion}><b>{role_name}</b></i>&nbsp; &nbsp;(<Tenure startYear={role_start} endYear={role_end} />)
          </>

            

        }


      </div>
      <div></div>

      {isExpanded &&
        <div>
          <div className="Font-Segoe-Large-Howto" >

            {editing === true ?
              <><i>Supporting URL:</i>&nbsp;&nbsp;<>
                <input
                  required
                  defaultValue={role_desc}
                  onChange={(e) => setRole_desc(e.target.value)}
                  style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1100px' }} />
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <a className="Font-Segoe-Small" href={role_name} target="_blank">{role_desc}</a>}

            {editing === true ?
              <><i>Step Objective:</i>&nbsp;&nbsp;<>
                <textarea
                  rows="3"
                  required
                  defaultValue={role_desc}
                  onChange={(e) => setRole_name(e.target.value)}
                  size='Large'
                  style={{ fontFamily: 'Calibri', fontSize: 'Large', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1112px' }} />
                
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <div>{role_desc}</div>}
          </div>
          
          <MyCVEmployerRoleDetails mycvdata2={mycvdata1} employer_id2={employer_id1} role_id2={role_id} role_idd={role_id}/>

        </div>
      }
    </>
  );
}
