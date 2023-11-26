import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Task_Create from './Task_Create';
import Task from './Task';
// import TFSTask from "./TFSTasks";
import './Fonts.css'
import MouseoverPopover from "./MouseoverPopover";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaTasks } from "react-icons/fa";
import GradientLineRusty from "./GradientLineRusty";


function Task_Accordion({ activeAccount, asms_number, project_handle, requested_asms, ppm_id }) {

  const [checkForRecords, setCheckForRecords] = useState(true);   // update this value to be the opposite of its current value, every time a new CR is added
  const [isExpanded, setExpanded] = useState(false);
  const [parenttask, setParenttask] = useState([]);
  // const [tfstask, setTfstask] = useState([]);
  const [error, setError] = useState(null);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [open, setOpen] = useState(false)
  const doneList = parenttask.filter(status => status.taskstatus === 'DONE').sort((a, b) => (a.tasks[0].date.join(":") > b.tasks[0].date.join(":")) ? -1 : 1)
  const [isExpanded_1, setExpanded_1] = useState(false);
  const toggleAccordion_1 = () => { setExpanded_1(!isExpanded_1); };


  useEffect(() => {
    // axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/asms/${asms_number}`).then((response) => {
      axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/asms/asms`).then((response) => {
      setParenttask(response.data.sort((a, b) => b.id - a.id)); setError(null);
      console.log(parenttask)
    }).catch(setError);
  }, [checkForRecords]);

  // useEffect(() => {
  //   axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tfs/${project_handle.toLowerCase()}`).then((response) => {
  //     setTfstask(response.data); setError(null);
  //   }).catch(setError);
  // }, [checkForRecords]);



  if (error) return <p>An error in Task_Accordion occurred</p>

  return (

    <>
      <div>

        <div onClick={toggleAccordion_1}>
          &nbsp; &nbsp;<FaTasks style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} />
          &nbsp;<b><a className='Font-Verdana-Medium-Postgres'>&nbsp; Tasks & Actions </a></b>
          <a className='Font-Verdana-Medium-Rusty'> </a>
        </div>

        {isExpanded_1 && (

          <div>
            <div>&nbsp;</div>
            <div>

              {/* {activeAccount.idTokenClaims.roles.includes('user.Read') || activeAccount.idTokenClaims.roles.includes('user.Manager') || activeAccount.idTokenClaims.roles.includes('user.Admin') ?
                <div></div>
                : ""} */}
              <Task_Create asms_number={asms_number} project_handle={project_handle} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />

              {parenttask.filter(status => status.taskstatus === 'PROBLEM').map(({ id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, tasks, taskcreatedate }) => (
                <div style={{ marginTop: 10 }}>
                  {/* {
                    <MouseoverPopover see={ */}
                  <Task project_handle={project_handle} activeAccount={activeAccount} id={id} taskname={taskname} taskrequirement={taskrequirement} taskowner={taskowner} asms={asms} tasktargetdate={tasktargetdate} taskstatus={taskstatus} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                {/* } 
                  read={tasks.length > 0 ? 'Last updated: ' + tasks[0].date[0] + '.' + tasks[0].date[1] + '.' + tasks[0].date[2] : 'Created: ' + taskcreatedate[0] + '.' + taskcreatedate[1] + '.' + taskcreatedate[2]}>
                    </MouseoverPopover>
                    } */}
                  </div>))
              }

              <div className="flex-container">
                <div className="flex-box-bester">
                  <table className="Table8 fill">
                    <thead>
                      <tr>
                        <th>Hierdie moet die Howto Name wees</th>
                      </tr>
                    </thead>
                    {parenttask.map(({ id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, tasks, taskcreatedate }) => (
                      <tbody>
                        {
                          <tr>
                            <td>
                  {<Task project_handle={project_handle} activeAccount={activeAccount} id={id} taskname={taskname} taskrequirement={taskrequirement} taskowner={taskowner} asms={asms} tasktargetdate={tasktargetdate} taskstatus={taskstatus} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} 
                            </td>
                        </tr>}
                        </tbody>
                    ))}
                  </table>
                </div>
               
               
                {/* <div className="flex-box">
                  <table className="Table8 fill" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>WIP</th>
                      </tr>
                    </thead>
                    {parenttask.filter(status => status.taskstatus === 'WIP').map(({ id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, tasks, taskcreatedate }) => (
                      <tbody>{
                        <tr>
                        <td>
                        <MouseoverPopover see={<Task project_handle={project_handle} activeAccount={activeAccount} id={id} taskname={taskname} taskrequirement={taskrequirement} taskowner={taskowner} asms={asms} tasktargetdate={tasktargetdate} taskstatus={taskstatus} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} read={tasks.length > 0 ? 'Last updated: ' + tasks[0].date[0] + '.' + tasks[0].date[1] + '.' + tasks[0].date[2] : 'Created: ' + taskcreatedate[0] + '.' + taskcreatedate[1] + '.' + taskcreatedate[2]}></MouseoverPopover>
                        </td>
                        </tr>}
                        </tbody>
                    ))}
                    {
                      tfstask.map((value) => (


                        <tbody>{
                          <tr>
                            <td>
                              <MouseoverPopover see={<TFSTask Title={value.Title} WorkItemType={value.WorkItemType} CreatedDate={value.CreatedDate} />} read={'Created: ' + value.CreatedDate.split('T')[0].replaceAll('-', '.')}></MouseoverPopover>
                            </td>
                          </tr>
                        }
                        </tbody>
                      )
                      )
                    }
                  </table>

                </div> */}
               
               
                {/* <div className="flex-box">
                  <table className="Table8 fill">
                    <thead>
                      <tr>
                        <th>
                          <div style={{ display: "flex", height: 17 }}>
                            <div className="doneflex">DONE - {doneList.length}</div>
                            <div className="doneflex" onClick={() => setOpen(!open)} style={{ cursor: 'pointer', textAlign: 'right', padding: 0 }}>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {open &&
                      <tbody className='done' style={{ width: '100%' }}>
                        {doneList.map(({ id, taskname, taskrequirement, taskowner, tasktargetdate, taskstatus, asms, tasks, taskcreatedate }) => (
                          <tr><td style={{ width: '100%' }} colSpan="2">
                            <MouseoverPopover see={<Task project_handle={project_handle} activeAccount={activeAccount} id={id} taskname={taskname} taskrequirement={taskrequirement} taskowner={taskowner} asms={asms} tasktargetdate={tasktargetdate} taskstatus={taskstatus} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}  />} read={tasks.length > 0 ? 'Last updated: ' + tasks[0].date[0] + '.' + tasks[0].date[1] + '.' + tasks[0].date[2] : 'Created: ' + taskcreatedate[0] + '.' + taskcreatedate[1] + '.' + taskcreatedate[2]}></MouseoverPopover>
                            </td>
                            </tr>
                        ))}
                      </tbody>
                    }
                  </table>
                </div> */}
             
             
              </div>
              <div>&nbsp;</div>
              <GradientLineRusty />
              <div>&nbsp;</div>
            </div>
          </div>
        )
        }
      </div>

    </>
  );
}
export default Task_Accordion;