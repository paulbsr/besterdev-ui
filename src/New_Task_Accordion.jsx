import React, { useState, useEffect } from 'react';
import axios from 'axios'
import New_Task_Create from './New_Task_Create';
import New_Task from './New_Task';
import GradientLineRusty from "./GradientLineRusty";
import HowtoStepCreate from './HowtoStepCreate';
import './Fonts.css'


function New_Task_Accordion({ asms_number, project_handle, requested_asms, ppm_id }) {

  const [checkForRecords, setCheckForRecords] = useState(true);   // update this value to be the opposite of its current value, every time a new CR is added
  const [isExpanded, setExpanded] = useState(false);
  const [howtodata, setHowtoData] = useState([]); //parenttask = howtodata
  const [error, setError] = useState(null);
  // const doneList = howtodata.filter(status => status.taskstatus === 'DONE').sort((a, b) => (a.tasks[0].date.join(":") > b.tasks[0].date.join(":")) ? -1 : 1)
  const [projecthandle, setProjecthandle] = useState("")


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/6')
      .then((response) => {
        const howto = response.data;
        howto.howto_steps.sort((a, b) => a.step_number - b.step_number);
        // console.log(howto);
        setHowtoData(howto);
      }
      )
  },
    []); console.log(howtodata.howto_steps); //Hierdie is goed!
    

  if (error) return <p>An error in Task_Accordion occurred</p>

  return (
    <div>
      {/* <New_Task_Create checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
      <HowtoStepCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
      <div className="flex-box">
        <table className="Table4" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>{howtodata.howto_name}</th>
            </tr>
          </thead>

          {howtodata.howto_steps && howtodata.howto_steps.map((step) => (
              <tbody>
                {
                  <tr>
                    <td>
                      {/* {<New_Task howto_steps={howtodata.howto_steps} howto_id={howtodata.howto_id} howto_name={howtodata.howto_name} howto_desc={howtodata.howto_desc} howto_author={howtodata.howto_author} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                      {<New_Task key={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj}  howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />}
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
export default New_Task_Accordion;