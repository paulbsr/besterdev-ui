import React, { useState, useEffect, useContext } from 'react';
import './Fonts.css'
import axios from 'axios'
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from '@mui/material';
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";



export default function HowtoSteps ({ project_handle, activeAccount, id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, childrecord, parenttask, checkForRecords, setCheckForRecords }) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [editing, setEditing] = useState(false)
  const [requirement, setRequirement] = useState(null)
  const [owner, setOwner] = useState(null)
  const [newTargetDate, setNewTargetDate] = useState(null)
  const [name, setName] = useState(null)
  const [stepsdata, setStepsdata] = useState(null)


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteps')
      .then((response) => {const sortedStepsData = response.data.sort((b, a) => b.step_id.localeCompare(a.step_id)); 
        setStepsdata(sortedStepsData); })
      .catch((e)=> console.error(e));}, 
      [checkForRecords]);

      
  const handleDateChange = (newVal) => {
    setNewTargetDate(newVal.utc(true));
  };

  const handleEdit = () => {
    setOwner(taskowner)
    setRequirement(taskrequirement)
    setNewTargetDate(tasktargetdate)
    setName(taskname)
    setEditing(true)
  }

  const onEditCancel = () => {
    setEditing(false);
    setRequirement(null);
    setOwner(null);
    setNewTargetDate(null);
    setName(null)
  }

  const handleChange = (e, newVal) => setOwner(newVal);


  const onEditSave = async () => {
    let updatedDetails = []
    let noDetails = []

    // Check field changes
    if (newTargetDate !== tasktargetdate) updatedDetails.push("Due Date");
    if (owner !== taskowner) updatedDetails.push("Owner");
    if (requirement !== taskrequirement) updatedDetails.push("Requirement");
    if (name !== taskname) updatedDetails.push("Task Name");


    //Check fields are not null
    if (!newTargetDate) noDetails.push('Due Date')
    if (!owner?.trim()) noDetails.push('Owner')
    if (!requirement?.trim()) noDetails.push('Requirement')
    if (!name?.trim()) noDetails.push('Task Name')


    const updatedTask = {
      'tasktargetdate': newTargetDate,
      'taskrequirement': requirement,
      'taskowner': owner,
      'taskname': name,
    }
  }

  return (
    <>
      {/* <div className="Verdana" style={{ color: getStatusByColourTaskText(taskstatus) }}> */}
      <div className="Verdana" >

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

                  <Tooltip title='Edit Step Header' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit() }}><AiOutlineEdit style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                  :
                  null
              )
            }
          </>
        </div>
        {editing === true ?
          <><>
            <textarea
              required
              defaultValue={taskname}
              onChange={(e) => setName(e.target.value)}
              size='small'
              style={{ width: 300, height: '30px', marginBottom: '15px', display: 'flex' }} />
          </>
          </>
          :
          <i onClick={toggleAccordion}>{taskname}</i>}
      </div>

      {isExpanded &&
        <div>
          <div className='Verdana'>{editing === true ?
            <textarea
              freeSolo
              required
              defaultValue={taskrequirement}
              onChange={(e) => setRequirement(e.target.value)}
              size='small'
              style={{ width: 300, height: '30px', marginBottom: '15px', display: 'flex' }} />
            :
            taskrequirement}
          </div>
         </div>
      }
    </>
  );
}