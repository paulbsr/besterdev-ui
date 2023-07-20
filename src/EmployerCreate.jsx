import React, { useState, useContext } from "react";

import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png'
import spacer2 from './graphix/besterdev_spacer_white_half.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { GiHummingbird, GiNestBirds } from "react-icons/gi";


export default function EmployerCreate(props) {


  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [empname, setEmpname] = useState(null);
  const [empcontactfn, setEmpcontactfn] = useState(null);
  const [empcontactln, setEmpcontactln] = useState(null);
  const [empcontactnum, setEmpcontactnum] = useState(null);
  const [empcontactemail, setEmpcontactemail] = useState(null);
  const [empcomment, setEmpcomment] = useState(null);
  const [isExpanded, setExpanded] = useState(false);



  const handleSubmit = async (event) => {
      {
          var newEmpRecord = {
              "empname": empname,
              "empcontactfn": empcontactfn,
              "empcontactln": empcontactln,
              "empcontactnum": empcontactnum,
              "empcontactemail": empcontactemail,
              "empcomment": empcomment
          }
          console.log(newEmpRecord)
      
      
      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/create`, newEmpRecord);
        if (response.status === 200) { props.setCheckForRecords(!props.checkForRecords); alert(`${empname} has been memorialized.`); }
        else { alert(`oops! Something went wrong!`); }

      }

      catch (err) { alert(`oops! Something went wrong!`); console.log(err); }
    }
    }


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer}/><img alt="1" src={spacer}/><GiHummingbird style={{ color: '#336791', fontSize: '35px', cursor: 'pointer' }}/><GiNestBirds style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
        <b>Add an Employer/Customer</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
              <div><img alt="1" src={spacer}/><img alt="1" src={spacer}/>Company Name:&nbsp;<input style={{ height: '20.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={empname} onChange={(event) => setEmpname(event.target.value)} required/><img alt="1" src={spacer}/><img alt="1" src={spacer}/><img alt="1" src={spacer}/><img alt="1" src={spacer}/>&nbsp;Comment:&nbsp;<input style={{ height: '20.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '675px' }} type="text" value={empcomment} onChange={(event) => setEmpcomment(event.target.value)}/></div>
              <div>&nbsp;</div>
              <div><img alt="1" src={spacer}/><img alt="1" src={spacer}/>Contact's First Name:&nbsp;<input style={{ height: '20.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={empcontactfn} onChange={(event) => setEmpcontactfn(event.target.value)} required/>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Contact's Last Name:&nbsp;<input style={{ height: '20.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={empcontactln} onChange={(event) => setEmpcontactln(event.target.value)} required/>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Contact's eMail Address:&nbsp;<input style={{ height: '20.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={empcontactemail} onChange={(event) => setEmpcontactemail(event.target.value)} required/>
              <img alt="1" src={spacer}/><img alt="1" src={spacer}/>Contact's Mobile Number:&nbsp;<input style={{ height: '20.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={empcontactnum} onChange={(event) => setEmpcontactnum(event.target.value)} required/></div>
              <div>&nbsp;</div>
              <div><img alt="1" src={spacer}/>&nbsp; &nbsp; &nbsp;<button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '20.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }}>Add Employer/Customer</button></div>
              </div>
            </form>
          </div>
        </div>)}
    </div>

  );
}
