import {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import {PeopleScorecardUpdateHelp} from "./PeopleScorecardUpdateHelp";

export default function PeopleScorecardUpdate(props) {
    const [open, setOpen] = useState(false);
    const [taskStatus, setTaskStatus] = useState(props.status);
    const [taskComment, setTaskComment] = useState(props.comment);
    const current = new Date();
    const datum = `${current.getFullYear()}.${current.getMonth()+1}.${current.getDate()}`;
    const [date, setdate] = useState(datum);

    
    const brenUpdate = async (id, comment_bren_keenan, status_bren_keenan, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_bren_keenan': comment_bren_keenan, 'status_bren_keenan': status_bren_keenan,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }
    
    const brianUpdate = async (id, comment_brian_orourke, status_brian_orourke, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_brian_orourke': comment_brian_orourke, 'status_brian_orourke': status_brian_orourke,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const conorUpdate = async (id, comment_conor_lynch, status_conor_lynch, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_conor_lynch': comment_conor_lynch, 'status_conor_lynch': status_conor_lynch,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }
    
    const declanUpdate = async (id, comment_declan_lawless, status_declan_lawless, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_declan_lawless': comment_declan_lawless, 'status_declan_lawless': status_declan_lawless,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const juliaUpdate = async (id, comment_julia_temple, status_julia_temple, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_julia_temple': comment_julia_temple, 'status_julia_temple': status_julia_temple,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const keexUpdate = async (id, comment_keex_nenyiaba, status_keex_nenyiaba, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_keex_nenyiaba': comment_keex_nenyiaba, 'status_keex_nenyiaba': status_keex_nenyiaba,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const kieranUpdate = async (id, comment_kieran_hayter, status_kieran_hayter, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_kieran_hayter': comment_kieran_hayter, 'status_kieran_hayter': status_kieran_hayter,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const liamUpdate = async (id, comment_liam_cearbhaill, status_liam_cearbhaill, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_liam_cearbhaill': comment_liam_cearbhaill, 'status_liam_cearbhaill': status_liam_cearbhaill,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const moniqueUpdate = async (id, comment_monique_borje, status_monique_borje, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_monique_borje': comment_monique_borje, 'status_monique_borje': status_monique_borje,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const patrickUpdate = async (id, comment_patrick_haugh, status_patrick_haugh, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_patrick_haugh': comment_patrick_haugh, 'status_patrick_haugh': status_patrick_haugh,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const rayUpdate = async (id, comment_ray_egan, status_ray_egan, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_ray_egan': comment_ray_egan, 'status_ray_egan': status_ray_egan,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const rosieUpdate = async (id, comment_rosie_curran, status_rosie_curran, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_rosie_curran': comment_rosie_curran, 'status_rosie_curran': status_rosie_curran,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }
    const saoirseUpdate = async (id, comment_saoirse_seeber, status_saoirse_seeber, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_saoirse_seeber': comment_saoirse_seeber, 'status_saoirse_seeber': status_saoirse_seeber,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }
    
    const simonUpdate = async (id, comment_simon_dowling, status_simon_dowling, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_simon_dowling': comment_simon_dowling, 'status_simon_dowling': status_simon_dowling,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const stefanUpdate = async (id, comment_stefan_manole, status_stefan_manole, setCheckForRecords, checkForRecords, alertHandler) => {
        let newValues = {'id': id, 'comment_stefan_manole': comment_stefan_manole, 'status_stefan_manole': status_stefan_manole,}
        await PeopleScorecardUpdateHelp(id, props.person, newValues, setCheckForRecords, checkForRecords, alertHandler);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleStatusChange = (event) => {
        setTaskStatus(event.target.value);
    };
    const handleCommentChange = (event) => {
        setTaskComment(event.target.value);
    };

    const checkComment = () => {
        let datedComment = '';
        if(taskComment !== props.comment) {
            datedComment = date + ': ' + taskComment;
            setTaskComment(date + ': ' + taskComment);
        }
        else datedComment = taskComment;
        handleConfirm(datedComment);
    }

    const handleConfirm = (taskComment) => {
        setOpen(false);
        switch(props.person) {
            case "Bren":
                return brenUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Brian":
                return brianUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);                

            case "Conor":
                return conorUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Declan":
                return declanUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            // case "Eli":
            //     return eliUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Julia":
                return juliaUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            // case "Julio":
            //     return julioUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Keex":
                return keexUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Kieran":
                return kieranUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            // case "Kristina":
            //     return kristinaUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Liam":
                return liamUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            // case "Matthew":
            //     return matthewUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            // case "Mohamed":
            //     return mohamedUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Monique":
                return moniqueUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Patrick":
                return patrickUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Ray":
                return rayUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Rosie":
                return rosieUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Saoirse":
                return saoirseUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);    

            case "Simon":
                return simonUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            case "Stefan":
                return stefanUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);

            // case "Tylor":
            //     return tylorUpdate(props.id, taskComment, taskStatus, props.setCheckforRecords, props.checkForRecords, props.alertHandler);
        }
    };

    return (
        <div>
            <Button style={{fontSize: 'small', fontFamily: 'Verdana', color: "black", height: 25}} onClick={handleClickOpen}>{props.status}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Task's Status/Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>Status</DialogContentText>
                    
                    <Select value={taskStatus} onChange={handleStatusChange}>
                        <MenuItem value={"START"}>START</MenuItem>
                        <MenuItem value={"WIP"}>WIP</MenuItem>
                        <MenuItem value={"DONE"}>DONE</MenuItem>
                        <MenuItem value={"PROBLEM"}>PROBLEM</MenuItem>
                        <MenuItem value={"N/A"}>N/A</MenuItem>
                    </Select>
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={taskComment}
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleCommentChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={checkComment}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}