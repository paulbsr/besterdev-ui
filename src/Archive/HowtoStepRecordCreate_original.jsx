import React, { useContext, useState } from "react";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./AlertContext";
import { toast } from 'react-toastify';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';


export default function HowtoStepRecordCreate_original(props) {
  const current = new Date();
  const [steprecord_id, setSteprecord_id] = useState(props.steprecord_id);
  const [steprecord, setSteprecord] = useState("");
  const [steprecord_date, setSteprecord_date] = useState(current);
  const [step_id, setStep_id] = useState(props.step_id);
  const [step_name, setStep_name] = useState(props.step_name);
  const [howto_id, setHowto_id] = useState(props.howto_id);
  const [howto_name, setHowto_name] = useState(props.howto_name);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const alertCtx = useContext(AlertContext);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var NewStepRecord =
    {
      steprecord: steprecord,
      steprecord_date: steprecord_date,
      step_id: step_id,
      step_name: step_name,
      howto_id: howto_id,
      howto_name: howto_name,
    };

    const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/create`, NewStepRecord);
    if (response.status === 200) 
    {
      setCheckForRecords(!checkForRecords);
      toast.success(`${steprecord} StepRecord memorialized.`);
    }
    else { toast.error('Nee') }
  }

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content=".."><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Create a Howto Step Record</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Create a Step record:

              <textarea
                autoFocus
                cols="100"
                rows={2}
                defaultValue={steprecord}
                onChange={(event) => setSteprecord(event.target.value)}>
              </textarea>

              <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }} > Add this Step Record</button>
            </form>
          </div>
        </div>)}
    </div>
  );
}