import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdTask } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import MouseoverPopover from "../MouseoverPopover";
import { TaskContext } from "../Contexts";
import Task from "./Task";
import TaskCreate from "./TaskCreate";
import { compareTaskDatesDescending } from "./taskDate";
import "./TaskOverview.css";

const projectNameMap = {
  113092: "NetworkSecurity",
  14718: "EnterpriseSecurity",
  181268: "ComputerCloudSecurity",
  171593: "AppliedCryptography",
  168272: "Dissertation",
  188660: "StaatsexamenNT2_Lezen",
  190860: "StaatsexamenNT2_Luisteren",
  191076: "StaatsexamenNT2_Schrijven",
  221193: "StaatsexamenNT2_Spreken",
  188118: "UserStory",
};

const projectAsmsMap = {
  NetworkSecurity: "113092",
  EnterpriseSecurity: "14718",
  ComputerCloudSecurity: "181268",
  AppliedCryptography: "171593",
  Dissertation: "168272",
  StaatsexamenNT2_Lezen: "188660",
  StaatsexamenNT2_Luisteren: "190860",
  StaatsexamenNT2_Schrijven: "191076",
  StaatsexamenNT2_Spreken: "221193",
  UserStory: "188118",
};

const statuses = [
  { key: "START", label: "Start", className: "task-status-start" },
  { key: "WIP", label: "In progress", className: "task-status-wip" },
  { key: "PROBLEM", label: "Issue", className: "task-status-problem" },
  { key: "DONE", label: "Done", className: "task-status-done" },
];

const createProjectCounter = (asms) => ({
  asms,
  START: [],
  WIP: [],
  DONE: [],
  PROBLEM: [],
});

const getTaskDate = (task) => {
  return task.tasks?.length ? task.tasks[0].date : task.taskcreatedate;
};

