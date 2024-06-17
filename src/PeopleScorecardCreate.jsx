import React, { useContext, useState } from "react";
import AlertContext from "./Generic/Alerts/AlertContext";
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
            'comment_bren_keenan': "Nothing since " + date,

            'status_brian_orourke': "START",
            'comment_brian_orourke': "Nothing since " + date,

            'status_conor_lynch': "START",
            'comment_conor_lynch': "Nothing since " + date,

            'status_declan_lawless': "START",
            'comment_declan_lawless': "Nothing since " + date,


            'status_julia_temple': "START",
            'comment_julia_temple': "Nothing since " + date,

            // 'status_julio_hernandez': "START",
            // 'comment_julio_hernandez': "Nothing since " + date,

            'status_keex_nenyiaba': "START",
            'comment_keex_nenyiaba': "Nothing since " + date,

            'status_kieran_hayter': "START",
            'comment_kieran_hayter': "Nothing since " + date,

            // 'status_kritina_stevoff': "START",
            // 'comment_kritina_stevoff': "Nothing since " + date,

            'status_liam_cearbhaill': "START",
            'comment_liam_cearbhaill': "Nothing since " + date,

            // 'status_matthew_mahon': "START",
            // 'comment_matthew_mahon': "Nothing since " + date,

            // 'status_mohamed_sheikhbashir': "START",
            // 'comment_mohamed_sheikhbashir': "Nothing since " + date,

            'status_monique_borje': "START",
            'comment_monique_borje': "Nothing since " + date,

            // 'status_nabeeha_ashfaq': "START",
            // 'comment_nabeeha_ashfaq': "Nothing since " + date,

            'status_patrick_haugh': "START",
            'comment_patrick_haugh': "Nothing since " + date,

            'status_ray_egan': "START",
            'comment_ray_egan': "Nothing since " + date,

            'status_rosie_curran': "START",
            'comment_rosie_curran': "Nothing since " + date,

            'status_saoirse_seeber': "START",
            'comment_saoirse_seeber': "Nothing since " + date,

            'status_simon_dowling': "START",
            'comment_simon_dowling': "Nothing since " + date,
            
            'status_stefan_manole': "START",
            'comment_stefan_manole': "Nothing since " + date,

            'year': year,
        }

        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/scorecard_people/create`, newtask);
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
                &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<Tooltip title='Insert Record' placement="top-end"><GiHummingbird style={{ color: '#D5441C', fontSize: '25px', cursor: 'pointer' }} /></Tooltip>
                &nbsp;<b><a className='Font-Verdana-Small-Rusty-Normal'>Add Task to People Scorecard</a></b>
            </div>

            {isExpanded && (
                <div>
                    <form onSubmit={handleSubmit}>
                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <div className='Font-Verdana-Small-Postgres'>
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;Task Name:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }} placeholder="Required" type="text" value={taskName} onChange={(event) => setTaskName(event.target.value)} required />
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; Task Description:&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '600px' }} type="text" value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} />
                            <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#D5441C', cursor: 'pointer' }}>Add Task to People Scorecard</button>
                        </div>
                    </form>
                    <div>&nbsp;</div>
                </div>
            )
            }
        </div>
    )
}