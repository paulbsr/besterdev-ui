import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import Task_Create from './Task_Create';
// import Task from './Task';
// import TFSTask from "./TFSTasks";
import './Fonts.css'
// import MouseoverPopover from "../MouseoverPopover";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaTasks } from "react-icons/fa";
import GradientLineRusty from "./GradientLineRusty";
import HowtoSteps from './HowtoSteps';
// import MouseoverPopover from "./MouseoverPopover";


function Task_Accordion({ props }) {

    const [checkForRecords, setCheckForRecords] = useState(true);   // update this value to be the opposite of its current value, every time a new CR is added
    const [isExpanded, setExpanded] = useState(false);
    const [howtosteps, setHowtosteps] = useState([]);
    const [error, setError] = useState(null);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [open, setOpen] = useState(false)
    // const doneList = parenttask.filter(status => status.taskstatus === 'DONE').sort((a, b) => (a.tasks[0].date.join(":") > b.tasks[0].date.join(":")) ? -1 : 1)
    const [isExpanded_1, setExpanded_1] = useState(false);
    const toggleAccordion_1 = () => { setExpanded_1(!isExpanded_1); };
    const [step_id, setStep_id] = useState('');
    const [step_name, setStep_name] = useState('');
    const [howto_id, setHowto_id] = useState('');
    const [howto_name, setHowto_name] = useState('');
    const [step_url, setSep_url] = useState('');
    const [step_obj, setSep_obj] = useState('');


    // useEffect(() => {
    //     axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteps`)
    //     .then((response) => {setHowtosteps(response.data.sort((a, b) => b.id - a.id)); setError(null);
    //     }).catch(setError);
    // }, [checkForRecords]);

    // useEffect(() => {
    //     axios(`${process.env.REACT_APP_API_URL}/api/v1/tfs/${project_handle.toLowerCase()}`).then((response) => {
    //         setTfstask(response.data); setError(null);
    //     }).catch(setError);
    // }, [checkForRecords]);
    
    useEffect(() => {
        axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtosteps')
          .then((response) => {const howtosteps = response.data.sort((b, a) => b.step_name.localeCompare(a.step_name)); 
            setHowtosteps(howtosteps);
            console.log(howtosteps);})
          .catch((e)=> console.error(e));}, 
          [checkForRecords]);


    if (error) return <p>An error in Task_Accordion occurred</p>

    return (

        <>
            <div>

                <div onClick={toggleAccordion_1}>
                    &nbsp; &nbsp;<FaTasks style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} />
                    &nbsp;<b><a className='Font-Verdana-Medium-Postgres'>&nbsp; HowtoSteps </a></b>
                    {/* <a className='Font-Verdana-Medium-Rusty'> PPMID#{ppm_id}: {project_handle}/{asms_number}</a> */}
                </div>

                {isExpanded_1 && (

                    <div>
                        <div>&nbsp;</div>
                        <div>

                            {/* {activeAccount.idTokenClaims.roles.includes('user.Read') || activeAccount.idTokenClaims.roles.includes('user.Manager') || activeAccount.idTokenClaims.roles.includes('user.Admin') ?
                                <div></div>
                                : ""} */}

                            {/* <Task_Create asms_number={asms_number} project_handle={project_handle} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}

                            {howtosteps.map(({ step_id, step_number, step_name, step_url, step_obj, howto_id, howto_name }) => (
                                <div style={{ marginTop: 10 }}>
                                    {
                                        // <MouseoverPopover see={
                                        //     <Task project_handle={project_handle} activeAccount={activeAccount} id={id} taskname={taskname} taskrequirement={taskrequirement} taskowner={taskowner} asms={asms} tasktargetdate={tasktargetdate} taskstatus={taskstatus} parenttask={parenttask} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />}
                                        //     read={tasks.length > 0 ? 'Last updated: ' + tasks[0].date[0] + '.' + tasks[0].date[1] + '.' + tasks[0].date[2] : 'Created: ' + taskcreatedate[0] + '.' + taskcreatedate[1] + '.' + taskcreatedate[2]}>
                                        // </MouseoverPopover>
                                    }
                                </div>))
                            }

                            <div className="flex-container">
                                <div className="flex-box-bester">
                                    <table className="Table8 fill">
                                        <thead>
                                            <tr>
                                                <th>Hierdie moet die Howto Name word - Task_Accordion.jsx</th>
                                            </tr>
                                        </thead>
                                        {howtosteps.map(({ step_number, step_name }) => (
                                            <tbody>{<tr><td>
                                                
                                                <HowtoSteps step_id={step_id} howto_id={howto_id} step_number={step_number} step_name={step_name} step_url={step_url} step_obj={step_obj} howto_name={howto_name} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                                                {/* {tasks.length > 0 ? 'Last updated: ' + tasks[0].date[0] + '.' + tasks[0].date[1] + '.' + tasks[0].date[2] : 'Created: ' + taskcreatedate[0] + '.' + taskcreatedate[1] + '.' + taskcreatedate[2]} */}

                                                
                                            </td>
                                            </tr>}
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                            <div>&nbsp;</div>
                            <GradientLineRusty />
                            <div>&nbsp;</div>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    );
}
export default Task_Accordion;