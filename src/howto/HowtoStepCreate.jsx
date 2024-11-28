import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import '../Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer2 from '../graphix/besterdev_spacer_white_half.png';
import { GiHummingbird, GiFootsteps } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { IoFootstepsSharp, IoFootstepsOutline } from "react-icons/io5";
dayjs.extend(utc);


export default function HowtoStepCreate(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [step_number, setStep_number] = useState();
  const [step_name, setStep_name] = useState();
  const [step_url, setStep_url] = useState();
  const [step_obj, setStep_obj] = useState();
  const [howtos, setHowtos] = useState('');
  const [isExpanded, setExpanded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    {
      var newRecord =
      {
        'howto_id_fk': props.howto_idb,
        'step_number': step_number,
        'step_name': step_name,
        'step_url': step_url,
        'step_obj': step_obj,
      }

      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtostep/create`, newRecord);
      if (response.status === 200) {
        props.setCheckForRecords(!props.checkForRecords);
        toast.success(`Step ${step_number} added.`);
        setStep_number('');
        setStep_name('');
        setStep_obj('');
        setStep_url('');
      }
      else { toast.error('Nee') }
    }
  }


  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Add a Step"><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Add a Step <IoFootstepsOutline style={{ color: '#D5441C', fontSize: '18px', cursor: 'pointer' }} /> to <i>"{props.howto_name}"</i></b>
        <div>&nbsp;</div>
      </div>

      {isExpanded && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div className='Font-Verdana-Small-Postgres'>
                Step Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '30px' }} placeholder="Req" type="text" value={step_number} onChange={(event) => setStep_number(event.target.value)} required />

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Step Name:&nbsp;&nbsp;<input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '845px' }} placeholder="Required" type="text" value={step_name} onChange={(event) => setStep_name(event.target.value)} required />

                <div>&nbsp;</div>

                <div>
                  Supporting URL:&nbsp;&nbsp;<input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '997px' }} placeholder="Optional" type="text" value={step_url} onChange={(event) => setStep_url(event.target.value)} />
                </div>

                <div>&nbsp;</div>
                Step Objective:&nbsp;&nbsp;&nbsp;

                <textarea style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Optional" type="text" value={step_obj} onChange={(event) => setStep_obj(event.target.value)} />

                <div>&nbsp;</div>

                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#D5441C', cursor: 'pointer' }}>Add this Step to {props.howto_name}</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
