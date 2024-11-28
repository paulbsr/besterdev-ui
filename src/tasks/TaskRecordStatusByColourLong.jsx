import React from 'react';
import '../StatusByColourLong.css';

function TaskRecordStatusByColourLong(props) {
  let color = '';
  const bringUpDetails = (detail, recordID) => {
    // props.setpprecord(detail);
    // props.setRecordID(recordID);
  };

 
  if (props.status === 'DONE') { color = 'green'; }
  else if (props.status === 'WIP') { color = 'blue'; }
  else if (props.status === 'START') { color = 'black'; }
  else if (props.status === 'ARCHIVE') { color = 'grey'; }
  else if (props.status === 'PROBLEM') { color = 'red'; }
  else { color = 'pink'; }

  return (
    <div className={`text ${color}`}>
      <div className={`text taskrecordshover`} id={props.recordID} onClick={() => bringUpDetails(props.childrecord, props.recordID)}>&nbsp;{props.date[0] + '.' + props.date[1] + '.' + props.date[2]}: {props.childrecord}</div>
    </div>
  );
}

export default TaskRecordStatusByColourLong;