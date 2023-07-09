import React from 'react';
import {FaReact, FaJava, FaNodeJs} from 'react-icons/fa';
import { SiSpring } from "react-icons/si";
import './Fonts.css'
import spacer from './graphix/besterdev_spacer_white.png'

const BannerLight = () => {
  return (
    
    <div className="banner-light">
      <a data-tooltip-id="insert" data-tooltip-content="ReactJS9"><FaReact style={{color: '#61dafb', fontSize: '35px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="NodeJS18"><FaNodeJs style={{color: '#169247', fontSize: '35px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Java17"><FaJava style={{color: '#D5441C', fontSize: '40px', cursor: 'pointer' }}/></a>&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="SpringBoot3.1.1"><SiSpring style={{color: '#169247', fontSize: '33px', cursor: 'pointer' }}/></a>&nbsp; &nbsp;
    </div>
  );
};

export default BannerLight;
