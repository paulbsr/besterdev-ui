import React, { useState } from "react";
import axios from 'axios';
import '../Fonts.css';
import spacer from '../graphix/besterdev_spacer_white.png';
import spacer2 from '../graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

export default function WebSiteCreate(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const [website_name, setWebsite_name] = useState('');
  const [website_desc, setWebsite_desc] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [website_cat, setWebsite_cat] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    {
      var newRecord =
      {
        'websiteName': website_name,
        'websiteDesc': website_desc,
        'websiteUrl': website_url,
        'websiteCat': website_cat,
      }

      {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
        if (response.status === 200) {
          props.setCheckForRecords(!props.checkForRecords);
          toast.success(`${website_name} has been memorialized.`)
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
        <b>Memorialize a Website, Tool or Book:</b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Resource Name:&nbsp;&nbsp;<input style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} placeholder="Required" type="text" value={website_name} onChange={(event) => setWebsite_name(event.target.value)} required />
                <img alt="1" src={spacer} />Resource Description:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '830px' }} placeholder="Required" type="text" value={website_desc} onChange={(event) => setWebsite_desc(event.target.value)} required />
                <img alt="1" src={spacer} />Resource Catagory:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={website_cat} onChange={(event) => setWebsite_cat(event.target.value)} />
                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Resource URL:&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '890px' }} placeholder="Required" type="text" value={website_url} onChange={(event) => setWebsite_url(event.target.value)} required />
                <img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }}>Memorialize</button>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
