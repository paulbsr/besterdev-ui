import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdTask } from 'react-icons/md';
import Task_forTaskEdit from './Task_forTaskEdit';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function TaskEdit({ task_id }) {
  const [fetchRecords, setFetchRecords] = useState(true);
  const [taskdata, setTaskData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/${task_id}`)
      .then((response) => {
        if (active) {
          setTaskData(response.data);
          setError(null);
        }
      })
      .catch((requestError) => {
        console.error('Error fetching task data:', requestError);
        if (active) setError(requestError);
      });

    return () => { active = false; };
  }, [fetchRecords, task_id]);

  return (
    <main className="task-editor-page">
      <header className="task-editor-header">
        <div className="task-editor-title">
          <span className="task-editor-icon" aria-hidden="true"><MdTask /></span>
          <div>
            <p className="task-editor-eyebrow">TASK WORKSPACE</p>
            <h1>Task details</h1>
            <p className="task-editor-subtitle">View and manage task details and progress.</p>
          </div>
        </div>
        <Link className="task-editor-back" to="/taskmanage">Back to tasks</Link>
      </header>

      <section className="task-editor-card" aria-label="Task details">
        {error ? (
          <p className="task-editor-message" role="alert">Unable to load task: {error.message}</p>
        ) : !taskdata ? (
          <p className="task-editor-message" role="status">Loading task...</p>
        ) : (
          <Task_forTaskEdit
            key={taskdata.id}
            project_handle={taskdata.project_handle}
            id={taskdata.id}
            taskname={taskdata.taskname}
            taskrequirement={taskdata.taskrequirement}
            taskowner={taskdata.taskowner}
            asms={taskdata.asms}
            tasktargetdate={taskdata.tasktargetdate}
            taskstatus={taskdata.taskstatus}
            checkForRecords={fetchRecords}
            setCheckForRecords={setFetchRecords}
            parenttask={taskdata}
            taskUrl={taskdata.taskUrl}
          />
        )}
      </section>
    </main>
  );
}
