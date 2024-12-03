// http://www.google.com/search?q=+"java+developer"+"ireland" -intitle:"profiles" -inurl:"dir/+"+site:ie.linkedin.com/in/+OR+site:ie.linkedin.com/pub/
// http://www.google.com/search?q=+"python"+"south+africa" -intitle:"profiles" -inurl:"dir/+"+site:za.linkedin.com/in/+OR+site:za.linkedin.com/pub/
// http://www.google.com/search?q=+"$(skill)"+"$(country)" -intitle:"profiles" -inurl:"dir/+"+site:ie.linkedin.com/in/+OR+site:ie.linkedin.com/pub/

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Fonts.css';
import { FaPersonCircleQuestion, FaLinkedin } from "react-icons/fa6";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import ColouredBox from '../ColouredBox';
import spacer from '../graphix/besterdev_spacer_white.png';
import GradientLineLinkedIn from '../gradientlines/GradientLineLinkedIn';


export default function CandidateAPI() {

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
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
  const [jobreqs, setJobreqs] = useState(null);
  const [candidatecount, setCandidatecount] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [getCandidates, setGetCandidates] = useState(false);
  const [wa, setWa] = useState(null);
  const [linkedincountry, setLinkedinCountry] = useState(null);
  const [linkedinjobdesc, setLinkedinJobdesc] = useState(null);
  const [linkedinskill, setLinkedinSkill] = useState(null);

  const onKeepCandidate = async (e) => {
    e.preventDefault();

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

      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, candidatePOST);
      setGetCandidates(!getCandidates);
      setComment('');
    }
  }

  useEffect(() => {
    axios('https://randomuser.me/api/')
      .then((response) => {
        setCandidatedata(response.data.results);
      })
  },
    [getCandidates]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
      .then((response) => {
        const sortedjobreqs = response.data.sort((b, a) => b.company.localeCompare(a.company));
        setJobreqs(sortedjobreqs);
      })
  },
    [getCandidates]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates')
      .then((response) => {
        const sortedcandidatecount = response.data.sort((b, a) => b.firstname.localeCompare(a.firstname));
        setCandidatecount(sortedcandidatecount);
      })
  },
    [getCandidates]);


  const onSkipCandidate = async () => {
    const response = await axios('https://randomuser.me/api/');
    setCandidatedata(response.data.results);
  };

  const onSearchLinkedIn = () => {
    window.open('http://www.google.com/search?q=+"' + (linkedinjobdesc) + ' "+' + (linkedinskill) + ' -intitle:"profiles" -inurl:"dir/+"+site:ie.linkedin.com/in/+OR+site:ie.linkedin.com/pub/', '_blank');
  };



  return (
    <>
      {/* <GradientLineThin />&nbsp; */}

      <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
        <Tooltip id="insert" />
        <div onClick={toggleAccordion}>
          &nbsp; &nbsp;<a data-tooltip-id="insert" data-tooltip-content="HunterAPI"><FaPersonCircleQuestion style={{ color: '#336791', fontSize: '45px', cursor: 'pointer' }} /></a>
          &nbsp;<b style={{ fontFamily: "Verdana", fontSize: "medium", fontWeight: "bold", color: "#336791" }}>Screen Candidates via the Candidate Hunter API:</b>
        </div>
        <div>&nbsp;</div>

        {
          candidatedata.map((inbound, key) => {

            const inboundnamefirst = <span className="Font-Verdana-Medium-Bold">{inbound.name.first}</span>;
            const inboundnamelast = <span className="Font-Verdana-Medium-Bold">{inbound.name.last}</span>;
            const inboundage = <span className="Font-Verdana-Medium">{inbound.dob.age}</span>;
            const inboundgender = <span className="Font-Verdana-Medium">{inbound.gender}</span>;
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
              <form onSubmit={(e) => onKeepCandidate(e)}>
                <div key={key}>
                  <div className='Font-Verdana-Medium'>
                    <Tooltip id="Screen" />
                    <div onClick={toggleAccordion}></div>
                  </div>

                  <ColouredBox
                    fn={inboundnamefirst}
                    ln={inboundnamelast}
                    age={inboundage}
                    gender={inboundgender}
                    jd={inboundjd}
                    state={inboundstate}
                    country={inboundcountry}
                    skill1={inboundskill1}
                    skill2={inboundskill2}
                    skill3={inboundskill3}
                    mobile={inboundmobile}
                    email={inboundemail} />

                  <div className='Font-Verdana-Medium'>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>
                      <div>
                        <label htmlFor="dropdown">&nbsp; &nbsp; Propose for:&nbsp;</label>
                        <select className='Font-Verdana-Medium'
                          onChange={(event) => {
                            const selectedIndex = event.target.selectedIndex;
                            const selectedOption = event.target.options[selectedIndex];
                            const company = selectedOption.getAttribute("data-company");
                            const jrtitle = selectedOption.getAttribute("data-jrtitle");
                            const jrnumber = selectedOption.getAttribute("data-jrnumber");

                            setEmployer(company);
                            setRole(jrtitle);
                            setReqnum(jrnumber);
                          }}
                          id="dropdown"
                          style={{
                            height: '37.5px',
                            border: '1.25px solid #c4c4c4',
                            borderRadius: '4px',
                            padding: 0,
                            paddingLeft: '10px',
                            width: '400px'
                          }}
                        >

                          <option disabled selected value="">Employer  -  Job Title  - Req Number</option>

                          {jobreqs && jobreqs.map(option => (
                            <option
                              key={option.id}
                              value={option.id}
                              data-company={option.company} // Store company data as an attribute
                              data-jrtitle={option.jrtitle} // Store jrtitle data as an attribute
                              data-jrnumber={option.jrnumber} // Store jrnumber data as an attribute
                            >
                              {option.company}   -   {option.jrtitle}   -   {option.jrnumber}
                            </option>
                          ))}
                        </select>
                        &nbsp; &nbsp; Comment:&nbsp;<input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '530px' }} placeholder="Optional thoughts?" type="text" value={comment} onChange={(event) => setComment(event.target.value)} required />
                        <img alt="1" src={spacer} />&nbsp; &nbsp;
                        <button className="Font-Verdana-Medium-Postgres" type="submit" style={{ marginLeft: '10px', height: '37.5px', border: '2px solid #336791', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#336791', cursor: 'pointer' }} onClick={() => setFirstname(inbound.name.first) & setLastname(inbound.name.last) & setMobile(inbound.phone) & setEmail(inbound.email) & setCountry(inbound.location.country) & setJobdesc(inbound.location.coordinates.latitude) & setSkill1(inbound.location.coordinates.longitude)}><b>Add Candidate</b></button>
                        &nbsp;&nbsp;&nbsp;
                        
                        <button
                          className="Font-Verdana-Medium-Postgres"
                          type="button" // Change the type to "button" to prevent form submission
                          style={{ marginLeft: '10px', height: '37.5px', border: '2px solid #D5441C', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#D5441C', cursor: 'pointer' }}
                          onClick={onSkipCandidate}>
                          <b>Skip Candidate</b>
                        </button>
                        
                        &nbsp; &nbsp; Candidate Count: {candidatecount.length}
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>);
          }
          )
        }

        <div>
          <GradientLineLinkedIn />
          <div className='Font-Verdana-Medium-LinkedIn'>&nbsp; &nbsp;
            <Tooltip id="insert" />
            <div onClick={toggleAccordion}>
              &nbsp; &nbsp;<a data-tooltip-id="insert" data-tooltip-content="LinkedIn.com">
                <FaLinkedin style={{ color: '#0A66C2', fontSize: '35px', cursor: 'pointer' }} /></a>
              &nbsp;<b>Find Candidates on LinkedIn:</b>
            </div>
            <div>&nbsp;</div>
          </div>

          <div>&nbsp;</div>
          <div>
            &nbsp; &nbsp; LinkedIn Site:&nbsp;
            <select className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '230px' }} id="dropdown" value={wa} onChange={(event) => setLinkedinCountry(event.target.value)}>
              <option disabled selected value="Tax Domiciled">Tax Domiciled</option>
              <option value="IE">Ireland (Rep)</option>
              <option value="NI">Ireland (NI)</option>
              <option value="EN">England</option>
              <option value="WA">Wales</option>
              <option value="SC">Scotland</option>
            </select>
            <img alt="1" src={spacer} />Job Title:&nbsp;<input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Software Engineering Manager" type="text" value={linkedinjobdesc} onChange={(event) => setLinkedinJobdesc(event.target.value)} required />
            <img alt="1" src={spacer} />Skill:&nbsp;<input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="DevOps" type="text" value={linkedinskill} onChange={(event) => setLinkedinSkill(event.target.value)} required />
            <img alt="1" src={spacer} />&nbsp; &nbsp;

            <button
              className="Font-Verdana-Medium-Postgres"
              type="button" // Change the type to "button" to prevent form submission
              style={{ marginLeft: '10px', height: '37.5px', border: '2px solid #0A66C2', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#0A66C2', cursor: 'pointer' }}
              onClick={onSearchLinkedIn}>
              <b>Search LinkedIn</b>
            </button>

          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <GradientLineLinkedIn />
        </div>
      </div>
    </>
  );
}
