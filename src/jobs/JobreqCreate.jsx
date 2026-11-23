import { useEffect, useState } from "react";
import { GiHummingbird } from "react-icons/gi";
import { toast } from "react-toastify";
import OAuth2APIClient from "../oauth2/OAuth2APIClient";

const today = () => new Date().toISOString().slice(0, 10);

export default function JobreqCreate({ setCheckForRecords }) {
  const [jrnumber, setJrnumber] = useState("");
  const [company, setCompany] = useState("");
  const [jrtitle, setJrtitle] = useState("");
  const [location, setLocation] = useState("");
  const [recruitername, setRecruitername] = useState("");
  const [recruiteremail, setRecruiteremail] = useState("");
  const [recruiternumber, setRecruiternumber] = useState("");
  const [comment, setComment] = useState("");
  const [createdate, setCreatedate] = useState(today);
  const [targetdate, setTargetdate] = useState(today);
  const [status, setStatus] = useState("");
  const [wa, setWa] = useState("");
  const [employers, setEmployers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    OAuth2APIClient.get("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers")
      .then((response) => {
        const sortedEmployers = response.data.sort((a, b) =>
          a.empname.localeCompare(b.empname)
        );
        if (active) setEmployers(sortedEmployers);
      })
      .catch((error) => {
        console.error("Failed to load employers for job requisitions:", error);
        if (active) toast.error("Employer list could not be loaded.");
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const newJobRequest = {
      jrnumber,
      company,
      jrtitle,
      location,
      recruitername,
      recruiteremail,
      recruiternumber,
      comment,
      createdate,
      targetdate,
      status,
      wa,
    };

    try {
      const response = await OAuth2APIClient.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/create",
        newJobRequest
      );
      if (response.status === 200) {
        setCheckForRecords((value) => !value);
        toast.success(`${jrnumber} for ${company || "employer"} added.`);
      } else {
        toast.error("Job requisition could not be added.");
      }
    } catch (error) {
      console.error("Failed to create job requisition:", error);
      toast.error("Job requisition could not be added.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-create">
      <button
        className="admin-create-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls="jobreq-create-form"
        onClick={() => setExpanded((value) => !value)}
      >
        <GiHummingbird className="admin-create-toggle-icon" aria-hidden="true" />
        <span>Add a job requisition</span>
        <span className="admin-create-toggle-indicator" aria-hidden="true">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <form
          id="jobreq-create-form"
          className="admin-create-form"
          onSubmit={handleSubmit}
        >
          <label className="admin-create-field">
            <span>Employer</span>
            <select value={company} onChange={(event) => setCompany(event.target.value)}>
              <option value="">Select an employer</option>
              {employers.map((employer) => (
                <option key={employer.id} value={employer.empname}>
                  {employer.empname}
                </option>
              ))}
            </select>
          </label>
          <label className="admin-create-field">
            <span>Requisition number</span>
            <input
              value={jrnumber}
              onChange={(event) => setJrnumber(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field admin-create-field-wide">
            <span>Job title</span>
            <input
              value={jrtitle}
              onChange={(event) => setJrtitle(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Location</span>
            <input value={location} onChange={(event) => setLocation(event.target.value)} />
          </label>
          <label className="admin-create-field">
            <span>Work arrangement</span>
            <select value={wa} onChange={(event) => setWa(event.target.value)}>
              <option value="">Select an arrangement</option>
              <option value="FR">Fully remote</option>
              <option value="H1">Hybrid, 1 day onsite</option>
              <option value="H2">Hybrid, 2 days onsite</option>
              <option value="H3">Hybrid, 3 days onsite</option>
              <option value="H4">Hybrid, 4 days onsite</option>
              <option value="FO">Fully onsite</option>
            </select>
          </label>
          <label className="admin-create-field">
            <span>Recruiter name</span>
            <input
              value={recruitername}
              onChange={(event) => setRecruitername(event.target.value)}
            />
          </label>
          <label className="admin-create-field">
            <span>Recruiter email</span>
            <input
              type="email"
              value={recruiteremail}
              onChange={(event) => setRecruiteremail(event.target.value)}
            />
          </label>
          <label className="admin-create-field">
            <span>Recruiter number</span>
            <input
              type="tel"
              value={recruiternumber}
              onChange={(event) => setRecruiternumber(event.target.value)}
            />
          </label>
          <label className="admin-create-field">
            <span>Status</span>
            <input value={status} onChange={(event) => setStatus(event.target.value)} />
          </label>
          <label className="admin-create-field">
            <span>Created date</span>
            <input
              type="date"
              value={createdate}
              onChange={(event) => setCreatedate(event.target.value)}
            />
          </label>
          <label className="admin-create-field">
            <span>Target date</span>
            <input
              type="date"
              value={targetdate}
              onChange={(event) => setTargetdate(event.target.value)}
            />
          </label>
          <label className="admin-create-field admin-create-field-wide">
            <span>Comment</span>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
          </label>
          <div className="admin-create-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add job requisition"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
