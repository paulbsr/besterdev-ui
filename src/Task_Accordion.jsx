import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Task_Create from './Task_Create';
import Task from './Task';
import GradientLineRusty from "./GradientLineRusty";
import HowtoStepCreate from './HowtoStepCreate';
import './Fonts.css'


function Task_Accordion({ activeAccount, asms_number, project_handle, requested_asms, ppm_id }) {

  const [checkForRecords, setCheckForRecords] = useState(true);   // update this value to be the opposite of its current value, every time a new CR is added
  const [isExpanded, setExpanded] = useState(false);
  const [parenttask, setParenttask] = useState([]);
  const [error, setError] = useState(null);
  const doneList = parenttask.filter(status => status.taskstatus === 'DONE').sort((a, b) => (a.tasks[0].date.join(":") > b.tasks[0].date.join(":")) ? -1 : 1)
  const [projecthandle, setProjecthandle] = useState("")

  useEffect(() => {
    // axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/asms/${asms_number}`).then((response) => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/asms/asms`).then((response) => {
      setParenttask(response.data.sort((a, b) => a.id - b.id)); 
      setError(null);
    }).catch(setError);
  }, [checkForRecords]);

    

  if (error) return <p>An error in Task_Accordion occurred</p>

  return (
    <div>
      <Task_Create asms_number={asms_number} projecthandle={projecthandle} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
      <div className="flex-box">
        <table className="Table4" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Howto Name</th>
            </tr>
          </thead>
          {
            parenttask.map(({ id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, tasks, taskcreatedate, projecthandle }) =>
            (
              <tbody>
                {
                  <tr>
                    <td>
                      {<Task projecthandle={projecthandle} id={id} taskname={taskname} taskrequirement={taskrequirement} taskowner={taskowner} asms={asms} tasktargetdate={tasktargetdate} taskstatus={taskstatus} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />}
                    </td>
                  </tr>}
              </tbody>
            )
            )
          }
        </table>
      </div>
      <div>&nbsp;</div>
      <GradientLineRusty />
    </div>
  );
}
export default Task_Accordion;