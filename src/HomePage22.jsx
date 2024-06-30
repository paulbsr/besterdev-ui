import { useState, useEffect, React } from 'react'
import { Tooltip } from 'react-tooltip'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Image from './graphix/12.png' //Lady Liberty
// import Image from './graphix/Darknet12.png' //Blue Door
import ImageLeft from './graphix/1.jpg'
import DBSearchComponent from './DBSearchComponent';
import HowtoTicker from './HowtoTicker';
import { BsQuestionOctagonFill } from "react-icons/bs";
import { GiGiftOfKnowledge } from "react-icons/gi";
import TaskSummaryHomepage from './TaskSummaryHomepage';
import { useWebsiteApi } from './WebSiteAPIProvider';

export default function HomePage22(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [taskdata, setTaskdata] = useState([]);
  // const [websitedata, setWebsitedata] = useState([]);
  const [howtodata, setHowtodata] = useState([]);
  const [cyclopediadata, setCyclopediaData] = useState([]);
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContext :-)

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
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      // axios('http://localhost:8000/api/v1/howtos')
      .then((response) => {
        const sortedHowtodata = response.data.sort((a, b) => a.howto_name.localeCompare(b.howto_name));
        setHowtodata(sortedHowtodata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);

  useEffect(() => {
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

  const handleLinkClick = (howtoId) => {
    setHowtoIdd(howtoId);
    setShowHowtoEdit(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const InnerTableLeft = () => {
    const groupedData = {};
    websiterootdata.forEach((row) => {
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
              <>
                &nbsp;
                <tr key={category}>
                  <th colSpan="2" style={{ textAlign: 'right', borderBottom: '1px solid #ddd' }} className="Table-home-left-heading">
                    {category.includes("HOWTO") ? category.replace("HOWTO :: CMM ->", "").replace("HOWTO :: ", "") : category}
                  </th>
                </tr>
                {groupedData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-left-text">
                      <a href={record.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.website_desc}>
                        {record.website_name}
                      </a>
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
    const filteredData = selectedLetter ? cyclopediadata.filter((rowc) => rowc.cyclopedia_name && rowc.cyclopedia_name.startsWith(selectedLetter)) : cyclopediadata;

    const firstTwentyCyclopediaRecords = filteredData.slice(0, 30);

    const alphabet = 'A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z';

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
            {alphabet.split('').map((letter, index) => (
              <span
                style={{ cursor: 'pointer' }}
                key={index}
                className={selectedLetter === letter ? 'selected' : ''}
                onClick={() => setSelectedLetter(letter)}
              >
                &nbsp;&nbsp;{letter}
              </span>
            ))}
            &nbsp; &nbsp; ({cyclopediadata.length})
          </div>

          <div className='Font-Spacer-White'>Make this spacer white</div>

          <table className="Table-home-centre">
            <tbody>
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
    const amazonIframes = [
      "https://read.amazon.co.uk/kp/card?asin=B077WWRK8B&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_F3HQKNR4EF2MMXB0WS0D",
      "https://read.amazon.co.uk/kp/card?asin=B081Y5262X&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_H757NZNCTQK525FX3349",
    ];

    const groupedHowtoData = {};
    howtodata.forEach((row) => {
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
            <td style={{ width: '25%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }}>
              <img src={Image} />
            </td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '25%' }}></td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <td style={{ width: '25%' }} className="Table-home-left">
              <InnerTableLeft />
            </td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }} className="Table-home-centre">
              <InnerTableCentre />
            </td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '25%' }} className="Table-home-right">
              <InnerTableRight />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  return (
    <div className='Font-Verdana-Medium-Postgres'>
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

        <tbody>
          {websiterootdata.map((row, index) => {
            const howtoRow = howtodata[index];
            const cyclopediaRow = cyclopediadata[index];

            return (
              <tr key={index}>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
