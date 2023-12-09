import React, { useState, useEffect } from 'react';
import axios from 'axios'
import New_Task from './New_Task';
import GradientLineRusty from "./GradientLineRusty";
import HowtoStepCreate from './HowtoStepCreate';
import './Fonts.css'


function New_Task_Accordion({ }) {

  const [checkForRecords, setCheckForRecords] = useState(true);
  const [howtodata, setHowtoData] = useState([]);
  const [error, setError] = useState(null);
  const [howto_id, setHowto_id] = useState('6');


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/6')
      .then((response) => {
        const howto = response.data;
        howto.howto_steps.sort((a, b) => a.step_number - b.step_number);
        setHowtoData(howto);
      }
      )
  }, [checkForRecords]);


  if (error) return <p>An error in Task_Accordion occurred</p>

  return (
    <div>
      <HowtoStepCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
      <div className="flex-box">
        <table className="Table4" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>{howtodata.howto_name} {howto_id}</th>
            </tr>
          </thead>

          {howtodata.howto_steps && howtodata.howto_steps.map((step) => (
            <tbody>
              {
                <tr>
                  <td>
                    {<New_Task key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />}
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