import React, { useContext, useState } from "react";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
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
      const response = await OAuth2APIClient.post(
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
    <section className="people-create-card" aria-labelledby="people-create-title">
      <button
        className="people-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="people-create-form"
        onClick={toggleAccordion}
      >
        <span className="people-create-icon" aria-hidden="true">
          <GiHummingbird />
        </span>
        <span className="people-create-copy">
          <strong id="people-create-title">Add a scorecard task</strong>
          <span>Create a team objective or work item</span>
        </span>
        <span className="people-create-action">
          {isExpanded ? "Close" : "New task"}
        </span>
      </button>

      {isExpanded && (
        <form id="people-create-form" className="people-create-form" onSubmit={handleSubmit}>
          <input
            className="people-form-input"
            type="text"
            aria-label="Task name (required)"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            placeholder="Task name"
          />

          <textarea
            className="people-form-input people-form-textarea"
            aria-label="Description (optional)"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={1}
          />

          <div className="people-create-form-actions">
            <button className="people-button people-button-primary" type="submit">
              Add task
            </button>
            <button className="people-button people-button-secondary" type="button" onClick={() => setExpanded(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
