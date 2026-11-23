import { useState, useEffect, useCallback } from 'react';
import { FaPersonCircleQuestion, FaLinkedin, FaRotate } from "react-icons/fa6";
import ColouredBox from '../ColouredBox';
import '../Fonts.css';
import './CandidateHunt.css';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

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

  const fetchRandomCandidate = useCallback(async () => {
    try {
      const { data } = await OAuth2APIClient.get('https://randomuser.me/api/');
      setCandidatedata(data.results);
    } catch (err) {
      console.error('Error fetching candidate:', err);
    }
  }, []);

  const fetchJobReqs = useCallback(async () => {
    try {
      const { data } = await OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs');
      setJobreqs(data.sort((a, b) => a.company.localeCompare(b.company)));
    } catch (err) {
      console.error('Error fetching job reqs:', err);
    }
  }, []);

  const fetchCandidates = useCallback(async () => {
    try {
      const { data } = await OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates');
      setCandidatecount(data.sort((a, b) => a.firstname.localeCompare(b.firstname)));
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  }, []);

  useEffect(() => {
    fetchRandomCandidate();
    fetchJobReqs();
    fetchCandidates();
  }, [refresh, fetchRandomCandidate, fetchJobReqs, fetchCandidates]);

  const handleKeepCandidate = async (event, inbound) => {
    event.preventDefault();
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
        employer,
      };
      await OAuth2APIClient.post('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create', payload);
      setComment('');
      setRefresh((value) => !value);
    } catch (err) {
      console.error('Error adding candidate:', err);
    }
  };

  const handleLinkedInSearch = (event) => {
    event.preventDefault();
    const searchUrl = `https://www.google.com/search?q=+"${linkedinJob}"+${linkedinSkill} -intitle:"profiles" -inurl:"dir/+"+site:ie.linkedin.com/in/+OR+site:ie.linkedin.com/pub/`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="candidate-hunt-workspace">
      <section className="candidate-hunt-card" aria-labelledby="candidate-hunt-title">
        <header className="candidate-hunt-card-header">
          <span className="candidate-hunt-icon" aria-hidden="true"><FaPersonCircleQuestion /></span>
          <div>
            <p className="candidate-hunt-eyebrow">DISCOVER PROFILES</p>
            <h2 id="candidate-hunt-title">Candidate Hunter</h2>
            <p>Review a sample profile and save it against an open requisition.</p>
          </div>
          <button
            className="candidate-hunt-icon-button"
            type="button"
            onClick={() => setRefresh((value) => !value)}
            aria-label="Refresh candidate and requisition data"
            title="Refresh candidate and requisition data"
          >
            <FaRotate aria-hidden="true" />
          </button>
        </header>

        {candidatedata.map((inbound) => (
          <form
            className="candidate-hunt-form"
            key={inbound.login.uuid}
            onSubmit={(event) => handleKeepCandidate(event, inbound)}
          >
            <ColouredBox
              fn={inbound.name.first}
              ln={inbound.name.last}
              age={inbound.dob.age}
              gender={inbound.gender}
              jd={inbound.location.coordinates.latitude}
              state={inbound.location.state}
              country={inbound.location.country}
              skill1={inbound.location.coordinates.longitude}
              mobile={inbound.phone}
              email={inbound.email}
            />

            <div className="candidate-hunt-fields">
              <label className="candidate-hunt-field candidate-hunt-field-wide">
                <span>Propose for</span>
                <select
                  value={reqnum}
                  onChange={(event) => {
                    const selected = event.target.options[event.target.selectedIndex];
                    setEmployer(selected.getAttribute('data-company') || '');
                    setRole(selected.getAttribute('data-jrtitle') || '');
                    setReqnum(selected.getAttribute('data-jrnumber') || '');
                  }}
                  required
                >
                  <option value="">Select an employer, role, and requisition</option>
                  {jobreqs.map((option) => (
                    <option
                      key={option.id}
                      value={option.jrnumber}
                      data-company={option.company}
                      data-jrtitle={option.jrtitle}
                      data-jrnumber={option.jrnumber}
                    >
                      {option.company} - {option.jrtitle} - {option.jrnumber}
                    </option>
                  ))}
                </select>
              </label>
              <label className="candidate-hunt-field candidate-hunt-field-wide">
                <span>Comment <small>Optional</small></span>
                <input
                  placeholder="Add a note about this candidate"
                  type="text"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </label>
            </div>

            <div className="candidate-hunt-form-footer">
              <span>Saved candidates: <strong>{candidatecount.length}</strong></span>
              <div className="candidate-hunt-actions">
                <button className="candidate-hunt-button candidate-hunt-button-primary" type="submit">
                  Add candidate
                </button>
                <button
                  className="candidate-hunt-button candidate-hunt-button-secondary"
                  type="button"
                  onClick={fetchRandomCandidate}
                >
                  Skip candidate
                </button>
              </div>
            </div>
          </form>
        ))}
      </section>

      <section className="candidate-hunt-card candidate-linkedin-card" aria-labelledby="linkedin-hunt-title">
        <header className="candidate-hunt-card-header">
          <span className="candidate-hunt-icon candidate-linkedin-icon" aria-hidden="true"><FaLinkedin /></span>
          <div>
            <p className="candidate-hunt-eyebrow">SOURCE PROFILES</p>
            <h2 id="linkedin-hunt-title">Search LinkedIn</h2>
            <p>Find matching public profiles using a Google site search.</p>
          </div>
        </header>

        <form className="candidate-hunt-fields linkedin-hunt-fields" onSubmit={handleLinkedInSearch}>
          <label className="candidate-hunt-field">
            <span>LinkedIn site</span>
            <select value={linkedinCountry} onChange={(event) => setLinkedinCountry(event.target.value)}>
              <option value="">Select a country</option>
              <option value="IE">Ireland (Rep)</option>
              <option value="NI">Ireland (NI)</option>
              <option value="EN">England</option>
              <option value="WA">Wales</option>
              <option value="SC">Scotland</option>
            </select>
          </label>
          <label className="candidate-hunt-field">
            <span>Job title</span>
            <input
              placeholder="Software Engineering Manager"
              type="text"
              value={linkedinJob}
              onChange={(event) => setLinkedinJob(event.target.value)}
              required
            />
          </label>
          <label className="candidate-hunt-field">
            <span>Skill</span>
            <input
              placeholder="DevOps"
              type="text"
              value={linkedinSkill}
              onChange={(event) => setLinkedinSkill(event.target.value)}
              required
            />
          </label>
          <div className="candidate-hunt-form-footer linkedin-hunt-footer">
            <span>Search opens in a new tab.</span>
            <button className="candidate-hunt-button candidate-hunt-button-primary" type="submit">
              Search profiles
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
