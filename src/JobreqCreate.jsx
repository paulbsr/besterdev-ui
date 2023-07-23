import React, { useState, useContext } from "react";
import AlertContext from "./Generic/Alerts/AlertContext";
import axios from 'axios';
import './Fonts.css';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from './graphix/besterdev_spacer_white.png'
import spacer2 from './graphix/besterdev_spacer_white_half.png'
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import RecordAmend from "./RecordAmend";
import { BsSignpostFill } from "react-icons/bs";
dayjs.extend(utc);


export default function JobreqCreate(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const alertCtx = useContext(AlertContext);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [jobdesc, setJobdesc] = useState('');
  const [skill1, setSkill1] = useState('');
  const [comment, setComment] = useState('');
  const [cr_date, setcr_date] = useState(formattedDate);
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);


  const handleDateChange = (newVal) => {
    setCr_DateHold(newVal.format("YYYY.M.D"));
    setcr_date(newVal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      cr_date != null &&
      cr_datehold != "Invalid Date"
    ) {
      var newRecord = {
        'firstname': firstname,
        'dob': cr_date,
        'lastname': lastname,
        'email': email,
        'mobile': mobile,
        'jobdesc': jobdesc,
        'skill1': skill1,
        'comment': comment
      }
      console.log(newRecord)
      
      
      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, newRecord);
        if (response.status === 200) { props.setCheckForRecords(!props.checkForRecords); alert(`${firstname} ${lastname} has been memorialized.`); }
        else { alert(`oops! Something went wrong!`); }
      }

      catch (err) { alertCtx.error(`oops! Something went wrong!`); console.log(err); }
    }
    else {
      event.preventDefault();
      alertCtx.warning("Valid CR date required");
    }
  }


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer}/><img alt="1" src={spacer}/><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }}/><BsSignpostFill style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
        <b>Add a Job Requisition/JR</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>JR Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={firstname} onChange={(event) => setfirstname(event.target.value)} required/>
              <img alt="1" src={spacer}/>JR Title:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={email} onChange={(event) => setemail(event.target.value)} required/>
              <div>&nbsp;</div>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Company:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={lastname} onChange={(event) => setlastname(event.target.value)} required/>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Location:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={mobile} onChange={(event) => setmobile(event.target.value)} required/>
              <div>&nbsp;</div>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Recruiter's Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={jobdesc} onChange={(event) => setJobdesc(event.target.value)} required/>
              <img alt="1" src={spacer}/>Recruiter's eMail Address:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={skill1} onChange={(event) => setSkill1(event.target.value)} required/>
              <img alt="1" src={spacer}/>Recruiter's Mobile Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
              <div>&nbsp;</div>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Comment:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
              <img alt="1" src={spacer}/>Work Appropriate Model:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
              <div>&nbsp;</div>
              <img alt="1" src={spacer}/><img alt="1" src={spacer} />Recruitment Start Date:&nbsp; <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                <DatePicker
                  id="cr_date"
                  format="YYYY.M.D"
                  selected={cr_date}
                  onChange={handleDateChange}
                  dateFormat="YYYY.M.D"
                  sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px' } }}
                />
              </LocalizationProvider>

              <img alt="1" src={spacer} />Target Completion Date:&nbsp; <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                <DatePicker
                  id="cr_date"
                  format="YYYY.M.D"
                  selected={cr_date}
                  onChange={handleDateChange}
                  dateFormat="YYYY.M.D"
                  sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px' } }}
                />
              </LocalizationProvider>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Status:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
              <div>&nbsp;</div>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }}>Add Candidate</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>

  );
}
