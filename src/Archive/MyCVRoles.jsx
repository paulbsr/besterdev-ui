import React, { useState, useContext } from 'react';
import '../Fonts.css'
// import HowtoStepRecordAccordion from './HowtoStepRecordAccordion';
import axios from 'axios'
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from '@mui/material';
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete
import { toast } from 'react-toastify';
import HowtoStepRecordAccordion from '../HowtoStepRecordAccordion';

export default function MyCVRoles({ employer_name, role_name, howto_id, step_id, step_number, step_name, step_url, step_obj, howtodata, checkForRecords, setCheckForRecords }) {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [editing, setEditing] = useState(false);
  const [stepnumber, setStepNumber] = useState();
  const [stepname, setName] = useState();
  const [stepurl, setStepURL] = useState();
  const [stepobjective, setStepObjective] = useState();

  const handleEdit = () => {
    setStepNumber(step_number)
    setName(step_name)
    setStepURL(step_url)
    setStepObjective(step_obj)
    setEditing(true)
  }

  const onEditCancel = () => 
  {
    setEditing(false);
  }

  const onEditSave = async () => {

    const updatedStep =
    {
      'step_number': stepnumber,
      'step_name': stepname,
      'step_url': stepurl,
      'step_obj': stepobjective,
    }

    const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtostep/update/${step_id}`, updatedStep)
      .then((response) => 
      {
        setCheckForRecords(!checkForRecords);
        toast.success(`${stepname} updated.`)
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
                isExpanded && step_name !== 'DONE' ?
                  <Tooltip title='Edit Step Header' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit() }}><AiOutlineEdit style={{ color: '#DDDDDD', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
              :
              null
              )
            }
          </>
        </div>

        {editing === true ?
          <><i>Role Number:</i>&nbsp;&nbsp;<>
            <input
              required
              defaultValue={step_number}
              onChange={(e) => setStepNumber(e.target.value)}
              style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '25px' }} />

            <>&nbsp;&nbsp;<i>Role Name:</i>&nbsp;&nbsp;<>
              <input
                required
                defaultValue={employer_name}
                onChange={(e) => setName(e.target.value)}
                style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '970px' }} />
              <div className="Font-Spacer-White">Make this Spacer White</div>
            </>
            </>
          </>
          </>
          :
          <><i onClick={toggleAccordion}>
            <i className="Font-Segoe-Large-Howto"><b>{employer_name}</b>&nbsp;</i><b className="Font-Segoe-Large-Howto">{role_name}</b></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="Font-Spacer-White">HowtoStepID#{step_id}&nbsp;</i></>

        }
      </div>
      <div></div>

      {isExpanded &&
        <div>
          <div className="Font-Segoe-Large-Howto" >

            {editing === true ?
              <><i>Role Description:</i>&nbsp;&nbsp;<>
                <textarea
                  rows="3"
                  required
                  defaultValue={step_obj}
                  onChange={(e) => setStepObjective(e.target.value)}
                  size='Large'
                  style={{ fontFamily: 'Calibri', fontSize: 'Large', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1112px' }} />
                
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <div>{step_obj}</div>}
          </div>
                  </div>
      }
    </>
  );
}
