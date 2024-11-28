import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TaskRecordAccordion from "./TaskRecordAccordion";
import DialogContentText from "@mui/material/DialogContentText";
import { getStatusByColourTaskText } from "../getStatusByColourTaskText";


export default function TaskPopOut({
    alertCtx,
    project_handle,
    id,
    taskname,
    taskrequirement,
    taskowner,
    tasktargetdate,
    taskstatus,
    asms,
    childrecord,
    parenttask,
    // checkForRecords,
    // setCheckForRecords,
}) {
    const [open, setOpen] = useState(false);
    const [checkForRecords, setCheckForRecords] = useState(true);



    return (
        <>
            <ZoomOutMapIcon
                fontSize="small"
                style={{ marginBottom: "-3px", paddingRight: "5px", cursor: "pointer" }}
                onClick={() => {
                    setOpen(true);
                }}
            />
            <Dialog
                maxWidth={false}
                style={{ textAlign: "left" }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>{taskname}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText
                        style={{ overflowWrap: "break-word", minWidth: "90vw" }}
                    >
                        <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                            <u>REQUIREMENT</u>: {taskrequirement}
                        </div>
                        <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                            <u>OWNER</u>: {taskowner}
                        </div>
                        <div style={{ color: getStatusByColourTaskText(taskstatus) }}>
                            <u>DUE</u>:{" "}
                            {tasktargetdate[0] +
                                "." +
                                (tasktargetdate[1] < 10
                                    ? "0" + tasktargetdate[1]
                                    : tasktargetdate[1]) +
                                "." +
                                (tasktargetdate[2] < 10
                                    ? "0" + tasktargetdate[2]
                                    : tasktargetdate[2])}
                        </div>
                    </DialogContentText>
                    <TaskRecordAccordion
                        alertCtx={alertCtx}
                        project_handle={project_handle}
                        taskstatus={taskstatus}
                        parentid={id}
                        asms_number={asms}
                        parenttask={parenttask}
                        checkForRecords={checkForRecords}
                        setCheckForRecords={setCheckForRecords}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close Pop-Up</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}