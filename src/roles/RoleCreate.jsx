import React, { useState } from 'react';
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from 'react-icons/gi';
import { FaCriticalRole } from 'react-icons/fa';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const API_BASE = 'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles';

export default function RoleCreate() {
  const [isExpanded, setExpanded] = useState(false);
  const [form, setForm] = useState({
    rolename: '',
    roledesc: '',
    roleskill1: '',
    roleskill2: '',
    roleskill3: ''
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const toggleAccordion = () => setExpanded((prev) => !prev);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE}/create`, form);

      if (response.status === 200) {
        alert(`Role "${form.rolename}" has been added successfully.`);
        setForm({
          rolename: '',
          roledesc: '',
          roleskill1: '',
          roleskill2: '',
          roleskill3: ''
        });
        setExpanded(false);
      } else {
        alert('Something went wrong while saving the role.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderInput = (label, field, width = '160px') => (
    <>
      <img alt="spacer" src={spacer} />
      <label className="Font-Verdana-Small-Postgres">
        {label}:&nbsp;
        <input
          style={{
            height: '27.5px',
            border: '1.25px solid #c4c4c4',
            borderRadius: '4px',
            paddingLeft: '10px',
            width
          }}
          placeholder="Required"
          type="text"
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          required={field === 'rolename'}
        />
      </label>
    </>
  );

  return (
    <div className="Font-Verdana-Small-Postgres">
      &nbsp;
      <Tooltip id="insert" />

      {/* Accordion Header */}
      <div onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
        <a data-tooltip-id="insert" data-tooltip-content="Add">
          <img alt="spacer" src={spacer} />
          <img alt="spacer" src={spacer} />
          <GiHummingbird style={{ color: '#336791', fontSize: '35px', verticalAlign: 'middle' }} />
          <FaCriticalRole style={{ color: '#336791', fontSize: '28px', verticalAlign: 'middle' }} />
        </a>
        &nbsp;<b>Add a Role</b>
      </div>

      {/* Accordion Content */}
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <div><img alt="spacer" src={spacer2} /></div>
          <div className="Font-Verdana-Small-Postgres" style={{ marginTop: '10px' }}>
            {renderInput('Role Name', 'rolename')}
            {renderInput('Description', 'roledesc', '240px')}
            {renderInput('Skill #1', 'roleskill1', '200px')}
            {renderInput('Skill #2', 'roleskill2', '200px')}
            {renderInput('Skill #3', 'roleskill3', '200px')}

            <button
              type="submit"
              className="Font-Verdana-Small-Postgres"
              disabled={isSubmitting}
              style={{
                marginLeft: '10px',
                height: '27.5px',
                border: '1px solid #336791',
                borderRadius: '5px',
                backgroundColor: isSubmitting ? '#E0E0E0' : '#FFFFFF',
                color: '#336791',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Adding...' : 'Add Role'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
