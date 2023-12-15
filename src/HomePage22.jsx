import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import One from './graphix/3.png'
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { Link } from 'react-router-dom';
import CyclopediaAccordion from './CyclopediaAccordion';


export default function HomePage22(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [websitedata, setWebsitedata] = useState([]);
  const [howtodata, setHowtodata] = useState([]);
  const [cyclopediadata, setCyclopediaData] = useState([]);
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);

  const handleLinkClick = (howtoId) => {
    setHowtoIdd(howtoId);
    setShowHowtoEdit(true);
  }


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const sortedwebsitedata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setWebsitedata(sortedwebsitedata);
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



  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia')
      .then((response) => {
        const sortedCyclopediaData = response.data.sort((a, b) => a.cyclopedia_name.localeCompare(b.cyclopedia_name));
        setCyclopediaData(sortedCyclopediaData);
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
            </td>
          </tr>
        </tbody>
      </table>




      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}></th>
            <th style={{ width: '2%' }}></th>
            <th style={{ width: '46%' }}></th>
            <th style={{ width: '2%' }}></th>
            <th style={{ width: '20%' }}></th>
          </tr>
        </thead>


        <tbody>
          {
            websitedata.map((row, index) => {
              const howtoRow = howtodata[index];
              const cyclopediaRow = cyclopediadata[index]

              return (
                <tr key={index}>

                  <td style={{ width: '20%' }} className="Table-home-left">
                    <Tooltip id="edit" />
                    <a data-tooltip-id="edit" data-tooltip-content={row.website_desc} href={row.website_url} target="_blank">{row.website_name}</a>
                  </td>

                  <td></td>

                  <td style={{ width: '50%' }} className="Table-home-right">
                    {/* <CyclopediaAccordion cyclopediadata={cyclopediadata}/> */}
                    {cyclopediaRow && (
                      <div>
                        {/* <a><b><i>{cyclopediaRow.cyclopedia_name}</i>:</b> {cyclopediaRow.cyclopedia_desc}</a> */}
                        <CyclopediaAccordion cyclopediadata={cyclopediadata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                      </div>
                    )}
                  </td>

                  {/* <td style={{ width: '50%' }} className="Table-home-right">
                    {cyclopediaRow && (
                      <div>
                        <a><b><i>{cyclopediaRow.cyclopedia_name}</i>:</b> {cyclopediaRow.cyclopedia_desc}</a>
                      </div>
                    )}
                  </td> */}



                  <td></td>


                  <td style={{ width: '20%' }} className="Table-home-right">
                    {howtoRow && (
                      <div>
                        <a href={`/howtoedit/${howtoRow.howto_id}`} target="_blank">{howtoRow.howto_name}</a>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

}