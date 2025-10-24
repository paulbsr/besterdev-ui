import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Fonts.css";

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
import GradientLineRusty from "../gradientlines/GradientLineRusty";
import { getStatusColor } from "../getStatusColor";

import ImageAvatar_Conor from "../graphix/Avatars/ImageAvatar_Conor";
import ImageAvatar_Monique from "../graphix/Avatars/ImageAvatar_Monique";
import ImageAvatar_Leo from "../graphix/Avatars/ImageAvatar_Leo";
import ImageAvatar_Shikha from "../graphix/Avatars/ImageAvatar_Shikha";
import ImageAvatar_Felipe from "../graphix/Avatars/ImageAvatar_Felipe";
import ImageAvatar_Thiago from "../graphix/Avatars/ImageAvatar_Thiago";

const API_BASE =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people";

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
  const alertCtx = useContext(AlertContext);

  const year = new Date().getFullYear();

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((response) => {
        const sorted = response.data.sort((a, b) =>
          a.taskName.localeCompare(b.taskName)
        );
        setTasks(sorted);
        setError(null);
      })
      .catch(setError);
  }, [checkForRecords]);

  if (error) return <p>A PeopleScorecard GET error occurred.</p>;

  const handleDelete = (taskName, id) => {
    axios
      .delete(`${API_BASE}/delete/${id}`)
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

    axios
      .put(`${API_BASE}/update/taskname/${id}`, taskName)
      .then(() => {
        alertCtx.success(`Task '${taskName}' successfully updated`);
        setCheckForRecords((prev) => !prev);
      })
      .catch(() => alertCtx.error(`Task '${taskName}' not found`));

    handleEditCancel();
  };

  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <Tooltip id="insert" />
        <div style={styles.header}>
          <BsPeopleFill style={styles.icon} />
          <b style={styles.title}>The People Scorecard</b>
        </div>
      </div>

      <PeopleScorecardCreate
        checkForRecords={checkForRecords}
        setCheckForRecords={setCheckForRecords}
      />

      <div style={{ margin: "1rem 0" }} />

      {team === "Dev" && (
        <div style={{ overflow: "auto" }}>
          <table className="Table8 Table8hover">
            <thead>
              <tr>
                <th></th>
                <th className="Font-Verdana-Small-Rusty" style={{ width: "400px" }}>
                  Tasks
                </th>
                {teamMembers.map((member) => (
                  <th
                    key={member.key}
                    className="Font-Verdana-Small-Rusty"
                    style={{ width: "10px" }}
                    align="center"
                  >
                    {member.name}
                  </th>
                ))}
              </tr>
              <tr>
                <td></td>
                <td></td>
                {teamMembers.map((member) => (
                  <td key={member.key}>{member.avatar}</td>
                ))}
              </tr>
            </thead>

            <tbody>
              {tasks
                .filter((row) => row.year === year.toString())
                .map((row) => (
                  <tr key={row.id} style={{ textAlign: "center" }}>
                    <td>
                      {row.id === editing ? (
                        <>
                          <Tooltip content="Commit">
                            <button
                              style={styles.buttonBlue}
                              onClick={() => handleEditSave(taskName, row.id)}
                            >
                              <FaCheck style={styles.iconSmall} />
                            </button>
                          </Tooltip>
                          <Tooltip content="Revert">
                            <button
                              style={styles.buttonSilver}
                              onClick={handleEditCancel}
                            >
                              <FaUndo style={styles.iconSmall} />
                            </button>
                          </Tooltip>
                          <Tooltip content="Delete Task">
                            <button
                              style={styles.buttonRed}
                              onClick={() => {
                                setDeleting(row.id);
                                setTaskName(row.taskName);
                              }}
                            >
                              <MdDeleteForever style={styles.iconMedium} />
                            </button>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip content="Edit Task Name">
                          <button
                            style={styles.buttonBlue}
                            onClick={() => handleEdit(row)}
                          >
                            <FaPen style={styles.iconSmall} />
                          </button>
                        </Tooltip>
                      )}
                    </td>

                    <td className="pprecord Table3 td">
                      {row.id === editing ? (
                        <textarea
                          cols="50"
                          rows="1"
                          defaultValue={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                      ) : (
                        <MouseoverPopover
                          see={row.taskName}
                          read={row.taskDescription}
                        />
                      )}
                    </td>

                    {teamMembers.map((member) => {
                      const statusKey = `status_${member.key}`;
                      const commentKey = `comment_${member.key}`;

                      return (
                        <td
                          key={member.key}
                          style={{
                            backgroundColor: getStatusColor(row[statusKey]),
                          }}
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
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleting !== null} onClose={() => setDeleting(null)}>
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
            <Button onClick={() => { handleDelete(taskName, deleting); setDeleting(null); }}>Delete</Button>
            <Button onClick={() => setDeleting(null)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <div style={{ margin: "1rem 0" }}>
        <GradientLineRusty />
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: { color: "#336791", fontSize: "38px", marginRight: "8px" },
  title: {
    fontFamily: "Verdana",
    fontSize: "medium",
    fontWeight: "bold",
    color: "#336791",
  },
  buttonBlue: {
    height: "20px",
    width: "20px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#336791",
    margin: "0 2px",
  },
  buttonSilver: {
    height: "20px",
    width: "20px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "silver",
    margin: "0 2px",
  },
  buttonRed: {
    height: "20px",
    width: "20px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#D5441C",
    margin: "0 2px",
  },
  iconSmall: {
    color: "white",
    fontSize: "12px",
    display: "block",
    margin: "auto",
    cursor: "pointer",
  },
  iconMedium: {
    color: "white",
    fontSize: "18px",
    display: "block",
    margin: "auto",
    cursor: "pointer",
  },
};
