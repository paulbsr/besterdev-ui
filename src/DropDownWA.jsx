import React, { useState } from 'react';

const DropdownWA = () => {
  const options = [
    'Fully Remote',
    'Hybrid 1-day OnSite',
    'Hybrid 2-day OnSite',
    'Hybrid 3-day OnSite',
    'Hybrid 4-day OnSite',
    'Fully OnSite',
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Work Appropriate Model: </label>
      <select className='Font-Verdana-Small'
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        style={{
          height: '27.5px',
          border: '1.25px solid #c4c4c4',
          borderRadius: '4px',
          padding: 0,
          paddingLeft: '10px',
          width: '300px'
        }}
      >
        <option value="">Select a WA option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default DropdownWA;
