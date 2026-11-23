import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaPen,
  FaCheck,
  FaRegTrashAlt
} from "react-icons/fa";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import CandidateCreate from "./CandidateCreate";
import OAuth2APIClient from "../oauth2/OAuth2APIClient"

export default function CandidateManage() {
  // --- UI State ---
  const [isExpanded, setExpanded] = useState(false);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Editing State ---
  const [editingCandidate, setEditingCandidate] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    dob: "",
    jobdesc: "",
    skill1: "",
    comment: "",
    status: "",
    role: "",
    reqnum: "",
    employer: ""
  });

  // --- Fetch Candidates ---
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const res = await OAuth2APIClient.get("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates");
        const sorted = res.data.sort((a, b) => a.firstname.localeCompare(b.firstname));
        setTableData(sorted);
        setError(null);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [checkForRecords]);

  // --- Handlers ---
  const toggleAccordion = () => setExpanded((expanded) => !expanded);

  const handleEdit = (row) => {
    setEditingId(row.id);
    setEditingCandidate({ ...row });
  };

  const handleInputChange = (field, value) => {
    setEditingCandidate((prev) => ({ ...prev, [field]: value }));
  };

  const onEditCancel = () => {
    setEditingId("");
    setEditingCandidate({
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      dob: "",
      jobdesc: "",
      skill1: "",
      comment: "",
      status: "",
      role: "",
      reqnum: "",
      employer: ""
    });
  };

  const onEditSave = async () => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/update/${editingId}`,
        editingCandidate
      );
      toast.success(`${editingCandidate.firstname} ${editingCandidate.lastname} updated.`);
      setCheckForRecords((prev) => !prev);
      onEditCancel();
    } catch (err) {
      console.error("Error saving candidate:", err);
      toast.error("Failed to update candidate.");
    }
  };

  const onEditDelete = async (row) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${row.firstname} ${row.lastname}?`
    );
    if (!confirmed) return;

    try {
      await OAuth2APIClient.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/delete/${row.id}`);
      toast.success(`${row.firstname} ${row.lastname} has been deleted.`);
      setCheckForRecords((prev) => !prev);
    } catch (err) {
      console.error("Error deleting candidate:", err);
      toast.error("Failed to delete candidate.");
    }
  };

  const actionButton = (tooltip, Icon, onClick) => (
    <button
      className={`admin-action-button ${tooltip.content === "Delete" ? "admin-action-delete" : ""}`}
      type="button"
      title={tooltip.content}
      aria-label={tooltip.content}
      onClick={onClick}
    >
      <Icon aria-hidden="true" />
    </button>
  );

  return (
    <section className="admin-management-section admin-candidate-section">
      <button
        className="admin-section-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="candidate-management-content"
        onClick={toggleAccordion}
      >
        <span className="admin-section-icon" aria-hidden="true">
          <MdManageAccounts />
        </span>
        <span className="admin-section-copy">
          <strong>Candidates</strong>
          <span>Manage candidate profiles and role associations.</span>
        </span>
        <span className="admin-section-count">{tableData.length}</span>
        <span className="admin-section-indicator" aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <div id="candidate-management-content" className="admin-section-content">
          <CandidateCreate
            checkForRecords={checkForRecords}
            setCheckForRecords={setCheckForRecords}
          />

          {error ? (
            <div className="admin-error-state" role="alert">Unable to load candidate records.</div>
          ) : loading ? (
            <div className="admin-empty-state" role="status">Loading candidates...</div>
          ) : tableData.length === 0 ? (
            <div className="admin-empty-state">No candidates have been added yet.</div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-data-table candidate-data-table">
                <thead>
                  <tr>
                    <th scope="col">Actions</th>
                    {[
                      ["firstname", "First name"],
                      ["lastname", "Last name"],
                      ["email", "Email"],
                      ["mobile", "Mobile"],
                      ["dob", "Date found"],
                      ["jobdesc", "Job title"],
                      ["skill1", "Primary skill"],
                      ["comment", "Comment"],
                      ["employer", "Employer"],
                      ["role", "Role"],
                      ["reqnum", "Requisition"],
                    ].map(([, header]) => (
                      <th key={header} scope="col">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => {
                    const isEditing = row.id === editingId;
                    return (
                      <tr key={row.id}>
                        <td>
                          <div className="admin-action-group">
                            {isEditing ? (
                              <>
                                {actionButton({ content: "Save" }, FaCheck, onEditSave)}
                                {actionButton({ content: "Cancel" }, PiArrowCounterClockwiseBold, onEditCancel)}
                                {actionButton({ content: "Delete" }, FaRegTrashAlt, () => onEditDelete(row))}
                              </>
                            ) : (
                              actionButton({ content: "Edit" }, FaPen, () => handleEdit(row))
                            )}
                          </div>
                        </td>
                        {[
                          "firstname",
                          "lastname",
                          "email",
                          "mobile",
                          "dob",
                          "jobdesc",
                          "skill1",
                          "comment",
                          "employer",
                          "role",
                          "reqnum",
                        ].map((field) => (
                          <td key={field}>
                            {isEditing ? (
                              <input
                                aria-label={`${field} for ${row.firstname} ${row.lastname}`}
                                value={editingCandidate[field] || ""}
                                onChange={(event) => handleInputChange(field, event.target.value)}
                              />
                            ) : field === "email" ? (
                              <a href={`mailto:${row.email}`}>{row.email}</a>
                            ) : field === "dob" && row.dob ? (
                              new Date(row.dob).toLocaleDateString("en-CA")
                            ) : (
                              row[field] || "—"
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
