import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fonts.css';

const TaskSummaryHomepage = (props) => {
  const [taskdata, setTaskdata] = useState([]);

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
                      color: category === "PROBLEM" ? 'rgb(255,0,0)' : (category === "WIP" ? 'rgb(0,0,255)' : (category === "DONE" ? 'rgb(0,255,0)' : (category === "START" ? 'rgb(0,0,0)' : 'inherit')))
                    }} 
                    className="Table-home-left-heading">
                  <b>TASK: {category}</b>
                </th>
              </tr>
              {taskDataFP[category].map((record, index) => (
                <tr key={index}>
                  <td style={{ 
                        width: '20%', 
                        verticalAlign: 'top', 
                        color: category === "PROBLEM" ? 'red' : (category === "WIP" ? 'rgb(0,0,255)' : (category === "START" ? 'black' : (category === "DONE" ? 'rgb(0,255,0)' : 'inherit')))
                      }} 
                      className="Table-home-right-text">
                    <a href={`/taskedit/${record.id}`} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.website_desc}>{record.taskname}</a>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskSummaryHomepage;