export default function TaskOverview({
  loading,
  error,
  checkForRecords,
  setCheckForRecords,
}) {
  const allTask = useContext(TaskContext) || [];
  const [currentStatus, setCurrentStatus] = useState("START");
  const [currentAsms, setCurrentAsms] = useState("113092");
  const [currentName, setCurrentName] = useState("NetworkSecurity");

  const statusCounts = allTask.reduce(
    (counts, task) => {
      if (Object.prototype.hasOwnProperty.call(counts, task.taskstatus)) {
        counts[task.taskstatus] += 1;
      }
      return counts;
    },
    { START: 0, WIP: 0, PROBLEM: 0, DONE: 0 }
  );

  const projectCounters = new Map(
    Object.entries(projectAsmsMap).map(([name, asms]) => [
      name,
      createProjectCounter(asms),
    ])
  );

  allTask.forEach((task) => {
    const projectName =
      projectNameMap[task.asms] ||
      task.project_handle ||
      String(task.asms || "Other");
    if (!projectCounters.has(projectName)) {
      projectCounters.set(projectName, createProjectCounter(task.asms));
    }

    const project = projectCounters.get(projectName);
    if (project[task.taskstatus]) project[task.taskstatus].push(task);
  });

  const selectedTasks = allTask.filter(
    (task) =>
      String(task.asms) === String(currentAsms) &&
      task.taskstatus === currentStatus
  );

  const setTable = (projectName, asms, status) => {
    setCurrentName(projectName);
    setCurrentAsms(String(asms));
    setCurrentStatus(status);
  };

  const handleStatusCellKeyDown = (event, projectName, asms, status) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setTable(projectName, asms, status);
    }
  };

  const renderStatusCell = (projectName, project, status) => {
    const tasks = [...project[status.key]].sort(
      (a, b) => compareTaskDatesDescending(getTaskDate(a), getTaskDate(b))
    );

    return (
      <td key={status.key}>
        <div
          className={`task-status-count ${status.className}`}
          role="button"
          tabIndex={0}
          aria-label={`${tasks.length} ${status.label} tasks for ${projectName}`}
          onClick={() => setTable(projectName, project.asms, status.key)}
          onKeyDown={(event) =>
            handleStatusCellKeyDown(event, projectName, project.asms, status.key)
          }
        >
          <MouseoverPopover
            see={tasks.length}
            read={
              tasks.length
                ? tasks.map((task) => <div key={task.id}>{task.taskname}</div>)
                : "No tasks"
            }
          />
        </div>
      </td>
    );
  };

  if (error) {
    return (
      <main className="task-overview-page">
        <div className="task-overview-state" role="alert">
          <p>Unable to load tasks.</p>
          <button type="button" onClick={() => setCheckForRecords((value) => !value)}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="task-overview-page">
        <div className="task-overview-state" role="status">Loading tasks...</div>
      </main>
    );
  }

  return (
    <main className="task-overview-page">
      <Tooltip id="insert" />

      <header className="task-overview-header">
        <div className="task-overview-title">
          <span className="task-overview-icon" aria-hidden="true">
            <MdTask />
          </span>
          <div>
            <p className="task-overview-eyebrow">PROJECT OPERATIONS</p>
            <h1>Task Manager</h1>
            <p className="task-overview-description">
              Track work across projects, from start to completion.
            </p>
          </div>
        </div>

        <div className="task-overview-metrics" aria-label="Task counts">
          <div className="task-overview-metric">
            <strong>{allTask.length}</strong>
            <span>All tasks</span>
          </div>
          <div className="task-overview-metric task-metric-start">
            <strong>{statusCounts.START}</strong>
            <span>Start</span>
          </div>
          <div className="task-overview-metric task-metric-wip">
            <strong>{statusCounts.WIP}</strong>
            <span>In progress</span>
          </div>
          <div className="task-overview-metric task-metric-problem">
            <strong>{statusCounts.PROBLEM}</strong>
            <span>Issues</span>
          </div>
          <div className="task-overview-metric task-metric-done">
            <strong>{statusCounts.DONE}</strong>
            <span>Done</span>
          </div>
        </div>
      </header>

      <section className="task-create-panel">
        <TaskCreate
          checkForRecords={checkForRecords}
          setCheckForRecords={setCheckForRecords}
        />
      </section>

      <div className="task-overview-board">
        <section className="task-projects-panel">
          <div className="task-panel-heading">
            <div>
              <h2>Project status</h2>
              <p>Select a status count to view its tasks.</p>
            </div>
          </div>
          <div className="task-project-matrix-scroll">
            <table className="Table8 Table8hover task-project-matrix">
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  {statuses.map((status) => (
                    <th scope="col" key={status.key}>{status.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(projectCounters.entries()).map(([projectName, project]) => (
                  <tr key={projectName}>
                    <th scope="row">{projectName}</th>
                    {statuses.map((status) =>
                      renderStatusCell(projectName, project, status)
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="task-selected-panel">
          <header className="task-panel-heading task-selected-heading">
            <div>
              <p className="task-overview-eyebrow">SELECTED TASKS</p>
              <h2>{currentName}</h2>
            </div>
            <span className={`task-selected-status task-status-${currentStatus.toLowerCase()}`}>
              {currentStatus}
            </span>
          </header>
          <div className="task-selected-list">
            {selectedTasks.length ? (
              selectedTasks.map((task) => (
                <div className="task-selected-item" key={task.id}>
                  <MouseoverPopover
                    see={
                      <Task
                        project_handle={task.project_handle}
                        id={task.id}
                        taskname={task.taskname}
                        taskrequirement={task.taskrequirement}
                        taskowner={task.taskowner}
                        asms={task.asms}
                        tasktargetdate={task.tasktargetdate}
                        taskstatus={task.taskstatus}
                        parenttask={allTask}
                        checkForRecords={checkForRecords}
                        setCheckForRecords={setCheckForRecords}
                      />
                    }
                  />
                  <Link className="task-selected-edit-link" to={`/taskedit/${task.id}`} aria-label={`Open task editor for ${task.taskname}`}>
                    Open task editor
                  </Link>
                </div>
              ))
            ) : (
              <div className="task-overview-empty">
                No {currentStatus.toLowerCase()} tasks for this project.
              </div>
            )}
          </div>
        </section>
      </div>

    </main>
  );
}
