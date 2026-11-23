import { useEffect, useState } from "react";
import { GiHummingbird } from "react-icons/gi";
import { toast } from "react-toastify";
import OAuth2APIClient from "../oauth2/OAuth2APIClient";

const today = () => new Date().toISOString().slice(0, 10);

export default function CandidateCreate({ setCheckForRecords }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [jobdesc, setJobdesc] = useState("");
  const [skill1, setSkill1] = useState("");
  const [comment, setComment] = useState("");
  const [role, setRole] = useState("");
  const [reqnum, setReqnum] = useState("");
  const [employer, setEmployer] = useState("");
  const [foundDate, setFoundDate] = useState(today);
  const [jobreqs, setJobreqs] = useState([]);
  const [selectedJobreq, setSelectedJobreq] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    OAuth2APIClient.get("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs")
      .then((response) => {
        const sortedJobreqs = response.data.sort((a, b) =>
          a.company.localeCompare(b.company)
        );
        if (active) setJobreqs(sortedJobreqs);
      })
      .catch((error) => {
        console.error("Failed to load job requisitions for candidates:", error);
        if (active) toast.error("Job requisitions could not be loaded.");
      });

    return () => {
      active = false;
    };
  }, []);

  const handleJobreqChange = (event) => {
    const jobreq = jobreqs.find((item) => String(item.id) === event.target.value);
    setSelectedJobreq(event.target.value);
    setEmployer(jobreq?.company || "");
    setRole(jobreq?.jrtitle || "");
    setReqnum(jobreq?.jrnumber || "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const newCandidate = {
      firstname,
      dob: foundDate,
      lastname,
      email,
      mobile,
      jobdesc,
      skill1,
      comment,
      role,
      reqnum,
      employer,
    };

    try {
      const response = await OAuth2APIClient.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/create",
        newCandidate
      );
      if (response.status === 200) {
        setCheckForRecords((value) => !value);
        toast.success(`${firstname} ${lastname} added.`);
      } else {
        toast.error("Candidate could not be added.");
      }
    } catch (error) {
      console.error("Failed to create candidate:", error);
      toast.error("Candidate could not be added.");
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
        aria-controls="candidate-create-form"
        onClick={() => setExpanded((value) => !value)}
      >
        <GiHummingbird className="admin-create-toggle-icon" aria-hidden="true" />
        <span>Add a candidate</span>
        <span className="admin-create-toggle-indicator" aria-hidden="true">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <form
          id="candidate-create-form"
          className="admin-create-form"
          onSubmit={handleSubmit}
        >
          <label className="admin-create-field">
            <span>First name</span>
            <input
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Last name</span>
            <input
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Mobile</span>
            <input
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Date found</span>
            <input
              type="date"
              value={foundDate}
              onChange={(event) => setFoundDate(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Job title</span>
            <input
              value={jobdesc}
              onChange={(event) => setJobdesc(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Primary skill</span>
            <input
              value={skill1}
              onChange={(event) => setSkill1(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Proposed requisition</span>
            <select value={selectedJobreq} onChange={handleJobreqChange}>
              <option value="">No requisition selected</option>
              {jobreqs.map((jobreq) => (
                <option key={jobreq.id} value={jobreq.id}>
                  {jobreq.company} — {jobreq.jrtitle} — {jobreq.jrnumber}
                </option>
              ))}
            </select>
          </label>
          <label className="admin-create-field admin-create-field-wide">
            <span>Comment</span>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          <div className="admin-create-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add candidate"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
