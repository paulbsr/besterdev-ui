import React from "react";
import "./StatusByColourLong.css";


export default function StatusByColourLong(props) {
  let color = "";
  const bringUpDetails = (detail, recordID) => {
    // props.setpprecord(detail);
    // props.setRecordID(recordID);
  };
  if (props.status === "DONE") {
    color = "grey";
  } else if (props.status === "WIP") {
    color = "blue";
  } else if (props.status === "START") {
    color = "red";
  } else {
    color = "pink";
  }


  return (
    <div className={`text ${color}`}>
      {props.status === "DONE" ? (
        <div>
          <b>** {props.date}:</b> {props.latestpprecord}
        </div>
      ) : (
        <div
          className={`text pprecord`}
          id={props.recordID}
          onClick={() => bringUpDetails(props.latestpprecord, props.recordID)}
        >
          <b>** {props.date}:</b> {props.latestpprecord}
        </div>
      )}
    </div>
  );
};