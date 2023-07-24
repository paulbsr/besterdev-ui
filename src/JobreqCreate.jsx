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
import { BsSignpostFill } from "react-icons/bs";
dayjs.extend(utc);


export default function JobreqCreate(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const alertCtx = useContext(AlertContext);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [jrnumber, setJrnumber] = useState(null);
  const [company, setCompany] = useState(null);
  const [jrtitle, setJrtitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [recruitername, setRecruitername] = useState(null);
  const [recruiteremail, setRecruiteremail] = useState(null);
  const [recruiternumber, setRecruiternumber] = useState(null);
  const [comment, setComment] = useState(null);
  const [createdate, setCreatedate] = useState(formattedDate);
  const [targetdate, setTargetdate] = useState(formattedDate);
  const [status, setStatus] = useState(null);
  const [wa, setWa] = useState(null);
  const [cr_date, setcr_date] = useState(formattedDate);
  const [cr_datehold1, setCr_DateHold1] = useState(null)
  const [cr_datehold2, setCr_DateHold2] = useState(null)
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [WAprofile, setWAprofile] = useState('Option 1');

  const handleCreateDateChange = (newVal) => {
    setCr_DateHold1(newVal.format("YYYY.M.D"));
    setCreatedate(newVal); console.log(newVal);
  };

  const handleTargetDateChange = (newVal) => {
    setCr_DateHold2(newVal.format("YYYY.M.D"));
    setTargetdate(newVal); console.log(newVal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      createdate != null &&
      cr_datehold1 != "Invalid Date"
    ) {
      var jobreqPOST = {
        "jrnumber": jrnumber,
        "company": company,
        "jrtitle": jrtitle,
        "location": location,
        "recruitername": recruitername,
        "recruiteremail": recruiteremail,
        "recruiternumber": recruiternumber,
        "comment": comment,
        "createdate": createdate,
        "targetdate": targetdate,
        "status": status,
        "wa": wa
      }
      console.log(jobreqPOST)


      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/create`, jobreqPOST);
        if (response.status === 200) { props.setCheckForRecords(!props.checkForRecords); alert(`${jrnumber} for ${company} has been memorialized.`); }
        else { alert(`oops! Something went wrong!`); }
      }

      catch (err) { alertCtx.error(`oops! Something went wrong!`); console.log(err); }
    }
    else {
      event.preventDefault();
      alertCtx.warning("Valid CR date required");
    }
  }


  const handleWAprofileChange = (event) => { setWAprofile(event.target.value); };

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /><BsSignpostFill style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
        <b>Add a Job Requisition/JR</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />JR Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={jrnumber} onChange={(event) => setJrnumber(event.target.value)} required />
                <img alt="1" src={spacer} />JR Title:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={jrtitle} onChange={(event) => setJrtitle(event.target.value)} required />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Company:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={company} onChange={(event) => setCompany(event.target.value)} required />
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Location:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Recruiter's Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={recruitername} onChange={(event) => setRecruitername(event.target.value)} />
                <img alt="1" src={spacer} />Recruiter's eMail Address:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={recruiteremail} onChange={(event) => setRecruiteremail(event.target.value)} />
                <img alt="1" src={spacer} />Recruiter's Mobile Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={recruiternumber} onChange={(event) => setRecruiternumber(event.target.value)} />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Comment:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                <img alt="1" src={spacer} />Work Appropriate Model:&nbsp;
                <select style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} id="dropdown" value={wa} onChange={(event) => setWa(event.target.value)}>
                  <option value="00">Work Appropriate Model</option>
                  <option value="FR">Fully Remote</option>
                  <option value="H1">Hybrid 1-day Onsite</option>
                  <option value="H2">Hybrid 2-day Onsite</option>
                  <option value="H3">Hybrid 3-day Onsite</option>
                  <option value="H4">Hybrid 4-day Onsite</option>
                  <option value="FO">Fully Onsite</option>
                </select>


                {/* <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={wa} onChange={(event) => setWa(event.target.value)}/> */}
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Recruitment Start Date:&nbsp; <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DatePicker
                    id="createdate"
                    format="YYYY.M.D"
                    selected={createdate}
                    onChange={handleCreateDateChange}
                    dateFormat="YYYY.M.D"
                    sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px' } }}
                  />
                </LocalizationProvider>

                <img alt="1" src={spacer} />Target Completion Date:&nbsp; <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DatePicker
                    id="targetdate"
                    format="YYYY.M.D"
                    selected={targetdate}
                    onChange={handleTargetDateChange}
                    dateFormat="YYYY.M.D"
                    sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px' } }}
                  />
                </LocalizationProvider>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Status:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={status} onChange={(event) => setStatus(event.target.value)} />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }}>Add a Job Requisition</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
