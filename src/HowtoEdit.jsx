import { useState, useEffect } from 'react'
import axios from 'axios'
import { Tooltip } from '@mui/material';
                                                                                            import './Fonts.css';
import 'react-dropdown/style.css';
import Image from './graphix/15.png'
import HowtoStepAccordion from './HowtoStepAccordion';


export default function HowtoEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [websitedata, setWebsitedata] = useState([])

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const filteredwebsites = response.data.filter(site => {return site.howto_id_fk === props.howto_id});
        const sortedfilteredwebsites = filteredwebsites.sort((a, b) => a.website_name.localeCompare(b.website_name));
        setWebsitedata(sortedfilteredwebsites);
              })
      .catch((e) => console.error(e));  
  }, [props.checkForRecords]);



  const InnerTableLeft = () => {

    const groupedData = {};


    websitedata.forEach((row) => {
      if (!groupedData[row.website_cat]) 
      {
        groupedData[row.website_cat] = [];
      }
      groupedData[row.website_cat].push(row);
    });
  
    const sortedCategories = Object.keys(groupedData).sort();
  
    return (
      <div className="scrollable-container">  <Tooltip id="insert" />
        <table className="Table-home-left">
          <tbody>
            {sortedCategories.map((category) => (
              
              <>&nbsp;
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>

                {groupedData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Font-Segoe-Medium-Howto">
                      <a href={record.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.website_desc}>{record.website_name}</a>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
      
    );
  };

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
          {/* <td style={{width: '25%' }}></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '48%' }}></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '25%' }}></td> */}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="Table-home-left"><InnerTableLeft/></td>
            <td className="Table-home-right"><HowtoStepAccordion howto_ids={props.howto_id} /></td>
            <td className="Table-home-right"></td>
          {/* <td style={{width: '25%' }} className="Table-home-left"><InnerTableLeft/></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '48%' }} className="Table-home-centre"><HowtoStepAccordion howto_ids={props.howto_id} /></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '25%' }} className="Table-home-right"></td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

