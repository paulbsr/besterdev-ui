import { useContext, useEffect, useState } from "react";
import "../Fonts.css";
import "./PeopleScorecard.css";

import {
  FaCheck,
  FaPen,
  FaUndo,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import AlertContext from "../Generic/Alerts/AlertContext";
import PeopleScorecardUpdate from "./PeopleScorecardUpdate";
import PeopleScorecardCreate from "./PeopleScorecardCreate";
import MouseoverPopover from "../MouseoverPopover";
import { getStatusColor } from "../getStatusColor";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import ImageAvatar_Conor from "../graphix/Avatars/ImageAvatar_Conor";
import ImageAvatar_Monique from "../graphix/Avatars/ImageAvatar_Monique";
import ImageAvatar_Leo from "../graphix/Avatars/ImageAvatar_Leo";
import ImageAvatar_Shikha from "../graphix/Avatars/ImageAvatar_Shikha";
import ImageAvatar_Felipe from "../graphix/Avatars/ImageAvatar_Felipe";
import ImageAvatar_Thiago from "../graphix/Avatars/ImageAvatar_Thiago";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people";

const teamMembers = [
  { name: "Conor Lynch", key: "conor_lynch", avatar: <ImageAvatar_Conor /> },
  { name: "Felipe Mantov", key: "felipe_mantov", avatar: <ImageAvatar_Felipe /> },
  { name: "Leo Pinto", key: "leo_pinto", avatar: <ImageAvatar_Leo /> },
  { name: "Monique Borje", key: "monique_borje", avatar: <ImageAvatar_Monique /> },
  { name: "Shikha Seth", key: "shikha_seth", avatar: <ImageAvatar_Shikha /> },
  { name: "Thiago Cunha", key: "thiago_cunha", avatar: <ImageAvatar_Thiago /> },
];

export default function PeopleScorecard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [team] = useState("Dev");
  const [editing, setEditing] = useState("");
  const [taskName, setTaskName] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const alertCtx = useContext(AlertContext);

  const year = new Date().getFullYear();

  useEffect(() => {
    setLoading(true);
    OAuth2APIClient.get(API_BASE)
      .then((response) => {
        const sorted = response.data.sort((a, b) =>
          a.taskName.localeCompare(b.taskName)
        );
        setTasks(sorted);
        setError(null);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [checkForRecords]);

  if (error) return <main className="people-scorecard-page people-scorecard-state">Unable to load the People Scorecard.</main>;
  if (loading) return <main className="people-scorecard-page people-scorecard-state">Loading scorecard...</main>;

  const handleDelete = (taskName, id) => {
    OAuth2APIClient.delete(`${API_BASE}/delete/${id}`)
      .then(() => {
        alertCtx.success(`Task '${taskName}' successfully deleted`);
        setCheckForRecords((prev) => !prev);
      })
      .catch(() => alertCtx.error(`Task '${taskName}' not found`));
  };

  const handleEdit = (row) => {
    setEditing(row.id);
    setTaskName(row.taskName);
  };

  const handleEditCancel = () => {
    setEditing("");
    setTaskName(null);
  };

  const handleEditSave = (taskName, id) => {
    if (!taskName?.trim()) {
      alertCtx.error("Please enter a Task Name");
      return;
    }

    OAuth2APIClient.put(`${API_BASE}/update/taskname/${id}`, taskName)
      .then(() => {
        alertCtx.success(`Task '${taskName}' successfully updated`);
        setCheckForRecords((prev) => !prev);
      })
      .catch(() => alertCtx.error(`Task '${taskName}' not found`));

    handleEditCancel();
  };

  const currentYearTasks = tasks.filter((row) => row.year === year.toString());
  const filteredTasks = currentYearTasks.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.taskName?.toLowerCase().includes(term) ||
      row.taskDescription?.toLowerCase().includes(term)
    );
  });

  const statusCounts = teamMembers.reduce(
    (counts, member) => {
      currentYearTasks.forEach((row) => {
        const status = row[`status_${member.key}`];
        if (status === "START") counts.start += 1;
        if (status === "DONE") counts.done += 1;
        if (status === "WIP") counts.wip += 1;
        if (status === "PROBLEM") counts.problem += 1;
      });
      return counts;
    },
    { start: 0, done: 0, wip: 0, problem: 0 }
  );

  return (
    <main className="people-scorecard-page">
      <header className="people-scorecard-header">
        <div className="people-scorecard-title">
          <span className="people-scorecard-title-icon" aria-hidden="true">
            <BsPeopleFill />
          </span>
          <div>
            <p className="people-eyebrow">TEAM PERFORMANCE · {year}</p>
            <h1>People Scorecard</h1>
            <p className="people-header-description">
              Track priorities, progress, and team comments.
            </p>
          </div>
        </div>
        <div className="people-header-metrics" aria-label="Scorecard summary">
          <div className="people-entry-count">
            <strong>{currentYearTasks.length}</strong>
            <span>tasks</span>
          </div>
          <div className="people-entry-count people-count-problem">
            <strong>{statusCounts.problem}</strong>
            <span>problems</span>
          </div>
          <div className="people-entry-count people-count-start">
            <strong>{statusCounts.start}</strong>
            <span>start</span>
          </div>
          <div className="people-entry-count people-count-wip">
            <strong>{statusCounts.wip}</strong>
            <span>WIP</span>
          </div>
          <div className="people-entry-count people-count-done">
            <strong>{statusCounts.done}</strong>
            <span>done</span>
          </div>
        </div>
      </header>

      <PeopleScorecardCreate
        checkForRecords={checkForRecords}
        setCheckForRecords={setCheckForRecords}
      />

      <section className="people-entries-card" aria-labelledby="people-entries-title">
        <div className="people-toolbar">
          <div>
            <h2 id="people-entries-title">Current objectives</h2>
            <p>{statusCounts.wip} work items currently in progress.</p>
          </div>
          <label className="people-search">
            <span className="people-visually-hidden">Search tasks</span>
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        {team === "Dev" && (
        <div className="people-table-scroll">
          <table className="people-table">
            <thead>
              <tr>
                <th scope="col">Task</th>
                {teamMembers.map((member) => (
                  <th key={member.key} scope="col" className="people-member-heading">
                    <span>{member.avatar}</span>
                    <span>{member.name}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((row) => (
                  <tr key={row.id}>
                    <td className="people-task-cell">
                      <div className="people-task-layout">
                        <div className="people-task-copy">
                          {row.id === editing ? (
                            <textarea
                              className="people-inline-input"
                              rows={2}
                              value={taskName}
                              onChange={(e) => setTaskName(e.target.value)}
                            />
                          ) : (
                            <div>
                              <span className="people-task-name">{row.taskName}</span>
                              {row.taskDescription && (
                                <span className="people-task-description">{row.taskDescription}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="people-task-actions">
                          {row.id === editing ? (
                            <>
                              <Tooltip content="Commit">
                                <button
                                  className="people-action-button people-action-save"
                                  type="button"
                                  onClick={() => handleEditSave(taskName, row.id)}
                                >
                                  <FaCheck />
                                </button>
                              </Tooltip>
                              <Tooltip content="Revert">
                                <button
                                  className="people-action-button people-action-cancel"
                                  type="button"
                                  onClick={handleEditCancel}
                                >
                                  <FaUndo />
                                </button>
                              </Tooltip>
                              <Tooltip content="Delete Task">
                                <button
                                  className="people-action-button people-action-delete"
                                  type="button"
                                  onClick={() => {
                                    setDeleting(row.id);
                                    setTaskName(row.taskName);
                                  }}
                                >
                                  <MdDeleteForever />
                                </button>
                              </Tooltip>
                            </>
                          ) : (
                            <Tooltip content="Edit Task Name">
                              <button
                                className="people-action-button people-action-edit"
                                type="button"
                                onClick={() => handleEdit(row)}
                              >
                                <FaPen />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </td>

                    {teamMembers.map((member) => {
                      const statusKey = `status_${member.key}`;
                      const commentKey = `comment_${member.key}`;

                      return (
                        <td
                          key={member.key}
                          className="people-status-cell"
                        >
                          <span
                            className="people-status-fill"
                            style={{ backgroundColor: getStatusColor(row[statusKey]) }}
                          >
                          <MouseoverPopover
                            see={
                              <PeopleScorecardUpdate
                                id={row.id}
                                person={member.name.split(" ")[0]}
                                comment={row[commentKey]}
                                status={row[statusKey]}
                                setCheckforRecords={setCheckForRecords}
                                checkForRecords={checkForRecords}
                                alertHandler={alertCtx}
                              />
                            }
                            read={row[commentKey]}
                          />
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td className="people-empty-state" colSpan={teamMembers.length + 1}>
                    {searchTerm ? "No tasks match your search." : "No tasks for this year."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
      </section>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        PaperProps={{ sx: { backgroundColor: "#151d2b", color: "#e6ebf2", border: "1px solid #293447" } }}
      >
        <DialogTitle>
          Delete <b>'{taskName}'</b>?
        </DialogTitle>
        <DialogContent dividers>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "3px",
            }}
          >
            <Button color="error" onClick={() => { handleDelete(taskName, deleting); setDeleting(null); }}>Delete</Button>
            <Button sx={{ color: "#a8c9ec" }} onClick={() => setDeleting(null)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
