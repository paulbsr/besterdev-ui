import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Darknet7 from './graphix/Darknet7.png'
import One from './graphix/3.png'
import WhiteSpacer from './graphix/WhiteSpacer.png'
import HowtoEdit from './HowtoEdit';
import New_TaskRecordAccordion from './New_TaskRecordAccordion';
import New_Task_Accordion from './New_Task_Accordion';
import { Link } from 'react-router-dom';


export default function Homepage(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [tabledata, setTabledata] = useState([]);
  const [howtodata, setHowtodata] = useState([]);
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);

  const handleLinkClick = (howtoId) => {
    setHowtoIdd(howtoId);
    setShowHowtoEdit(true);
  }


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
            <td>
            {/* {showHowtoEdit && <HowtoEdit howtoid={howtoIdd} />} */}
            </td>
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
          {tabledata.map((row, index) => {
            const howtoRow = howtodata[index];

            return (
              <tr key={index}>

                <td style={{ width: '20%' }} className="Table-home-left">
                  {howtoRow && (
                    <div>
                      {/* <a onClick={() => handleLinkClick(howtoRow.howto_id)}>{howtoRow.howto_name} #{howtoRow.howto_id}</a> */}
                      <a  href={`/howtoedit/${howtoRow.howto_id}`} target="_blank">{howtoRow.howto_name}</a>
                    </div>
                  )}
                </td>

                <td style={{ width: '50%' }} className="Table-home-centre">
                  {/* <img src={WhiteSpacer} alt="Website Logo" /> */}
                  {/* {showHowtoEdit && <HowtoEdit howtoid={howtoIdd} target="_blank"/>} */}
                  {showHowtoEdit && <Link to={`/howtoedit/${howtoIdd}`} target="_blank"></Link>}
                  {/* <Link to={`/howtoedit/${howtoIdd}`} target="_blank">Open HowtoEdit Page</Link> */}

                </td>

                <td style={{ width: '20%' }} className="Table-home-right">
                  <Tooltip id="edit" />
                  <a data-tooltip-id="edit" data-tooltip-content={row.website_desc} href={row.website_url} target="_blank">
                    {row.website_name}
                  </a>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

}