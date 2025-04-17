import { useContext, useEffect, useState } from "react";
import axios from "axios";
import '../Fonts.css'
import * as React from "react";
import ImageAvatar_Simon from "../graphix/Avatars/ImageAvatar_Simon";
import ImageAvatar_Conor from "../graphix/Avatars/ImageAvatar_Conor";
import ImageAvatar_Brian from "../graphix/Avatars/ImageAvatar_Brian";
import ImageAvatar_Bren from "../graphix/Avatars/ImageAvatar_Bren";
import ImageAvatar_Keex from "../graphix/Avatars/ImageAvatar_Keex";
import ImageAvatar_Monique from "../graphix/Avatars/ImageAvatar_Monique";
import ImageAvatar_Leo from "../graphix/Avatars/ImageAvatar_Leo";
import ImageAvatar_Saoirse from "../graphix/Avatars/ImageAvatar_Saoirse";
import ImageAvatar_Dwayne from "../graphix/Avatars/ImageAvatar_Dwayne";
import ImageAvatar_Shikha from "../graphix/Avatars/ImageAvatar_Shikha";
import ImageAvatar_Felipe from "../graphix/Avatars/ImageAvatar_Felipe";
import ImageAvatar_Thiago from "../graphix/Avatars/ImageAvatar_Thiago";
import MouseoverPopover from "../MouseoverPopover";
import { getStatusColor } from "../getStatusColor";
import AlertContext from "../Generic/Alerts/AlertContext";
import PeopleScorecardUpdate from "./PeopleScorecardUpdate";
import PeopleScorecardCreate from "./PeopleScorecardCreate";
import { FaCheck, FaPen, FaUndo, FaArrowAltCircleDown } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { BsPeopleFill } from "react-icons/bs";
import GradientLineRusty from "../gradientlines/GradientLineRusty";
// import { Tooltip } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


