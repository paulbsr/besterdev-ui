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


export default function HowtoCreate(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const alertCtx = useContext(AlertContext);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [howtoname, setHowtoname] = useState('');
  const [howtodescription, setHowtodescription] = useState('');
  const [author, setAuthor] = useState('');
  const [howto_name, setHowto_name] = useState(null)
  const [howto_desc, setHowto_desc] = useState(null)
  const [howto_author, setHowto_author] = useState(null)
  const [howto_date, setHowto_date] = useState(null)
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
        'howto_name': howto_name,
        'howto_desc': howto_desc,
        'howto_author': howto_author,
        'howto_date': howto_date,
      }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos/create`, newRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          toast.success(`${howto_name} memorialized.`)
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


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
      .then((response) => {const sortedjobreqs = response.data.sort((b, a) => b.company.localeCompare(a.company));
        setJobreqs(sortedjobreqs);
      })
      // .catch((e) => console.error(e));
  },
    []);


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content=".."><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Create a New Howto Document</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Howto Name:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '600px' }} placeholder="Required" type="text" value={howto_name} onChange={(event) => setHowto_name(event.target.value)} required />
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Howto Description:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} placeholder="Required" type="text" value={howto_desc} onChange={(event) => setHowto_desc(event.target.value)} required />
                {/* <img alt="1" src={spacer} />Author:&nbsp; &nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={howto_author} onChange={(event) => setHowto_author(event.target.value)} /> */}
                <img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Create Howto</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}