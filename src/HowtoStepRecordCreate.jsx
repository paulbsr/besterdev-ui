import React, { useContext, useState } from "react";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./AlertContext";
import { toast } from 'react-toastify';

export default function HowtoStepRecordCreate(props) {
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

  const handleSubmit = async (e) => {
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
    if (response.status === 200) {
      setCheckForRecords(!checkForRecords);
      alert(`${steprecord} has been memorialized.`);
      toast.success(`${steprecord} memorialized.`);
    }
    else { alert(`oops! Something went wrong @ the if/else!`); }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <textarea
          autoFocus
          cols="100"
          rows={2}
          defaultValue={steprecord}
          onChange={(e) => setSteprecord(e.target.value)}>
        </textarea>
        <div></div>
        <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }} > Add Step Record</button>
      </form>
    </>
  );
}