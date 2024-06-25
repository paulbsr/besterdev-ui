import React, { useContext, useState } from "react";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./Generic/Alerts/AlertContext";
import { toast } from 'react-toastify';

export default function TaskRecordCreate(props) {
  const current = new Date();
  const datum = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
  const [date, setDate] = useState(current);
  const [childrecord, setChildrecord] = useState("");
  const [parentid, setParentid] = useState("START");
  const [status, setStatus] = useState("START");
  const [handle, setHandle] = useState("START");
  const [asms, setAsms] = useState("START");
  const alertCtx = useContext(AlertContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var NewChildRecord =
    {
      date: date,
      childrecord: childrecord,
      parentid: parentid,
      asms: asms,
      status: status,
      handle: handle,
    };


    try {
      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/create`, NewChildRecord);

      if (response.status === 200) {
        props.setCheckForRecords(!props.checkForRecords);
        toast.success(`Step Record added.`)
      }
      else { alertCtx.error(`oops! Something went wrong in TaskRecordCreate`); }
    }
    catch (err) { alertCtx.error(`oops! Something went wrong in TaskRecordCreate`); }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
          required
          onChange={(e) => setChildrecord(e.target.value)}
          style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '20px', padding: 0, paddingLeft: '7px' }} />

        &nbsp;&nbsp;&nbsp;<input
          required
          onChange={(e) => setChildrecord(e.target.value)}
          style={{ height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />

        &nbsp;&nbsp;&nbsp;<button
          className="Font-Verdana-Small-Postgres"
          type="submit"
          style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}
        >INSERT
        </button>
      </form>
    </>
  );
}