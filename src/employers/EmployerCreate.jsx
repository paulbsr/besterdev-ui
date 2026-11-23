import { useState } from "react";
import OAuth2APIClient from "../oauth2/OAuth2APIClient";
import { GiHummingbird } from "react-icons/gi";
import { toast } from "react-toastify";

export default function EmployerCreate({ checkForRecords, setCheckForRecords }) {
  const [empname, setEmpname] = useState("");
  const [empcontactfn, setEmpcontactfn] = useState("");
  const [empcontactln, setEmpcontactln] = useState("");
  const [empcontactnum, setEmpcontactnum] = useState("");
  const [empcontactemail, setEmpcontactemail] = useState("");
  const [empcomment, setEmpcomment] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const newEmployer = {
      empname,
      empcontactfn,
      empcontactln,
      empcontactnum,
      empcontactemail,
      empcomment,
    };

    try {
      const response = await OAuth2APIClient.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/create",
        newEmployer
      );
      if (response.status === 200) {
        setCheckForRecords((value) => !value);
        toast.success(`${empname} added.`);
      } else {
        toast.error("Employer could not be added.");
      }
    } catch (error) {
      console.error("Failed to create employer:", error);
      toast.error("Employer could not be added.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-create">
      <button
        className="admin-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="employer-create-form"
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <GiHummingbird className="admin-create-toggle-icon" aria-hidden="true" />
        <span>Add an employer or customer</span>
        <span className="admin-create-toggle-indicator" aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <form
          id="employer-create-form"
          className="admin-create-form"
          onSubmit={handleSubmit}
        >
          <label className="admin-create-field">
            <span>Company name</span>
            <input
              value={empname}
              onChange={(event) => setEmpname(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Contact first name</span>
            <input
              value={empcontactfn}
              onChange={(event) => setEmpcontactfn(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Contact last name</span>
            <input
              value={empcontactln}
              onChange={(event) => setEmpcontactln(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Contact email</span>
            <input
              type="email"
              value={empcontactemail}
              onChange={(event) => setEmpcontactemail(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field">
            <span>Contact mobile number</span>
            <input
              type="tel"
              value={empcontactnum}
              onChange={(event) => setEmpcontactnum(event.target.value)}
              required
            />
          </label>
          <label className="admin-create-field admin-create-field-wide">
            <span>Comment</span>
            <textarea
              value={empcomment}
              onChange={(event) => setEmpcomment(event.target.value)}
            />
          </label>
          <div className="admin-create-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add employer"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
