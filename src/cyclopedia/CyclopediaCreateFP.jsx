import React, { useState } from "react";
import axios from 'axios';
import '../Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { toast } from 'react-toastify';
import CyclopediaTicker from "./CyclopediaTicker";

export default function CyclopediaCreateFP() {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const [cyclopedia_name, setCyclopedia_name] = useState('');
  const [cyclopedia_desc, setCyclopedia_desc] = useState('');
  const [cyclopedia_url, setCyclopedia_url] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    var newRecord = {
      'cyclopediaName': cyclopedia_name,
      'cyclopediaDesc': cyclopedia_desc,
      'cyclopediaUrl': cyclopedia_url,
    };
  
    try {
      const response = await axios.post(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`,
        newRecord
      );
  
      if (response.status === 200) {
        setCheckForRecords(!checkForRecords);
        toast.success(`${cyclopedia_name} memorialized.`);
  
        // Clear input fields after successful submission
        setCyclopedia_name('');
        setCyclopedia_desc('');
        setCyclopedia_url('');
      } else {
        toast.error('Nee');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting the form');
    }
  };

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;&nbsp;&nbsp;
      <b style={{ cursor: 'pointer' }} onClick={toggleAccordion}>
        <GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} />Add to Cyclopedia:</b>
      <CyclopediaTicker />


      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />Cyclopedia:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} placeholder="Required" type="text" value={cyclopedia_name} onChange={(event) => setCyclopedia_name(event.target.value)} required />
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '850px' }} type="text" value={cyclopedia_url} onChange={(event) => setCyclopedia_url(event.target.value)} />
          
          <div>&nbsp;</div>
          
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />Description:&nbsp;&nbsp;<textarea style={{ fontFamily: 'Verdana', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1500px' }} placeholder="Required" type="text" value={cyclopedia_desc} onChange={(event) => setCyclopedia_desc(event.target.value)} required />
          <img alt="1" src={spacer} />
          
          <div><img alt="1" src={spacer} /></div>
          
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />
          <img alt="1" src={spacer} />
          &nbsp;&nbsp;&nbsp;
          <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>Memorialize</button>
          <div>&nbsp;</div>
        </form>
      )
      }
    </div>
  );
}
