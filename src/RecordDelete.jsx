import React, { useState } from 'react';
import axios from 'axios';
import './Fonts.css';


function RecordList() {
  const [recordDel, setRecordDel] = useState();

  const handleDelete = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecordsDel(updatedRecords);
  };

  return (
    <div>
      <h2>Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.name}
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordList;
