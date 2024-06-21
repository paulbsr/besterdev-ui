import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fonts.css';
// import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigate } from 'react-router-dom'; 
import { FaReact, FaJava, FaNodeJs, FaAws, FaPeopleArrows, FaDigitalOcean, FaFileContract, FaTasks } from 'react-icons/fa';
import { BiLogoFirebase, BiLogoPostgresql, BiLogoHeroku, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";
import { SiSpringboot, SiGoogleanalytics, SiDocker, SiSwagger, SiJavascript } from "react-icons/si";
import { MdManageAccounts, MdOutlineVpnLock, MdOutlineMailLock, MdTask } from "react-icons/md";
import { TbWorldWww, TbBrandOauth } from "react-icons/tb";
import { BsQuestionOctagonFill, BsPeopleFill } from "react-icons/bs";
import { IoLibrary, IoHome } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { GrVirtualMachine} from "react-icons/gr";
import { RiOpenaiFill } from "react-icons/ri";
import { GiRapidshareArrow  } from "react-icons/gi";



  // const BannerLight = ({ user }) => {
    const BannerLight = () => {
    const navigate = useNavigate();
    const handleNavigateLogin = () => {navigate('/login');}
    const handleNavigateHome = () => {navigate('/home');}
    const handleNavigateResources = () => {navigate('/webresourcemanage');}
    const handleNavigateCyclopedia= () => {navigate('/cyclopediamanage');}
    const handleNavigateHowtoManage = () => {navigate('/howtomanage');}
    const handleNavigateManage = () => {navigate('/candidatemanage');}
    const handleNavigateHunt = () => {navigate('/hunt');}
    const handleNavigateLogout = () => {navigate('/logout');}
    const handleNavigateSwagger = () => {navigate('/swagger');}
    const handleNavigateMyCV = () => {navigate('/mycv');}
    const handleNavigatePeopleScorecard = () => {navigate('/peoplescorecard');}
    const handleNavigateTaskManage = () => {navigate('/taskmanage');}
    const [searchPhrase, setSearchPhrase] = useState();
    const [checkForRecords, setCheckForRecords] = useState(true);


    useEffect(() => 
    {
      axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
      // axios('http://localhost:8000/api/v1/searchphrase')
        .then((response) => 
        {
          const searchPhraseValue = response.data[0].searchphrase;
          setSearchPhrase(searchPhraseValue);
          console.log('In <BannerLight/> is jou searchPhraseValue:', searchPhraseValue);
          }
        ).catch((e)=> console.error(e));
  
    }, 
        [checkForRecords]);
        console.log('In <BannerLight/> is jou searchPhrase:', searchPhrase);
 
    


  return (

    <div className="banner-light-left" >
      
      &nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Breaking News" ><GiRapidshareArrow  style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} />&nbsp;<span style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791' }}>Breaking News is about: </span><i style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#D5441C' }}>{searchPhrase}</i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* <a data-tooltip-id="insert" data-tooltip-content="Login" onClick={handleNavigateLogin}><SlLogin style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      <a data-tooltip-id="insert" data-tooltip-content="Home" onClick={handleNavigateHome}><IoHome style={{ color: '#FF0000', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="MyCV" onClick={handleNavigateMyCV}><FaFileContract style={{ color: '#336791', fontSize: '26px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Web Resources" onClick={handleNavigateResources}><TbWorldWww style={{ color: '#336791', fontSize: '32px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="WhatExactlyIs? Cyclopedia" onClick={handleNavigateCyclopedia}><IoLibrary style={{ color: '#336791', fontSize: '31px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Howtos" onClick={handleNavigateHowtoManage}><BsQuestionOctagonFill style={{ color: '#336791', fontSize: '29px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Hunt" onClick={handleNavigateHunt}><FaPeopleArrows style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Candidates" onClick={handleNavigateManage}><MdManageAccounts style={{ color: '#336791', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="People Scorecard" onClick={handleNavigatePeopleScorecard}><BsPeopleFill style={{ color: '#336791', fontSize: '32px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Task Manager" onClick={handleNavigateTaskManage}><MdTask style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></a>
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ReactJS v18.2.0" href="https://www.reactjs.com" target="_blank" rel="noreferrer"><FaReact style={{ color: '#61dafb', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="JavaScript" href="https://www.nodejs.org/en" target="_blank" rel="noreferrer"><SiJavascript style={{ color: '#F0DB4F', fontSize: '32px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="NodeJS v20.9.0" href="https://www.nodejs.org/en" target="_blank" rel="noreferrer"><FaNodeJs style={{ color: '#169247', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Java 17.0.9" href="https://www.java.com/en" target="_blank" rel="noreferrer"><FaJava style={{ color: '#D5441C', fontSize: '40px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Spring Boot v3.1.2" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer"><SiSpringboot style={{ color: '#169247', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="PostgreSQL DB hosted on Heroku" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer"><BiLogoPostgresql style={{ color: '#336791', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Github for Repos" href="https://github.com" target="_blank" rel="noreferrer"><BiLogoGithub style={{ color: '#000000', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="AWS Amplify-hosted front-end UI" href="https://eu-west-1.console.aws.amazon.com/amplify/home?installation_id=39421369&setup_action=install&region=eu-west-1#/dv43gyvsmgsn1/settings/domains/" target="_blank" rel="noreferrer"><FaAws style={{ color: '#ff8500', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Heroku-hosted back-end API" href="https://dashboard.heroku.com/apps" target="_blank" rel="noreferrer"><BiLogoHeroku style={{ color: '#6762a6', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="paul.besar@gmail.com" href="https://myaccount.google.com/" target="_blank" rel="noreferrer"><BiLogoGoogle style={{ color: '#4688F1', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Google Firebase for front-end IAM Authentication" href="https://console.firebase.google.com/project/besterdev-432e9/overview" target="_blank" rel="noreferrer"><BiLogoFirebase style={{ color: '#FFCB2B', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Google Analytics" href="https://analytics.google.com/analytics/web/?pli=1#/p400562922/reports/intelligenthome" target="_blank" rel="noreferrer"><SiGoogleanalytics style={{ color: 'orange', fontSize: '24px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Docker Containers - paulbsr" href="https://www.docker.com" target="_blank" rel="noreferrer"><SiDocker style={{ color: '#1D63ED', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="DigitalOcean" href="https://www.digitalocean.com" target="_blank" rel="noreferrer"><FaDigitalOcean style={{ color: '#0069FF', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Microsoft Hyper-V for Virtualization" href="https://www.docker.com" target="_blank" rel="noreferrer"><GrVirtualMachine style={{ color: '#336791', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ProtonVPN (paulbsr)" href="https://protonvpn.com/" target="_blank" rel="noreferrer"><MdOutlineVpnLock style={{ color: 'brown', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ProtonMail (kuberkont)" href="https://mail.proton.me/u/0/inbox" target="_blank" rel="noreferrer"><MdOutlineMailLock style={{ color: 'brown', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Swagger" onClick={handleNavigateSwagger}><SiSwagger style={{ color: '#85EA2D', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="OAuth2.0 protected APIs" onClick={handleNavigateSwagger}><TbBrandOauth style={{ color: '#000000', fontSize: '31px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ChatGPT v3.5" href="https://chat.openai.com/auth/login" target="_blank" rel="noreferrer"><RiOpenaiFill style={{ color: '#19c37c', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Logout" onClick={handleNavigateLogout}><SlLogout style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
    </div>
  );
};
export default BannerLight;