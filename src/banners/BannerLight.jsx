// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Fonts.css';
// import 'react-tooltip/dist/react-tooltip.css';
// import { FaReact, FaJava, FaNodeJs, FaPeopleArrows, FaFileContract, FaConfluence } from 'react-icons/fa';
// import { GiRapidshareArrow, GiGiftOfKnowledge, GiSpiderWeb, GiHouseKeys } from 'react-icons/gi';
// import { SiSpringboot, SiFirebase, SiJavascript, SiJira, SiAwsamplify } from 'react-icons/si';
// import { BiLogoPostgresql, BiLogoHeroku, BiLogoGithub, BiLogoGoogle } from 'react-icons/bi';
// import { BsPatchQuestion, BsPeopleFill } from 'react-icons/bs';
// import { MdManageAccounts, MdTask } from 'react-icons/md';
// import { GiWindmill, GiOpenBook } from "react-icons/gi";
// import { SiOpenai, SiVault, SiGooglecloud, SiAuth0 } from "react-icons/si";
// import { IoHome } from 'react-icons/io5';
// import { FaAws } from "react-icons/fa6";
// import OAuth2APIClient from '../oauth2/OAuth2APIClient';

// const iconStyle = (color, size) => ({ color, fontSize: size, cursor: 'pointer' });

// const internalLinks = [
//   { tooltip: 'Home', icon: <IoHome style={iconStyle('#000000', 28)} />, path: '/home' },
//   { tooltip: 'Cyclopedia', icon: <GiGiftOfKnowledge style={iconStyle('#336791', 31)} />, path: '/cyclopediamanage' },
//   { tooltip: 'Web Resources', icon: <GiSpiderWeb style={iconStyle('#336791', 30)} />, path: '/webresourcemanage' },
//   { tooltip: 'HOWTOs', icon: <BsPatchQuestion style={iconStyle('#336791', 29)} />, path: '/howtomanage' },
//   { tooltip: 'People Scorecard', icon: <BsPeopleFill style={iconStyle('#336791', 32)} />, path: '/peoplescorecard' },
//   { tooltip: 'Tasks', icon: <MdTask style={iconStyle('#336791', 30)} />, path: '/taskmanage' },
//   { tooltip: 'Diffie-Hellman Key Exchange', icon: <GiHouseKeys style={iconStyle('#336791', 32)} />, path: '/dhkeyexchange' },
//   { tooltip: 'MyCV', icon: <FaFileContract style={iconStyle('#336791', 26)} />, path: '/mycv' },
//   { tooltip: 'Candidate Hunt', icon: <FaPeopleArrows style={iconStyle('#336791', 30)} />, path: '/hunt' },
//   { tooltip: 'Candidates', icon: <MdManageAccounts style={iconStyle('#336791', 35)} />, path: '/candidatemanage' },
//   { tooltip: 'Dutch Language', icon: <GiWindmill style={iconStyle('#FF4F00', 32 )} />, path: '/dutchlanguage' },
//   { tooltip: 'Mijn Boek', icon: <GiOpenBook style={iconStyle('#FF4F00', 32 )} />, path: '/dutchlanguagebook' },
// ];

