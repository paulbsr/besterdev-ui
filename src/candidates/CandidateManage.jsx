import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import {
  FaPen,
  FaCheck,
  FaRegTrashAlt
} from "react-icons/fa";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";
import "../Fonts.css";
import "react-dropdown/style.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CandidateCreate from "./CandidateCreate";
import GradientLineRusty from "../gradientlines/GradientLineRusty";

dayjs.extend(utc);

export default function CandidateManage() {
  // --- UI State ---
  const [isExpanded, setExpanded] = useState(false);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState(null);

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
      try {
        const res = await axios.get(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates"
        );
        const sorted = res.data.sort((a, b) =>
          a.firstname.localeCompare(b.firstname)
        );
        setTableData(sorted);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError(err);
      }
    };
    fetchCandidates();
  }, [checkForRecords]);

  // --- Handlers ---
  const toggleAccordion = () => setExpanded(!isExpanded);

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
      await axios.put(
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
      await axios.delete(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/delete/${row.id}`
      );
      toast.success(`${row.firstname} ${row.lastname} has been deleted.`);
      setCheckForRecords((prev) => !prev);
    } catch (err) {
      console.error("Error deleting candidate:", err);
      toast.error("Failed to delete candidate.");
    }
  };

  if (error) return <p>Error loading candidates.</p>;

  // --- Styles ---
  const inputStyle = {
    height: "22.5px",
    border: "1.25px solid #336791",
    borderRadius: "4px",
    paddingLeft: "5px"
  };

  const actionButton = (bg, tooltip, Icon, onClick) => (
    <button
      style={{
        height: "20px",
        width: "20px",
        padding: 0,
        border: "none",
        borderRadius: "3px",
        backgroundColor: bg,
        outline: "none"
      }}
      type="button"
      onClick={onClick}
    >
      <a data-tooltip-id={tooltip.id} data-tooltip-content={tooltip.content}>
        <Icon
          style={{
            color: "white",
            display: "block",
            margin: "auto",
            fontSize: "12px",
            cursor: "pointer"
          }}
        />
      </a>
    </button>
  );

  return (
    <div className="Font-Verdana-Medium-Postgres">
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a
          data-tooltip-id="insert"
          data-tooltip-content="CandidateManage"
          style={{ cursor: "pointer" }}
        >
          <MdManageAccounts
            style={{ color: "#336791", fontSize: "45px", verticalAlign: "middle" }}
          />
          &nbsp;
          <b style={{ fontSize: "medium", color: "#336791" }}>
            Manage Candidates / Commodities ({tableData.length})
          </b>
        </a>
      </div>

      {isExpanded && (
        <div>
          <CandidateCreate
            checkForRecords={checkForRecords}
            setCheckForRecords={setCheckForRecords}
          />

          <table className="Table6">
            <thead>
              <tr>
                {[
                  "",
                  "Firstname",
                  "Lastname",
                  "eMail",
                  "Mobile",
                  "Date Found",
                  "Job Title",
                  "Primary Skill",
                  "Comment",
                  "Employer",
                  "Role",
                  "Req"
                ].map((header, i) => (
                  <th key={i} className="Font-Verdana-Small-Postgres">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => {
                const isEditing = row.id === editingId;
                return (
                  <tr key={row.id}>
                    <td>
                      {isEditing ? (
                        <>
                          {actionButton("#336791", { id: "commit", content: "Commit" }, FaCheck, onEditSave)}
                          &nbsp;
                          {actionButton("silver", { id: "revert", content: "Revert" }, PiArrowCounterClockwiseBold, onEditCancel)}
                          &nbsp;
                          {actionButton("#D5441C", { id: "purge", content: "Delete" }, FaRegTrashAlt, () => onEditDelete(row))}
                        </>
                      ) : (
                        actionButton("#336791", { id: "edit", content: "Edit" }, FaPen, () => handleEdit(row))
                      )}
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
                      "reqnum"
                    ].map((field, i) => (
                      <td key={i} className="asmshover Table6 td">
                        {isEditing ? (
                          <input
                            style={{ ...inputStyle, width: "100%" }}
                            value={editingCandidate[field] || ""}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                          />
                        ) : field === "email" ? (
                          <a href={`mailto:${row.email}`} target="_blank" rel="noreferrer">
                            {row.email}
                          </a>
                        ) : field === "dob" ? (
                          new Date(row.dob).toLocaleDateString("en-CA")
                        ) : (
                          row[field]
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div>&nbsp;</div>
          <GradientLineRusty />
          <div>&nbsp;</div>
        </div>
      )}
    </div>
  );
}
