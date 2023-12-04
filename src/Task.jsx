import React, { useState, useContext } from 'react';
import AlertContext from "./Generic/Alerts/AlertContext";
import './Fonts.css'
import TaskRecordAccordion from './TaskRecordAccordion';
import { getStatusByColourTaskText } from './getStatusByColourTaskText'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from 'axios'
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from '@mui/material';
import { AiOutlineFileAdd, AiOutlineCheckCircle, AiOutlineEdit, AiOutlineExpand } from "react-icons/ai";
import { toast, Flip, ToastContainer } from 'react-toastify';



export default function Task({ projecthandle, id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, childrecord, parenttask, checkForRecords, setCheckForRecords }) {
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
    SetStepnumber(projecthandle) //Step Number
    setName(taskname) //Step Name
    setStepURL(taskowner) //Step URL
    setRequirement(taskrequirement) //Step Objective
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
    if (requirement !== taskrequirement) updatedDetails.push("Requirement");
    if (name !== taskname) updatedDetails.push("Task Name");


    //Check fields are not null
    // if (!newTargetDate) noDetails.push('Due Date')
    // if (!owner?.trim()) noDetails.push('Owner')
    if (!requirement?.trim()) noDetails.push('Requirement')
    if (!name?.trim()) noDetails.push('Task Name')


    const updatedTask = {
      // 'tasktargetdate': newTargetDate,
      'projecthandle': stepnumber, //Step Number
      'taskname': name, //Step Name
      'taskowner': stepurl, //Step URL
      'taskrequirement': requirement, //Step Objective
      'asms': asms,
         
    }


    if (noDetails.length) {
      alertCtx.warning(`Please fill in ${noDetails.join(', ')}`)
      return
    }

    const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/update/taskdetails/${id}`, updatedTask)
    // const response = await axios.put(`http://localhost:8000/api/v1/tasks/update/taskdetails/${id}`, updatedTask)
      .then((response) => { updatedDetails.length ? 
        alertCtx.success(` "${taskname}" task successfully updated ${updatedDetails.join(", ")}`) : alertCtx.warning(`No changes in "${taskname}"`) })

      .catch((error) => { alertCtx.error(error.message); })
    setCheckForRecords(!checkForRecords)
    toast.success(`Step called ${taskname} has been updated.`)
    onEditCancel();
  }


  return (
    <>
      <div className="Font-Calibri-Large-Howto" >
      {/* <div className="Font-Verdana-Large-Howto" > */}
        <div style={{ display: 'flex', float: 'right' }}>
          <>
            {editing === true ?
              (
                <>
                  <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave()}><AiOutlineCheckCircle style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                  <Tooltip title='Revert' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                </>
              )
              :
              
              (

                isExpanded && taskstatus !== 'DONE' ?

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
              defaultValue={projecthandle}  //passed in from above
              onChange={(e) => SetStepnumber(e.target.value)}
              style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '25px' }} />
          
          <>&nbsp;&nbsp;&nbsp;&nbsp;<i>Step Name:</i>&nbsp;&nbsp;<>
            <input
              required
              defaultValue={taskname} //passed in from above
              onChange={(e) => setName(e.target.value)}
              style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '855px' }} />
          <div className='Font-Spacer-White'>Make this Spacer White</div>
          </>
          </>
          </>
          </>
          :
          <i onClick={toggleAccordion}>
            <i className="Font-Calibri-Large-Howto">Step-{projecthandle}:&nbsp;</i><b className="Font-Calibri-Large-Howto">{taskname}</b></i>
            
            
            
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
                  defaultValue={taskowner} //passed in from above
                  onChange={(e) => setStepURL(e.target.value)}
                  style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
              <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <a className="Font-Verdana-XSmall" href={taskowner} target="_blank">{taskowner}</a>}


            {editing === true ?
              <><i>Step Objective:</i>&nbsp;&nbsp;&nbsp;<>
                <input
                  required
                  defaultValue={taskrequirement} //passed in from above
                  onChange={(e) => setRequirement(e.target.value)}
                  size='small'
                  style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1002px' }} />
              <div className='Font-Spacer-White'>Make this Spacer White</div>
              </>
              </>
              :
              <div>{taskrequirement}</div>}

          </div>
          <TaskRecordAccordion projecthandle={projecthandle} taskstatus={taskstatus} parentid={id} asms_number={asms} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
        </div>
      }
    </>
  );
}