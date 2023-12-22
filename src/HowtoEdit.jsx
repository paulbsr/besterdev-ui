import { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import Image from './graphix/15.png'
import HowtoStepAccordion from './HowtoStepAccordion';


export default function HowtoEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };

  return (

    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

      <table style={{ width: '100%' }}>

        <thead>
          <tr>
            <th style={{ width: '100%' }}><img src={Image} /></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>


      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}></th>
            <th style={{ width: '50%' }}></th>
            <th style={{ width: '20%' }}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="Table-home-left"></td>
            <td className="Table-home-right"><HowtoStepAccordion howto_ids={props.howto_id} /></td>
            <td className="Table-home-right"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

