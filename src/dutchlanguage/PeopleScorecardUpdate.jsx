import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  TextField,
  DialogActions,
} from "@mui/material";
import { PeopleScorecardUpdateHelp } from "./PeopleScorecardUpdateHelp";

export default function PeopleScorecardUpdate({
  id,
  person,
  status,
  comment,
  setCheckforRecords,
  checkForRecords,
  alertHandler,
}) {
  const [open, setOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState(status);
  const [taskComment, setTaskComment] = useState(comment);

  const current = new Date();
  const date = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;

  /** Unified update handler (replaces 14 duplicated functions) */
  const handleUpdate = async (fieldBase, commentValue, statusValue) => {
    const newValues = {
      id,
      [`comment_${fieldBase}`]: commentValue,
      [`status_${fieldBase}`]: statusValue,
    };
    await PeopleScorecardUpdateHelp(
      id,
      person,
      newValues,
      setCheckforRecords,
      checkForRecords,
      alertHandler
    );
  };

  /** Open/Close dialog handlers */
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Controlled inputs */
  const handleStatusChange = (e) => setTaskStatus(e.target.value);
  const handleCommentChange = (e) => setTaskComment(e.target.value);

  /** Check for comment update and prepend date if modified */
  const checkComment = () => {
    const updatedComment =
      taskComment !== comment ? `${date}: ${taskComment}` : taskComment;
    handleConfirm(updatedComment);
  };

  /** Confirm handler – resolves which person to update */
  const handleConfirm = (updatedComment) => {
    setOpen(false);

    const personMap = {
      Bren: "bren_keenan",
      Brian: "brian_orourke",
      Conor: "conor_lynch",
      Dwayne: "dwayne_patel",
      Felipe: "felipe_mantov",
      Keex: "keex_nenyiaba",
      Leo: "leo_pinto",
      Shikha: "shikha_seth",
      Monique: "monique_borje",
      Thiago: "thiago_cunha",
      Ray: "ray_egan",
      Rosie: "rosie_curran",
      Saoirse: "saoirse_seeber",
      Simon: "simon_dowling",
      Stefan: "stefan_manole",
    };

    const fieldBase = personMap[person];
    if (!fieldBase) {
      alertHandler.error(`Unknown person: ${person}`);
      return;
    }

    handleUpdate(fieldBase, updatedComment, taskStatus);
  };

  return (
    <div>
      <Button
        style={{
          fontSize: "small",
          fontFamily: "Verdana",
          color: "black",
          height: 25,
        }}
        onClick={handleClickOpen}
      >
        {status}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task Status / Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Status</DialogContentText>

          <Select
            value={taskStatus}
            onChange={handleStatusChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          >
            {["START", "WIP", "DONE", "PROBLEM", "N/A"].map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                {statusOption}
              </MenuItem>
            ))}
          </Select>

          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={taskComment}
            onChange={handleCommentChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={checkComment} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
