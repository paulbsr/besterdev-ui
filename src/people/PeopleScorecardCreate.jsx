import React, { useContext, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { GiHummingbird } from "react-icons/gi";
import AlertContext from "../Generic/Alerts/AlertContext";

export default function PeopleScorecardCreate({ checkForRecords, setCheckForRecords }) {
  const alertCtx = useContext(AlertContext);
  const [isExpanded, setExpanded] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const current = new Date();
  const date = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
  const year = `${current.getFullYear()}`;

  const teamMembers = [
    "bren_keenan", "brian_orourke", "conor_lynch", "dwayne_patel",
    "felipe_mantov", "keex_nenyiaba", "leo_pinto", "monique_borje",
    "saoirse_seeber", "shikha_seth", "simon_dowling", "thiago_cunha"
  ];

  const toggleAccordion = () => setExpanded((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      taskName,
      taskDescription,
      effort: null,
      year,
    };

    // Dynamically add each member’s status/comment
    teamMembers.forEach((member) => {
      newTask[`status_${member}`] = "START";
      newTask[`comment_${member}`] = `Nothing from ${formatName(member)} since ${date}`;
    });

    try {
      const response = await axios.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people/create",
        newTask
      );

      if (response.status === 200) {
        setCheckForRecords(!checkForRecords);
        alertCtx.success(`Task "${taskName}" added to the People Management Scorecard`);
        setTaskName("");
        setTaskDescription("");
        setExpanded(false);
      } else {
        alertCtx.error("Unexpected response while creating task.");
      }
    } catch (err) {
      console.error(err);
      alertCtx.error("Error creating task. Please try again.");
    }
  };

  const formatName = (key) =>
    key
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  return (
    <div className="people-scorecard-create">
      <div onClick={toggleAccordion} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
        <Tooltip title="Add a Task" placement="top">
          <GiHummingbird style={{ color: "#336791", fontSize: "25px" }} />
        </Tooltip>
        <span className="Font-Verdana-Small-Postgres">Add Task to People Scorecard</span>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
          <div className="Font-Verdana-Small-Postgres" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label>
              Task Name:&nbsp;
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                placeholder="Required"
                style={inputStyle(300)}
              />
            </label>

            <label>
              Task Description:&nbsp;
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Optional"
                style={inputStyle(600)}
              />
            </label>

            <button type="submit" style={buttonStyle}>
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Reusable style helpers
const inputStyle = (width) => ({
  height: "27.5px",
  width: `${width}px`,
  border: "1.25px solid #c4c4c4",
  borderRadius: "4px",
  paddingLeft: "10px",
});

const buttonStyle = {
  height: "27.5px",
  border: "1px solid #D5441C",
  borderRadius: "5px",
  backgroundColor: "#D5441C",
  color: "#FFFFFF",
  cursor: "pointer",
  padding: "0 12px",
};
