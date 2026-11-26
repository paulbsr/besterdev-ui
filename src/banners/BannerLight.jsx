import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Fonts.css';
import 'react-tooltip/dist/react-tooltip.css';
import { useBreakingNewsApi } from '../breakingnews/BreakingNewsApiContext';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

import {
  FaReact,
  FaJava,
  FaNodeJs,
  FaPeopleArrows,
  FaFileContract,
  FaLinkedin,
} from 'react-icons/fa';
import {
  GiRapidshareArrow,
  GiGiftOfKnowledge,
  GiSpiderWeb,
  GiHouseKeys,
  GiWindmill,
  GiOpenBook,
} from 'react-icons/gi';
import {
  SiSpringboot,
  SiFirebase,
  SiJavascript,
  SiOpenai,
  SiVault,
  SiGooglecloud,
  SiAuth0,
  SiSwagger,
} from 'react-icons/si';
import {
  BiLogoPostgresql,
  BiLogoHeroku,
  BiLogoGithub,
  BiLogoGoogle,
} from 'react-icons/bi';
import { BsPatchQuestion, BsPeopleFill } from 'react-icons/bs';
import { MdManageAccounts, MdTask } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import { FaAws } from 'react-icons/fa6';


const iconStyle = (color, size) => ({
  color: color === '#336791' ? 'var(--home-text, #336791)' : color,
  fontSize: size,
  cursor: 'pointer',
});

const navigationIconStyle = (size) => iconStyle('#FFFFFF', size);

const internalLinks = [
  { tooltip: 'Home', icon: <IoHome style={navigationIconStyle(28)} />, path: '/home' },
  { tooltip: 'Cyclopedia', icon: <GiGiftOfKnowledge style={navigationIconStyle(31)} />, path: '/cyclopediamanage' },
  { tooltip: 'Web Resources', icon: <GiSpiderWeb style={navigationIconStyle(30)} />, path: '/webresourcemanage' },
  { tooltip: 'HOWTOs', icon: <BsPatchQuestion style={navigationIconStyle(29)} />, path: '/howtomanage' },
  { tooltip: 'People Scorecard', icon: <BsPeopleFill style={navigationIconStyle(32)} />, path: '/peoplescorecard' },
  { tooltip: 'Tasks', icon: <MdTask style={navigationIconStyle(30)} />, path: '/taskmanage' },
  { tooltip: 'Diffie-Hellman Key Exchange', icon: <GiHouseKeys style={navigationIconStyle(32)} />, path: '/dhkeyexchange' },
  { tooltip: 'MyCV', icon: <FaFileContract style={navigationIconStyle(26)} />, path: '/mycv' },
  { tooltip: 'Candidate Hunt', icon: <FaPeopleArrows style={navigationIconStyle(30)} />, path: '/hunt' },
  { tooltip: 'Candidates', icon: <MdManageAccounts style={navigationIconStyle(35)} />, path: '/candidatemanage' },
  { tooltip: 'Dutch Language', icon: <GiWindmill style={iconStyle('#FF4F00', 32)} />, path: '/dutchlanguage' },
  { tooltip: 'Mijn Boek', icon: <GiOpenBook style={iconStyle('#FF4F00', 32)} />, path: '/dutchlanguagebook' },
];

