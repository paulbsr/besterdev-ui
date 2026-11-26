import { useState, useEffect, useRef, Fragment } from 'react'
import { Tooltip } from 'react-tooltip'
import './Fonts.css';
import 'react-dropdown/style.css';
import KnowledgeHero from './graphix/knowledge-hero.svg';
import TaskSummaryHomepage from './tasks/TaskSummaryHomepage';
import { useWebsiteApi } from './websites/WebSiteAPIProvider';
import { useHowtoApi } from './howto/HowtoAPIProvider';
import { useNavigate } from 'react-router-dom';
import OAuth2APIClient from './oauth2/OAuth2APIClient';
import { TechStackIcons } from './banners/BannerLight';
import { GitHubCalendar } from 'react-github-calendar';
import './HomePage.css';

const WEEKS_SHOWN = 53;
const BLOCK_MARGIN = 2;
const LABEL_ALLOWANCE = 36;
const FIRST_CONTRIBUTION_YEAR = 2020;

// Sizes the contribution blocks so the whole year fits the container width.
function GitHubContributions({ username, year }) {
  const containerRef = useRef(null);
  const [blockSize, setBlockSize] = useState(8);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return undefined;
    const update = () => {
      const available = element.clientWidth - LABEL_ALLOWANCE;
      const size = Math.floor(available / WEEKS_SHOWN) - BLOCK_MARGIN;
      setBlockSize(Math.max(4, Math.min(12, size)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="home-github-contributions" aria-label="GitHub contributions">
      <GitHubCalendar
        username={username}
        year={year}
        colorScheme="dark"
        blockSize={blockSize}
        blockMargin={BLOCK_MARGIN}
        fontSize={11}
      />
    </section>
  );
}
export default function HomePage22(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [contributionYear, setContributionYear] = useState('last');
  const currentYear = new Date().getFullYear();
  const contributionYears = Array.from(
    { length: currentYear - FIRST_CONTRIBUTION_YEAR + 1 },
    (_, index) => currentYear - index
  );
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContext :-)
  const { howtorootdata } = useHowtoApi(); //gebruik van die nuwe useContext :-)
  const [fourtyRandomRecords, setFourtyRandomRecords] = useState([]);
  const randomLetter = fourtyRandomRecords.find((record) => record?.cyclopediaName)
    ?.cyclopediaName.trim().charAt(0).toUpperCase();
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
        <section className="home-overview-card" aria-label="Cyclopedia">
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
    const [expandedCategories, setExpandedCategories] = useState({});
    const groupedHowtoData = {};
    howtoRecords.forEach((row) => {
      if (!groupedHowtoData[row.howto_cat]) {
        groupedHowtoData[row.howto_cat] = [];
      }
      groupedHowtoData[row.howto_cat].push(row);
    });

    const sortedHowtoCategories = Object.keys(groupedHowtoData).sort();
    const toggleCategory = (category) => {
      setExpandedCategories((previous) => ({
        ...previous,
        [category]: !previous[category],
      }));
    };

    return (
      <div>
        <table className="Table-home-centre">
          <Tooltip id="insert" />
          <tbody>
            {sortedHowtoCategories.map((category) => (
              <Fragment key={category}>
                <tr>
                  <th
                    colSpan="2"
                    aria-expanded={Boolean(expandedCategories[category])}
                    onClick={() => toggleCategory(category)}
                    style={{ textAlign: 'left', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                    className="Table-home-right-heading"
                  >
                    {category}
                  </th>
                </tr>
                {expandedCategories[category] && groupedHowtoData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Table-home-right-text">
                      <a href={`/howtoedit/${record.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.howto_summary}>
                        {record.howto_name}
                      </a>
                    </td>
                  </tr>
                ))}
              </Fragment>
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
          <h1>Welcome to my workspace</h1>
          <p>Explore your tasks, curated resources, and practical guides.</p>
        </div>
        <TechStackIcons />
      </header>

      <div className="home-grid">
        <aside className="home-panel home-side-panel home-resources-panel" aria-labelledby="home-resources-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-resources-title">Web resources</h2>
            </div>
          </div>
          <InnerTableLeft />
        </aside>

        <div className="home-centre-column">
        <section className="home-panel home-github-panel" aria-labelledby="home-github-title">
          <div className="home-panel-heading home-github-heading">
            <div>
              <h2 id="home-github-title">GitHub contributions</h2>
            </div>
            <select
              className="home-github-year-select"
              aria-label="Contribution year"
              value={contributionYear}
              onChange={(event) => {
                const { value } = event.target;
                setContributionYear(value === 'last' ? 'last' : Number(value));
              }}
            >
              <option value="last">Last 12 months</option>
              {contributionYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <GitHubContributions username="paulbsr" year={contributionYear} />
        </section>

        <section className="home-panel home-tasks-panel" aria-labelledby="home-tasks-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-tasks-title">Tasks</h2>
            </div>
          </div>
          <TaskSummaryHomepage />
        </section>

        <main className="home-panel home-main-panel" aria-labelledby="home-overview-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-overview-title">Cyclopedia</h2>
              {randomLetter && <p>Randomly selected Letter "{randomLetter}"</p>}
            </div>
          </div>
          <InnerTableCentre />
        </main>
        </div>

        <aside className="home-panel home-side-panel home-guides-panel" aria-labelledby="home-guides-title">
          <div className="home-panel-heading">
            <div>
              <h2 id="home-guides-title">How-to guides</h2>
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