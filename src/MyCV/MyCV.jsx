import { useEffect, useState } from 'react';
import '../Fonts.css';
import './MyCV.css';
import TUS from './TUS.png';
import TUS2 from './TUS2.png';
import LYIT from './LYIT.png';
import DCU from './DCU.png';
import GM from './GM.png';
import HP from './HP.png';
import DELL from './DELL.png';
import BSR from './BSR.jpg';
import Testimonial_TB from './Testimonial_TB.png';
import Testimonial_2 from './Testimonial_2.png';
import { GiCheckMark, GiSkills } from 'react-icons/gi';
import { MdOutlineSummarize, MdWorkOutline } from 'react-icons/md';
import { FaHighlighter } from 'react-icons/fa6';
import { IoTrophyOutline } from 'react-icons/io5';
import MyCVEmployerRoles from './MyCVEmployerRoles';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const apiBaseUrl = 'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/mycv';

function SectionHeading({ icon, children, expanded, onClick, id }) {
  return (
    <button
      className="cv-section-toggle"
      type="button"
      aria-expanded={expanded}
      aria-controls={id}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
      <span className="cv-toggle-indicator" aria-hidden="true">{expanded ? '−' : '+'}</span>
    </button>
  );
}

export default function MyCV() {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpandedExpertise, setExpandedExpertise] = useState(false);
  const [isExpandedHighlights, setExpandedHighlights] = useState(false);
  const [isExpandedTestimonials, setExpandedTestimonials] = useState(false);
  const [mycvdata, setMycvdata] = useState([]);
  const [mycvcareersummary, setMycvcareersummary] = useState([]);
  const [mycvcareerexpertise, setMycvcareerexpertise] = useState([]);
  const [mycvcareerhighlights, setMycvcareerhighlights] = useState([]);

  useEffect(() => {
    OAuth2APIClient.get(apiBaseUrl)
      .then(({ data }) => {
        data.sort((a, b) => b.employer_id - a.employer_id);
        setMycvdata(data);
      })
      .catch((error) => console.error('Error fetching CV data:', error));
  }, [checkForRecords]);

  useEffect(() => {
    OAuth2APIClient.get(`${apiBaseUrl}/summary`)
      .then(({ data }) => setMycvcareersummary(data))
      .catch((error) => console.error('Error fetching CV summary:', error));
  }, [checkForRecords]);

  useEffect(() => {
    OAuth2APIClient.get(`${apiBaseUrl}/expertise`)
      .then(({ data }) => {
        data.sort((a, b) => a.id - b.id);
        setMycvcareerexpertise(data);
      })
      .catch((error) => console.error('Error fetching CV expertise:', error));
  }, [checkForRecords]);

  useEffect(() => {
    OAuth2APIClient.get(`${apiBaseUrl}/highlights`)
      .then(({ data }) => {
        data.sort((a, b) => b.id - a.id);
        setMycvcareerhighlights(data);
      })
      .catch((error) => console.error('Error fetching CV highlights:', error));
  }, [checkForRecords]);

  return (
    <div className="cv-route" data-theme="dark">
      <div className="cv-page">
        <div className="cv-dashboard">
          <header className="cv-intro">
            <div>
              <p className="cv-eyebrow">PAUL BESTER · CURRICULUM VITAE</p>
              <h1>Skills, Experience and Education</h1>
              <p>
                A snapshot of my career, technical strengths, and continuous learning.
              </p>
            </div>
          </header>

          <div className="cv-grid">
            <main className="cv-main-column">
              <section className="cv-panel cv-summary-panel" aria-labelledby="cv-summary-title">
                <div className="cv-panel-heading">
                  <MdOutlineSummarize aria-hidden="true" />
                  <div>
                    <h2 id="cv-summary-title">Professional summary</h2>
                  </div>
                </div>
                <div className="cv-summary-copy">
                  {mycvcareersummary.flatMap((summary) =>
                    summary.career_summary
                      .split(/\r?\n/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={`${summary.id}-${index}`}>{paragraph}</p>
                      ))
                  )}
                </div>
                <p className="cv-platform-note">
BesterDev is a full-stack web application independently conceived, architected and developed by me, encompassing the complete software development lifecycle. The frontend is built with **React and JavaScript**, supported by a **Java / Spring Boot microservices backend** and **PostgreSQL** database. The technology stack further incorporates **Python and Scikit-learn** for machine learning and predictive analytics, **OpenAI APIs** for generative AI capabilities, **Firebase** for cloud services, **AWS S3** for object storage, **AWS Amplify** and **Heroku** for application hosting and deployment, and **Auth0** for identity and authentication management.

