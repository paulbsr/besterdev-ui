import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AlertContext from "./Generic/Alerts/AlertContext";
import './Fonts.css'
import spacer from './graphix/besterdev_spacer_white.png'
import {FaMinusCircle, FaPlusCircle} from 'react-icons/fa';
import GradientLineThin from './GradientLineThin';
import { GiHummingbird, GiNestBirds } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'



export default function CandidateScreen() {

  const [candidatedata, setCandidatedata] = useState([]);
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [mobile, setMobile] = useState(null)
  const [email, setEmail] = useState(null)
  const [country, setCountry] = useState(null)
  const alertCtx = useContext(AlertContext);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};
    
    
  const onKeepPost = async (event) => {
    
        {
        var candidatePOST = {
          'firstname': firstname,
          'lastname': lastname,
          'mobile': mobile,
          'email': email,
          'country': country,
        }
        console.log(candidatePOST)
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, candidatePOST);
        if(response.status === 200)
        {alert(`${firstname} ${lastname} has been saved for future reference`)}
        else {alertCtx.error(`oops! Something went wrong!`);}
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
    <><GradientLineThin />&nbsp;
      {
        candidatedata.map((inbound, key) => {
          return (
            <form onSubmit={onKeepPost}>
              <div key={key}>
                <div className='Font-Verdana-Small'>
                  <Tooltip id="Screen" />
                  <div onClick={toggleAccordion}></div>
                  <a data-tooltip-id="Screen" data-tooltip-content="Screen"><GiNestBirds style={{ color: '#000000', fontSize: '35px', cursor: 'pointer' }} /></a>
                  <b>&nbsp;Screen Candidate: </b>
                </div>



                <div className='Font-Verdana-Small'>
                  &nbsp;
                  {/* <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none'}} type='button' onClick={() => onKeepPost()}><a data-tooltip-id="commit" data-tooltip-content="Keep"><FaPlusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button> */}
                  {/* <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none'}} type="submit"><a data-tooltip-id="commit" data-tooltip-content="Keep"><FaPlusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button> */}
                  {/* <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none'}} type="submit"><a data-tooltip-id="commit" data-tooltip-content="Keep"><FaPlusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button> */}
                  {/* <button className="Font-Verdana-Small" type="submit" style={{marginLeft: '10px', height: '30px', border: '1px solid #169247', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#169247 ',  cursor: 'pointer'}}>Commit</button> */}
                  {/* <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none'}} type='button' onClick={() => onKeepPost()}><a data-tooltip-id="commit" data-tooltip-content="Drop"><FaMinusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button> */}
                  {/* <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none'}} type='button' onClick={() => setFirstname(inbound.name.first) & setLastname(inbound.name.last) & setMobile(inbound.phone) & setEmail(inbound.email) & setCountry(inbound.location.country)}><a data-tooltip-id="commit" data-tooltip-content="Drop"><FaPlusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button> */}
                  {/* &nbsp; */}
                  <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none'}} onClick={() => setFirstname(inbound.name.first) & setLastname(inbound.name.last) & setMobile(inbound.phone) & setEmail(inbound.email) & setCountry(inbound.location.country)}><a data-tooltip-id="commit" data-tooltip-content="Keep"><FaPlusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button>
                  &nbsp;
                  {/* <button>Drop</button> */}
                  <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none'}} onClick={() => setFirstname(inbound.name.first) & setLastname(inbound.name.last) & setMobile(inbound.phone) & setEmail(inbound.email) & setCountry(inbound.location.country)}><a data-tooltip-id="commit" data-tooltip-content="Drop"><FaMinusCircle style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }}/></a></button>
                  &nbsp;
                  {inbound.name.first} {inbound.name.last} is a {inbound.dob.age}<GenderLabel gender={inbound.gender}/> <span style={{ color: 'red', fontStyle: 'italic'}}>{inbound.login.username}</span> who currently resides in {inbound.location.state}, {inbound.location.country} with primary skills of <span style={{ color: 'red', fontStyle: 'italic'}}>{inbound.login.username}</span> and <span style={{ color: 'red', fontStyle: 'italic'}}>{inbound.login.username}</span> and <span style={{ color: 'red', fontStyle: 'italic'}}>{inbound.login.username}</span> whom can be reached at {inbound.phone} or <a href={"mailto:${email}"}>{inbound.email}</a>
                </div>

              </div>
            </form>
          );
        })
        
      }
    </>
  );
}