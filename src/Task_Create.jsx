import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./Generic/Alerts/AlertContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiHummingbird } from "react-icons/gi";
import { TaskContext } from "./Contexts";


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


export default function Task_Create(props) {
    const current = new Date();
    const [taskname, setTaskname] = useState("");
    const [taskrequirement, setTaskrequirement] = useState("");
    const [taskowner, setTaskowner] = useState("");
    const [tasktargetdate, setTasktargetdate] = useState(null);
    const [taskcreatedate, setTaskcreatedate] = useState(current);
    const [taskstatus, setTaskstatus] = useState("START");
    const [projecthandle, setProjecthandle] = useState(props.project_handle);
    const [asms, setAsms] = useState(props.asms_number);
    const [tasknextstep, setTasknextstep] = useState("");
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [isExpanded, setExpanded] = useState(false);
    const [company, setCompany] = useState(null);
    const [employerdropdown, setEmployerDropDown] = useState(null);
    // const [allTasks, setAlltasks] = useState(props.allTasks)
    const allTasks = useContext(TaskContext);
    const alertCtx = useContext(AlertContext);
    const classes = useStyles();
    console.log('AllTasks via TaskContext:', allTasks)
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
                    `${process.env.REACT_APP_API_URL}/api/v1/tasks/create`,
                    newtask
                );
                if (response.status === 200) {
                    props.setCheckForRecords(!props.checkForRecords);
                    alertCtx.success(`Task (${taskname}) has been memorialized`);
                } else {
                    alertCtx.error(`oops! Something went wrong#1!`);
                }
            } catch (err) {
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

                                <div>
                                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                <select className='Font-Verdana-Small-Postgres'
                                        onChange={(event) => {
                                            const selectedIndex = event.target.selectedIndex;
                                            const selectedOption = event.target.options[selectedIndex];
                                            const company = selectedOption.getAttribute("data-company");

                                            setCompany(company);

                                        }}
                                        id="dropdown"
                                        style={{
                                            height: '27.5px',
                                            border: '1.25px solid #c4c4c4',
                                            borderRadius: '4px',
                                            padding: 0,
                                            paddingLeft: '10px',
                                            width: '150px'
                                        }}
                                    >
                                        <option disabled selected value="">Domain</option>
                                        {allTasks && allTasks.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.projecthandle}
                                                data-company={option.projecthandle} // Store company data as an attribute

                                            >
                                                {option.projecthandle}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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
                                            <option disabled selected value="">Responsible</option>
                                            <option value="Bren Keenan">Bren Keenan</option>
                                            <option value="Brian o'Rourke">Brian o'Rourke</option>
                                            <option value="Conor Lynch">Conor Lynch</option>
                                            <option value="Declan Lawless">Declan Lawless</option>
                                            <option value="Julia Temple">Julia Temple</option>
                                            <option value="Keex Nenyiaba">Keex Nenyiaba</option>
                                            <option value="Kieran Hayter">Kieran Hayter</option>
                                            <option value="Liam Cearbhaill">Liam Cearbhaill</option>
                                            <option value="Monique Borje">Monique Borje</option>
                                            <option value="Patrick Haugh">Patrick Haugh</option>
                                            <option value="Paul Bester">Paul Bester</option>
                                            <option value="Ray Egan">Ray Egan</option>
                                            <option value="Rosie Curran">Rosie Curran</option>
                                            <option value="Saoirse Seeber">Saoirse Seeber</option>
                                            <option value="Simon Dowling">Simon Dowling</option>
                                            <option value="Stefan Manole">Stefan Manole</option>
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
