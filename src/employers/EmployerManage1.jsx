import { useState, useEffect } from 'react'
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { FaPeopleGroup } from "react-icons/fa6";
import EmployerCreate from './EmployerCreate';
import { toast } from 'react-toastify';


export default function EmployerManage1() {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [employerrecords, setEmployerrecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState("");
  const [empname, setEmpname] = useState(null);
  const [empcontactfn, setEmpcontactfn] = useState(null);
  const [empcontactln, setEmpcontactln] = useState(null);
  const [empcontactnum, setEmpcontactnum] = useState(null);
  const [empcontactemail, setEmpcontactemail] = useState(null);
  const [empcomment, setEmpcomment] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => setExpanded((expanded) => !expanded);

  useEffect(() => {
    setLoading(true);
    OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers')
      .then((response) => {
        const sortedRecords = response.data.sort((a, b) => a.empname.localeCompare(b.empname));
        setEmployerrecords(sortedRecords);
        setError(null);
      })
      .catch((requestError) => {
        console.error("Failed to load employers:", requestError);
        setError(requestError);
      })
      .finally(() => setLoading(false));
  }, [checkForRecords]);

  const handleEmpEdit = (row) => {
    setEditing(row.id)
    setEmpname(row.empname)
    setEmpcontactfn(row.empcontactfn)
    setEmpcontactln(row.empcontactln)
    setEmpcontactnum(row.empcontactnum)
    setEmpcontactemail(row.empcontactemail)
    setEmpcomment(row.empcomment)
  };

  const onEditCancel = () => {
    setEditing("");
    setEmpname(null)
    setEmpcontactfn(null)
    setEmpcontactln(null)
    setEmpcontactnum(null)
    setEmpcontactemail(null)
    setEmpcomment(null)
  };


  const onEditSave = async () => {
    const employerPUT = {
      empname,
      empcontactfn,
      empcontactln,
      empcontactnum,
      empcontactemail,
      empcomment,
    };

    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/update/${editing}`,
        employerPUT
      );
      toast.success(`${empname} has been updated.`);
      setCheckForRecords((value) => !value);
      onEditCancel();
    } catch (requestError) {
      console.error("Failed to update employer:", requestError);
      toast.error("Failed to update employer.");
    }
  };

  const onEditDelete = async (row) => {
    if (!window.confirm(`Delete ${row.empname}?`)) return;
    try {
      await OAuth2APIClient.delete(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/delete/${row.id}`
      );
      setCheckForRecords((value) => !value);
      toast.success(`${row.empname} has been deleted.`);
    } catch (requestError) {
      console.error("Failed to delete employer:", requestError);
      toast.error("Failed to delete employer.");
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
    <section className="admin-management-section admin-employer-section">
      <button
        className="admin-section-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="employer-management-content"
        onClick={toggleAccordion}
      >
        <span className="admin-section-icon" aria-hidden="true"><FaPeopleGroup /></span>
        <span className="admin-section-copy">
          <strong>Employers & customers</strong>
          <span>Manage organizations and their contact details.</span>
        </span>
        <span className="admin-section-count">{employerrecords.length}</span>
        <span className="admin-section-indicator" aria-hidden="true">{isExpanded ? "−" : "+"}</span>
      </button>
      {isExpanded && (
        <div id="employer-management-content" className="admin-section-content">
          <EmployerCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
          {error ? (
            <div className="admin-error-state" role="alert">Unable to load employer records.</div>
          ) : loading ? (
            <div className="admin-empty-state" role="status">Loading employers...</div>
          ) : employerrecords.length === 0 ? (
            <div className="admin-empty-state">No employers have been added yet.</div>
          ) : (
            <div className="admin-table-scroll">
              <table className="Table6 admin-data-table employer-data-table">
                <thead>
                  <tr>
                    <th scope="col">Actions</th>
                    <th scope="col">Company</th>
                    <th scope="col">Contact first name</th>
                    <th scope="col">Contact last name</th>
                    <th scope="col">Contact email</th>
                    <th scope="col">Contact number</th>
                    <th scope="col">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {employerrecords.map((row) => {
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
                            ) : renderActionButton("Edit", FaPen, () => handleEmpEdit(row))}
                          </div>
                        </td>
                        <td>{row.id === editing ? <input value={empname || ""} aria-label="Company" onChange={(e) => setEmpname(e.target.value)} /> : row.empname}</td>
                        <td>{row.id === editing ? <input value={empcontactfn || ""} aria-label="Contact first name" onChange={(e) => setEmpcontactfn(e.target.value)} /> : row.empcontactfn}</td>
                        <td>{row.id === editing ? <input value={empcontactln || ""} aria-label="Contact last name" onChange={(e) => setEmpcontactln(e.target.value)} /> : row.empcontactln}</td>
                        <td>{row.id === editing ? <input value={empcontactemail || ""} aria-label="Contact email" onChange={(e) => setEmpcontactemail(e.target.value)} /> : <a href={`mailto:${row.empcontactemail}`}>{row.empcontactemail}</a>}</td>
                        <td>{row.id === editing ? <input value={empcontactnum || ""} aria-label="Contact number" onChange={(e) => setEmpcontactnum(e.target.value)} /> : row.empcontactnum}</td>
                        <td>{row.id === editing ? <input value={empcomment || ""} aria-label="Comment" onChange={(e) => setEmpcomment(e.target.value)} /> : row.empcomment}</td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>
          )}
        </div>
      )
      }
    </section>
  )
}