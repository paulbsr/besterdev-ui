import React, { useContext, useState } from "react";
import axios from "axios";
import "./Fonts.css";
import { toast } from 'react-toastify';

export default function New_TaskRecordCreate(props) {
  const current = new Date();
  const [steprecord_parent, setSteprecord_parent] = useState(props.step_idd);
  const [steprecord_number, setSteprecord_number] = useState("");
  const [steprecord, setSteprecord] = useState("");
  const [steprecord_date, setSteprecord_date] = useState(current);
  const [step_id_fk, setStep_id_fk] = useState(props.step_idd);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var StepRecordPost =
    {
      steprecord_parent: steprecord_parent,
      steprecord_number: steprecord_number,
      steprecord: steprecord,
      steprecord_date: steprecord_date,
      step_id_fk: step_id_fk,
    };

      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteprecord/create`, StepRecordPost);
      if (response.status === 200) {
        props.setCheckForRecords(!props.checkForRecords);
        toast.success(`Step Record#${steprecord_number} added.`)
      }
      else { toast.error(`oops! Something went wrong in TaskRecordCreate`); }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
          required
          onChange={(e) => setSteprecord_number(e.target.value)}
          style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px', padding: 0, paddingLeft: '7px' }} />

        &nbsp;&nbsp;&nbsp;<input
          required
          onChange={(e) => setSteprecord(e.target.value)}
          style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
        <div>&nbsp;</div>
        &nbsp;&nbsp;&nbsp;<button
          className="Font-Verdana-Small-Postgres"
          type="submit"
          style={{ height: '27.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}
        >Add this Record
        </button>
      </form>
    </>
  );
}