// const externalLinks = [
//   { tooltip: 'OpenAI API', icon: <SiOpenai style={iconStyle('#10A37F', 31)} />, href: 'https://platform.openai.com/api-keys' },
//   { tooltip: 'ReactJS v18.2.0', icon: <FaReact style={iconStyle('#61dafb', 35)} />, href: 'https://www.reactjs.com' },
//   { tooltip: 'JavaScript', icon: <SiJavascript style={iconStyle('#F0DB4F', 32)} />, href: 'https://www.nodejs.org/en' },
//   { tooltip: 'NodeJS v20.9.0', icon: <FaNodeJs style={iconStyle('#336791', 35)} />, href: 'https://www.nodejs.org/en' },
//   { tooltip: 'Java 17.0.9', icon: <FaJava style={iconStyle('#D5441C', 40)} />, href: 'https://www.java.com/en' },
//   { tooltip: 'Spring Boot v3.4.0', icon: <SiSpringboot style={iconStyle('#336791', 33)} />, href: 'https://spring.io/projects/spring-boot' },
//   { tooltip: 'PostgreSQL DB on Heroku', icon: <BiLogoPostgresql style={iconStyle('#336791', 33)} />, href: 'https://spring.io/projects/spring-boot' },
//   { tooltip: 'GitHub for Repositories', icon: <BiLogoGithub style={iconStyle('#000000', 33)} />, href: 'https://github.com' },
//   { tooltip: 'AWS for Front-end UI', icon: <FaAws style={iconStyle('#ff8500', 33)} />, href: 'https://eu-west-1.console.aws.amazon.com/amplify/home' },
//   { tooltip: 'Heroku for Back-end APIs', icon: <BiLogoHeroku style={iconStyle('#6762a6', 33)} />, href: 'https://dashboard.heroku.com/apps' },
//   { tooltip: 'Google Account', icon: <BiLogoGoogle style={iconStyle('#4688F1', 33)} />, href: 'https://myaccount.google.com/' },
//   { tooltip: 'Google Cloud Console', icon: <SiGooglecloud style={iconStyle('#4688F1', 31)} />, href: 'https://console.cloud.google.com/welcome?hl=en&project=besterdev-nederlands' },
//   { tooltip: 'Firebase for Auth', icon: <SiFirebase style={iconStyle('#FFCB2B', 33)} />, href: 'https://console.firebase.google.com/project/besterdev-432e9/overview' },
//   { tooltip: 'HashiCorp for Vault', icon: <SiVault style={iconStyle('#000000', 30)} />, href: 'https://portal.cloud.hashicorp.com/orgs/4603e2a7-5b9d-4f7c-ac72-4fca0378803d/projects/fa3017fe-349f-4651-972e-1a2242b0b9d9' },
//   { tooltip: 'Auth0 for Bearer Tokens', icon: <SiAuth0 style={iconStyle('#000000', 30)} />, href: 'https://manage.auth0.com/dashboard/us/dev-zfn2vy40864n84pi/' },
// ];

// const BannerLight = () => {
//   const navigate = useNavigate();
//   const [searchPhrase, setSearchPhrase] = useState('');

//   // useEffect(() => {
//   //   OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
//   //     .then((response) => {
//   //       const phrase = response.data?.[0]?.searchphrase;
//   //       if (phrase) setSearchPhrase(phrase);
//   //     })
//   //     .catch((e) => console.error('In <BannerLight/> is jou searchPhrase:', searchPhrase));
//   // }, []);

//   useEffect(() => {
//   let mounted = true;

//   (async () => {
//     try {
//       const response = await OAuth2APIClient.get('/api/v1/searchphrase');
//       const phrase = response.data?.[0]?.searchphrase;

//       if (mounted && phrase) {
//         setSearchPhrase(phrase);
//       }
//     } catch (e) {
//       console.error('❌ <BannerLight/> failed to load searchPhrase', e);
//     }
//   })();

//   return () => {
//     mounted = false;
//   };
// }, []);

//   return (
//     <div className="banner-light-left" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px' }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <GiRapidshareArrow style={iconStyle('#336791', 28)} />
//         <span style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791' }}>Breaking News is about:</span>
//         <i style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#D5441C', marginRight: "100px" }}>{searchPhrase}</i>
//       </div>

//       {internalLinks.map(({ tooltip, icon, path }, idx) => (
//         <a key={idx} data-tooltip-id="insert" data-tooltip-content={tooltip} onClick={() => navigate(path)} role="button" tabIndex={0}>{icon}</a>
//       ))}
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//       {externalLinks.map(({ tooltip, icon, href }, idx) => (
//         <a key={idx} data-tooltip-id="insert" data-tooltip-content={tooltip} href={href} target="_blank" rel="noreferrer">{icon}</a>
//       ))}
//     </div>
//   );
// };

// export default BannerLight;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Fonts.css';
import 'react-tooltip/dist/react-tooltip.css';

