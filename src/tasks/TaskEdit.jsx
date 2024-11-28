import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Fonts.css';
import 'react-dropdown/style.css';
import Task_forTaskEdit from './Task_forTaskEdit';


export default function TaskEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [fetchRecords, setFetchRecords] = useState(true);
  const [taskdata, setTaskData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/${props.task_id}`)
      .then((response) => {
        const tasksdata = response.data;
        setTaskData(tasksdata);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching task data:', error);
      });
  }, [fetchRecords, props.task_id]);


  if (error) return <p>An error occurred: {error.message}</p>;

  const InnerTableLeft = () => { };
  // console.log('In <Taskedit> is jou taskdata:', taskdata)

  return (
    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td style={{ width: '20%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '58%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '20%' }}></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '20%' }} className="Table-home-left"><InnerTableLeft /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '58%', cursor: 'pointer', }} className="Table-home-centre">
              <Task_forTaskEdit
                key={taskdata.id}
                project_handle={taskdata.project_handle}
                id={taskdata.id}
                taskname={taskdata.taskname}
                taskrequirement={taskdata.taskrequirement}
                taskowner={taskdata.taskowner}
                asms={taskdata.asms}
                tasktargetdate={"2000.01.01"}
                taskstatus={taskdata.taskstatus}
                checkForRecords={fetchRecords}
                setCheckForRecords={setFetchRecords}
                parenttask={taskdata}
                taskUrl={taskdata.taskUrl}
              />
            </td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '20%' }} className="Table-home-right"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
