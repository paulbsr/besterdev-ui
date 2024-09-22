import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import '../Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from '../graphix/besterdev_spacer_white.png';
import spacer2 from '../graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
dayjs.extend(utc);


export default function CandidateCreate(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [jobdesc, setJobdesc] = useState('');
  const [skill1, setSkill1] = useState('');
  const [comment, setComment] = useState('');
  const [role, setRole] = useState(null);
  const [reqnum, setReqnum] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [jobreqs, setJobreqs] = useState(null);
  const [cr_date, setcr_date] = useState(formattedDate);
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [isExpanded, setExpanded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      cr_date != null &&
      cr_datehold !== "Invalid Date"
    ) 
    
    {
      var newRecord = {
        'firstname': firstname,
        'dob': cr_date,
        'lastname': lastname,
        'email': email,
        'mobile': mobile,
        'jobdesc': jobdesc,
        'skill1': skill1,
        'comment': comment,
        'role': role,
        'reqnum': reqnum,
        'employer': employer
      }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, newRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          toast.success(`${firstname} ${lastname} has been memorialized.`)
        }
        else { 
          toast.error('Bad')
        }
      }

      catch (err) { toast.error(`CandidateCreate issue!`); console.log(err); }
    }
    else {
      event.preventDefault();
    }
  }


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
      .then((response) => {const sortedjobreqs = response.data.sort((b, a) => b.company.localeCompare(a.company));
        setJobreqs(sortedjobreqs);
      })
  },
    []);


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add Candidate"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Manually Add a Candidate</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Firstname:&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '288px' }} placeholder="Required" type="text" value={firstname} onChange={(event) => setfirstname(event.target.value)} required />
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Lastname:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '303px' }} placeholder="Required" type="text" value={lastname} onChange={(event) => setlastname(event.target.value)} required />
                <img alt="1" src={spacer} />eMail:&nbsp;&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '298px' }} placeholder="Required" type="text" value={email} onChange={(event) => setemail(event.target.value)} required />
                <img alt="1" src={spacer} />Mobile:<img alt="1" src={spacer} /><input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '320px' }} placeholder="Required" type="text" value={mobile} onChange={(event) => setmobile(event.target.value)} required />
                </div>
                <div>&nbsp;</div>
                <div>
                <img alt="1" src={spacer} />
                <img alt="1" src={spacer} />
                
                
                <label htmlFor="dropdown">Propose for:&nbsp;&nbsp;</label>
                <select className='Font-Verdana-Small-Postgres'
                  onChange={(event) => {
                    const selectedIndex = event.target.selectedIndex;
                    const selectedOption = event.target.options[selectedIndex];
                    const company = selectedOption.getAttribute("data-company");
                    const jrtitle = selectedOption.getAttribute("data-jrtitle");
                    const jrnumber = selectedOption.getAttribute("data-jrnumber");

                    setEmployer(company);
                    setRole(jrtitle);
                    setReqnum(jrnumber);
                  }}
                  id="dropdown"
                  style={{
                    height: '27.5px',
                    border: '1.25px solid #c4c4c4',
                    borderRadius: '4px',
                    padding: 0,
                    paddingLeft: '10px',
                    width: '300px'
                  }}
                >

                  <option disabled selected value="">Employer  -  Role  - Req Number</option>

                  {jobreqs && jobreqs.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                      data-company={option.company} // Store company data as an attribute
                      data-jrtitle={option.jrtitle} // Store jrtitle data as an attribute
                      data-jrnumber={option.jrnumber} // Store jrnumber data as an attribute
                    >
                      {option.company}   -   {option.jrtitle}   -   {option.jrnumber}
                    </option>
                  ))}
                </select>

                
                  <img alt="1" src={spacer} /><img alt="1" src={spacer} />Job Title:&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '305px' }} placeholder="Required" type="text" value={jobdesc} onChange={(event) => setJobdesc(event.target.value)} required />
                  <img alt="1" src={spacer} />Skill:&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Required" type="text" value={skill1} onChange={(event) => setSkill1(event.target.value)} required />
                  <img alt="1" src={spacer} />Comment:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '320px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                  <div>&nbsp;</div>
                <img alt="1" src={spacer} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add Candidate</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
