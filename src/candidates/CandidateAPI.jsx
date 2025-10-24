import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../Fonts.css';
import { FaPersonCircleQuestion, FaLinkedin } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import ColouredBox from '../ColouredBox';
import spacer from '../graphix/besterdev_spacer_white.png';
import GradientLineLinkedIn from '../gradientlines/GradientLineLinkedIn';
import 'react-tooltip/dist/react-tooltip.css';

export default function CandidateAPI() {
  const today = new Date().toISOString().split('T')[0];

  const [candidatedata, setCandidatedata] = useState([]);
  const [jobreqs, setJobreqs] = useState([]);
  const [candidatecount, setCandidatecount] = useState([]);
  const [comment, setComment] = useState('');
  const [employer, setEmployer] = useState('');
  const [role, setRole] = useState('');
  const [reqnum, setReqnum] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [linkedinCountry, setLinkedinCountry] = useState('');
  const [linkedinJob, setLinkedinJob] = useState('');
  const [linkedinSkill, setLinkedinSkill] = useState('');

  // --- Fetch Helpers ---
  const fetchRandomCandidate = useCallback(async () => {
    try {
      const { data } = await axios('https://randomuser.me/api/');
      setCandidatedata(data.results);
    } catch (err) {
      console.error('Error fetching candidate:', err);
    }
  }, []);

  const fetchJobReqs = useCallback(async () => {
    try {
      const { data } = await axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs');
      setJobreqs(data.sort((a, b) => a.company.localeCompare(b.company)));
    } catch (err) {
      console.error('Error fetching job reqs:', err);
    }
  }, []);

  const fetchCandidates = useCallback(async () => {
    try {
      const { data } = await axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates');
      setCandidatecount(data.sort((a, b) => a.firstname.localeCompare(b.firstname)));
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  }, []);

  // --- Lifecycle ---
  useEffect(() => {
    fetchRandomCandidate();
    fetchJobReqs();
    fetchCandidates();
  }, [refresh, fetchRandomCandidate, fetchJobReqs, fetchCandidates]);

  // --- Handlers ---
  const handleKeepCandidate = async (e, inbound) => {
    e.preventDefault();
    try {
      const payload = {
        firstname: inbound.name.first,
        lastname: inbound.name.last,
        mobile: inbound.phone,
        email: inbound.email,
        country: inbound.location.country,
        dob: today,
        jobdesc: inbound.location.coordinates.latitude,
        skill1: inbound.location.coordinates.longitude,
        comment,
        role,
        reqnum,
        employer
      };
      await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create`, payload);
      setComment('');
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Error adding candidate:', err);
    }
  };

  const handleLinkedInSearch = () => {
    const searchUrl = `https://www.google.com/search?q=+"${linkedinJob}"+${linkedinSkill} -intitle:"profiles" -inurl:"dir/+"+site:ie.linkedin.com/in/+OR+site:ie.linkedin.com/pub/`;
    window.open(searchUrl, '_blank');
  };

  // --- JSX ---
  return (
    <div className="Font-Verdana-Medium-Postgres">
      <Tooltip id="insert" />
      <section>
        <header onClick={() => setRefresh(!refresh)}>
          <FaPersonCircleQuestion style={{ color: '#336791', fontSize: '45px', cursor: 'pointer' }} data-tooltip-id="insert" data-tooltip-content="HunterAPI" />
          <b style={{ color: "#336791" }}> Screen Candidates via the Candidate Hunter API:</b>
        </header>

        {candidatedata.map((inbound, key) => (
          <form key={key} onSubmit={(e) => handleKeepCandidate(e, inbound)}>
            <ColouredBox
              fn={inbound.name.first}
              ln={inbound.name.last}
              age={inbound.dob.age}
              gender={inbound.gender}
              jd={inbound.location.coordinates.latitude}
              state={inbound.location.state}
              country={inbound.location.country}
              skill1={inbound.location.coordinates.longitude}
              skill2={inbound.location.coordinates.longitude}
              skill3={inbound.location.coordinates.longitude}
              mobile={inbound.phone}
              email={inbound.email}
            />

            <div style={{ marginTop: '20px' }}>
              <label>Propose for:&nbsp;</label>
              <select
                className='Font-Verdana-Medium'
                onChange={(e) => {
                  const selected = e.target.options[e.target.selectedIndex];
                  setEmployer(selected.getAttribute('data-company'));
                  setRole(selected.getAttribute('data-jrtitle'));
                  setReqnum(selected.getAttribute('data-jrnumber'));
                }}
                style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', paddingLeft: '10px', width: '400px' }}
                required
              >
                <option value="">Employer - Job Title - Req Number</option>
                {jobreqs.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                    data-company={option.company}
                    data-jrtitle={option.jrtitle}
                    data-jrnumber={option.jrnumber}
                  >
                    {option.company} - {option.jrtitle} - {option.jrnumber}
                  </option>
                ))}
              </select>

              &nbsp;&nbsp;Comment:&nbsp;
              <input
                className='Font-Verdana-Medium'
                style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', paddingLeft: '10px', width: '530px' }}
                placeholder="Optional thoughts?"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <img alt="spacer" src={spacer} />&nbsp;
              <button
                type="submit"
                className="Font-Verdana-Medium-Postgres"
                style={{ border: '2px solid #336791', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#336791', cursor: 'pointer' }}
              >
                <b>Add Candidate</b>
              </button>

              &nbsp;&nbsp;
              <button
                type="button"
                onClick={fetchRandomCandidate}
                className="Font-Verdana-Medium-Postgres"
                style={{ border: '2px solid #D5441C', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#D5441C', cursor: 'pointer' }}
              >
                <b>Skip Candidate</b>
              </button>

              &nbsp;&nbsp;Candidate Count: {candidatecount.length}
            </div>
          </form>
        ))}
      </section>

      <GradientLineLinkedIn />

      {/* LinkedIn Search Section */}
      <section className='Font-Verdana-Medium-LinkedIn'>
        <header>
          <FaLinkedin style={{ color: '#0A66C2', fontSize: '35px', cursor: 'pointer' }} data-tooltip-id="insert" data-tooltip-content="LinkedIn.com" />
          <b> Find Candidates on LinkedIn:</b>
        </header>

        <div style={{ marginTop: '10px' }}>
          <label>LinkedIn Site:&nbsp;</label>
          <select
            className='Font-Verdana-Medium'
            style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', paddingLeft: '10px', width: '230px' }}
            onChange={(e) => setLinkedinCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="IE">Ireland (Rep)</option>
            <option value="NI">Ireland (NI)</option>
            <option value="EN">England</option>
            <option value="WA">Wales</option>
            <option value="SC">Scotland</option>
          </select>

          <img alt="spacer" src={spacer} />Job Title:&nbsp;
          <input
            className='Font-Verdana-Medium'
            style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', paddingLeft: '10px', width: '300px' }}
            placeholder="Software Engineering Manager"
            type="text"
            value={linkedinJob || ''}
            onChange={(e) => setLinkedinJob(e.target.value)}
            required
          />

          <img alt="spacer" src={spacer} />Skill:&nbsp;
          <input
            className='Font-Verdana-Medium'
            style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', paddingLeft: '10px', width: '300px' }}
            placeholder="DevOps"
            type="text"
            value={linkedinSkill || ''}
            onChange={(e) => setLinkedinSkill(e.target.value)}
            required
          />

          <img alt="spacer" src={spacer} />&nbsp;
          <button
            type="button"
            className="Font-Verdana-Medium-Postgres"
            style={{ border: '2px solid #0A66C2', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#0A66C2', cursor: 'pointer' }}
            onClick={handleLinkedInSearch}
          >
            <b>Search LinkedIn</b>
          </button>
        </div>
      </section>

      <GradientLineLinkedIn />
    </div>
  );
}
