import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./Generic/Alerts/AlertContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiHummingbird } from "react-icons/gi";
import { TaskContext } from "./Contexts";
import TaskCreateDropdown from "./TaskCreateDropdown";
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
    const [taskowner, setTaskowner] = useState("");
    const [tasktargetdate, setTasktargetdate] = useState(null);
    const [taskcreatedate, setTaskcreatedate] = useState(current);
    const [taskstatus, setTaskstatus] = useState("START");
    const [projecthandle, setProjecthandle] = useState(props.projecthandle);
    const [asms, setAsms] = useState("113092");
    const [tasknextstep, setTasknextstep] = useState("");
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [isExpanded, setExpanded] = useState(false);
    const [company, setCompany] = useState(null);
    const [employerdropdown, setEmployerDropDown] = useState(null);
    const allTasks = useContext(TaskContext);
    const alertCtx = useContext(AlertContext);


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
            try {
                const response = await axios.post(
                    `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/create`, newtask);
                if (response.status === 200) {
                    props.setCheckForRecords(!props.checkForRecords);
                    // alertCtx.success(`Task (${taskname}) has been memorialized`);
                    { toast.success(`${taskname} added.`) }
                }
                else {
                    // alertCtx.error(`oops! Something went wrong#1!`);
                    toast.error('Nee');
                }
            }
            catch (err) {
                alertCtx.error(`oops! Something went wrong!#2`);
                console.log(err);
            }
        } else {
            event.preventDefault();
            alertCtx.warning("Valid due date required");
        }
    };




    return (
        <div>
            <div onClick={toggleAccordion}>
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} />
                &nbsp;<b><a className='Font-Verdana-Small-Postgres'>Add Task to the Task Manager</a></b>
            </div>
            {isExpanded && (
                <div>
                    <div>&nbsp;</div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='Font-Verdana-Small-Postgres'>
                                <div style={{ display: "flex" }}>
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                    <TaskCreateDropdown allTasks={allTasks} setProjecthandle={setProjecthandle} />

                                    <div>
                                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                        <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Task Name" type="text" onChange={(event) => setTaskname(event.target.value)} required />
                                    </div>
                                    <div>
                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '400px' }} placeholder="Requirement" type="text" onChange={(event) => setTaskrequirement(event.target.value)} />
                                    </div>
                                    <div>
                                        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                                        <select style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Web resource" id="dropdown" onChange={(event) => setTaskowner(event.target.value)}>
                                            <option value="Conor Lynch">Conor Lynch</option>
                                            <option value="Dwayne Patel">Dwayne</option>
                                            <option value="Felipe">Felipe</option>
                                            <option value="Keex Nenyiaba">Keex Nenyiaba</option>
                                            <option value="Leo Pinto">Leo Pinto</option>
                                            <option value="Monique Borje">Monique Borje</option>
                                            <option value="Paul Bester">Paul Bester</option>
                                            <option value="Sikha">Sikha</option>
                                            <option value="Simon Dowling">Simon Dowling</option>
                                            <option value="Thiago Cunha">Thiago Cunha</option>
                                        </select>
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
                                        <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }} onClick={() => setTaskstatus("START")}>Commit new Task</button>
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
