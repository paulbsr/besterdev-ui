import React, { useState, useContext } from 'react';
import AlertContext from "./Generic/Alerts/AlertContext";
import './Fonts.css'
import New_TaskRecordAccordion from './New_TaskRecordAccordion';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from 'axios'
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from '@mui/material';
import { AiOutlineFileAdd, AiOutlineCheckCircle, AiOutlineEdit, AiOutlineExpand } from "react-icons/ai";
import { toast } from 'react-toastify';

export default function New_Task({ step_id, step_number, step_name, step_url, step_obj, howtodata, checkForRecords, setCheckForRecords }) {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [editing, setEditing] = useState(false);
  const [newTargetDate, setNewTargetDate] = useState(null);
  const alertCtx = useContext(AlertContext);
  const [stepnumber, SetStepnumber] = useState(); //Step Number
  const [name, setName] = useState(); //Step Name
  const [stepurl, setStepURL] = useState(); //Step URL
  const [requirement, setRequirement] = useState(); //Step Objective

  const handleDateChange = (newVal) => {
    setNewTargetDate(newVal.utc(true));
  };

  const handleEdit = () => {
    SetStepnumber(step_number) //Step Number
    setName(step_name) //Step Name
    setStepURL(step_url) //Step URL
    setRequirement(step_obj) //Step Objective
    setEditing(true)
  }

  const onEditCancel = () => {
    setEditing(false);
    // setRequirement(null);
    // setTaskowner(null);
    // setNewTargetDate(null);
    // setName(null)
  }

  // const handleChange = (e, newVal) => setTaskowner(newVal);


  const onEditSave = async () => {
    let updatedDetails = []
    let noDetails = []

    // Check field changes
    // if (newTargetDate !== tasktargetdate) updatedDetails.push("Due Date");
    // if (owner !== taskowner) updatedDetails.push("Owner");
    // if (requirement !== taskrequirement) updatedDetails.push("Requirement");
    // if (name !== howto_name) updatedDetails.push("Task Name");


    //Check fields are not null
    // if (!newTargetDate) noDetails.push('Due Date')
    // if (!owner?.trim()) noDetails.push('Owner')
    if (!requirement?.trim()) noDetails.push('Requirement')
    if (!name?.trim()) noDetails.push('Task Name')


    const updatedTask = 
    {
      'projecthandle': stepnumber, //Step Number
      'howto_name': name, //Step Name
      'taskowner': stepurl, //Step URL
      'taskrequirement': requirement, //Step Objective
      'asms': stepurl,
    }


    if (noDetails.length) {
      alertCtx.warning(`Please fill in ${noDetails.join(', ')}`)
      return
    }

    const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/update/taskdetails/${step_id}`, updatedTask)
    // const response = await axios.put(`http://localhost:8000/api/v1/tasks/update/taskdetails/${id}`, updatedTask)
      .then((response) => { updatedDetails.length ? 
        alertCtx.success(` "${step_name}" task successfully updated ${updatedDetails.join(", ")}`) : alertCtx.warning(`No changes in "${step_name}"`) })

      .catch((error) => { alertCtx.error(error.message); })
    setCheckForRecords(!checkForRecords)
    toast.success(`Step called ${name} has been updated.`)
    onEditCancel();
  }


  return (
    
    <>
      <div className="Font-Calibri-Large-Howto" >
        <div style={{ display: 'flex', float: 'right' }}>
          <>
            {editing === true ?
              (
                <>&nbsp;&nbsp;
                  <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave()}><AiOutlineCheckCircle style={{ color: '#336791', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>&nbsp;
                  <Tooltip title='Revert' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: '#336791', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
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
              defaultValue={step_number}  //passed in from above
              onChange={(e) => SetStepnumber(e.target.value)}
              style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '25px' }} />
          
          <>&nbsp;&nbsp;&nbsp;&nbsp;<i>Step Name:</i>&nbsp;&nbsp;<>
            <input
              required
              defaultValue={step_name} //passed in from above
              onChange={(e) => setName(e.target.value)}
              style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '855px' }} />
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
                  defaultValue={step_url} //passed in from above
                  onChange={(e) => setStepURL(e.target.value)}
                  style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
              <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <a className="Font-Verdana-XSmall" href={step_url} target="_blank">{step_url}</a>}

            {editing === true ?
              <><i>Step Objective:</i>&nbsp;&nbsp;&nbsp;<>
                <input
                  required
                  defaultValue={step_obj} //passed in from above
                  onChange={(e) => setRequirement(e.target.value)}
                  size='small'
                  style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1002px' }} />
              <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <div>{step_obj}</div>}
          </div>
          {/* <New_TaskRecordAccordion parenttask={parenttask} projecthandle={projecthandle} taskstatus={taskstatus} parentid={id} asms_number={asms} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
        </div>
      }
    </>
  );
}
