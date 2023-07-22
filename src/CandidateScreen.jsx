import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AlertContext from "./Generic/Alerts/AlertContext";
import './Fonts.css'
import GradientLineThin from './GradientLineThin';
import { GiBirdCage } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ColouredBox from './ColouredBox';
import EmployerDropdown from './EmployerDropdown';
import RoleDropdown from './RoleDropdown';

 export default function CandidateScreen() {

  const today = new Date(); // Create a new Date object representing today's date
  const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
  const [candidatedata, setCandidatedata] = useState([]);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [dob, setDob] = useState(formattedDate);
  const [jobdesc, setJobdesc] = useState(null);
  const [skill1, setSkill1] = useState(null);
  const [country, setCountry] = useState(null);
  const [comment, setComment] = useState('');
  const [role, setRole] = useState(null);
  const [reqnum, setReqnum] = useState(null);
  const [employer, setEmployer] = useState(null);
  const alertCtx = useContext(AlertContext);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const onKeepPost = async (event) => {

    {
      var candidatePOST = {
        'firstname': firstname,
        'lastname': lastname,
        'mobile': mobile,
        'email': email,
        'country': country,
        'dob': dob,
        'jobdesc': jobdesc,
        'skill1': skill1,
        'comment': comment,
        'role': role,
        'reqnum': reqnum,
        'employer': employer
      }
      console.log(candidatePOST)
      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, candidatePOST);
      if (response.status === 200) { alert(`${firstname} ${lastname} has been memorialized.`) }
      else { alert(`oops! Something went wrong!`); }
    }
  }

  useEffect(() => {
    axios('https://randomuser.me/api/')
      .then((response) => {
        setCandidatedata(response.data.results);
      })
  },
    []);


  function GenderLabel({ gender }) {
    if (gender === "female") { return <span>F</span>; }
    else if (gender === "male") { return <span>M</span>; }
    else { return null; }
  }

  


  return (
    <>
      <GradientLineThin />&nbsp;

      <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
        <Tooltip id="insert" />
        <div onClick={toggleAccordion}>
          &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Select"><GiBirdCage style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
          &nbsp;<b>Screen Candidates</b>
        </div>

        {isExpanded && (
          <div>
            <div>

              {
                candidatedata.map((inbound, key) => {
                  
                  const inboundnamefirst = <span className="Font-Verdana-Medium-Bold">{inbound.name.first}</span>;
                  const inboundnamelast = <span className="Font-Verdana-Medium-Bold">{inbound.name.last}</span>;
                  const inboundage = <span className="Font-Verdana-Medium">{inbound.dob.age}</span>;
                  const inboungender = <span className="Font-Verdana-Medium">{inbound.gender}</span>;
                  const inboundjd = <span className="Font-Verdana-Medium-Italic-Rusty">{inbound.location.coordinates.latitude}</span>;
                  const inboundstate = <span className="Font-Verdana-Medium">{inbound.location.state}</span>;
                  const inboundcountry = <span className="Font-Verdana-Medium">{inbound.location.country}</span>;
                  const inboundskill1 = <span className="Font-Verdana-Medium-Italic-Rusty">{inbound.location.coordinates.longitude}</span>;
                  const inboundskill2 = <span className="Font-Verdana-Medium-Italic-Rusty">{inbound.location.coordinates.longitude}</span>;
                  const inboundskill3 = <span className="Font-Verdana-Medium-Italic-Rusty">{inbound.location.coordinates.longitude}</span>;
                  const inboundmobile = <span className="Font-Verdana-Medium">{inbound.phone}</span>;
                  const inboundemail = <span className="Font-Verdana-Medium">{inbound.email}</span>;

                  const formattedString = `${inbound.name.first} ${inbound.name.last} is a ${inbound.dob.age} year old ${inbound.gender} with a Job Description of ${inbound.location.coordinates.latitude}, whom currently resides in ${inbound.location.state}, ${inbound.location.country} with primary skills of ${inbound.location.coordinates.longitude} and ${inbound.location.coordinates.longitude} and ${inbound.location.coordinates.longitude} whom can be reached at ${inbound.phone} or ${inbound.email}`;
                  
                  return (
                    
                    <form onSubmit={onKeepPost}>
                      <div key={key}>

                        <div className='Font-Verdana-Medium'>
                          <Tooltip id="Screen" />
                          <div onClick={toggleAccordion}></div>
                        </div>

                        <ColouredBox 
                        fn={inboundnamefirst} 
                        ln={inboundnamelast}
                        age={inboundage}
                        gender={inboungender}
                        jd={inboundjd}
                        state={inboundstate}
                        country={inboundcountry}
                        skill1={inboundskill1}
                        skill2={inboundskill2}
                        skill3={inboundskill3}
                        mobile={inboundmobile}
                        email={inboundemail}/>
                        
                        <div className='Font-Verdana-Small'>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          &nbsp; &nbsp;<EmployerDropdown/>
                          &nbsp; &nbsp;<RoleDropdown/>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          &nbsp; &nbsp; Requisition Number:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
                          <div>&nbsp;</div>
                          &nbsp; &nbsp; Comment:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
                          <div>&nbsp;</div>
                          <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }} onClick={() => setFirstname(inbound.name.first) & setLastname(inbound.name.last) & setMobile(inbound.phone) & setEmail(inbound.email) & setCountry(inbound.location.country) & setJobdesc(inbound.location.coordinates.latitude) & setSkill1(inbound.location.coordinates.longitude)}>Add Candidate</button>
                        </div>

                      </div>
                    </form>
                  );
                })

              }
            </div>
          </div>)}
      </div>
    </>
  );
}
