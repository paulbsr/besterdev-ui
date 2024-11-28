import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Fonts.css';
import { Tooltip } from 'react-tooltip';

const TaskSummaryHomepage = (props) => {
  const [taskdata, setTaskdata] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({
    "PROBLEM": true,
    "WIP": true,
    "START": true,
    "DONE": true
  });

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks')
      .then((response) => {
        const sortedtaskdata = response.data.sort((b, a) => b.taskname.localeCompare(a.taskname));
        setTaskdata(sortedtaskdata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);

  const taskDataFP = {};

  taskdata.forEach((row) => {
    if (!taskDataFP[row.taskstatus]) {
      taskDataFP[row.taskstatus] = [];
    }
    taskDataFP[row.taskstatus].push(row);
  });

  const predefinedOrder = ["PROBLEM", "WIP", "START", "DONE"];

  const sortedByTaskStatus = Object.keys(taskDataFP).sort((a, b) => {
    return predefinedOrder.indexOf(a) - predefinedOrder.indexOf(b);
  });

  const getMostRecentTaskRecord = (tasks) => {
    if (!tasks || tasks.length === 0) return 'No action taken yet';
    tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    const mostRecentTask = tasks[0];
    const date = new Date(mostRecentTask.date);
    const formattedDate = date.toISOString().split('T')[0];
    return `${formattedDate}: ${mostRecentTask.childrecord}`;
  };

  const toggleSection = (category) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="scrollable-container">
      <table className="Table-home-left">
        <tbody>
          {sortedByTaskStatus.map((category) => (
            <React.Fragment key={category}>
              &nbsp;
              <tr>
                <th colSpan="2" 
                    style={{ 
                      textAlign: 'left', 
                      borderBottom: '1px solid #ddd', 
                      cursor: 'pointer',
                      color: category === "PROBLEM" ? 'rgb(255,0,0)' : (category === "WIP" ? 'rgb(0,0,255)' : (category === "DONE" ? '#169247' : (category === "START" ? 'rgb(0,0,0)' : 'inherit')))
                    }} 
                    className="Table-home-left-heading"
                    onClick={() => toggleSection(category)}>
                  <b>TASK: {category} ({taskDataFP[category] ? taskDataFP[category].length : 0})</b>
                </th>
              </tr>
              {!collapsedSections[category] && taskDataFP[category].map((record, index) => (
                <tr key={index}>
                  <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-right-text">
                    <a href={`/taskedit/${record.id}`} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       data-tooltip-id="task-tooltip" 
                       data-tooltip-content={getMostRecentTaskRecord(record.tasks)}
                       style={{ color: category === "PROBLEM" ? 'red' : (category === "WIP" ? 'rgb(0,0,255)' : (category === "START" ? 'black' : (category === "DONE" ? '#169247' : 'inherit'))) }}>
                      {record.taskname}
                    </a>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      <Tooltip id="task-tooltip" 
      style={{
        backgroundColor: '#333',
        color: '#fff',
        fontSize: '16px',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '900px',
      }}
      place="top" 
      type="dark" 
      effect="solid"/>
    </div>
  );
};

export default TaskSummaryHomepage;

