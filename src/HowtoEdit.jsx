import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Darknet7 from './graphix/Darknet7.png'
import One from './graphix/9.png'
import WhiteSpacer from './graphix/WhiteSpacer.png'
import New_Task_Accordion from './New_Task_Accordion';


export default function HowtoEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [tabledata, setTabledata] = useState([]);
  const [howtodata, setHowtodata] = useState([]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const sortedTabledata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setTabledata(sortedTabledata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      .then((response) => {
        const sortedHowtodata = response.data.sort((a, b) => a.howto_name.localeCompare(b.howto_name));
        setHowtodata(sortedHowtodata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


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

                <td className="Table-home-left">
                  {/* {howtoRow && (
                    <div>
                      {howtoRow.howto_name}
                    </div>
                  )} */}
                </td>

                <td className="Table-home-right">
                  {/* <img src={WhiteSpacer} alt="Website Logo" /> */}
                  <New_Task_Accordion />
                </td>

                <td className="Table-home-right">
                  {/* <Tooltip id="edit" />
                  <a data-tooltip-id="edit" data-tooltip-content={row.website_desc} href={row.website_url} target="_blank">
                    {row.website_name}
                  </a> */}
                </td>


              </tr>
        </tbody>
      </table>
    </div>
  );
}

