import React, { useContext, useState } from "react";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./Generic/Alerts/AlertContext";


export default function TaskRecordCreate(props) {
    const current = new Date();
    const datum = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
    const [date, setDate] = useState(current);
    const [childrecord, setChildrecord] = useState("");
    const [parentid, setParentid] = useState(props.parentid);
    const [status, setStatus] = useState("START");
    const [handle, setHandle] = useState(props.project_handle);
    const [asms, setAsms] = useState(props.asms_number);
    const alertCtx = useContext(AlertContext);
    const handleSubmit = async (event) => {
        event.preventDefault();
        var NewChildRecord = {
            childrecord: childrecord,
            parentid: parentid,
            status: status,
            date: date,
            asms: asms,
            handle: handle,
        };
        var UpdateTaskStatus = { taskstatus: status };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/taskrecords/create`,
                NewChildRecord
            );
            if (response.status === 200) {
                alertCtx.success("Successful TaskRecordCreate");
            } else {
                alertCtx.error(`Failed TaskRecordCreate`);
            }
        } catch (err) {
            alertCtx.error(`Failed TaskRecordCreate`);
            console.log(err);
        }
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/v1/tasks/update/taskstatus/${parentid}`,
                UpdateTaskStatus
            );
            if (response.status === 202) {
                props.setCheckForRecords(!props.checkForRecords);
            } else {
                alertCtx.error(
                    `oops! Something went wrong in TaskRecordCreate not updating the status of the parent`
                );
            }
        } catch (err) {
            alertCtx.error(
                `oops! Something went wrong in TaskRecordCreate not updating the status of the parent#2`
            );
            console.log(err);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea
                    autoFocus
                    cols="80"
                    rows={5}
                    onChange={(e) => setChildrecord(e.target.value)}>
                </textarea>
                <div></div>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#C0C0C0', color: '#FFFFFF', cursor: 'pointer' }}
                    onClick={() => setStatus("START")}>
                    START
                </button>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}
                    onClick={() => setStatus("WIP")}>
                    WIP
                </button>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}
                    onClick={() => setStatus("PROBLEM")}>
                    ISSUE
                </button>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#169247', color: '#FFFFFF', cursor: 'pointer' }}
                    onClick={() => setStatus("DONE")}>
                    DONE
                </button>
            </form>
        </>
    );
}