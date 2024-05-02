import { useState, useEffect, React,  useRef } from 'react'
// import { Tooltip } from 'react-tooltip'
import { Tooltip } from '@mui/material';
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Image from './graphix/Darknet12.png'
import ImageLeft from './graphix/1.jpg'
import DBSearchComponent from './DBSearchComponent';
import HowtoTicker from './HowtoTicker';
// import { BsQuestionOctagonFill } from "react-icons/bs";
// import { GiGiftOfKnowledge } from "react-icons/gi";
import { BsPencil } from 'react-icons/bs'; //Edit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { toast } from 'react-toastify';
import { GiCheckMark } from "react-icons/gi"; //Commit



export default function HomePage22(props) {
  console.log(props)
  const inputRef = useRef();
  const [isExpanded, setExpanded] = useState(false);
  // const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [websitedata, setWebsitedata] = useState([]);
  const [howtodata, setHowtodata] = useState([]);
  const [cyclopediadata, setCyclopediaData] = useState([]);
  // const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  // const [howtoIdd, setHowtoIdd] = useState(null);
  const [editing, setEditing] = useState();
  const [cyclopedia_name, setCyclopedia_name] = useState();
  const [cyclopedia_desc, setCyclopedia_desc] = useState();

  // const handleEdit = (cyclopediaid, newcyclopedianame, newcyclopediadesc) => 
  // {
  //   console.log("handleEdit() was called");
  //   console.log(cyclopediaid);
  //   console.log(newcyclopedianame);
  //   console.log(newcyclopediadesc);


  //     setCyclopedia_name(newcyclopedianame);
  //     setCyclopedia_desc(newcyclopediadesc);
  //     setEditing(cyclopediaid);

  // }

  // useEffect(() => {
  //   console.log('editing-----------', editing);
  // }, [editing]);

  // useEffect(() => {
  //   console.log('Cyclopedia_desc-----------', cyclopedia_desc);
  // }, [editing]);

  // useEffect(() => {
  //   console.log('Cyclopedia_name-----------', cyclopedia_name);
  // }, [editing]);

  // const onEditCancel = () => 
  // {
  //     setEditing(false);
  // }

  // const onEditSave = async (editing) => 
  // {
      
  //     console.log("onEditSave() was called");  
  //     console.log(cyclopedia_name)
  //     console.log(cyclopedia_desc)
  //     console.log(editing)
  //     const CyclopediaPUT =
  //     {
  //       'cyclopedia_name': cyclopedia_name,
  //       'cyclopedia_desc': cyclopedia_desc,
  //       'cyclopedia_ref': editing,
  //     }

  //     // const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${editing}`, CyclopediaPUT)
  //     const response = await axios.put(`http://localhost:8000/api/v1/cyclopedia/update/${editing}`, CyclopediaPUT)
  //     // toast.success(`Cyclopedia Record amended.`)
  //     // props.setCheckForRecords(!props.checkForRecords)
  //     onEditCancel();
  //     if (response.status === 200) {
  //       // props.setCheckForRecords(!props.checkForRecords);
  //       toast.success(`Step Record#${editing} added.`)
  //       .catch((error) => console.error('Error fetching data:', error)).catch((e) => console.error(e));;
  //     }
  //     else { toast.error(`oops! Something went wrong in TaskRecordCreate ${editing}`);}
  // }

  // const letMeSee = (value) =>
  // {
  //   console.log(value);
  //   // setCyclopedia_name(value)
  //   // console.log(cyclopedia_name)
  // }

//   function editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc) {
//     return (
//         <div>
//             <div style={{ display: 'flex' }}>
//                 <div>
//                     {editing === cyclopedia_id ?
//                         <>
//                             <input
//                                 ref={inputRef}
//                                 required
//                                 defaultValue={cyclopedia_name}
//                                 // defaultValue={"Hello World"}
//                                 // value={cyclopedia_name}
//                                 onChange={(e) => setCyclopedia_name(e.target.value)}
//                                 style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '300px', padding: 0, paddingLeft: '9px', }} />
//                             <div className='Font-Spacer-White'>Make this spacer white</div>

//                             <textarea
//                                 required
//                                 defaultValue={cyclopedia_desc}
//                                 onChange={(e) => setCyclopedia_desc(e.target.value)}
//                                 style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '900px' }} />
//                         </>
//                         :
//                         <div className="fphover2">
//                             <span style={{cursor: 'pointer'}}><b>{cyclopedia_name}: </b></span>
//                             &nbsp;
//                             <span style={{cursor: 'pointer'}}><i>{cyclopedia_desc}</i></span>
//                             &nbsp;&nbsp;&nbsp;
//                             <div className='Font-Spacer-White'>Make this spacer white</div>
//                         </div>
//                     }
//                 </div>

//                 <div style={{ display: 'flex', float: 'right' }}>
//                     <>
//                         {editing === cyclopedia_id ?
//                             (
//                                 <>&nbsp;&nbsp;
//                                     <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(cyclopedia_id)}><GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
//                                     <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><PiArrowCounterClockwiseBold style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '15px' }} /></button></Tooltip>
//                                 </>
//                             )
//                             :
//                             (
//                                 <Tooltip title={`Edit Cyclopedia Entry: ${cyclopedia_id}`} placement="top-end">
//                                     <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(cyclopedia_id, cyclopedia_name, cyclopedia_desc) }}>
//                                         <BsPencil style={{ color: '#C0C0C0', display: 'round', margin: 'auto', fontSize: '15px' }} /></button>
//                                 </Tooltip>
//                             )
//                         }
//                     </>
//                 </div>
//             </div>
//         </div>
//     )
// }


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      // axios('http://localhost:8000/api/v1/websites')
      .then((response) => {
        const sortedwebsitedata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setWebsitedata(sortedwebsitedata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);



  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      // axios('http://localhost:8000/api/v1/howtos')
      .then((response) => {
        const sortedHowtodata = response.data.sort((a, b) => a.howto_name.localeCompare(b.howto_name));
        setHowtodata(sortedHowtodata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);



  useEffect(() => {
    console.log("Getting cyclopedia data");
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia')
      // axios('http://localhost:8000/api/v1/cyclopedia')
      .then((response) => {
        // const sortedCyclopediaData = response.data.sort((a, b) => a.cyclopedia_name.localeCompare(b.cyclopedia_name));
        const cyclopediaData = response.data;
        shuffleCyclopediaArray(cyclopediaData);
        setCyclopediaData(cyclopediaData);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


  const shuffleCyclopediaArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


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
      <div className="scrollable-container">
        <table className="Table-home-left">
          <tbody>
            {sortedCategories.map((category) => (
              <>&nbsp;
                <tr key={category}>
                  <th colSpan="2" style={{ textAlign: 'right', borderBottom: '1px solid #ddd' }} className="Table-home-left-heading">{category.includes("HOWTO") ? category.replace("HOWTO :: CMM ->", "").replace("HOWTO :: ", "") : category} </th>
                </tr>
                {
                  groupedData[category].map((record, index) => (
                    <tr key={index}>
                      <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-left-text">
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
      ? cyclopediadata.filter(rowc => rowc.cyclopedia_name && rowc.cyclopedia_name.startsWith(selectedLetter))
      : cyclopediadata;

    const firstTwentyCyclopediaRecords = filteredData.slice(0, 90);

    const alphabet = 'A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z';

    return (
      <>          <DBSearchComponent />
        <div>
          <div className='Font-Spacer-White'>Make this spacer white</div>
          {/* <div className="Font-Verdana-Larger-Howto-Rusty-Bold"> */}
          <div className="Font-Segoe-Large-FP">
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

            {/* {firstTwentyCyclopediaRecords.map(({ cyclopedia_id, cyclopedia_name, cyclopedia_desc }) => (editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc)))} */}
              
              {firstTwentyCyclopediaRecords.map((rowc, index) => (
                <tr key={index}>
                  <td className="fphover2">
                    {rowc && (
                      <div style={{ cursor: 'pointer' }}>
                        <b>{rowc.cyclopedia_name}:</b>&nbsp;<i>{rowc.cyclopedia_desc}</i>



                        
                        <div className='Font-Spacer-White'>Make this spacer white</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };



  const InnerTableRight = () => {

    const amazonIframes =
      [
        "https://read.amazon.co.uk/kp/card?asin=B077WWRK8B&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_F3HQKNR4EF2MMXB0WS0D",
        "https://read.amazon.co.uk/kp/card?asin=B081Y5262X&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_H757NZNCTQK525FX3349",

      ];

    const groupedHowtoData = {};
    howtodata.forEach((row) => {
      if (!groupedHowtoData[row.howto_cat]) {
        groupedHowtoData[row.howto_cat] = [];
      }
      groupedHowtoData[row.howto_cat].push(row);
    }
    );

    const sortedHowtoCategories = Object.keys(groupedHowtoData).sort();

    return (
      <div>
        <table className="Table-home-centre"> <Tooltip id="insert" />
          <tbody>

            {sortedHowtoCategories.map((category) => (
              <>&nbsp;
                <tr key={category}>
                  <th colSpan="2" style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }} className="Table-home-right-heading">{category}</th>
                </tr>
                {groupedHowtoData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-right-text">
                      <a href={`/howtoedit/${record.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.howto_summary}>{record.howto_name}</a>
                    </td>
                  </tr>
                ))}
              </>
            ))}



            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
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
    <>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ height: '20px' }}>
            {/* <td style={{ width: '25%'}}><div className="marquee-container"><div className="marquee"><span><GiGiftOfKnowledge fontSize={40}/> Life Long Learning</span></div></div></td> */}
            <td style={{ width: '25%'}}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%'}}><img src={Image} /></td>
            <td style={{ width: '1%' }}></td>
            {/* <td style={{ width: '25%'}}><HowtoTicker howtodataticker={howtodata}/></td> */}
            <td style={{ width: '25%'}}></td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <td style={{ width: '25%' }} className="Table-home-left"><InnerTableLeft /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }} className="Table-home-centre"><InnerTableCentre /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '25%' }} className="Table-home-right"><InnerTableRight /></td>
          </tr>
        </tbody>
      </table>
    </>
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