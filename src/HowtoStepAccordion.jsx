import React, { useState, useEffect } from 'react';
import axios from 'axios'
import HowtoStep from './HowtoStep';
import GradientLineRusty from "./GradientLineRusty";
import HowtoStepCreate from './HowtoStepCreate';
import './Fonts.css'


function HowtoStepAccordion({ howto_ids }) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [howtodata, setHowtoData] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/${howto_ids}`)
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
      <HowtoStepCreate howto_idb={howto_ids} howto_name={howtodata.howto_name} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
      <div>
        <table className="Table4" style={{ width: '1350px' }}>
          <thead>
            <tr >
              <th>
                {howtodata.howto_name}
                <div className='Font-Segoe-Medium-Howto-CV'>{howtodata.howto_desc}</div>
              </th>
              
            </tr>
          </thead>

          {howtodata.howto_steps && howtodata.howto_steps.map((step) => (
            <tbody>
              {
                 
                  <tr>
                    <td>
                      {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />}
                    </td>
                  </tr>

              }
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
export default HowtoStepAccordion;