Explore the source repositories: [Frontend UI](https://github.com/paulbsr/besterdev-ui) | [Backend API](https://github.com/paulbsr/besterdev-api).
                </p>
              </section>

              <section className="cv-panel cv-accordion-panel">
                <SectionHeading
                  icon={<GiSkills aria-hidden="true" />}
                  expanded={isExpandedExpertise}
                  onClick={() => setExpandedExpertise((expanded) => !expanded)}
                  id="cv-expertise-content"
                >
                  Areas of expertise
                </SectionHeading>
                {isExpandedExpertise && (
                  <ul className="cv-expertise-list" id="cv-expertise-content">
                    {mycvcareerexpertise.map((expertise) => (
                      <li key={expertise.id}>
                        <GiCheckMark aria-hidden="true" />
                        {expertise.expertise_desc}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="cv-panel cv-accordion-panel">
                <SectionHeading
                  icon={<FaHighlighter aria-hidden="true" />}
                  expanded={isExpandedHighlights}
                  onClick={() => setExpandedHighlights((expanded) => !expanded)}
                  id="cv-highlights-content"
                >
                  Career highlights
                </SectionHeading>
                {isExpandedHighlights && (
                  <ul className="cv-highlight-list" id="cv-highlights-content">
                    {mycvcareerhighlights.map((highlight) => (
                      <li key={highlight.id}>
                        <GiCheckMark aria-hidden="true" />
                        {highlight.highlight_desc}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="cv-panel cv-career-panel" aria-labelledby="cv-career-title">
                <div className="cv-panel-heading">
                  <MdWorkOutline aria-hidden="true" />
                  <div>
                    <h2 id="cv-career-title">Professional experience</h2>
                    <p>Roles and the work behind them</p>
                  </div>
                </div>
                <div className="cv-employers">
                  {mycvdata.map((employer) => {
                    const hasCalculatedTenure = ['Hewlett Packard', 'Dell Inc.'].includes(employer.employer_name);
                    const startYear = Number(employer.employer_start);
                    const storedEndYear = Number(employer.employer_end);
                    const hasEndYear = employer.employer_end !== null
                      && employer.employer_end !== undefined
                      && employer.employer_end !== '';
                    const endYear = hasEndYear && Number.isFinite(storedEndYear)
                      ? storedEndYear
                      : new Date().getFullYear();
                    const tenureYears = endYear - startYear;

                    return (
                      <article className="cv-employer" key={employer.employer_id}>
                        <div className="cv-employer-heading">
                          <div className="cv-employer-title">
                            {employer.employer_name === 'General Motors IT Services Ireland (GMISI)' && (
                              <img className="cv-employer-logo" src={GM} alt="" />
                            )}
                            {employer.employer_name === 'Hewlett Packard' && (
                              <img className="cv-employer-logo" src={HP} alt="" />
                            )}
                            {employer.employer_name === 'Dell Inc.' && (
                              <img className="cv-employer-logo" src={DELL} alt="" />
                            )}
                            {employer.employer_name === 'Bryan S Ryan' && (
                              <img className="cv-employer-logo" src={BSR} alt="" />
                            )}
                            <h3>{employer.employer_name}</h3>
                          </div>
                          {employer.employer_name === 'General Motors IT Services Ireland (GMISI)' ? (
                            <span>13 years · 2013 – Present</span>
                          ) : (employer.employer_start || employer.employer_end) && (
                            <span>
                              {hasCalculatedTenure && Number.isFinite(startYear) && (
                                <>{tenureYears} years · </>
                              )}
                              {employer.employer_start} – {employer.employer_end || 'Present'}
                            </span>
                          )}
                        </div>
                        {employer.employer_desc && <p className="cv-employer-description">{employer.employer_desc}</p>}
                        <MyCVEmployerRoles
                          mycvdata1={mycvdata}
                          employer_id1={employer.employer_id}
                          employer_name={employer.employer_name}
                          checkForRecords={checkForRecords}
                          setCheckForRecords={setCheckForRecords}
                        />
                      </article>
                    );
                  })}
                </div>
              </section>
            </main>

            <aside className="cv-sidebar">
              <section className="cv-panel cv-education-panel" aria-labelledby="cv-education-title">
                <div className="cv-panel-heading">
                  <div>
                    <h2 id="cv-education-title">Education</h2>
                    <p>Qualifications and learning</p>
                  </div>
                </div>
                <div className="cv-education-list">
                  <article className="cv-education-item">
                    <img src={TUS2} alt="Technological University of the Shannon" />
                    <h3>MSc. Software Design (Cybersecurity)</h3>
                    <p>Technological University of the Shannon · 2025</p>
                  </article>
                  <article className="cv-education-item">
                    <img src={LYIT} alt="Letterkenny Institute of Technology" />
                    <h3>MSc. Software Design (Cloud Native)</h3>
                    <p>Technological University of the Shannon · 2022</p>
                  </article>
                  <article className="cv-education-item">
                    <img src={TUS} alt="Letterkenny Institute of Technology" />
                    <h3>MSc. Cloud Computing</h3>
                    <p>Letterkenny Institute of Technology · 2019</p>
                  </article>
                  <article className="cv-education-item">
                    <img src={DCU} alt="Dublin City University" />
                    <h3>BSc. Computer Science</h3>
                    <p>Dublin City University · 2013</p>
                  </article>
                </div>
              </section>

              <section className="cv-panel cv-testimonials-panel">
                <SectionHeading
                  icon={<IoTrophyOutline aria-hidden="true" />}
                  expanded={isExpandedTestimonials}
                  onClick={() => setExpandedTestimonials((expanded) => !expanded)}
                  id="cv-testimonials-content"
                >
                  Testimonials
                </SectionHeading>
                {isExpandedTestimonials && (
                  <div className="cv-testimonials" id="cv-testimonials-content">
                    <figure>
                      <img src={Testimonial_TB} alt="Professional testimonial" />
                      <figcaption>Tony Bolton, VP of Global Telecoms · 2021</figcaption>
                    </figure>
                    <figure>
                      <img src={Testimonial_2} alt="Professional testimonial" />
                      <figcaption>Tony Bolton, VP of Global Telecoms · 2021</figcaption>
                    </figure>
                  </div>
                )}
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
