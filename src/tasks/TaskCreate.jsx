import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "../Fonts.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiHummingbird } from "react-icons/gi";
import { toast } from 'react-toastify';


const useStyles = styled((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: { width: "100%", marginTop: theme.spacing(3) },
    submit: { margin: theme.spacing(3, 0, 2) },
}));


export default function TaskCreate(props) {
    const current = new Date();
    const [taskname, setTaskname] = useState("");
    const [taskrequirement, setTaskrequirement] = useState("");
    const [taskowner, setTaskowner] = useState("Bester");
    const [tasktargetdate, setTasktargetdate] = useState(null);
    const [taskcreatedate, setTaskcreatedate] = useState(current);
    const [taskstatus, setTaskstatus] = useState("START");
    const [projecthandle, setProjecthandle] = useState("");
    const [asms, setAsms] = useState("");
    const [tasknextstep, setTasknextstep] = useState("");
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [isExpanded, setExpanded] = useState(false);
    // const [checkForRecords, setCheckForRecords] = useState();


    const handleSubmit = async (event) => {
        if (
            tasktargetdate !== null
        ) {
            event.preventDefault();
            var newtask = {
                taskname: taskname,
                taskrequirement: taskrequirement,
                taskowner: taskowner,
                tasktargetdate: tasktargetdate,
                taskcreatedate: taskcreatedate,
                taskstatus: taskstatus,
                asms: asms,
                projecthandle: projecthandle,
                tasknextstep: tasknextstep,
            };
            try 
            {
                const response = await axios.post
                (`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/create`, newtask);
                if (response.status === 200) 
                {
                    props.setCheckForRecords(!props.checkForRecords);
                       { toast.success(`Task added.`) }
                }
                else {toast.error('Task not added');}
            }
            catch (err) {
                console.log(err);
            }
        } else {
            event.preventDefault();

        }
    };

    const dropdownChange = (event) => {
        const selectedIndex = event.target.options.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        setAsms(event.target.value);
        setProjecthandle(selectedOption.getAttribute('data-value2') || "");
    }



    return (
        <div>
            <div onClick={toggleAccordion}>
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} />
                &nbsp;<b><a className='Font-Verdana-Small-Postgres'>Add a Task to The Task Manager</a></b>
            </div>
            {isExpanded && (
                <div>
                    <div>&nbsp;</div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='Font-Segoe-Small'>
                                <div style={{ display: "flex" }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                                    <select
                                        style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '150px' }} placeholder="Domain" id="dropdown" onChange={dropdownChange} >
                                        <option disabled selected value="Domain">Module</option>
                                        <option value="113092" data-value2="NetworkSecurity">NetworkSecurity</option>
                                        <option value="14718" data-value2="EnterpriseSecurity">EnterpriseSecurity</option>
                                        <option value="181268" data-value2="ComputerCloudSecurity">ComputerCloudSecurity</option>
                                        <option value="171593" data-value2="AppliedCryptography">AppliedCryptography</option>
                                        <option value="168272" data-value2="Dissertation">Dissertation</option>
                                        <option value="188118" data-value2="UserStory">UserStory</option>
                                    </select>

                                    <div>
                                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                        <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '400px' }} placeholder="Task Name" type="text" onChange={(event) => setTaskname(event.target.value)} required />
                                    </div>
                                    <div>
                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} placeholder="Requirement / Problem / Description / Solution" type="text" onChange={(event) => setTaskrequirement(event.target.value)} />
                                    </div>

                                    <div>
                                        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                                    </div>
                                    <div>
                                        <DatePicker
                                            selected={tasktargetdate}
                                            onChange={(date) => setTasktargetdate(date)}
                                            dateFormat="yyyy.MM.dd"
                                            minDate={new Date()}
                                            placeholderText="Target Date"
                                        />
                                    </div>

                                    <div>
                                        &nbsp; &nbsp; &nbsp; &nbsp;
                                        <button className="Font-Segoe-Small" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }} onClick={() => setTaskstatus("START")}>Commit new Task</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div>
    );
}
