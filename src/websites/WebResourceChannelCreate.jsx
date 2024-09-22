import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../Generic/Alerts/AlertContext";
import axios from 'axios';
import '../Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
dayjs.extend(utc);


export default function WebResourceChannelCreate(props) {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const alertCtx = useContext(AlertContext);
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
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/create`, newRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          toast.success(`${firstname} ${lastname} has been memorialized.`)
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
  },
    []);


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Memorialize a Resource"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Memorialize a YouTube Channel or PodCast Series:</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Channel / PodCast Name:&nbsp;&nbsp;<input style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '550px' }} placeholder="Required" type="text" value={firstname} onChange={(event) => setfirstname(event.target.value)} required />
                <div>&nbsp;</div>

                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Content Creator:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '610px' }} placeholder="Required" type="text" value={lastname} onChange={(event) => setlastname(event.target.value)} required />
                <div>&nbsp;</div>
                
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Value/Description:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '600px' }} placeholder="Required" type="text" value={lastname} onChange={(event) => setlastname(event.target.value)} required />
                <div>&nbsp;</div>
                
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '690px' }} placeholder="Required" type="text" value={email} onChange={(event) => setemail(event.target.value)} required />
                <div>&nbsp;</div>
                
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
