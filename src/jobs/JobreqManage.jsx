import { useState, useEffect } from 'react'
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { BsSignpostFill } from "react-icons/bs";
import JobreqCreate from './JobreqCreate';
import { toast } from 'react-toastify';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';



export default function JobreqManage() {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => setExpanded((expanded) => !expanded);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [jobreqdata, setJobreqdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState("");
  const [jrnumber, setJrnumber] = useState(null);
  const [company, setCompany] = useState(null);
  const [jrtitle, setJrtitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [recruitername, setRecruitername] = useState(null);
  const [recruiteremail, setRecruiteremail] = useState(null);
  const [recruiternumber, setRecruiternumber] = useState(null);
  const [comment, setComment] = useState(null);
  const [createdate, setCreatedate] = useState(null);
  const [targetdate, setTargetdate] = useState(null);
  const [status, setStatus] = useState(null);
  const [wa, setWa] = useState(null);

  useEffect(() => {
    setLoading(true);
    OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
      .then((response) => {
        const sortedJobreqData = response.data.sort((a, b) =>
          a.jrnumber.localeCompare(b.jrnumber)
        );
        setJobreqdata(sortedJobreqData);
        setError(null);
      })
      .catch((requestError) => {
        console.error("Failed to load job requisitions:", requestError);
        setError(requestError);
      })
      .finally(() => setLoading(false));
  }, [checkForRecords]);

        const handleEdit = (row) => {
          setEditing(row.id)
          setJrnumber(row.jrnumber)
          setCompany(row.company)
          setJrtitle(row.jrtitle)
          setLocation(row.location)
          setRecruitername(row.recruitername)
          setRecruiteremail(row.recruiteremail)
          setRecruiternumber(row.recruiternumber)
          setComment(row.comment)
          setCreatedate(row.createdate)
          setTargetdate(row.targetdate)
          setStatus(row.status)
          setWa(row.wa)
        };

        const onEditCancel = () => {
          setEditing("");
          setJrnumber(null)
          setCompany(null)
          setJrtitle(null)
          setLocation(null)
          setRecruitername(null)
          setRecruiteremail(null)
          setRecruiternumber(null)
          setComment(null)
          setCreatedate(null)
          setTargetdate(null)
          setStatus(null)
          setWa(null)
        };

  const onEditSave = async () => {
    const jobreqPUT = {
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
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/update/${editing}`,
        jobreqPUT
      );
      setCheckForRecords((value) => !value);
      toast.success(`${jrnumber} has been updated.`);
      onEditCancel();
    } catch (requestError) {
      console.error("Failed to update job requisition:", requestError);
      toast.error("Job requisition could not be updated.");
    }
  };

  const onEditDelete = async (row) => {
    if (!window.confirm(`Delete requisition ${row.jrnumber}?`)) return;
    try {
      await OAuth2APIClient.delete(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/delete/${row.id}`
      );
      setCheckForRecords((value) => !value);
      toast.success(`${row.jrnumber} has been deleted.`);
    } catch (requestError) {
      console.error("Failed to delete job requisition:", requestError);
      toast.error("Job requisition could not be deleted.");
    }
  };

  const renderActionButton = (label, Icon, onClick) => (
    <button
      className={`admin-action-button ${label === "Delete" ? "admin-action-delete" : ""}`}
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
    </button>
  );

  return (
    <section className="admin-management-section admin-jobreq-section">
      <button
        className="admin-section-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="jobreq-management-content"
        onClick={toggleAccordion}
      >
        <span className="admin-section-icon" aria-hidden="true"><BsSignpostFill /></span>
        <span className="admin-section-copy">
          <strong>Job requisitions</strong>
          <span>Manage openings, recruiters, dates, and work arrangements.</span>
        </span>
        <span className="admin-section-count">{jobreqdata.length}</span>
        <span className="admin-section-indicator" aria-hidden="true">{isExpanded ? "−" : "+"}</span>
      </button>
      {isExpanded && (
        <div id="jobreq-management-content" className="admin-section-content">
          <JobreqCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
          {error ? (
            <div className="admin-error-state" role="alert">Unable to load job requisitions.</div>
          ) : loading ? (
            <div className="admin-empty-state" role="status">Loading job requisitions...</div>
          ) : jobreqdata.length === 0 ? (
            <div className="admin-empty-state">No job requisitions have been added yet.</div>
          ) : (
            <div className="admin-table-scroll">
              <table className="Table6 admin-data-table jobreq-data-table">
                <thead>
                  <tr>
                    <th scope="col">Actions</th>
                    <th scope="col">JR number</th>
                    <th scope="col">Company</th>
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Recruiter</th>
                    <th scope="col">Recruiter email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Work arrangement</th>
                    <th scope="col">Created</th>
                    <th scope="col">Target</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobreqdata.map((row) => {
                    const fields = [
                      { key: "jrnumber", value: jrnumber, setValue: setJrnumber, display: row.jrnumber },
                      { key: "company", value: company, setValue: setCompany, display: row.company },
                      { key: "jrtitle", value: jrtitle, setValue: setJrtitle, display: row.jrtitle },
                      { key: "location", value: location, setValue: setLocation, display: row.location },
                      { key: "recruitername", value: recruitername, setValue: setRecruitername, display: row.recruitername },
                      { key: "recruiteremail", value: recruiteremail, setValue: setRecruiteremail, display: row.recruiteremail },
                      { key: "recruiternumber", value: recruiternumber, setValue: setRecruiternumber, display: row.recruiternumber },
                      { key: "comment", value: comment, setValue: setComment, display: row.comment },
                      { key: "wa", value: wa, setValue: setWa, display: row.wa },
                      { key: "createdate", value: createdate, setValue: setCreatedate, display: row.createdate },
                      { key: "targetdate", value: targetdate, setValue: setTargetdate, display: row.targetdate },
                      { key: "status", value: status, setValue: setStatus, display: row.status },
                    ];

                    return (
                      <tr key={row.id}>
                        <td>
                          <div className="admin-action-group">
                            {row.id === editing ? (
                              <>
                                {renderActionButton("Save", FaCheck, onEditSave)}
                                {renderActionButton("Cancel", PiArrowCounterClockwiseBold, onEditCancel)}
                                {renderActionButton("Delete", FaRegTrashAlt, () => onEditDelete(row))}
                              </>
                            ) : renderActionButton("Edit", FaPen, () => handleEdit(row))}
                          </div>
                        </td>
                        {fields.map((field) => (
                          <td key={field.key}>
                            {row.id === editing ? (
                              <input
                                aria-label={`${field.key} for ${row.jrnumber}`}
                                value={field.value || ""}
                                onChange={(event) => field.setValue(event.target.value)}
                              />
                            ) : field.key === "recruiteremail" && field.display ? (
                              <a href={`mailto:${field.display}`}>{field.display}</a>
                            ) : field.key === "createdate" || field.key === "targetdate" ? (
                              field.display
                                ? new Date(field.display).toLocaleDateString("en-CA")
                                : "—"
                            ) : (
                              field.display || "—"
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}