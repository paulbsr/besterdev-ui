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


export default function HowtoStepRecordCreate_________(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [howtosteps, setHowtosteps] = useState('');
  const [steprecord, setSteprecord] = useState('');
  const [steprecord_date, setSteprecord_date] = useState(formattedDate);
  const [howto_name, setHowto_name] = useState('');
  const [howto_id, setHowto_id] = useState('');
  const [step_name, setStep_name] = useState('');
  const [step_id, setStep_id] = useState('');
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [cr_date, setcr_date] = useState(formattedDate);
  const [isExpanded, setExpanded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      cr_date != null &&
      cr_datehold !== "Invalid Date"
    ) 
    
    {
      var newRecord = 
      {
        'steprecord': steprecord,
        'steprecord_date': steprecord_date,
        'howto_name': howto_name,
        'howto_id': howto_id,
        'step_name': step_name,
        'step_id': step_id,
    }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/create`, newRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          toast.success(`${steprecord} memorialized.`)
        }
        else { 
          toast.error('Bad')
        }
      }

      catch (err) { toast.error(`oops! Something went wrong!`); console.log(err); }
    }
    else {
      event.preventDefault();
    //   alertCtx.warning("Valid CR date required");
    }
  }


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteps')
      .then((response) => {const howtosteps = response.data.sort((b, a) => b.step_name.localeCompare(a.step_name)); 
        console.log(howtosteps);
        setHowtosteps(howtosteps);
      })
  },
    []);




  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content=".."><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Create a Step Record</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Step Record:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Req" type="text" value={steprecord} onChange={(event) => setSteprecord(event.target.value)} required />
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Step Name:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} placeholder="Required" type="text" value={step_name} onChange={(event) => setStep_name(event.target.value)} required /> */}
                {/* <img alt="1" src={spacer} />Step Objective:&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '750px' }} placeholder="Required" type="text" value={step_obj} onChange={(event) => setStep_obj(event.target.value)} required /> */}
                {/* <div>&nbsp;</div> */}
                {/* <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Supporting URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} placeholder="Optional" type="text" value={step_url} onChange={(event) => setStep_url(event.target.value)} /> */}



                <img alt="1" src={spacer} /><label htmlFor="dropdown">Attach to Step:&nbsp;&nbsp;</label>
                <select className='Font-Verdana-Small-Postgres'
                  onChange={(event) => {
                    const selectedIndex = event.target.selectedIndex;
                    const selectedOption = event.target.options[selectedIndex];
                    const step_name = selectedOption.getAttribute("data-step_name");
                    const step_id = selectedOption.getAttribute("data-step_id");
                    setStep_name(step_name);
                    setStep_id(step_id);
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

                  <option disabled selected value="">Step Name</option>

                  {howtosteps && howtosteps.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                      data-step_name={option.step_name} // Store company data as an attribute
                      data-step_id={option.step_id} // Store company data as an attribute
                    >{option.step_name}
                    </option>
                  ))}
                </select>


                <img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add this Step</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
