import React, { useState } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png'
import spacer2 from './graphix/besterdev_spacer_white_half.png'
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { FaCriticalRole } from "react-icons/fa";


export default function RoleCreate(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [rolename, setRolename] = useState('');
  const [roledesc, setRoledesc] = useState('');
  const [roleskill1, setRoleskill1] = useState('');
  const [roleskill2, setRoleskill2] = useState('');
  const [roleskill3, setRoleskill3] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);

  const handleSubmit = async (event) => {
    var newRoleRecord = 
      {
        'rolename': rolename,
        'roledesc': roledesc,
        'roleskill1': roleskill1,
        'roleskill2': roleskill2,
        'roleskill3': roleskill3
      }

  const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles/create`, newRoleRecord);
        if (response.status === 200) { setCheckForRecords(!checkForRecords); alert(`${rolename} has been memorialized.`); }
        else { alert(`oops! Something went wrong @ the if/else!`); }
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
              <div className='Font-Verdana-Small-Postgres'>&nbsp; 
                <img alt="1" src={spacer} />
                <img alt="1" src={spacer} />Role Nme:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={rolename} onChange={(event) => setRolename(event.target.value)} required />
                <img alt="1" src={spacer} />Role Description:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={roledesc} onChange={(event) => setRoledesc(event.target.value)} />
                <img alt="1" src={spacer} />Role Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={roleskill1} onChange={(event) => setRoleskill1(event.target.value)} />
                <img alt="1" src={spacer} />Role Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={roleskill2} onChange={(event) => setRoleskill2(event.target.value)} />
                <img alt="1" src={spacer} />Role Skill:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={roleskill3} onChange={(event) => setRoleskill3(event.target.value)} />
                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }}>Add Role</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
