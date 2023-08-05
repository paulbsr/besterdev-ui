import React, { useState } from "react";
import { FaReact, FaJava, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiSpringboot, SiFirebase, SiOpenai } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri"
import { CiSettings } from "react-icons/ci";
import { RxHome } from "react-icons/rx"
import { BiLogoFirebase } from "react-icons/bi"
import { BiLogoPostgresql, BiLogoHeroku, BiLogoGithub } from "react-icons/bi";
import './Fonts.css'
import bannerLightSpacer from './graphix/bannerLightSpacer.png'


  const BannerLight = ({ user }) => {
  return (

    <div className="banner-light" >
      {/* {user && <a className='Font-Verdana-Small'>Welcome {user}</a>}&nbsp; */}
      {/* <img alt="1" src={bannerLightSpacer} /> */}
      <a data-tooltip-id="insert" data-tooltip-content="Home" href="https://www.bester.ie/"><RxHome style={{ color: '#000000', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ChatGPT" href="https://chat.openai.com/auth/login" target="_blank"><RiOpenaiFill style={{ color: '#19c37c', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ReactJS9" href="https://www.reactjs.com" target="_blank"><FaReact style={{ color: '#61dafb', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="NodeJS18" href="https://www.nodejs.org/en" target="_blank"><FaNodeJs style={{ color: '#169247', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Java17" href="https://www.java.com/en" target="_blank"><FaJava style={{ color: '#D5441C', fontSize: '40px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="SpringBoot3.1.1" href="https://spring.io/projects/spring-boot" target="_blank"><SiSpringboot style={{ color: '#169247', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="PostgreSQL DB DF04LM7IJ1Q2O" href="https://spring.io/projects/spring-boot" target="_blank"><BiLogoPostgresql style={{ color: '#336791', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Github Repo" href="https://github.com" target="_blank"><BiLogoGithub style={{ color: '#000000', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Amplify FE" href="https://eu-west-1.console.aws.amazon.com/amplify/home?installation_id=39421369&setup_action=install&region=eu-west-1#/dv43gyvsmgsn1/settings/domains/" target="_blank"><FaAws style={{ color: '#ff8500', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Heroku BE" href="https://dashboard.heroku.com/apps" target="_blank"><BiLogoHeroku style={{ color: '#6762a6', fontSize: '33px', cursor: 'pointer' }} /></a>
      <a data-tooltip-id="insert" data-tooltip-content="Google Firebase IAM" href="https://console.firebase.google.com/project/besterdev-432e9/overview" target="_blank"><BiLogoFirebase style={{ color: '#FFCB2B', fontSize: '33px', cursor: 'pointer' }} /></a>
      <a data-tooltip-id="insert" data-tooltip-content="Management Portal" href="https://www.bester.ie/manage"><CiSettings style={{ color: '#000000', fontSize: '33px', cursor: 'pointer' }} /></a>
      {/* <a className='Font-Verdana-Small' >{user && (<p>Welcome {user}</p>)}</a> */}
      {/* {user && (<p>Welcome {user}</p>)} */}

    </div>
  );
};

export default BannerLight;
