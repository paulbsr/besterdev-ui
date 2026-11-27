import { useState } from "react";
import OAuth2APIClient from "../oauth2/OAuth2APIClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiHummingbird } from "react-icons/gi";
import { toast } from "react-toastify";
import "./TaskCreate.css";

const modules = [
  { asms: "188118", projectHandle: "BesterDev User Stories", label: "BesterDev User Story" },
  { asms: "113092", projectHandle: "Random Tasks", label: "Random Tasks" },
  // { asms: "14718", projectHandle: "EnterpriseSecurity", label: "Enterprise Security" },
  // { asms: "181268", projectHandle: "ComputerCloudSecurity", label: "Computer Cloud Security" },
  // { asms: "171593", projectHandle: "DutchLanguage", label: "Dutch Language Staatsexamen NT2" },
  // { asms: "188660", projectHandle: "StaatsexamenNT2_Lezen", label: "Staatsexamen NT2 - Lezen" },
  // { asms: "190860", projectHandle: "StaatsexamenNT2_Luisteren", label: "Staatsexamen NT2 - Luisteren" },
  // { asms: "191076", projectHandle: "StaatsexamenNT2_Schrijven", label: "Staatsexamen NT2 - Schrijven" },
  // { asms: "221193", projectHandle: "StaatsexamenNT2_Spreken", label: "Staatsexamen NT2 - Spreken" },
];

export default function TaskCreate({ setCheckForRecords }) {
  const [taskname, setTaskname] = useState("");
  const [taskrequirement, setTaskrequirement] = useState("");
  const [tasktargetdate, setTasktargetdate] = useState(null);
  const [projecthandle, setProjecthandle] = useState("");
  const [asms, setAsms] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tasktargetdate) {
      toast.error("Choose a target date before creating the task.");
      return;
    }

    setSubmitting(true);
    const newTask = {
      taskname,
      taskrequirement,
      taskowner: "Bester",
      tasktargetdate,
      taskcreatedate: new Date(),
      taskstatus: "START",
      asms,
      projecthandle,
      tasknextstep: "",
    };

    try {
      const response = await OAuth2APIClient.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/create",
        newTask
      );
      if (response.status === 200) {
        setCheckForRecords((value) => !value);
        toast.success("Task added.");
      } else {
        toast.error("Task not added.");
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Task could not be created.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModuleChange = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    setAsms(event.target.value);
    setProjecthandle(selectedOption?.dataset.projectHandle || "");
  };

  return (
    <div className="task-create">
      <button
        className="task-create-toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls="task-create-form"
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <span className="task-create-toggle-icon" aria-hidden="true">
          <GiHummingbird />
        </span>
        <span className="task-create-toggle-copy">
          <strong>Create a task</strong>
          <span>Add a new item to a project</span>
        </span>
        <span className="task-create-toggle-indicator" aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <form
          id="task-create-form"
          className="task-create-form"
          onSubmit={handleSubmit}
        >
          <label className="task-create-field">
            <span>Project</span>
            <select value={asms} onChange={handleModuleChange} required>
              <option value="" disabled>Select Project</option>
              {modules.map((module) => (
                <option
                  key={module.asms}
                  value={module.asms}
                  data-project-handle={module.projectHandle}
                >
                  {module.label}
                </option>
              ))}
            </select>
          </label>

          <label className="task-create-field">
            <span>Task name</span>
            <input
              type="text"
              value={taskname}
              onChange={(event) => setTaskname(event.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </label>

          <label className="task-create-field task-create-field-wide">
            <span>Requirement or description</span>
            <input
              type="text"
              value={taskrequirement}
              onChange={(event) => setTaskrequirement(event.target.value)}
              placeholder="Add context, requirements, or a problem to solve"
            />
          </label>

          <label className="task-create-field">
            <span>Target date</span>
            <DatePicker
              selected={tasktargetdate}
              onChange={setTasktargetdate}
              dateFormat="yyyy.MM.dd"
              minDate={new Date()}
              placeholderText="Choose a date"
              className="task-create-date-input"
              required
            />
          </label>

          <div className="task-create-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create task"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
