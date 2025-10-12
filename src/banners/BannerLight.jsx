import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Fonts.css';
import 'react-tooltip/dist/react-tooltip.css';
import { FaReact, FaJava, FaNodeJs, FaPeopleArrows, FaFileContract, FaConfluence } from 'react-icons/fa';
import { GiRapidshareArrow, GiGiftOfKnowledge, GiSpiderWeb, GiHouseKeys } from 'react-icons/gi';
import { SiSpringboot, SiFirebase, SiJavascript, SiJira, SiAwsamplify } from 'react-icons/si';
import { BiLogoPostgresql, BiLogoHeroku, BiLogoGithub, BiLogoGoogle } from 'react-icons/bi';
import { BsPatchQuestion, BsPeopleFill } from 'react-icons/bs';
import { MdManageAccounts, MdTask } from 'react-icons/md';
import { GiWindmill } from "react-icons/gi";
import { SiOpenai, SiVault } from "react-icons/si";
import { IoHome } from 'react-icons/io5';
import { FaAws } from "react-icons/fa6";

const iconStyle = (color, size) => ({ color, fontSize: size, cursor: 'pointer' });

const internalLinks = [
  { tooltip: 'Home', icon: <IoHome style={iconStyle('#000000', 28)} />, path: '/home' },
  { tooltip: 'Cyclopedia', icon: <GiGiftOfKnowledge style={iconStyle('#336791', 31)} />, path: '/cyclopediamanage' },
  { tooltip: 'Web Resources', icon: <GiSpiderWeb style={iconStyle('#336791', 30)} />, path: '/webresourcemanage' },
  { tooltip: 'HOWTOs', icon: <BsPatchQuestion style={iconStyle('#336791', 29)} />, path: '/howtomanage' },
  { tooltip: 'People Scorecard', icon: <BsPeopleFill style={iconStyle('#336791', 32)} />, path: '/peoplescorecard' },
  { tooltip: 'Tasks', icon: <MdTask style={iconStyle('#336791', 30)} />, path: '/taskmanage' },
  { tooltip: 'Diffie-Hellman Key Exchange', icon: <GiHouseKeys style={iconStyle('#336791', 32)} />, path: '/dhkeyexchange' },
  { tooltip: 'MyCV', icon: <FaFileContract style={iconStyle('#336791', 26)} />, path: '/mycv' },
  { tooltip: 'Candidate Hunt', icon: <FaPeopleArrows style={iconStyle('#336791', 30)} />, path: '/hunt' },
  { tooltip: 'Candidates', icon: <MdManageAccounts style={iconStyle('#336791', 35)} />, path: '/candidatemanage' },
  { tooltip: 'Dutch Language', icon: <GiWindmill style={iconStyle('#FF4F00', 32 )} />, path: '/dutchlanguage' },
];

const externalLinks = [
  { tooltip: 'OpenAI API', icon: <SiOpenai style={iconStyle('#10A37F', 31)} />, href: 'https://platform.openai.com/api-keys' },
  { tooltip: 'Jira', icon: <SiJira style={iconStyle('#336791', 26)} />, href: 'https://besterdev.atlassian.net/jira/your-work' },
  { tooltip: 'Confluence', icon: <FaConfluence style={iconStyle('#336791', 26)} />, href: 'https://besterdev.atlassian.net/wiki/home' },
  { tooltip: 'ReactJS v18.2.0', icon: <FaReact style={iconStyle('#61dafb', 35)} />, href: 'https://www.reactjs.com' },
  { tooltip: 'JavaScript', icon: <SiJavascript style={iconStyle('#F0DB4F', 32)} />, href: 'https://www.nodejs.org/en' },
  { tooltip: 'NodeJS v20.9.0', icon: <FaNodeJs style={iconStyle('#336791', 35)} />, href: 'https://www.nodejs.org/en' },
  { tooltip: 'Java 17.0.9', icon: <FaJava style={iconStyle('#D5441C', 40)} />, href: 'https://www.java.com/en' },
  { tooltip: 'Spring Boot v3.4.0', icon: <SiSpringboot style={iconStyle('#336791', 33)} />, href: 'https://spring.io/projects/spring-boot' },
  { tooltip: 'PostgreSQL on Heroku', icon: <BiLogoPostgresql style={iconStyle('#336791', 33)} />, href: 'https://spring.io/projects/spring-boot' },
  { tooltip: 'GitHub', icon: <BiLogoGithub style={iconStyle('#000000', 33)} />, href: 'https://github.com' },
  { tooltip: 'AWS', icon: <FaAws style={iconStyle('#ff8500', 33)} />, href: 'https://eu-west-1.console.aws.amazon.com/amplify/home' },
  { tooltip: 'Heroku API Backend', icon: <BiLogoHeroku style={iconStyle('#6762a6', 33)} />, href: 'https://dashboard.heroku.com/apps' },
  { tooltip: 'Google Account', icon: <BiLogoGoogle style={iconStyle('#4688F1', 33)} />, href: 'https://myaccount.google.com/' },
  { tooltip: 'Firebase Auth', icon: <SiFirebase style={iconStyle('#FFCB2B', 33)} />, href: 'https://console.firebase.google.com/project/besterdev-432e9/overview' },
  { tooltip: 'HashiCorp Vault', icon: <SiVault style={iconStyle('#000000', 30)} />, href: 'https://portal.cloud.hashicorp.com/orgs/4603e2a7-5b9d-4f7c-ac72-4fca0378803d/projects/fa3017fe-349f-4651-972e-1a2242b0b9d9' },
  
];

const BannerLight = () => {
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
      .then((response) => {
        const phrase = response.data?.[0]?.searchphrase;
        if (phrase) setSearchPhrase(phrase);
      })
      .catch((e) => console.error('In <BannerLight/> is jou searchPhrase:', searchPhrase));
  }, []);

  return (
    <div className="banner-light-left" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <GiRapidshareArrow style={iconStyle('#336791', 28)} />
        <span style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791' }}>Breaking News is about:</span>
        <i style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#D5441C', marginRight: "100px" }}>{searchPhrase}</i>
      </div>

      {internalLinks.map(({ tooltip, icon, path }, idx) => (
        <a key={idx} data-tooltip-id="insert" data-tooltip-content={tooltip} onClick={() => navigate(path)} role="button" tabIndex={0}>{icon}</a>
      ))}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      {externalLinks.map(({ tooltip, icon, href }, idx) => (
        <a key={idx} data-tooltip-id="insert" data-tooltip-content={tooltip} href={href} target="_blank" rel="noreferrer">{icon}</a>
      ))}
    </div>
  );
};

export default BannerLight;
