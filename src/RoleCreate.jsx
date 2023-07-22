import React, { useState, useContext } from "react";
import AlertContext from "./Generic/Alerts/AlertContext";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png'
import spacer2 from './graphix/besterdev_spacer_white_half.png'
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { FaCriticalRole } from "react-icons/fa";


export default function RoleCreate(props) {
  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const alertCtx = useContext(AlertContext);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [rolename, setRolename] = useState('');
  const [roledesc, setRoledesc] = useState('');
  const [roleskill1, setRoleskill1] = useState('');
  const [roleskill2, setRoleskill2] = useState('');
  const [roleskill3, setRoleskill3] = useState('');
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
      var newRoleRecord = {
        'rolename': rolename,
        'roledesc': roledesc,
        'roleskill1': roleskill1,
        'roleskill2': roleskill2,
        'roleskill3': roleskill3
      }
      console.log(newRoleRecord)


      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles/create`, newRoleRecord);
        if (response.status === 200) { props.setCheckForRecords(!props.checkForRecords); alert(`${rolename} has been memorialized.`); }
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
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '35px', cursor: 'pointer' }} /><FaCriticalRole style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
        <b>Add a Role</b>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>&nbsp; <img alt="1" src={spacer} /><img alt="1" src={spacer} />Rolename:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={rolename} onChange={(event) => setRolename(event.target.value)} required />
                <img alt="1" src={spacer} />Role Description:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={roledesc} onChange={(event) => setRoledesc(event.target.value)} required />
                <img alt="1" src={spacer} />Role Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={roleskill1} onChange={(event) => setRoleskill1(event.target.value)} required />
                <img alt="1" src={spacer} />Role Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={roleskill2} onChange={(event) => setRoleskill2(event.target.value)} required />
                <img alt="1" src={spacer} />Role Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={roleskill3} onChange={(event) => setRoleskill3(event.target.value)} required />
                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }}>Add Role</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