export default function PeopleScorecard() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [checkForRecords, setCheckForRecords] = useState(true);
    const [team, setTeam] = useState('Dev');
    const current = new Date();
    const datum = `${current.getFullYear()}`;
    const [year, setYear] = useState(datum);
    const [editing, setEditing] = useState("");
    const [taskName, setTaskName] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const alertCtx = useContext(AlertContext)
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };


    useEffect(() => {
        axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people`)
            // axios(`http://localhost:8000/api/v1/scorecard_people`)
            .then((response) => { setTasks(response.data.sort((a, b) => a.taskName.localeCompare(b.taskName))); setError(null); })
            .catch(setError);
    }, [checkForRecords]);
    if (error) return <p>A PeopleScorecard GET error occurred</p>


    const HandleDelete = (taskName, id) => {
        axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people/delete/${id}`)
            .then(() => { alertCtx.success(`Task: ${taskName} successfully deleted `); setCheckForRecords(!checkForRecords) })
            .catch(() => alertCtx.error(`Task: ${taskName} not found`))
    }


    const handleEdit = (row) => {
        setEditing(row.id)
        setTaskName(row.taskName)
    };


    const onEditCancel = () => {
        setEditing("");
        setTaskName(null);
    };



    const onEditSave = (taskName, id) => {
        if (!taskName?.trim()) {
            alertCtx.error(`Please enter a TaskName`)
            return
        }

        axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people/update/taskname/${id}`, taskName)
            .then(() => { alertCtx.success(`Task: ${taskName} successfully updated`); setCheckForRecords(!checkForRecords) })
            .catch(() => alertCtx.error(`Task: ${taskName} not found`))
        onEditCancel()
    }


    const handleTeamChange = (e, newVal) => setTeam(newVal.props.value);
    const handleYearChange = (e, newVal) => setYear(newVal.props.value);



    return (
        <div>
            <div>&nbsp;</div>

            <Tooltip id="insert" />
            <div className='Font-Verdana-Medium-Postgres' onClick={toggleAccordion}>
                &nbsp; &nbsp; <BsPeopleFill style={{ color: '#336791', fontSize: '38px', cursor: 'pointer' }} />
                &nbsp;<b>The People Scorecard</b>
            </div>
            <div>&nbsp;</div>

            <div>
                <div>
                    <div><PeopleScorecardCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /></div>
                </div>
                
                <div>&nbsp;</div>
                {team === 'Dev' ?
                    <div style={{ overflow: "auto" }}>
                        <table className="Table8 Table8hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '1px' }}></th>
                                    <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Tasks</th>
                                    {/* <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Bren Keenan</th> */}
                                    {/* <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Brian O'Rourke</th> */}
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Conor Lynch</th>
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Claire Farrell</th>
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Felipe Mantov</th>
                                    {/* <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Keex Nenyiaba</th> */}
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Leo Pinto</th>
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Monique Borje</th>
                                    {/* <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Saoirse Seeber</th> */}
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Shikha Seth</th>
                                    {/* <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Simon Dowling</th> */}
                                    <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Thiago Cunha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div>
                                            <table>
                                                <thead>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    {/* <td><ImageAvatar_Bren /></td> */}
                                    {/* <td><ImageAvatar_Brian /></td> */}
                                    <td><ImageAvatar_Conor /></td>
                                    <td><ImageAvatar_Dwayne /></td>
                                    <td><ImageAvatar_Felipe /></td>
                                    {/* <td><ImageAvatar_Keex /></td> */}
                                    <td><ImageAvatar_Leo /></td>
                                    <td><ImageAvatar_Monique /></td>
                                    {/* <td><ImageAvatar_Saoirse /></td> */}
                                    <td><ImageAvatar_Shikha /></td>
                                    {/* <td><ImageAvatar_Simon /></td> */}
                                    <td><ImageAvatar_Thiago /></td>
                                </tr>

                                {tasks.filter(row => row.year === year).map((row) => (
                                    <tr style={{ textAlign: "center" }} key={row.id}>
                                        <td>
                                            {row.id === editing ?
                                                (
                                                    <>
                                                        <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => onEditSave(taskName, row.id)}><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button></Tooltip>&nbsp;
                                                        <Tooltip title='Revert' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><FaUndo style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button></Tooltip>&nbsp;
                                                        <Tooltip title='Delete Task' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => { setDeleting(row.id); setTaskName(row.taskName); }}><MdDeleteForever style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '18px', cursor: 'pointer' }} /></button></Tooltip>
                                                    </>
                                                )
                                                :
                                                (<Tooltip title='Edit Task Name' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791' }} type='button' onClick={() => handleEdit(row)}><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button></Tooltip>)}
                                        </td>

                                        <td className="pprecord Table3 td">{row.id === editing ?
                                            (
                                                <textarea
                                                    cols="50"
                                                    variant="outlined"
                                                    defaultValue={taskName}
                                                    rows={1}
                                                    onChange={(e) => setTaskName(e.target.value)}>
                                                </textarea>
                                            )
                                            :
                                            (
                                                <MouseoverPopover see={row.taskName} read={row.taskDescription}></MouseoverPopover>)}
                                        </td>
                                        {/* <td style={{ backgroundColor: getStatusColor(row.status_bren_keenan) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Bren"} comment={row.comment_bren_keenan} status={row.status_bren_keenan} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_bren_keenan} /></td> */}
                                        {/* <td style={{ backgroundColor: getStatusColor(row.status_brian_orourke) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Brian"} comment={row.comment_brian_orourke} status={row.status_brian_orourke} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_brian_orourke} /></td> */}
                                        <td style={{ backgroundColor: getStatusColor(row.status_conor_lynch) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Conor"} comment={row.comment_conor_lynch} status={row.status_conor_lynch} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_conor_lynch} /></td>
                                        <td style={{ backgroundColor: getStatusColor(row.status_dwayne_patel) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Dwayne"} comment={row.comment_dwayne_patel} status={row.status_dwayne_patel} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_dwayne_patel} /></td>
                                        <td style={{ backgroundColor: getStatusColor(row.status_felipe_mantov) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Felipe"} comment={row.comment_felipe_mantov} status={row.status_felipe_mantov} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_felipe_mantov} /></td>
                                        {/* <td style={{ backgroundColor: getStatusColor(row.status_keex_nenyiaba) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Keex"} comment={row.comment_keex_nenyiaba} status={row.status_keex_nenyiaba} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_keex_nenyiaba} /></td> */}
                                        <td style={{ backgroundColor: getStatusColor(row.status_leo_pinto) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Leo"} comment={row.comment_leo_pinto} status={row.status_leo_pinto} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_leo_pinto} /></td>
                                        <td style={{ backgroundColor: getStatusColor(row.status_monique_borje) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Monique"} comment={row.comment_monique_borje} status={row.status_monique_borje} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_monique_borje} /></td>
                                        {/* <td style={{ backgroundColor: getStatusColor(row.status_saoirse_seeber) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Saoirse"} comment={row.comment_saoirse_seeber} status={row.status_saoirse_seeber} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_saoirse_seeber} /></td> */}
                                        <td style={{ backgroundColor: getStatusColor(row.status_shikha_seth) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Shikha"} comment={row.comment_shikha_seth} status={row.status_shikha_seth} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_shikha_seth} /></td>
                                        {/* <td style={{ backgroundColor: getStatusColor(row.status_simon_dowling) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Simon"} comment={row.comment_simon_dowling} status={row.status_simon_dowling} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_simon_dowling} /></td> */}
                                        <td style={{ backgroundColor: getStatusColor(row.status_thiago_cunha) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Thiago"} comment={row.comment_thiago_cunha} status={row.status_thiago_cunha} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_thiago_cunha} /></td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div> : ""}


                <div>
                    <Dialog style={{ textAlign: 'center' }} open={deleting !== null} onClose={() => setDeleting(null)}>
                        <DialogTitle>Delete <b>'{taskName}'</b>?</DialogTitle>
                        <DialogContent dividers>
                            <DialogActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '3px' }}>
                                <Button onClick={() => { HandleDelete(taskName, deleting); setDeleting(null) }}>Delete</Button>
                                <Button onClick={() => setDeleting(null)}>Cancel</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>&nbsp;</div>
            <GradientLineRusty />
            <div>&nbsp;</div>
        </div>
    )
}
