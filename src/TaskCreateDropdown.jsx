import React from 'react';

const TaskCreateDropdown = ({ allTasks, setProjecthandle }) => {
  // Create a Set to store unique project handles
  const uniqueProjectHandles = Array.from(new Set(allTasks.map(option => option.projecthandle)));


  return (
    <div>
      <input
        list="projecthandles"
        className='Font-Segoe-Small'
        onChange={(event) => { const projecthandle = event.target.value;  setProjecthandle(projecthandle); }}
        id="dropdown"
        style={{
          height: '27.5px',
          border: '1.25px solid #c4c4c4',
          borderRadius: '4px',
          padding: '0 10px',
          width: '150px'
        }}
        placeholder="Domain"
      />
      <datalist id="projecthandles">
        {uniqueProjectHandles.map((projecthandle, index) => (
          <option key={index} value={projecthandle}>
            {projecthandle}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default TaskCreateDropdown;
