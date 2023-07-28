import React, { useState, useContext } from "react";
import AlertContext from "./Generic/Alerts/AlertContext";
import axios from 'axios';
import './Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from './graphix/besterdev_spacer_white.png'
import spacer2 from './graphix/besterdev_spacer_white_half.png'
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify';

dayjs.extend(utc);


export default function CandidateCreate(props) {
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
        'comment': comment
      }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, newRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          // alert(`${firstname} ${lastname} has been memorialized.`); 
          toast.success(`${firstname} ${lastname} memorialized.`)
        }
        else { 
          // alert(`oops! Something went wrong!`); 
          toast.error('Bad')
        }
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
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Manually Add a Candidate</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Firstname:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '190px' }} placeholder="Required" type="text" value={firstname} onChange={(event) => setfirstname(event.target.value)} required />
                <img alt="1" src={spacer} />Lastname:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '190px' }} placeholder="Required" type="text" value={lastname} onChange={(event) => setlastname(event.target.value)} required />
                <img alt="1" src={spacer} />eMail:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={email} onChange={(event) => setemail(event.target.value)} required />
                <img alt="1" src={spacer} />Mobile:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={mobile} onChange={(event) => setmobile(event.target.value)} required />
                </div>
                <div>&nbsp;</div>
                <div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Job Title:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={jobdesc} onChange={(event) => setJobdesc(event.target.value)} required />
                <img alt="1" src={spacer} />Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '230px' }} placeholder="Required" type="text" value={skill1} onChange={(event) => setSkill1(event.target.value)} required />
                {/* <div>&nbsp;</div> */}
                <img alt="1" src={spacer} />Comment:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '425px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} />&nbsp; &nbsp; &nbsp;<button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }}>Add Candidate</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