import {
  FaReact,
  FaJava,
  FaNodeJs,
  FaPeopleArrows,
  FaFileContract,
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

import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const iconStyle = (color, size) => ({
  color,
  fontSize: size,
  cursor: 'pointer',
});

const internalLinks = [
  { tooltip: 'Home', icon: <IoHome style={iconStyle('#000', 28)} />, path: '/home' },
  { tooltip: 'Cyclopedia', icon: <GiGiftOfKnowledge style={iconStyle('#336791', 31)} />, path: '/cyclopediamanage' },
  { tooltip: 'Web Resources', icon: <GiSpiderWeb style={iconStyle('#336791', 30)} />, path: '/webresourcemanage' },
  { tooltip: 'HOWTOs', icon: <BsPatchQuestion style={iconStyle('#336791', 29)} />, path: '/howtomanage' },
  { tooltip: 'People Scorecard', icon: <BsPeopleFill style={iconStyle('#336791', 32)} />, path: '/peoplescorecard' },
  { tooltip: 'Tasks', icon: <MdTask style={iconStyle('#336791', 30)} />, path: '/taskmanage' },
  { tooltip: 'Diffie-Hellman Key Exchange', icon: <GiHouseKeys style={iconStyle('#336791', 32)} />, path: '/dhkeyexchange' },
  { tooltip: 'MyCV', icon: <FaFileContract style={iconStyle('#336791', 26)} />, path: '/mycv' },
  { tooltip: 'Candidate Hunt', icon: <FaPeopleArrows style={iconStyle('#336791', 30)} />, path: '/hunt' },
  { tooltip: 'Candidates', icon: <MdManageAccounts style={iconStyle('#336791', 35)} />, path: '/candidatemanage' },
  { tooltip: 'Dutch Language', icon: <GiWindmill style={iconStyle('#FF4F00', 32)} />, path: '/dutchlanguage' },
  { tooltip: 'Mijn Boek', icon: <GiOpenBook style={iconStyle('#FF4F00', 32)} />, path: '/dutchlanguagebook' },
];

const externalLinks = [
  { tooltip: 'OpenAI API', icon: <SiOpenai style={iconStyle('#10A37F', 31)} />, href: 'https://platform.openai.com/api-keys' },
  { tooltip: 'ReactJS', icon: <FaReact style={iconStyle('#61dafb', 35)} />, href: 'https://react.dev' },
  { tooltip: 'JavaScript', icon: <SiJavascript style={iconStyle('#F0DB4F', 32)} />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { tooltip: 'NodeJS', icon: <FaNodeJs style={iconStyle('#336791', 35)} />, href: 'https://nodejs.org' },
  { tooltip: 'Java', icon: <FaJava style={iconStyle('#D5441C', 40)} />, href: 'https://www.java.com' },
  { tooltip: 'Spring Boot', icon: <SiSpringboot style={iconStyle('#336791', 33)} />, href: 'https://spring.io/projects/spring-boot' },
  { tooltip: 'PostgreSQL', icon: <BiLogoPostgresql style={iconStyle('#336791', 33)} />, href: 'https://www.postgresql.org' },
  { tooltip: 'GitHub', icon: <BiLogoGithub style={iconStyle('#000', 33)} />, href: 'https://github.com' },
  { tooltip: 'AWS Amplify', icon: <FaAws style={iconStyle('#ff8500', 33)} />, href: 'https://aws.amazon.com/amplify/' },
  { tooltip: 'Heroku', icon: <BiLogoHeroku style={iconStyle('#6762a6', 33)} />, href: 'https://dashboard.heroku.com/apps' },
  { tooltip: 'Google Account', icon: <BiLogoGoogle style={iconStyle('#4688F1', 33)} />, href: 'https://myaccount.google.com/' },
  { tooltip: 'Google Cloud', icon: <SiGooglecloud style={iconStyle('#4688F1', 31)} />, href: 'https://console.cloud.google.com' },
  { tooltip: 'Firebase', icon: <SiFirebase style={iconStyle('#FFCB2B', 33)} />, href: 'https://console.firebase.google.com' },
  { tooltip: 'HashiCorp Vault', icon: <SiVault style={iconStyle('#000', 30)} />, href: 'https://portal.cloud.hashicorp.com' },
  { tooltip: 'Auth0', icon: <SiAuth0 style={iconStyle('#000', 30)} />, href: 'https://manage.auth0.com' },
];

const BannerLight = () => {
  const navigate = useNavigate();

  const [searchPhrase, setSearchPhrase] = useState('');
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load search phrase
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await OAuth2APIClient.get('/api/v1/searchphrase');
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
    } catch (e) {
      console.error('❌ Failed to update search phrase', e);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div
      className="banner-light-left"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <GiRapidshareArrow style={iconStyle('#336791', 28)} />
        <span style={{ fontFamily: 'Segoe UI', color: '#336791' }}>
          Breaking News is about:
        </span>

        {isEditing ? (
          <input
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitEdit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            style={{
              fontFamily: 'Segoe UI',
              fontSize: 'medium',
              color: '#D5441C',
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: '2px 6px',
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
              color: '#D5441C',
              cursor: 'pointer',
              // textDecoration: 'underline dotted',
            }}
            title="Click to edit"
          >
            {searchPhrase}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </i>
        )}
      </div>

      {internalLinks.map(({ tooltip, icon, path }, idx) => (
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
      ))}

      {externalLinks.map(({ tooltip, icon, href }, idx) => (
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
      ))}
    </div>
  );
};

export default BannerLight;