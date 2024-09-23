import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../Generic/Alerts/AlertContext";
import axios from 'axios';
import '../Fonts.css';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from '../graphix/besterdev_spacer_white.png'
import spacer2 from '../graphix/besterdev_spacer_white_half.png'
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify';
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
  const [employerdropdown, setEmployerDropDown] = useState(null);

  const handleCreateDateChange = (newVal) => {
    setCr_DateHold1(newVal.format("YYYY.M.D"));
    setCreatedate(newVal);
  };

  const handleTargetDateChange = (newVal) => {
    setCr_DateHold2(newVal.format("YYYY.M.D"));
    setTargetdate(newVal);
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

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/create`, jobreqPOST);
        if (response.status === 200) {
          props.setCheckForRecords(!props.checkForRecords);
          toast.success(`${jrnumber} for ${company} memorialized.`)

        }
        else { alert(`oops! Something went wrong!`); }
      }

      catch (err) { alertCtx.error(`oops! Something went wrong!`); console.log(err); }
    }
    else {
      event.preventDefault();
      alertCtx.warning("Valid CR date required");
    }
  }


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers')
      .then((response) => { const sortedemployerrecords = response.data.sort((b, a) => b.empname.localeCompare(a.empname)); 
        setEmployerDropDown(sortedemployerrecords); }) //sort empname alphabetically
      .catch((e) => console.error(e));
  }, [checkForRecords]);



  const handleWAprofileChange = (event) => { setWAprofile(event.target.value); };

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Add a Job Requisition/JR</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>

                <div>&nbsp;</div>
                <div>
                  <div>
                    <img alt="1" src={spacer} /><img alt="1" src={spacer} />
                    <label htmlFor="dropdown">Employer:&nbsp;</label>
                    <select className='Font-Verdana-Small-Postgres'
                      onChange={(event) => {
                        const selectedIndex = event.target.selectedIndex;
                        const selectedOption = event.target.options[selectedIndex];
                        const company = selectedOption.getAttribute("data-company");

                        setCompany(company);

                      }}
                      id="dropdown"
                      style={{
                        height: '27.5px',
                        border: '1.25px solid #c4c4c4',
                        borderRadius: '4px',
                        padding: 0,
                        paddingLeft: '10px',
                        width: '250px'
                      }}
                    >
                      <option disabled selected value="">Company / Employer</option>
                      {employerdropdown && employerdropdown.map(option => (
                        <option
                          key={option.id}
                          value={option.empname}
                          data-company={option.empname} // Store company data as an attribute

                        >
                          {option.empname}
                        </option>
                      ))}
                    </select>
                    <img alt="1" src={spacer} />Location:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                    <img alt="1" src={spacer} />JR Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={jrnumber} onChange={(event) => setJrnumber(event.target.value)} required />
                    <img alt="1" src={spacer} />JR Title:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '250px' }} placeholder="Required" type="text" value={jrtitle} onChange={(event) => setJrtitle(event.target.value)} required />
                    <img alt="1" src={spacer} />WFH:&nbsp;
                    <select style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '230px' }} id="dropdown" value={wa} onChange={(event) => setWa(event.target.value)}>
                      <option disabled selected value="">Work Appropriate Model</option>
                      <option value="FR">Fully Remote</option>
                      <option value="H1">Hybrid 1-day Onsite</option>
                      <option value="H2">Hybrid 2-day Onsite</option>
                      <option value="H3">Hybrid 3-day Onsite</option>
                      <option value="H4">Hybrid 4-day Onsite</option>
                      <option value="FO">Fully Onsite</option>
                    </select>
                  </div>
                </div>
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Recruiter's Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '190px' }} type="text" value={recruitername} onChange={(event) => setRecruitername(event.target.value)} />
                <img alt="1" src={spacer} />Recruiter eMail:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '205px' }} type="text" value={recruiteremail} onChange={(event) => setRecruiteremail(event.target.value)} />
                <img alt="1" src={spacer} />Recruiter Mobile:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '215px' }} type="text" value={recruiternumber} onChange={(event) => setRecruiternumber(event.target.value)} />
                <img alt="1" src={spacer} />Status:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '255px' }} type="text" value={status} onChange={(event) => setStatus(event.target.value)} />
                <img alt="1" src={spacer} />Comment:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '190px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Recruitment Start:&nbsp;
                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DatePicker
                    id="createdate"
                    format="YYYY.M.D"
                    selected={createdate}
                    onChange={handleCreateDateChange}
                    dateFormat="YYYY.M.D"
                    sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px', width: '195px' } }} />
                </LocalizationProvider>

                <img alt="1" src={spacer} />Recruitment End:&nbsp;
                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DatePicker
                    id="targetdate"
                    format="YYYY.M.D"
                    selected={targetdate}
                    onChange={handleTargetDateChange}
                    dateFormat="YYYY.M.D"
                    sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px', width: '205px' } }} />
                </LocalizationProvider>
                <img alt="1" src={spacer} />
                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add Job Requisition</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
