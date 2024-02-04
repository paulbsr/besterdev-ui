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
import { GiAchievement } from "react-icons/gi";


export default function MyCV(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpandedSummary, setExpandedSummary] = useState(false);
  const [isExpandedExpertise, setExpandedExpertise] = useState(false);
  const [isExpandedHighlights, setExpandedHighlights] = useState(false);
  const [mycvdata, setMycvdata] = useState([]);
  const [mycvcareersummary, setMycvcareersummary] = useState([]);
  const [mycvcareerexpertise, setMycvcareerexpertise] = useState([]);
  const [mycvcareerhighlights, setMycvcareerhighlights] = useState([]);

  const [error, setError] = useState(null);
  const toggleAccordionSummary = () => { setExpandedSummary(!isExpandedSummary); };
  const toggleAccordionExpertise = () => { setExpandedExpertise(!isExpandedExpertise); };
  const toggleAccordionHighlights = () => { setExpandedHighlights(!isExpandedHighlights); };



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


  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mycv/summary`)
      .then((response) => {
        const mycvcareersummaryIB = response.data;
        setMycvcareersummary(mycvcareersummaryIB);
      })
      .catch((error) => {
        console.error("Error fetching mycvcareersummary data:", error);
      });
  }, [checkForRecords]);


  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mycv/expertise`)
      .then((response) => {
        const mycvcareerexpertiseIB = response.data;
        mycvcareerexpertiseIB.sort((a, b) => b.expertise - a.expertise);
        setMycvcareerexpertise(mycvcareerexpertiseIB);
      })
      .catch((error) => {
        console.error("Error fetching mycvcareerexpertise data:", error);
      });
  }, [checkForRecords]);


  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mycv/highlights`)
      .then((response) => {
        const mycvcareerhighlightsIB = response.data;
        mycvcareerhighlightsIB.sort((a, b) => b.highlight - a.highlight);
        setMycvcareerhighlights(mycvcareerhighlightsIB);
      })
      .catch((error) => {
        console.error("Error fetching mycvcareerhighlights data:", error);
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
        <table style={{ width: '1200px' }}>
          <thead>
            
            <tr className="TableCV">
              <th>Curriculum Vitae of Paul Bester</th>
            </tr>

            <tr className="Font-Calibri-Medium-MyCV">
              <th >
                This web presence was developed by me personally. You are welcome to review the <a href={'https://github.com/paulbsr/besterdev-ui'} target="_blank">front-end UI</a> and the <a href={'https://github.com/paulbsr/besterdev-api'} target="_blank">back-end API</a> repos on Github. The Tech Stack is JavaScript and NodeJS for the FE/UI hosted on AWS Amplify. The back-end API/MicroServices are developed in Java using the SpringBoot Framework hosted on Heroku alongisde the PostgreSQL database. Identity and Authorization (IAM) is porvided by Google's Firebase. I use Git for VCS and Maven for Builds. Swagger is available by clicking on the icon above.
              </th>
            </tr>
            
            
            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionSummary}><b>Professional Summary:</b>
            {isExpandedSummary && (
              <div className="mycvhover">
                {mycvcareersummary && mycvcareersummary.map((summary) =>
                (
                  <tr key={summary.id}>{summary.career_summary}</tr>
                )
                )
                }
              </div>)}
            </div>
            <div>&nbsp;</div>


            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionExpertise}><b>Areas of Expertise:</b>
             {isExpandedExpertise && (
               <div >
                 {mycvcareerexpertise && mycvcareerexpertise.map((expertise) =>
                 (
                  <tr className="mycvhover" key={expertise.id}> <GiAchievement style={{ color: '#169247', display: 'round', margin: 'auto', fontSize: '20px' }} />{expertise.expertise_desc}</tr>
                 )
                 )
                 }
               </div>)}
             </div>
             <div>&nbsp;</div>


             <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionHighlights}><b>Career Highlights:</b>
             {isExpandedHighlights && (
               <div >
                 {mycvcareerhighlights && mycvcareerhighlights.map((highlight) =>
                 (
                  <tr key={highlight.id}> <GiAchievement style={{ color: '#169247', display: 'round', margin: 'auto', fontSize: '19px' }} />{highlight.highlight_desc}</tr>
                 )
                 )
                 }
               </div>)}
             </div>
             <div>&nbsp;</div>

            <tr>
              <th className="CV-Font-Calibri-Large-Italic-PG">Testimonials</th>
            </tr>
          </thead>

          <tbody>
            {mycvdata && mycvdata.map((emp) => (
              <tr key={emp.employer_id}>
                <td className="CV-Font-Calibri-Large-Italic-PG">
                  <MyCVEmployers
                    mycvdata={mycvdata}
                    employer_name={emp.employer_name}
                    employer_start={emp.employer_start}
                    employer_end={emp.employer_end}
                    employer_id={emp.employer_id}
                    employer_desc={emp.employer_desc}
                    checkForRecords={checkForRecords}
                    setCheckForRecords={setCheckForRecords}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  const InnerTableRight = () => {
    return (
      <div className="CV-Font-Calibri-Large-Italic-PG">
        <table>
          <tbody>
            <img src={TUS} width="240" height="300" />
            <div>MSc. Software Engineering</div>
            <div>AthloneIT (TUS), 2022</div>
            <div className='Font-Spacer-White'>Make this spacer white</div>
            <img src={LYIT} width="240" height="300" />
            <div>MSc. Cloud Computing</div>
            <div>LetterkennyIT (LYIT), 2019</div>
            <div className='Font-Spacer-White'>Make this spacer white</div>
            <img src={DCU} width="240" height="300" />
            <div>BSc. Information Technology & Computer Science</div>
            <div>Dublin City University (DCU), 2007</div>
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