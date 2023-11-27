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



export default function Task({ project_handle, activeAccount, id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, childrecord, parenttask, checkForRecords, setCheckForRecords }) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [editing, setEditing] = useState(false)
  const [requirement, setRequirement] = useState(null)
  const [owner, setOwner] = useState(null)
  const [newTargetDate, setNewTargetDate] = useState(null)
  const [name, setName] = useState(null)
  const alertCtx = useContext(AlertContext);

  const handleDateChange = (newVal) => {
    setNewTargetDate(newVal.utc(true));
  };

  const handleEdit = () => {
    // setOwner(taskowner)
    setRequirement(taskrequirement)
    // setNewTargetDate(tasktargetdate)
    setName(taskname)
    setEditing(true)
  }

  const onEditCancel = () => {
    setEditing(false);
    setRequirement(null);
    // setOwner(null);
    // setNewTargetDate(null);
    setName(null)
  }

  const handleChange = (e, newVal) => setOwner(newVal);


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
      'taskrequirement': requirement,
      // 'taskowner': owner,
      'taskname': name,
    }


    if (noDetails.length) {
      alertCtx.warning(`Please fill in ${noDetails.join(', ')}`)
      return
    }

    const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/update/taskdetails/${id}`, updatedTask)
      .then((response) => { updatedDetails.length ? alertCtx.success(` "${taskname}" task successfully updated ${updatedDetails.join(", ")}`) : alertCtx.warning(`No changes in "${taskname}"`) })

      .catch((error) => { alertCtx.error(error.message); })
    setCheckForRecords(!checkForRecords)
    onEditCancel();
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
            <input
              required
              defaultValue={taskname}
              onChange={(e) => setName(e.target.value)}
              size='small'
              // style={{ width: 500, height: '27.5px', marginBottom: '15px', display: 'flex' }} />
              style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} />
          </>
          </>
          :
          <i onClick={toggleAccordion}><i>Step-x: </i><b>{taskname}</b></i>}
      </div>
      {isExpanded &&
        <div>
          <div className='Verdana'>{editing === true ?
            <input
              freeSolo
              required
              defaultValue={taskrequirement}
              onChange={(e) => setRequirement(e.target.value)}
              size='small'
              // style={{ width: 500, height: '27.50px', marginBottom: '15px', display: 'flex' }} />
              style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} />
            :
            taskrequirement}
          </div>
          <TaskRecordAccordion alertCtx={alertCtx} project_handle={project_handle} activeAccount={activeAccount} taskstatus={taskstatus} parentid={id} asms_number={asms} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
        </div>
      }
    </>
  );
}