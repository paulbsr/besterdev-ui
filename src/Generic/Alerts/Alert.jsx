import React, { useContext } from "react";
import { Snackbar, AlertTitle } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AlertContext from "./AlertContext";

export default function Alert(props) {
  const alertCtx = useContext(AlertContext);

  const {
    alertMessage,
    alertStatus,
    success,
    error,
    warning,
    clear: handleClose,
  } = alertCtx;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={!!alertMessage}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        severity={alertStatus}
        sx={{ minWidth: "400px", maxWidth: "75vw" }}
        onClose={handleClose}
        variant="filled"
        iconMapping={{
          success: <CheckIcon fontSize="inherit" />,
          error: <PriorityHighIcon fontSize="inherit" />,
        }}
      >
        <AlertTitle style={{ textTransform: "capitalize" }}>
          <strong>{alertStatus}</strong>
        </AlertTitle>
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
}
