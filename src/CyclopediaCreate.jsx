import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

export default function CyclopediaCreate(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const [cyclopedia_name, setCyclopedia_name] = useState('');
  const [cyclopedia_desc, setCyclopedia_desc] = useState('');
  const [cyclopedia_ref, setCyclopedia_ref] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    {
      var newRecord =
      {
        'cyclopedia_name': cyclopedia_name,
        'cyclopedia_desc': cyclopedia_desc,
        'cyclopedia_ref': cyclopedia_ref,
      }

      {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`, newRecord);
        if (response.status === 200) {
          props.setCheckForRecords(!props.checkForRecords);
          toast.success(`${cyclopedia_name} has been memorialized.`)
        }
        else {
          toast.error('Nee')
        }
      }
    }
  }

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
          <img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} />
        <b>Add a WhatExactlyIs? entry</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />WhatExactlyIs:&nbsp;&nbsp;<input style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={cyclopedia_name} onChange={(event) => setCyclopedia_name(event.target.value)} required />
                <img alt="1" src={spacer} />Description:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '750px' }} placeholder="Required" type="text" value={cyclopedia_desc} onChange={(event) => setCyclopedia_desc(event.target.value)} required />
                <img alt="1" src={spacer} />Reference or URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={cyclopedia_ref} onChange={(event) => setCyclopedia_ref(event.target.value)} />
                <img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Add to Cyclopedia</button>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