const externalLinks = [
  { tooltip: 'OpenAI API', icon: <SiOpenai style={iconStyle('#10A37F', 31)} />, href: 'https://platform.openai.com/api-keys' },
  { tooltip: 'ReactJS', icon: <FaReact style={iconStyle('#61dafb', 35)} />, href: 'https://react.dev' },
  { tooltip: 'JavaScript', icon: <SiJavascript style={iconStyle('#F0DB4F', 32)} />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { tooltip: 'NodeJS', icon: <FaNodeJs style={iconStyle('#8AC400', 35)} />, href: 'https://nodejs.org' },
  { tooltip: 'Java', icon: <FaJava style={iconStyle('#D5441C', 40)} />, href: 'https://www.java.com' },
  { tooltip: 'Spring Boot', icon: <SiSpringboot style={iconStyle('#6DB33F', 33)} />, href: 'https://spring.io/projects/spring-boot' },
  { tooltip: 'PostgreSQL', icon: <BiLogoPostgresql style={iconStyle('#336795', 33)} />, href: 'https://www.postgresql.org' },
  { tooltip: 'GitHub', icon: <BiLogoGithub style={iconStyle('#FFFFFF', 33)} />, href: 'https://github.com' },
  { tooltip: 'AWS Amplify', icon: <FaAws style={iconStyle('#ff8500', 33)} />, href: 'https://aws.amazon.com/amplify/' },
  { tooltip: 'Heroku', icon: <BiLogoHeroku style={iconStyle('#6762a6', 33)} />, href: 'https://dashboard.heroku.com/apps' },
  { tooltip: 'Google Account', icon: <BiLogoGoogle style={iconStyle('#4688F1', 33)} />, href: 'https://myaccount.google.com/' },
  { tooltip: 'Google Cloud', icon: <SiGooglecloud style={iconStyle('#4688F1', 31)} />, href: 'https://console.cloud.google.com' },
  { tooltip: 'Firebase', icon: <SiFirebase style={iconStyle('#FFCB2B', 33)} />, href: 'https://console.firebase.google.com' },
  { tooltip: 'HashiCorp Vault', icon: <SiVault style={iconStyle('#FED81C', 30)} />, href: 'https://portal.cloud.hashicorp.com' },
  { tooltip: 'Auth0', icon: <SiAuth0 style={iconStyle('#EB5424', 30)} />, href: 'https://manage.auth0.com' },
  { tooltip: 'Swagger', icon: <SiSwagger style={iconStyle('#85EA2D', 30)} />, href: 'https:///besterdev-api-13a0246c9cf2.herokuapp.com/swagger-ui/index.html' },
];

const renderExternalLinks = (links) => links.map(({ tooltip, icon, href }) => (
  <a
    key={tooltip}
    className="icon-pill"
    data-tooltip-id="insert"
    data-tooltip-content={tooltip}
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    {icon}
  </a>
));

export const TechStackIcons = () => (
  <div className="home-tech-stack" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
    <span style={{ fontFamily: 'Segoe UI', color: 'var(--home-text, #336791)' }}>my tech stack</span>
    {renderExternalLinks(externalLinks)}
  </div>
);

const BannerLight = ({
  showBreakingNewsTopic = true,
  showInternalLinks = true,
  showExternalLinks = true,
  alignIconsRight = false,
  showGitHubProfile = false,
}) => {
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load search phrase
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await OAuth2APIClient.get('/api/v1/searchphrase',
          {
            caller: 'Bannerlight'
          });
        const phrase = res.data?.[0]?.searchphrase;
        if (mounted && phrase) setSearchPhrase(phrase);
      } catch (e) {
        console.error('❌ Failed to load search phrase', e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);


  const submitEdit = async () => {
  if (!editValue.trim() || editValue === searchPhrase) {
    setIsEditing(false);
    return;
  }

  try {
    await OAuth2APIClient.put(
      `/api/v1/searchphrase/update?newValue=${encodeURIComponent(editValue)}`
    );

    setSearchPhrase(editValue);

    // 🔥 THIS is what updates the ticker
    await refreshBreakingNews();

  } catch (e) {
    console.error('❌ Failed to update search phrase', e);
  } finally {
    setIsEditing(false);
  }
};

const { refreshBreakingNews } = useBreakingNewsApi();

  return (
    <div
      className="banner-light-left"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: alignIconsRight ? 'flex-end' : 'flex-start',
        gap: '15px',
      }}
    >
      {showBreakingNewsTopic && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>&nbsp;&nbsp;
        <GiRapidshareArrow style={iconStyle('#336791', 28)} />
        <span style={{ fontFamily: 'Segoe UI', color: 'var(--home-text, #336791)' }}>
          Breaking News topic:
        </span>

        {isEditing ? (
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitEdit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            style={{
              fontFamily: 'Segoe UI',
              fontSize: 'medium',
              color: 'var(--home-accent, #D5441C)',
              border: '1.25px solid #ccc',
              borderRadius: 4,
              padding: '2px 6px',
              marginRight: '40px',
              width: '100px',      // 👈 THIS
            }}
          />
        ) : (
          <i
            onClick={() => {
              setEditValue(searchPhrase);
              setIsEditing(true);
            }}
            style={{
              fontFamily: 'Segoe UI',
              color: 'var(--home-accent, #D5441C)',
              cursor: 'pointer',
              // textDecoration: 'underline dotted',
            }}
            title="Click to edit"
          >
            {searchPhrase}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </i>
        )}
      </div>}

      {showGitHubProfile && (
        <div className="banner-light-profile-links">
          <a
            className="banner-light-profile-link"
            href="https://github.com/paulbsr"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoGithub style={iconStyle('#336791', 28)} aria-hidden="true" />
            <span>https://github.com/paulbsr</span>
          </a>
          <a
            className="banner-light-profile-link"
            href="https://www.linkedin.com/in/paul-bester-4196952b/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin style={iconStyle('#0A66C2', 28)} aria-hidden="true" />
            <span>https://www.linkedin.com/in/paul-bester-4196952b/</span>
          </a>
        </div>
      )}

      {/* {internalLinks.map(({ tooltip, icon, path }, idx) => (
        <a
          key={idx}
          data-tooltip-id="insert"
          data-tooltip-content={tooltip}
          onClick={() => navigate(path)}
          role="button"
          tabIndex={0}
        >
          {icon}
        </a>
      ))} */}

      {showInternalLinks && internalLinks.map(({ tooltip, icon, path }, idx) => (
  <div
    key={idx}
    className="icon-pill"
    data-tooltip-id="insert"
    data-tooltip-content={tooltip}
    onClick={() => navigate(path)}
    role="button"
    tabIndex={0}
  >
    {icon}
  </div>
))}
      
      

      {/* {externalLinks.map(({ tooltip, icon, href }, idx) => (
        <a
          key={idx}
          data-tooltip-id="insert"
          data-tooltip-content={tooltip}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {icon}
        </a>
      ))} */}

      {showExternalLinks && renderExternalLinks(
        externalLinks.filter(({ tooltip }) => !(showGitHubProfile && tooltip === 'GitHub'))
      )}
    </div>
  );
};
export default BannerLight;