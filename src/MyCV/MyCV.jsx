import { useState, useEffect, React } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import '../Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import Image from './Darknet12.png'
import TUS from './TUS.png'
import LYIT from './LYIT.png'
import DCU from './DCU.png'
import Testimonial_TB from './Testimonial_TB.png'
import Testimonial_2 from './Testimonial_2.png'
import { GiCheckMark } from "react-icons/gi";
import MyCVEmployerRoles from './MyCVEmployerRoles';
import { MdOutlineSummarize } from "react-icons/md";
import { FaHighlighter } from "react-icons/fa6";
import { IoTrophyOutline } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";


export default function MyCV(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpandedSummary, setExpandedSummary] = useState(false);
  const [isExpandedExpertise, setExpandedExpertise] = useState(false);
  const [isExpandedHighlights, setExpandedHighlights] = useState(false);
  const [isExpandedTestimonials, setExpandedTestimonials] = useState(false);
  const [isExpandedRoles, setExpandedRoles] = useState(false);
  const [mycvdata, setMycvdata] = useState([]);
  const [mycvcareersummary, setMycvcareersummary] = useState([]);
  const [mycvcareerexpertise, setMycvcareerexpertise] = useState([]);
  const [mycvcareerhighlights, setMycvcareerhighlights] = useState([]);
  const [error, setError] = useState(null);
  const toggleAccordionSummary = () => { setExpandedSummary(!isExpandedSummary); };
  const toggleAccordionExpertise = () => { setExpandedExpertise(!isExpandedExpertise); };
  const toggleAccordionHighlights = () => { setExpandedHighlights(!isExpandedHighlights); };
  const toggleAccordionTestimonials = () => { setExpandedTestimonials(!isExpandedTestimonials); };


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
        mycvcareerexpertiseIB.sort((a, b) => a.id - b.id);
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
        mycvcareerhighlightsIB.sort((a, b) => b.id - a.id);
        setMycvcareerhighlights(mycvcareerhighlightsIB);
      })
      .catch((error) => {
        console.error("Error fetching mycvcareerhighlights data:", error);
      });
  }, [checkForRecords]);

  if (error) return <p>Error fetching mycvcareerhighlights data</p>

  const OuterTable = () => (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '10%' }}></td>
            <td style={{ width: '1%' }}></td>
            {/* <td style={{ width: '48%' }}><img src={Image} /></td> */}
            <td style={{ width: '48%' }}></td>
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

            <tr>
              <th className="Font-Segoe-Medium-Howto-CV">
                This web presence is developed by me personally. You are welcome to review the <a href={'https://github.com/paulbsr/besterdev-ui'} target="_blank" rel="noreferrer">front-end UI</a> and the <a href={'https://github.com/paulbsr/besterdev-api'} target="_blank" rel="noreferrer">back-end API</a> repos on Github. 
                The FE is developed using ReactJS and hosted on AWS Aplify. The BE MicroService is developed with Java/Spring hosted on Heroku alongisde a PostgreSQL database. Identity and Authorization (IAM) is porvided by Google's Firebase. I use Git for VCS and Maven for Builds. Swagger is available by clicking on the icon above.
              </th>
            </tr>

            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionSummary} style={{ cursor: 'pointer' }}>
              <MdOutlineSummarize style={{ color: '#336791', display: 'round', margin: 'auto', fontSize: '30px', cursor: 'pointer' }} />
              &nbsp;&nbsp;Professional Summary
              {/* {isExpandedSummary && */}

                {/* ( */}
                  <div className="mycvhover">
                    {mycvcareersummary && mycvcareersummary.map((summary) =>
                    (
                      <tr key={summary.id}>{summary.career_summary}</tr>
                    )
                    )
                    }
                  </div>
                {/* ) */}
              {/* } */}
            </div>
            <div>&nbsp;</div>






            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionExpertise} style={{ cursor: 'pointer' }}>
              <GiSkills style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} />
              &nbsp;&nbsp;Areas of Expertise
              {isExpandedExpertise && (
                <div>
                  <table className="expertise-table">
                    <tbody>
                      {mycvcareerexpertise &&
                        mycvcareerexpertise.reduce((rows, expertise, index) => {
                          if (index % 5 === 0) rows.push([]);
                          rows[rows.length - 1].push(expertise);
                          return rows;
                        }, []).map((row, rowIndex) => (
                          <tr key={rowIndex} className="mycvhover">
                            {row.map((expertise, colIndex) => (
                              <td key={expertise.id} style={{ width: '21%' }}>
                                <GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} />&nbsp;
                                {expertise.expertise_desc}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div>&nbsp;</div>


            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionHighlights} style={{ cursor: 'pointer' }}>
              <FaHighlighter style={{ color: '#336791', display: 'round', margin: 'auto', fontSize: '28px', cursor: 'pointer' }} />
              &nbsp;&nbsp;Career Highlights
              {isExpandedHighlights && (
                <div>
                  {mycvcareerhighlights && mycvcareerhighlights.map((highlight) =>
                  (
                    <tr className='mycvhover' key={highlight.id}> <GiCheckMark style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} />&nbsp;{highlight.highlight_desc}</tr>
                  )
                  )
                  }
                </div>
              )
              }
            </div>
            <div>&nbsp;</div>


            <div className="CV-Font-Calibri-Large-Italic-PG" onClick={toggleAccordionTestimonials} style={{ cursor: 'pointer' }}>
              <IoTrophyOutline style={{ color: '#336791', display: 'round', margin: 'auto', fontSize: '28px', cursor: 'pointer' }} />
              &nbsp;&nbsp;Testimonials
              {isExpandedTestimonials &&
                (
                  <div >
                    <img src={Testimonial_TB} width="400" height="200" />
                    <div className='Font-Verdana-Small-Footer'>Tony Bolton, VP of Global Telecoms, 2021.</div>
                    <img src={Testimonial_2} width="100" height="50" />
                    <div className='Font-Verdana-Small-Footer'>Tony Bolton, VP of Global Telecoms, 2021.</div>
                  </div>
                )
              }
            </div>
            <div>&nbsp;</div>



            {mycvdata && mycvdata.map((emp) => (
              <tr key={emp.employer_id}>
                <td >
                  <MyCVEmployerRoles mycvdata1={mycvdata} employer_id1={emp.employer_id} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
                </td>
              </tr>
            )
            )
            }
          </thead>
          <tbody>
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
            <img src={LYIT} width="240" height="300" />
            <div>MSc. Software Engineering</div>
            <div>AthloneIT (TUS), 2022</div>
            <div className='Font-Spacer-White'>Make this spacer white</div>
            <img src={TUS} width="240" height="300" />
            <div>MSc. Cloud Computing</div>
            <div>LetterkennyIT (LYIT), 2019</div>
            <div className='Font-Spacer-White'>Make this spacer white</div>
            <img src={DCU} width="240" height="300" />
            <div>BSc. Information Technology & Computer Science</div>
            <div>Dublin City University (DCU), 2013</div>
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