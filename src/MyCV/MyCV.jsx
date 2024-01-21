import { useState, useEffect, useContext, React } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import '../Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Image from './Darknet12.png'
import TUS from './TUS.png'
import LYIT from './LYIT.png'
import DCU from './DCU.png'
import MyCVEmployers from './MyCVEmployers';


export default function MyCV(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [mycvdata, setMycvdata] = useState([]);
  const [error, setError] = useState(null);
  const toggleAccordion = () => { setExpanded(!isExpanded); };

  // const handleLinkClick = (howtoId) => {
  //   setHowtoIdd(howtoId);
  //   setShowHowtoEdit(true);
  // }

  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mycv`)
      .then((response) => {
        const cvdata = response.data;
        cvdata.sort((a, b) => b.employer_id - a.employer_id);
        setMycvdata(cvdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [checkForRecords]);



  if (error) return <p>An error in Task_Accordion occurred</p>

  const OuterTable = () => (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '10%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }}><img src={Image} /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '10%' }}></td>
          </tr>
          <tr>
            <td style={{ width: '10%' }} className="Table-home-left"><InnerTableLeft /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }} className="Table-home-centre"><InnerTableCentre /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '10%' }} className="Table-home-right"><InnerTableRight /></td>
          </tr>
        </tbody>
      </table>
    </div>

  );


  const InnerTableLeft = () => {
    return (
      <div>
        <div>
          <table >
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
        <div>&nbsp;</div>

      </div>
    );
  };


  const InnerTableCentre = () => {
    return (
      <div>
        <table>
          <div>
            <table style={{ width: '1200px' }}>
              <thead>
                <tr className="TableCV">
                  <th>Curriculum Vitae of Paul Bester</th>
                </tr>
                <tr>
                  <th className="Font-Calibri-Large-Howto-Italic-Rusty-CV-2">24 years in US-based multi-national IT sector. Experienced in innovation-driven and commerce-driven disruptive "Startup/Transition" activities. Hyper-efficient, detail orientated leader, manager and organiser of technical teams with responsibility in the Network/Communications stack. Technically proficient in Routing & Switching, WAN-layer transport, Data Center operations, Contact Centers and Collaboration technologies. Strong PgM/PM, customer-facing and vendor-management with Overseas/Expat Assignment experience.</th>
                </tr>
              </thead>

              {mycvdata && mycvdata.map((emp) => (
                <tbody>
                  {
                    <tr>
                      <td className="Font-Calibri-Large-Howto-Italic-Rusty-CV-1">
                        {<MyCVEmployers mycvdata={mycvdata} key={emp.employer_id} employer_name={emp.employer_name} employer_start={emp.employer_start} employer_end={emp.employer_end} employer_id={emp.employer_id} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />}
                      </td>
                    </tr>
                  }
                </tbody>
              )
              )
              }
            </table>
          </div>
        </table>
      </div>
    );
  };


  const InnerTableRight = () => {
    return (
      <div>
        <table>
          <tbody>
            <img src={TUS} width="240" height="300" />
            <div>MSc. Software Engineering</div>
            <div>AthloneIT (TUS)</div>
            <div className='Font-Spacer-White'>Make this spacer white</div>
            <img src={LYIT} width="240" height="300" alt="Your Image" />
            <div>MSc. Cloud Computing</div>
            <div>LetterkennyIT (LYIT)</div>
            <div className='Font-Spacer-White'>Make this spacer white</div>
            <img src={DCU} width="240" height="300" />
            <div>BSc. Information Technology</div>
            <div>Dublin City University (DCU)</div>
          </tbody>
        </table>
      </div>
    )
      ;
  };



  return (
    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
      <OuterTable />
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            </td>
          </tr>
        </tbody>
      </table>




      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '25%' }}></th>
            <th style={{ width: '1%' }}></th>
            <th style={{ width: '48%' }}></th>
            <th style={{ width: '1%' }}></th>
            <th style={{ width: '25%' }}></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}