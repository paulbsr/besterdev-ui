import React, { useState, useContext } from "react";
import axios from 'axios';
import '../Fonts.css';
import spacer from '../graphix/besterdev_spacer_white.png'
import spacer2 from '../graphix/besterdev_spacer_white_half.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { GiHummingbird, GiNestBirds } from "react-icons/gi";
import { toast } from 'react-toastify';
import AlertContext from "../Generic/Alerts/AlertContext";

export default function EmployerCreate(props) {

  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [empname, setEmpname] = useState(null);
  const [empcontactfn, setEmpcontactfn] = useState(null);
  const [empcontactln, setEmpcontactln] = useState(null);
  const [empcontactnum, setEmpcontactnum] = useState(null);
  const [empcontactemail, setEmpcontactemail] = useState(null);
  const [empcomment, setEmpcomment] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [cr_date, setcr_date] = useState(formattedDate);
  const [cr_datehold, setCr_DateHold] = useState(null)
  const alertCtx = useContext(AlertContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      cr_date != null &&
      cr_datehold !== "Invalid Date"
    ) 
    {
      var newEmpRecord = {
        "empname": empname,
        "empcontactfn": empcontactfn,
        "empcontactln": empcontactln,
        "empcontactnum": empcontactnum,
        "empcontactemail": empcontactemail,
        "empcomment": empcomment
      }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/create`, newEmpRecord);
        if (response.status === 200) { 
          props.setCheckForRecords(!props.checkForRecords); 
          toast.success(`${empname} memorialized.`)
        }
        
        else { alert(`oops! Something went wrong!`); }

      }

      catch (err) { toast.error(`oops! Something went wrong!`); console.log(err); }
    }
    else {
      event.preventDefault();
    }
  }


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add"><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Add an Employer/Customer</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
              <div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Company Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '230px' }} placeholder="Required" type="text" value={empname} onChange={(event) => setEmpname(event.target.value)} required />
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Comment:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1130px' }} type="text" value={empcomment} onChange={(event) => setEmpcomment(event.target.value)} />
              </div>

                <div>&nbsp;</div>
                
              <div>
                 <img alt="1" src={spacer} /><img alt="1" src={spacer} />Contact's First Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={empcontactfn} onChange={(event) => setEmpcontactfn(event.target.value)} required />
                 <img alt="1" src={spacer} /><img alt="1" src={spacer} />Contact's Last Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '160px' }} placeholder="Required" type="text" value={empcontactln} onChange={(event) => setEmpcontactln(event.target.value)} required />
                 <img alt="1" src={spacer} /><img alt="1" src={spacer} />Contact's eMail Address:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={empcontactemail} onChange={(event) => setEmpcontactemail(event.target.value)} required />
                 <img alt="1" src={spacer} /><img alt="1" src={spacer} />Contact's Mobile Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={empcontactnum} onChange={(event) => setEmpcontactnum(event.target.value)} required />
              </div>

                <div>&nbsp;</div>

                <div><img alt="1" src={spacer} />&nbsp; &nbsp; &nbsp;<button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add Employer/Customer</button></div>
              </div>
            </form>
          </div>
        </div>)}
    </div>

  );
}
