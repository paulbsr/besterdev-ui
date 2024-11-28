import React, { useState } from "react";
import axios from "axios";
import "../Fonts.css";
import { toast } from 'react-toastify';


export default function TaskRecordCreate(props) {
    const current = new Date();
    const datum = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
    const [date, setDate] = useState(current);
    const [childrecord, setChildrecord] = useState("");
    const [parentid, setParentid] = useState(props.parentid);
    const [status, setStatus] = useState("START");
    const [handle, setHandle] = useState(props.project_handle);
    const [asms, setAsms] = useState(props.asms_number);
   
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        var NewChildRecord = {
            childrecord: childrecord,
            parentid: parentid,
            status: status,
            date: date,
            asms: asms,
            handle: handle,
            parent_id: parentid,
        };
        
        var UpdateTaskStatus = { taskstatus: status };
        
        try {
            // const response = await axios.post(`http://localhost:8000/api/v1/taskrecords/create`, NewChildRecord);
            const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/taskrecords/create`, NewChildRecord);
            if (response.status === 200) 
                {
                props.setCheckForRecords(!props.checkForRecords); 
                { toast.success(`Task Record added.`) }
                } 
            else {
                toast.error('Task Record add problem');
            }
        } catch (err) {
            console.log(err);
        }
        
        
        
        try {
            // const response = await axios.put(`http://localhost:8000/api/v1/tasks/update/taskstatus/${parentid}`, UpdateTaskStatus);
            const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/update/taskstatus/${parentid}`, UpdateTaskStatus);
            if (response.status === 202) {
                props.setCheckForRecords(!props.checkForRecords);
                // setCheckForRecords(!checkForRecords);
            } else {
                toast.error('Nee');
            }
        } catch (err) {
            toast.error(`oops! Something went wrong in TaskRecordCreate not updating the status of the parent#2`);
            console.log(err);
        }
    };
    
    
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea
                    // autoFocus
                    // cols="140"
                    // rows={5}
                    onChange={(e) => setChildrecord(e.target.value)}
                                                        style={{
                                    width: 1000,
                                    height: "80px",
                                    marginBottom: "15px",
                                    marginTop: "5px",
                                    display: "flex",
                                    border: "1px dotted grey"
                                }}>
                </textarea>
                <div></div>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#C0C0C080', color: '#336791', cursor: 'pointer' }}
                    onClick={() => setStatus("START")}>
                    START
                </button>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#0F9ED540', color: '#336791', cursor: 'pointer' }}
                    onClick={() => setStatus("WIP")}>
                    WIP
                </button>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#BE000040', color: '#336791', cursor: 'pointer' }}
                    onClick={() => setStatus("PROBLEM")}>
                    ISSUE
                </button>
                <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ height: '22.5px', border: '1px solid #ffffff', borderRadius: '5px', backgroundColor: '#00B40040', color: '#336791', cursor: 'pointer' }}
                    onClick={() => setStatus("DONE")}>
                    DONE
                </button>
            </form>
        </>
    );
}