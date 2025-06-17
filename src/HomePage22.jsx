import { useState, useEffect, React } from 'react'
import { Tooltip } from 'react-tooltip'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Image from './graphix/12.png' //Lady Liberty
import DBSearchComponent from './dbsearch/DBSearchComponent';
import TaskSummaryHomepage from './tasks/TaskSummaryHomepage';
import { useWebsiteApi } from './websites/WebSiteAPIProvider';
import { useCyclopediaApi } from './cyclopedia/CyclopediaAPIProvider';
import { useHowtoApi } from './howto/HowtoAPIProvider';
import { useNavigate } from 'react-router-dom';
import WebSocketEvent from './websockets/WebSocketEvent';
import CombinedCreateFP from './quicks/CombinedCreateFP';



export default function HomePage22(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [taskdata, setTaskdata] = useState([]);
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContext :-)
  // const { cyclopediarootdata } = useCyclopediaApi(); //gebruik van die nuwe useContext :-)
  const { howtorootdata } = useHowtoApi(); //gebruik van die nuwe useContext :-)
  const [ fourtyRandomRecords, setFourtyRandomRecords] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks')
      // axios('http://localhost:8000/api/v1/tasks')
      .then((response) => {
        const sortedtaskdata = response.data.sort((b, a) => b.taskname.localeCompare(a.taskname));
        setTaskdata(sortedtaskdata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/alphabet/random')
    // axios('http://localhost:8000/api/v1/cyclopedia/alphabet/random')
      .then((response) => {
        const fourtyRandomRecordsAPI = response.data;
        setFourtyRandomRecords(fourtyRandomRecordsAPI);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


  useEffect(() => {
    axios
      .get("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/triggerwebsocketevent")
      .then(() => {
        console.log("WebSocket event triggered.");
      })
      .catch((error) => {
        console.error("Failed to trigger WebSocket event:", error);
      });
  }, []);



  // const shuffleCyclopediaArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // };

  const handleLinkClick = (howtoId) => {
    setHowtoIdd(howtoId);
    setShowHowtoEdit(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const InnerTableLeft = () => {
    const groupedData = {};
    websiterootdata.forEach((row) => {
      if (!groupedData[row.websiteCat]) {
        groupedData[row.websiteCat] = [];
      }
      groupedData[row.websiteCat].push(row);
    });

    const sortedCategories = Object.keys(groupedData).sort();

    // State to manage which categories are expanded
    const [expandedCategories, setExpandedCategories] = useState({});

    // Function to toggle category expansion
    const toggleCategory = (category) => {
      setExpandedCategories(prevState => ({
        ...prevState,
        [category]: !prevState[category]
      }));
    };

    return (
      <div className="scrollable-container">
        <table className="Table-home-left">
          <tbody>
            {sortedCategories
              .filter(
                category =>
                  category !== "HOWTO :: CMM -> 2-Quality Engineering (QE)" &&
                  category !== "HOWTO :: CMM -> 1-Site Reliability Engineering​ (SRE)" &&
                  category !== "HOWTO :: CMM -> 3-Observability (OBS)" &&
                  category !== "HOWTO :: CMM -> 4-Chaos Engineering (CE)"
              )
              .map((category) => (
                <>
                  <tr key={category}>
                    <th
                      // colSpan="2"
                      style={{ textAlign: 'right', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                      className="Table-home-left-heading"
                      onClick={() => toggleCategory(category)}
                    >
                      {category.includes("HOWTO")
                        ? category.replace("HOWTO :: CMM ->", "").replace("HOWTO :: ", "")
                        : category}
                    </th>
                  </tr>

                  {/* Conditionally render the category's content based on expanded state */}
                  {expandedCategories[category] && groupedData[category].map((record, index) => (
                    <tr key={index}>
                      <td style={{ width: '1%', verticalAlign: 'top' }} className="Table-home-left-text">
                        <a href={record.websiteUrl} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.websiteDesc}>
                          {record.websiteName}
                        </a>
                        {/* <div>&nbsp;</div> */}
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
    // const [selectedLetter, setSelectedLetter] = useState(null);

    // Assuming cyclopediadata is an array of objects with a property 'cyclopediaName'
    // const filteredData = selectedLetter ? cyclopediarootdata.filter((rowc) => rowc.cyclopediaName && rowc.cyclopediaName.startsWith(selectedLetter)) : cyclopediarootdata;

    // const firstTwentyCyclopediaRecords = filteredData.slice(0, 40);

    // const alphabet = 'A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z';

    const groupedData2 = {};
    taskdata.forEach((row) => {
      if (!groupedData2[row.taskstatus]) {
        groupedData2[row.taskstatus] = [];
      }
      groupedData2[row.taskstatus].push(row);
    });

    const sortedCategories2 = Object.keys(groupedData2).sort();

    return (
      <>
        <DBSearchComponent />
        <TaskSummaryHomepage />
        <div>
          <div className='Font-Spacer-White'>Make this spacer white</div>
          
          <div className="Font-Segoe-Large-FP">
          {/* {cyclopediarootdata.length}:
            {alphabet.split('').map((letter, index) => (
              <span
                style={{ cursor: 'pointer' }}
                key={index}
                className={selectedLetter === letter ? 'selected' : ''}
                onClick={() => setSelectedLetter(letter)}
              >
                &nbsp;&nbsp;{letter}
              </span>
            )
          )
          } */}
            {/* &nbsp; &nbsp; ({cyclopediarootdata.length}) */}
          </div>

          <div className='Font-Spacer-White'>Make this spacer white</div>

          <table className="Table-home-centre">
            <tbody>
              {/* {firstTwentyCyclopediaRecords.map((rowc, index) => ( */}
              
              {fourtyRandomRecords.map((rowc, index) => (
  
                <tr key={index}>
                  <td className="fphover2">
                    {rowc && (
                      <div style={{ cursor: 'pointer' }}>
                        <a onClick={() => navigate(`/cyclopediaedit/${rowc.cyclopediaId}`)}>
                          <b>{rowc.cyclopediaName}:</b>&nbsp;<i>{rowc.cyclopediaDesc}</i>
                        </a>
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
    const amazonIframes = [
      "https://read.amazon.co.uk/kp/card?asin=B077WWRK8B&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_F3HQKNR4EF2MMXB0WS0D",
      "https://read.amazon.co.uk/kp/card?asin=B081Y5262X&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_H757NZNCTQK525FX3349",
    ];

    const groupedHowtoData = {};
    howtorootdata.forEach((row) => {
      if (!groupedHowtoData[row.howto_cat]) {
        groupedHowtoData[row.howto_cat] = [];
      }
      groupedHowtoData[row.howto_cat].push(row);
    });

    const sortedHowtoCategories = Object.keys(groupedHowtoData).sort();

    return (
      <div>
        <table className="Table-home-centre">
          <Tooltip id="insert" />
          <tbody>
            {sortedHowtoCategories.map((category) => (
              <>
                &nbsp;
                <tr key={category}>
                  <th colSpan="2" style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }} className="Table-home-right-heading">
                    {category}
                  </th>
                </tr>
                {groupedHowtoData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-right-text">
                      <a href={`/howtoedit/${record.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.howto_summary}>
                        {record.howto_name}
                      </a>
                    </td>
                  </tr>
                ))}
              </>
            ))}

            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            {howtorootdata.length > 0 && (
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
            <td style={{ width: '25%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }}><img src={Image} /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '25%' }}></td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ height: '20px' }}>
            <td style={{ width: '5%' }}></td>
            {/* <td style={{ width: '90%' }}><WebSocketEvent/></td> */}
            <td style={{ width: '90%' }}></td>
            <td style={{ width: '5%' }}></td>
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
    <div>
      &nbsp; &nbsp;
      <OuterTable />
      <table style={{ width: '100%' }}>
        <thead>
          <tr></tr>
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
            <th style={{ width: '25%' }}></th>
            <th style={{ width: '1%' }}></th>
            <th style={{ width: '48%' }}></th>
            <th style={{ width: '1%' }}></th>
            <th style={{ width: '25%' }}></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
