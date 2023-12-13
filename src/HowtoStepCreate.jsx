import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
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
        toast.success(`Step ${step_name} memorialized.`)
      }
      else { toast.error('Nee') }
    }
  }

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      .then((response) => {
        const howtos = response.data.sort((b, a) => b.howto_name.localeCompare(a.howto_name));
        setHowtos(howtos);
      })
  },
    []);

  return (

    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content=".."><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Add a Step to <i>"{props.howto_name}"</i></b>
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
                  Supporting URL:&nbsp;&nbsp;<input style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Optional" type="text" value={step_url} onChange={(event) => setStep_url(event.target.value)} />
                </div>

                <div>&nbsp;</div>
                Step Objective:&nbsp;&nbsp;&nbsp;

                <textarea style={{ fontFamily: 'Verdana', fontSize: 'Small', height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1113px' }} placeholder="Required" type="text" value={step_obj} onChange={(event) => setStep_obj(event.target.value)} required />

                {/* <img alt="1" src={spacer} />
                <label htmlFor="dropdown">Attach to Howto:&nbsp;&nbsp;</label>
                <select className='Font-Verdana-Small-Postgres'
                  onChange={(event) => {
                    const selectedIndex = event.target.selectedIndex;
                    const selectedOption = event.target.options[selectedIndex];
                    const howto_name = selectedOption.getAttribute("data-howto_name");
                    const howto_id = selectedOption.getAttribute("data-howto_id");
                    setHowto_name(howto_name);
                    setHowto_id(howto_id);
                  }}
                  id="dropdown"
                  style={{
                    height: '27.5px',
                    border: '1.25px solid #c4c4c4',
                    borderRadius: '4px',
                    padding: 0,
                    paddingLeft: '10px',
                    width: '300px'
                  }}
                >
                  <option disabled selected value="">Howto Name</option>
                  {howtos && howtos.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                      data-howto_name={option.howto_name} // Store company data as an attribute
                      data-howto_id={option.howto_id} // Store company data as an attribute
                    >{option.howto_name}
                    </option>
                  ))}
                </select> */}

                <div>&nbsp;</div>

                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>Add this Step to {props.howto_name}</button>
                <div>&nbsp;</div>
              </div>
            </form>
          </div>
        </div>)}
    </div>
  );
}
