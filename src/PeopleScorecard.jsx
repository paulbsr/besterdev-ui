import { useContext, useEffect, useState } from "react";
import axios from "axios";
import './Fonts.css'
import * as React from "react";
// import ImageAvatar_Declan from "../../graphix/Avatars/ImageAvatar_Declan";
// import ImageAvatar_Julia from "../../graphix/Avatars/ImageAvatar_Julia";
// import ImageAvatar_Kieran from "../../graphix/Avatars/ImageAvatar_Kieran";
// import ImageAvatar_Liam from "../../graphix/Avatars/ImageAvatar_Liam";
// import ImageAvatar_Patrick from "../../graphix/Avatars/ImageAvatar_Patrick";
// import ImageAvatar_Ray from "../../graphix/Avatars/ImageAvatar_Ray";
// import ImageAvatar_Rosie from "../../graphix/Avatars/ImageAvatar_Rosie";
import ImageAvatar_Simon from "./graphix/Avatars/ImageAvatar_Simon";
// import ImageAvatar_Stefan from "../../graphix/Avatars/ImageAvatar_Stefan";
import ImageAvatar_Conor from "./graphix/Avatars/ImageAvatar_Conor";
import ImageAvatar_Brian from "./graphix/Avatars/ImageAvatar_Brian";
// import ImageAvatar_Julio from "../../graphix/Avatars/ImageAvatar_Julio";
import ImageAvatar_Bren from "./graphix/Avatars/ImageAvatar_Bren";
import ImageAvatar_Keex from "./graphix/Avatars/ImageAvatar_Keex";
// import ImageAvatar_Mohamed from "../../graphix/Avatars/ImageAvatar_Mohamed";
import ImageAvatar_Monique from "./graphix/Avatars/ImageAvatar_Monique";
// import ImageAvatar_Nabeeha from "../../graphix/Avatars/ImageAvatar_Nabeeha";
import ImageAvatar_Saoirse from "./graphix/Avatars/ImageAvatar_Saoirse";
import MouseoverPopover from "./MouseoverPopover";
import { getStatusColor } from "./getStatusColor";
import AlertContext from "./Generic/Alerts/AlertContext";
import PeopleScorecardUpdate from "./PeopleScorecardUpdate";
import PeopleScorecardCreate from "./PeopleScorecardCreate";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { FaCheck, FaPen, FaUndo, FaArrowAltCircleDown } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { BsPeopleFill } from "react-icons/bs";
import GradientLineRusty from "./GradientLineRusty";
import { Tooltip } from '@mui/material';

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


    const HandleDelete = (taskName, id) => 
        {
        axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people/delete/${id}`)
        .then(() => { alertCtx.success(`Task: ${taskName} successfully deleted `); setCheckForRecords(!checkForRecords) })
        .catch(() => alertCtx.error(`Task: ${taskName} not found`))
        }



    const handleEdit = (row) => 
    {
    setEditing(row.id)
    setTaskName(row.taskName)
    };



    const onEditCancel = () => 
    {
        setEditing("");
        setTaskName(null);
    };



    const onEditSave = (taskName, id) => 
    {
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
            <div onClick={toggleAccordion}>
                &nbsp; &nbsp;<BsPeopleFill style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} />
                &nbsp;<b><a className='Font-Verdana-Medium-Postgres'>&nbsp; People Scorecard</a></b>
            </div>


            {isExpanded && (
                <div>
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
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Bren Keenan</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Brian O'Rourke</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Conor Lynch</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Declan Lawless</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Julia Temple</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Keex Nenyiaba</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Kieran Hayter</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Liam Cearbhaill</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Monique Borje</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Patrick Haugh</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Ray Egan</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Rosie Curran</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Saoirse Seeber</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Simon Dowling</th>
                                            <th style={{ width: '10px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Stefan Manole</th>
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
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Brian /></td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Keex /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Monique /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Bren /></td>
                                            <td><ImageAvatar_Saoirse /></td>
                                            <td><ImageAvatar_Simon /></td>
                                            <td><ImageAvatar_Bren /></td>
                                        </tr>

                                        {tasks.filter(row => row.year === year).map((row) => (

                                            <tr style={{ textAlign: "center" }} key={row.id}>

                                                <td>

                                                    {row.id === editing ?

                                                        (

                                                            <>
                                                                <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none' }} type='button' onClick={() => onEditSave(taskName, row.id)}><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button></Tooltip>&nbsp;
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
                                                <td style={{ backgroundColor: getStatusColor(row.status_bren_keenan) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Bren"} comment={row.comment_bren_keenan} status={row.status_bren_keenan} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_bren_keenan} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_brian_orourke) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Brian"} comment={row.comment_brian_orourke} status={row.status_brian_orourke} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_brian_orourke} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_conor_lynch) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Conor"} comment={row.comment_conor_lynch} status={row.status_conor_lynch} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_conor_lynch} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_declan_lawless) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Declan"} comment={row.comment_declan_lawless} status={row.status_declan_lawless} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_declan_lawless} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_julia_temple) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Julia"} comment={row.comment_julia_temple} status={row.status_julia_temple} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_julia_temple} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_keex_nenyiaba) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Keex"} comment={row.comment_keex_nenyiaba} status={row.status_keex_nenyiaba} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_keex_nenyiaba} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_kieran_hayter) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Kieran"} comment={row.comment_kieran_hayter} status={row.status_kieran_hayter} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_kieran_hayter} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_liam_cearbhaill) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Liam"} comment={row.comment_liam_cearbhaill} status={row.status_liam_cearbhaill} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_liam_cearbhaill} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_monique_borje) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Monique"} comment={row.comment_monique_borje} status={row.status_monique_borje} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_monique_borje} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_patrick_haugh) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Patrick"} comment={row.comment_patrick_haugh} status={row.status_patrick_haugh} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_patrick_haugh} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_ray_egan) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Ray"} comment={row.comment_ray_egan} status={row.status_ray_egan} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_ray_egan} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_rosie_curran) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Rosie"} comment={row.comment_rosie_curran} status={row.status_rosie_curran} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_rosie_curran} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_saoirse_seeber) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Saoirse"} comment={row.comment_saoirse_seeber} status={row.status_saoirse_seeber} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_saoirse_seeber} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_simon_dowling) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Simon"} comment={row.comment_simon_dowling} status={row.status_simon_dowling} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_simon_dowling} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_stefan_manole) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Stefan"} comment={row.comment_stefan_manole} status={row.status_stefan_manole} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_stefan_manole} /></td>
                                            </tr>

                                        ))}

                                    </tbody>
                                </table>
                            </div> : ""}
                        {team === 'QA' ?
                            <div style={{ overflow: "auto" }}>
                                <table className="Table8 Table8hover">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20px' }}></th>
                                            <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Task Name</th>
                                            <th style={{ width: 100 }}>Conor Lynch</th>
                                            <th style={{ width: 100 }}>Eli Atkins</th>
                                            <th style={{ width: 100 }}>Julio Hernandez</th>
                                            <th style={{ width: 100 }}>Kristina Stevoff</th>
                                            <th style={{ width: 100 }}>Keex Nenyiaba</th>
                                            <th style={{ width: 100 }}>Mohamed Sheikhbashir</th>
                                            <th style={{ width: 100 }}>Monique Borje</th>
                                            <th style={{ width: 100 }}>Nabeeha Ashfaq</th>
                                            <th style={{ width: 100 }}>Tylor Murphy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div>
                                                    <table className="Table8" style={{ padding: 10, width: 400 }}>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Select
                                                                        style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }}
                                                                        value={team}
                                                                        onChange={handleTeamChange}
                                                                        fullWidth>
                                                                        <MenuItem style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }} value={"Dev"}>DEVs</MenuItem>
                                                                        <MenuItem style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }} value={"QA"}>QAs</MenuItem>
                                                                    </Select>
                                                                </td>
                                                                <td>
                                                                    <Select
                                                                        style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }}
                                                                        value={year}
                                                                        onChange={handleYearChange}
                                                                        fullWidth>
                                                                        <MenuItem style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }} value={"2023"}>2023</MenuItem>
                                                                        <MenuItem style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }} value={"2024"}>2024</MenuItem>
                                                                        <MenuItem style={{ color: '#336791', fontFamily: 'Verdana', fontSize: 'small' }} value={"2025"}>2025</MenuItem>
                                                                    </Select>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Keex /></td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Monique /></td>
                                            <td><ImageAvatar_Conor /></td>
                                            <td><ImageAvatar_Conor /></td>
                                        </tr>
                                        {tasks.filter(row => row.year === year).map((row) => (
                                            <tr style={{ textAlign: "center" }} key={row.id}>
                                                <td>{row.id === editing ?
                                                    (
                                                        <>
                                                            <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none' }} type='button' onClick={() => onEditSave(taskName, row.id)}><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button></Tooltip>&nbsp;
                                                            <Tooltip title='Revert' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><FaUndo style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button></Tooltip>&nbsp;
                                                            <Tooltip title='Delete Task' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => { setDeleting(row.id); setTaskName(row.taskName); }}><MdDeleteForever style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '18px', cursor: 'pointer' }} /></button></Tooltip>
                                                        </>
                                                    )
                                                   :
                                                    (
                                                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791' }} type='button' onClick={() => handleEdit(row)}><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></button>)}
                                                </td>
                                                <td className="pprecord Table3 td">{row.id === editing ? (
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
                                                <td style={{ backgroundColor: getStatusColor(row.status_conor_lynch) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Conor"} comment={row.comment_conor_lynch} status={row.status_conor_lynch} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_conor_lynch} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_eli_atkins) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Eli"} comment={row.comment_eli_atkins} status={row.status_eli_atkins} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_eli_atkins} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_julio_hernandez) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Julio"} comment={row.comment_julio_hernandez} status={row.status_julio_hernandez} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_julio_hernandez} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_keex_nenyiaba) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Keex"} comment={row.comment_keex_nenyiaba} status={row.status_keex_nenyiaba} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_keex_nenyiaba} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_kritina_stevoff) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Kristina"} comment={row.comment_kritina_stevoff} status={row.status_kritina_stevoff} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_kritina_stevoff} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_mohamed_sheikhbashir) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Mohamed"} comment={row.comment_mohamed_sheikhbashir} status={row.status_mohamed_sheikhbashir} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_mohamed_sheikhbashir} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_monique_borje) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Monique"} comment={row.comment_monique_borje} status={row.status_monique_borje} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_monique_borje} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_nabeeha_ashfaq) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Nabeeha"} comment={row.comment_nabeeha_ashfaq} status={row.status_nabeeha_ashfaq} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_nabeeha_ashfaq} /></td>
                                                <td style={{ backgroundColor: getStatusColor(row.status_tylor_murphy) }}><MouseoverPopover see={<PeopleScorecardUpdate id={row.id} person={"Tylor"} comment={row.comment_tylor_murphy} status={row.status_tylor_murphy} setCheckforRecords={setCheckForRecords} checkForRecords={checkForRecords} alertHandler={alertCtx} />} read={row.comment_tylor_murphy} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> : ""
                        }
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
        </div>

    )

}