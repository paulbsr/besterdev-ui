import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import './Fonts.css';
import 'react-dropdown/style.css';
import Task from './Task';
import Task_forTaskEdit from './Task_forTaskEdit';


export default function TaskEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [websitedata, setWebsitedata] = useState([]);
  const [fetchRecords, setFetchRecords] = useState(true);
  const [taskdata, setTaskData] = useState([]);
  const [error, setError] = useState(null);
  const [parenttask1, setParenttask1] = useState(props.parenttask);

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

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const filteredwebsites = response.data.filter(site => site.howto_id_fk === props.howto_id);
        const sortedfilteredwebsites = filteredwebsites.sort((a, b) => a.website_name.localeCompare(b.website_name));
        setWebsitedata(sortedfilteredwebsites);

      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching website data:', error);
      }
      )
      ;
  }, [fetchRecords, props.howto_id]);


  if (error) return <p>An error occurred: {error.message}</p>;

  const InnerTableLeft = () => {
    const groupedData = {};
    websitedata.forEach((row) => {
      if (!groupedData[row.website_cat]) {
        groupedData[row.website_cat] = [];
      }
      groupedData[row.website_cat].push(row);
    });

    const sortedCategories = Object.keys(groupedData).sort();

    return (
      <div className="scrollable-container">
        <Tooltip id="insert" />
        <table className="Table-home-left">
          <tbody>
            {sortedCategories.map((category) => (
              <React.Fragment key={category}>
                {groupedData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top', cursor: 'pointer', }} className="Font-Segoe-Medium-Howto">
                      <a href={record.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.website_desc}>
                        {record.website_name}
                      </a>
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
                tasktargetdate={"2024-06-01"}
                taskstatus={taskdata.taskstatus}
                checkForRecords={fetchRecords}
                setCheckForRecords={setFetchRecords}
                parenttask={taskdata}
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
