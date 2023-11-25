import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Darknet1 from './graphix/Darknet1.png'
import Darknet2 from './graphix/Darknet2.png'
import Darknet3 from './graphix/Darknet3.png'
import Darknet4 from './graphix/Darknet4.png'
import Darknet5 from './graphix/Darknet5.png'
import Darknet6 from './graphix/Darknet6.png'
import Darknet7 from './graphix/Darknet7.png'
import WhiteSpacer from './graphix/WhiteSpacer.png'


export default function Homepage(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [tabledata, setTabledata] = useState([]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const sortedTabledata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setTabledata(sortedTabledata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);




  return (

    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

<table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '20%' }}></th>
          <th style={{ width: '50%' }} className="Table-home-centre"><img src={Darknet7}/></th>
          <th style={{ width: '20%' }} className="Table-home-right"><img src={WhiteSpacer}/></th>
        </tr>
      </thead>
      <tbody>
        {/* You can repeat this row for more rows */}
        <tr>
          <td></td>
          <td></td>
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
          {tabledata.map((row, index) => {
            return (
              <tr key={row.id}>
                <td style={{ width: '20%' }} className="Table-home-left"><Tooltip id="edit" /><a data-tooltip-id="edit" data-tooltip-content={row.website_desc} href={row.website_url} target="_blank">{row.website_name}</a></td>
                {/* <td style={{ width: '50%' }} className="Table-home-centre">   2      2222222222</td> */}
                <td style={{ width: '50%' }} className="Table-home-centre">{index === 0 ? <img src={WhiteSpacer} alt="Website Logo" /> : null}
                </td>
                {/* <td style={{ width: '20%' }} className="Table-home-right">33333333333</td> */}
                <td style={{ width: '20%' }} className="Table-home-right">{index === 0 ? <img src={WhiteSpacer} alt="Website Logo" /> : null}</td>
                {/* <td style={{ width: '50%' }} className="Table-home-centre">{index === 0 ? <img src={Darknet2} alt="Website Logo" /> : null}</td>
                <td style={{ width: '20%' }} className="Table-home-right">{index === 0 ? <img src={Darknet2} alt="Website Logo" /> : null}</td> */}
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}