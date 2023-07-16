import React from 'react';
import {FaReact, FaJava, FaNodeJs, FaAws, FaGithub} from 'react-icons/fa';
import { SiSpring , SiPostgresql, SiHeroku, SiSpringboot } from "react-icons/si";
import { BiLogoPostgresql, BiLogoHeroku, BiLogoGithub} from "react-icons/bi";
import './Fonts.css'
import spacer from './graphix/besterdev_spacer_white.png'
import FrontPage from './FrontPage';

const BannerLight = () => {
  return (
    
    <div className="banner-light">
<a href='<Frontpage/>'>FRontpqge</a>     
      <a data-tooltip-id="insert" data-tooltip-content="ReactJS9"><FaReact style={{color: '#61dafb', fontSize: '35px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="NodeJS18"><FaNodeJs style={{color: '#169247', fontSize: '35px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Java17"><FaJava style={{color: '#D5441C', fontSize: '40px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="SpringBoot3.1.1"><SiSpringboot style={{color: '#169247', fontSize: '33px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="DF04LM7IJ1Q2O"><BiLogoPostgresql style={{color: '#336791', fontSize: '33px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Github Repo"><BiLogoGithub style={{color: '#000000', fontSize: '33px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Heroku BE"><BiLogoHeroku style={{color: '#6762a6', fontSize: '33px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Amplify FE"><FaAws style={{color: '#ff8500', fontSize: '33px', cursor: 'pointer' }}/></a>&nbsp; &nbsp;
    </div>
  );
};

export default BannerLight;
