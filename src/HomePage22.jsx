import { useState, useEffect, React } from 'react'
import { Tooltip } from 'react-tooltip'
import './Fonts.css';
import 'react-dropdown/style.css';
import KnowledgeHero from './graphix/knowledge-hero.svg';
import DBSearchComponent from './dbsearch/DBSearchComponent';
import TaskSummaryHomepage from './tasks/TaskSummaryHomepage';
import { useWebsiteApi } from './websites/WebSiteAPIProvider';
import { useHowtoApi } from './howto/HowtoAPIProvider';
import { useNavigate } from 'react-router-dom';
import OAuth2APIClient from './oauth2/OAuth2APIClient';
import './HomePage.css';

export default function HomePage22(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContext :-)
  const { howtorootdata } = useHowtoApi(); //gebruik van die nuwe useContext :-)
  const [fourtyRandomRecords, setFourtyRandomRecords] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/alphabet/random',
          {
            caller: 'HomePage22/cyclopedia'
          })
      .then((response) => {
        const fourtyRandomRecordsAPI = response.data;
        setFourtyRandomRecords(fourtyRandomRecordsAPI);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


  useEffect(() => {
    OAuth2APIClient.get("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/triggerwebsocketevent",
          {
            caller: 'HomePage22/websocket'
          })
      .then(() => {
        console.log("WebSocket event triggered.");
      })
      .catch((error) => {
        console.error("Failed to trigger WebSocket event:", error);
      });
  }, []);


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
    return (
      <div className="home-overview-sections">
        <section className="home-overview-card" aria-labelledby="home-overview-tasks-title">
          <h3 id="home-overview-tasks-title" className="home-overview-card-heading">Tasks</h3>
          <TaskSummaryHomepage />
        </section>

        <section className="home-overview-card" aria-labelledby="home-overview-cyclopedia-title">
          <h3 id="home-overview-cyclopedia-title" className="home-overview-card-heading">Cyclopedia</h3>
          <div className="home-overview-cyclopedia-list">
            <table className="Table-home-centre">
            <tbody>
              {fourtyRandomRecords.map((rowc, index) => (
                <tr key={index}>
                  <td className="fphover2">
                    {rowc && (
                      <div style={{ cursor: 'pointer' }}>
                        <a onClick={() => navigate(`/cyclopediaedit/${rowc.cyclopediaId}`)}>
                          <b className="home-centre-topic">{rowc.cyclopediaName}:</b>&nbsp;<i>{rowc.cyclopediaDesc}</i>
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  };





  const InnerTableRight = () => {
    const howtoRecords = howtorootdata || [];
    const groupedHowtoData = {};
    howtoRecords.forEach((row) => {
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

          </tbody>
        </table>
      </div>
    );
  };

  const OuterTable = () => {
    return (
      <div className="home-page">
        <div className="home-dashboard">
      <div className="home-hero">
        <img src={KnowledgeHero} alt="Curious Creative Autodidactic, with an animated constellation of connected knowledge nodes" />
      </div>

      <header className="home-intro">
        <div>
          <p className="home-eyebrow">BESTER · KNOWLEDGE WORKSPACE</p>
          <h1>Welcome to your workspace</h1>
          <p>Explore your tasks, curated resources, and practical guides.</p>
        </div>
        <button
          className="home-theme-toggle"
          type="button"
          aria-pressed={props.isDarkMode}
          onClick={props.onToggleTheme}
        >
          Switch to {props.isDarkMode ? 'light' : 'dark'} mode
        </button>
      </header>

      <div className="home-grid">
        <aside className="home-panel home-side-panel" aria-labelledby="home-resources-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-resources-title">Web resources</h2>
              <p>Curated links by topic</p>
            </div>
          </div>
          <InnerTableLeft />
        </aside>

        <main className="home-panel home-main-panel" aria-labelledby="home-overview-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-overview-title">Your overview</h2>
              <p>Tasks, learning, and ideas in one place</p>
            </div>
          </div>
          <InnerTableCentre />
        </main>

        <aside className="home-panel home-side-panel" aria-labelledby="home-guides-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-guides-title">How-to guides</h2>
              <p>Browse practical walkthroughs</p>
            </div>
          </div>
          <InnerTableRight />
        </aside>
      </div>
        </div>
      </div>
    );
  };

  return (
    <OuterTable />
  );
}