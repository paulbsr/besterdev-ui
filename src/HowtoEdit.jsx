import { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import One from './graphix/11.png'
import New_Task_Accordion from './New_Task_Accordion';


export default function HowtoEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };

  return (

    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

      <table style={{ width: '100%' }}>

        <thead>
          <tr>
            <th style={{ width: '100%' }}><img src={One} /></th>
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
            <td className="Table-home-right"><New_Task_Accordion howto_ids={props.howto_id} /></td>
            <td className="Table-home-right"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

