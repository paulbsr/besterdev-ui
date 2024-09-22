import React, { useContext, useState } from "react";
import AlertContext from "../Generic/Alerts/AlertContext";
import axios from "axios";
import { GiHummingbird } from "react-icons/gi";
import { Tooltip } from '@mui/material';


export default function PeopleScorecardCreate(props) {
    const current = new Date();
    const datum = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
    const [date, setdate] = useState(datum);
    const [year, setYear] = useState(`${current.getFullYear()}`);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const alertCtx = useContext(AlertContext);
    const toggleAccordion = () => { setExpanded(!isExpanded); };
    const [isExpanded, setExpanded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        var newtask = {
            'taskName': taskName,
            'taskDescription': taskDescription,
            'effort': null,
            'status_bren_keenan': "START",
            'comment_bren_keenan': "Nothing from Bren since " + date,

            'status_brian_orourke': "START",
            'comment_brian_orourke': "Nothing from Brian since " + date,

            'status_conor_lynch': "START",
            'comment_conor_lynch': "Nothing from Conor since " + date,

            'status_dwayne_patel': "START",
            'comment_dwayne_patel': "Nothing from Dwayne since " + date,

            'status_felipe_mantov': "START",
            'comment_felipe_mantov': "Nothing from Felipe since " + date,

            'status_keex_nenyiaba': "START",
            'comment_keex_nenyiaba': "Nothing from Keex since " + date,

            'status_leo_pinto': "START",
            'comment_leo_pinto': "Nothing from Leo since " + date,

            'status_monique_borje': "START",
            'comment_monique_borje': "Nothing from Monique since " + date,

            'status_saoirse_seeber': "START",
            'comment_saoirse_seeber': "Nothing from Saoirse since " + date,

            'status_shikha_seth': "START",
            'comment_shikha_seth': "Nothing from Shikha since " + date,

            'status_simon_dowling': "START",
            'comment_simon_dowling': "Nothing from Simon since " + date,
            
            'status_thiago_cunha': "START",
            'comment_thiago_cunha': "Nothing from Thiago since " + date,

            'year': year,
        }

        try {

            const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people/create`, newtask);
            // const response = await axios.post(`http://localhost:8000/api/v1/scorecard_people/create`, newtask);
            if (response.status === 200) {
                props.setCheckForRecords(!props.checkForRecords); alertCtx.success("Task (" + (taskName) + ") has been added to the People Management Scorecard");
            }

            else { alertCtx.error(`Error in PeopleScorecardCreate`); 
                // console.log(err); 
            }
        }

        catch (err) { alertCtx.error(`Error in PeopleScorecardCreate #2`); console.log(err); }
    }

    return (
        <div>
            <div onClick={toggleAccordion}>
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Tooltip title='Insert Record' placement="top-end"><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></Tooltip>
                &nbsp;<b><a className='Font-Verdana-Small-Postgres'>Add Task to People Scorecard</a></b>
            </div>

            {isExpanded && (
                <div>
                    <form onSubmit={handleSubmit}>
                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <div className='Font-Verdana-Small-Postgres'>
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            
                            Task Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Required" type="text" value={taskName} onChange={(event) => setTaskName(event.target.value)} required />
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
                            
                            Task Description:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '600px' }} type="text" value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} />
                            
                            <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add Task to People Scorecard</button>
                        </div>
                    </form>
                    <div>&nbsp;</div>
                </div>
            )
            }
        </div>
    )
}