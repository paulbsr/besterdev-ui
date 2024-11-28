import React from 'react';
import './StatusByColour.css';

const TaskRecordsByColour = (props) => {
    let color = '';
  if (props.status === 'DONE') {color = 'green2';}
  else if (props.status === 'WIP') {color = 'blue';}
  else if (props.status === 'START') {color = 'red';}
  else if (props.status === 'ARCHIVE') {color = 'grey';}
  else {color = 'pink';}
  return (<div className={`text ${color}`}>{props.date}: {props.childrecord}</div>);};

export default TaskRecordsByColour;