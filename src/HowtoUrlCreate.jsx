import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird, GiSpiderWeb } from "react-icons/gi";

import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
dayjs.extend(utc);


export default function HowtoUrlCreate(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [website_name, setWebsite_name] = useState();
  const [website_url, setWebsite_url] = useState();
  const [website_desc, setWebsite_desc] = useState();
  const [isExpanded, setExpanded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    {
      var newRecord =
      {
        'howto_id_fk': props.howto_idb,
        'website_name': website_name,
        'website_url': website_url,
        'website_desc': website_desc,
        'website_cat': props.howto_name
      }

      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
      if (response.status === 200) {
        props.setCheckForRecords(!props.checkForRecords);
        toast.success(`${website_name} memorialized.`)
      }
      else { toast.error('Nee') }
    }
  }

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add a Step"><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Add a Website <GiSpiderWeb style={{ color: '#D5441C', fontSize: '16px', cursor: 'pointer' }} /> to <i>"{props.howto_name}"</i></b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                URL Display Name:&nbsp;&nbsp;<input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '985px' }} placeholder="Required" type="text" value={website_name} onChange={(event) => setWebsite_name(event.target.value)} required />

                <div>&nbsp;</div>

                <div>
                  URL Link:&nbsp;&nbsp;
                  <input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1050px' }} placeholder="Required" type="text" value={website_url} onChange={(event) => setWebsite_url(event.target.value)} />
                </div>

                <div>&nbsp;</div>
                URL Description:&nbsp;&nbsp;&nbsp;

                <input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Optional" type="text" value={website_desc} onChange={(event) => setWebsite_desc(event.target.value)} />

                <div>&nbsp;</div>

                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#D5441C', cursor: 'pointer' }}>Add this Website to {props.howto_name}</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
