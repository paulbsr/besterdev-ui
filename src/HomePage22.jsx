import { useState, useEffect, useContext, React } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Image from './graphix/12.png'
import { BsQuestionOctagon } from "react-icons/bs";




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

  



  const InnerTableLeft = () => {

    const groupedData = {};
    websitedata.forEach((row) => {
      if (!groupedData[row.website_cat]) {
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
                <tr key={category}>
                  <th colSpan="2" style={{ textAlign: 'right', borderBottom: '1px solid #ddd' }} className="Table-home-left-heading">{category}</th>
                </tr>
                {groupedData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-left">
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
  
  
  
  const InnerTableCentre = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);
  
    // Assuming cyclopediadata is an array of objects with a property 'cyclopedia_name'
    const filteredData = selectedLetter
      ? cyclopediadata.filter(rowc => rowc.cyclopedia_name && rowc.cyclopedia_name.toLowerCase().startsWith(selectedLetter))
      : cyclopediadata;
  
    const alphabet = 'a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z'; 
  
    return (
      <div>
        <div className="Font-Verdana-Larger-Howto-Rusty">
          {alphabet.split('').map((letter, index) => (
            <span style={{ cursor: 'pointer' }} 
              key={index}
              className={selectedLetter === letter ? 'selected' : ''}
              onClick={() => setSelectedLetter(letter)}
            >&nbsp;&nbsp;
              {letter}
            </span>
          ))}&nbsp; &nbsp; ({cyclopediadata.length})
        </div>

        <div className='Font-Spacer-White'>Make this spacer white</div>

        <table className="Table-home-centre">
          <tbody>
            {filteredData.map((rowc, index) => (
              <tr key={index}>
                <td className="fphover">
                  {rowc && (
                    <div>
                      
                      <b>&nbsp;{rowc.cyclopedia_name}:</b>&nbsp;<i>{rowc.cyclopedia_desc}</i>
                      <div className='Font-Spacer-White'>Make this spacer white</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };




  const InnerTableRight = () => {
    const amazonIframes = [
      "https://read.amazon.co.uk/kp/card?asin=B077WWRK8B&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_F3HQKNR4EF2MMXB0WS0D",
      "https://read.amazon.co.uk/kp/card?asin=B081Y5262X&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_H757NZNCTQK525FX3349",
      
    ];
  
    return (
      <div>
        <table>
          <tbody>
            {howtodata.map((row, index) => (
              <tr key={index}>
                <td>
                  {row && (
                    <div>
                      <BsQuestionOctagon style={{ color: '#D5441C', fontSize: '15px', cursor: 'pointer' }} />
                      &nbsp;<a href={`/howtoedit/${row.howto_id}`} target="_blank">{row.howto_name}</a>
                      <div>&nbsp;</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {/* Render iframes after the last iteration */}
            {howtodata.length > 0 && (
              <tr>
                <td>
                  {amazonIframes.map((iframeUrl, iframeIndex) => (
                    <iframe
                      key={iframeIndex}
                      type="text/html"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      width="336"
                      height="550"
                      frameBorder="0"
                      allowFullScreen
                      style={{ maxWidth: '100%' }}
                      src={iframeUrl}
                    ></iframe>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  


  const OuterTable = () => (
    <div>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td style={{width: '25%' }}></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '48%' }}>&nbsp;&nbsp;<img src={Image} /></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '25%' }}></td>
        </tr>
        <tr>
          <td style={{width: '25%' }} className="Table-home-left"><InnerTableLeft/></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '48%' }} className="Table-home-centre"><InnerTableCentre /></td>
          <td style={{width: '1%' }}></td>
          <td style={{width: '25%' }} className="Table-home-right"><InnerTableRight/></td>
        </tr>
      </tbody>
    </table>
    </div>
    
  );


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
          {
            websitedata.map((row, index) => {
              const howtoRow = howtodata[index];
              const cyclopediaRow = cyclopediadata[index]
              

              return (
                <tr key={index}>
                  <td></td>
                  <td></td>
                </tr>
              );
            }
           )
          }
        </tbody>
      </table>
    </div>
  );
}