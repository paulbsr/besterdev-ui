import React, { useState, useContext } from 'react';
import '../Fonts.css'
import HowtoStepRecordAccordion from './HowtoStepRecordAccordion';
import axios from 'axios'
import { Tooltip } from '@mui/material';
import { AiOutlineEdit } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { FaRegTrashAlt } from 'react-icons/fa'; //Delete
import { BsPencil } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { IoFootstepsSharp, IoFootstepsOutline } from "react-icons/io5";

export default function HowtoStep({ howto_id, step_id, step_number, step_name, step_url, step_obj, step_image, howtodata, checkForRecords, setCheckForRecords }) {

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
                isExpanded && step_name !== 'DONE' ?
                  <Tooltip title={`Edit Step: ${step_id}`} placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit() }}><BsPencil style={{ color: '#C0C0C0', display: 'block', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
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
              defaultValue={step_number}
              onChange={(e) => setStepNumber(e.target.value)}
              style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '25px' }} />

            <>&nbsp;&nbsp;<i>Step Name:</i>&nbsp;&nbsp;<>
              <input
                required
                defaultValue={step_name}
                onChange={(e) => setName(e.target.value)}
                style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '970px' }} />
              <div className="Font-Spacer-White">Make this Spacer White</div>
            </>
            </>
          </>
          </>
          :
          <>
            <i onClick={toggleAccordion}>
              <i className="Font-Segoe-Large-Howto"><u>Step-{step_number}&nbsp;</u><IoFootstepsOutline style={{ color: '#D5441C', fontSize: '18px', cursor: 'pointer' }}/>&nbsp;</i>
              <b className="Font-Segoe-Large-Howto">{step_name}</b>
            </i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="Font-Spacer-White">HowtoStepID#{step_id}&nbsp;</i>
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
                  defaultValue={step_url}
                  onChange={(e) => setStepURL(e.target.value)}
                  style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1100px' }} />
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <a className="Font-Segoe-Small" href={step_url} target="_blank" rel="noreferrer">{step_url}</a>}

            {editing === true ?
              <><i>Step Objective:</i>&nbsp;&nbsp;<>
                <textarea
                  rows="3"
                  required
                  defaultValue={step_obj}
                  onChange={(e) => setStepObjective(e.target.value)}
                  size='Large'
                  style={{ fontFamily: 'Segoe UI', fontSize: 'Large', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1112px' }} />
                
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <div className="Font-Segoe-Medium"><i>{step_obj}</i>
              <div>{step_image === undefined || step_image === null ? null : <img src={'data:image/jpg;base64,'+step_image} />}</div>
              </div>
              
              }
          </div>
          <HowtoStepRecordAccordion step_idd={step_id} howto_id={howto_id} howtodata={howtodata} step_number={step_number} step_name={step_name}checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
        </div>
      }
    </>
  );
}
