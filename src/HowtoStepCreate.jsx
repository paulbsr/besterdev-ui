import React, { useState, useContext, useEffect } from "react";
import AlertContext from "./Generic/Alerts/AlertContext";
import axios from 'axios';
import './Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
dayjs.extend(utc);


export default function HowtoStepCreate(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const alertCtx = useContext(AlertContext);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [step_parentid, setStep_parentid] = useState('');
  const [step_number, setStep_number] = useState('');
  const [step_name, setStep_name] = useState('');
  const [step_url, setStep_url] = useState('');
  const [step_obj, setStep_obj] = useState('');
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
        'step_parentid': step_parentid,
        'step_number': step_number,
        'step_name': step_name,
        'step_url': step_url,
        'step_obj': step_obj,
      }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtostep/create`, newRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          toast.success(`${step_name} has been memorialized.`)
        }
        else { 
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


  // useEffect(() => {
  //   axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
  //     .then((response) => {const sortedjobreqs = response.data.sort((b, a) => b.company.localeCompare(a.company));
  //       setJobreqs(sortedjobreqs);
  //     })
  //     // .catch((e) => console.error(e));
  // },
  //   []);


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content=".."><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Create a Step</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Step Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '30px' }} placeholder="Req" type="text" value={step_number} onChange={(event) => setStep_number(event.target.value)} required />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Step Name:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} placeholder="Required" type="text" value={step_name} onChange={(event) => setStep_name(event.target.value)} required />
                <img alt="1" src={spacer} />Step Objective:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '750px' }} placeholder="Required" type="text" value={step_obj} onChange={(event) => setStep_obj(event.target.value)} required />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Supporting URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} placeholder="Optional" type="text" value={step_url} onChange={(event) => setStep_url(event.target.value)} />
                <img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add this Step</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
