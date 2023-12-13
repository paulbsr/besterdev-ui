import React, { useState, useContext } from 'react';
import './Fonts.css'
import New_TaskRecordAccordion from './New_TaskRecordAccordion';
import axios from 'axios'
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from '@mui/material';
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { toast } from 'react-toastify';

export default function New_Task({ howto_id, step_id, step_number, step_name, step_url, step_obj, howtodata, checkForRecords, setCheckForRecords }) {

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
      <div className="Font-Calibri-Large-Howto" >
        <div style={{ display: 'flex', float: 'right' }}>
          <>
            {editing === true ?
              (
                <>
                  &nbsp;&nbsp;
                  <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave()}><AiOutlineCheckCircle style={{ color: '#D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>&nbsp;
                  <Tooltip title='Revert' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: '#D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
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
          <><i>Step Number:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<>
            <input
              required
              defaultValue={step_number}
              onChange={(e) => setStepNumber(e.target.value)}
              style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '25px' }} />

            <>&nbsp;&nbsp;&nbsp;&nbsp;<i>Step Name:</i>&nbsp;&nbsp;<>
              <input
                required
                defaultValue={step_name}
                onChange={(e) => setName(e.target.value)}
                style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '800px' }} />
              <div className='Font-Spacer-White'>Make this Spacer White</div>
            </>
            </>
          </>
          </>
          :
          <i onClick={toggleAccordion}>
            <i className="Font-Calibri-Large-Howto">Step-{step_number}:&nbsp;</i><b className="Font-Calibri-Large-Howto">{step_name}</b></i>

        }
      </div>
      <div></div>

      {isExpanded &&
        <div>
          <div className="Font-Calibri-Large-Howto" >

            {editing === true ?
              <><i>Supporting URL:</i>&nbsp;<>
                <input
                  required
                  defaultValue={step_url}
                  onChange={(e) => setStepURL(e.target.value)}
                  style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <a className="Font-Verdana-XSmall" href={step_url} target="_blank">{step_url}</a>}

            {editing === true ?
              <><i>Step Objective:</i><>
              {/* <div>&nbsp;</div> */}
                <textarea
                  rows="6"
                  required
                  defaultValue={step_obj}
                  onChange={(e) => setStepObjective(e.target.value)}
                  size='small'
                  style={{ font: 'Calibri', fontSize: 'large', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1112px' }} />
                
                <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <div>{step_obj}</div>}
          </div>
          <New_TaskRecordAccordion step_idd={step_id} howto_id={howto_id} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
        </div>
      }
    </>
  );
}
