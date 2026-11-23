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
import { getStatusTextColor } from "../getStatusColor";

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
          color: getStatusTextColor(status),
          height: 25,
        }}
        onClick={handleClickOpen}
      >
        {status}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#151d2b", color: "#e6ebf2", border: "1px solid #293447" } }}
      >
        <DialogTitle>Edit task status / comment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#a0aec0", mb: 1 }}>Status</DialogContentText>

          <Select
            value={taskStatus}
            onChange={handleStatusChange}
            fullWidth
            size="small"
            sx={{
              mb: 2,
              color: "#e6ebf2",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#293447" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#a8c9ec" },
              "& .MuiSvgIcon-root": { color: "#a0aec0" },
            }}
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
            sx={{
              "& .MuiInputLabel-root": { color: "#a0aec0" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#a8c9ec" },
              "& .MuiInputBase-input": { color: "#e6ebf2" },
              "& .MuiInput-underline:before": { borderBottomColor: "#293447" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#a8c9ec" },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: "#a8c9ec" }} onClick={handleClose}>Cancel</Button>
          <Button
            onClick={checkComment}
            variant="contained"
            sx={{ backgroundColor: "#ff855f", "&:hover": { backgroundColor: "#e06f4f" } }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
