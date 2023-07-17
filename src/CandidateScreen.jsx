import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AlertContext from "./Generic/Alerts/AlertContext";
import './Fonts.css'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import GradientLineThin from './GradientLineThin';
import { GiBirdCage } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

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
        'comment': comment
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




      <div className='Font-Verdana-Small-Postgres'>&nbsp; &nbsp;
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
                  
                  const formattedString = `${inbound.name.first} ${inbound.name.last} is a ${inbound.dob.age} year old ${inbound.gender} with a Job Description of ${inbound.location.coordinates.latitude}, whom currently resides in ${inbound.location.state}, ${inbound.location.country} with primary skills of ${inbound.location.coordinates.longitude} and ${inbound.location.coordinates.longitude} and ${inbound.location.coordinates.longitude} whom can be reached at ${inbound.phone} or ${inbound.email}`;
                 
                  return (
                    <form onSubmit={onKeepPost}>
                      <div key={key}>

                        <div className='Font-Verdana-Small'>
                          <Tooltip id="Screen" />
                          <div onClick={toggleAccordion}></div>
                        </div>

                        <div className='Font-Verdana-Small'>
                          &nbsp;
                          
                          &nbsp;
                          &nbsp;<input style={{ backgroundColor: '#f7f4f3', height: '40px', border: '2px solid #336791', borderRadius: '3px', padding: 0, paddingLeft: '20px', width: '95%' }} type="text" value={formattedString}/>
                          {/* <div>&nbsp;</div> */}
                          {/* <span style={{ color: 'black', fontStyle: 'bold' }}>{inbound.name.first} {inbound.name.last}</span> is a {inbound.dob.age}<GenderLabel gender={inbound.gender} /> <span style={{ color: 'red', fontStyle: 'italic' }}>{inbound.location.coordinates.latitude}</span> who currently resides in {inbound.location.state}, {inbound.location.country} with primary skills of <span style={{ color: 'red', fontStyle: 'italic' }}>{inbound.location.coordinates.longitude}</span> and <span style={{ color: 'red', fontStyle: 'italic' }}>{inbound.location.coordinates.longitude}</span> and <span style={{ color: 'red', fontStyle: 'italic' }}>{inbound.location.coordinates.longitude}</span> whom can be reached at {inbound.phone} or <a href={"mailto:${email}"}>{inbound.email}</a> */}
                          <div>&nbsp;</div>
                          &nbsp; &nbsp; Add some comments before commit?&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
                          <button className="Font-Verdana-Small-Heroku" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791', cursor: 'pointer' }} onClick={() => setFirstname(inbound.name.first) & setLastname(inbound.name.last) & setMobile(inbound.phone) & setEmail(inbound.email) & setCountry(inbound.location.country) & setJobdesc(inbound.location.coordinates.latitude) & setSkill1(inbound.location.coordinates.longitude)}>Add Candidate</button>
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
