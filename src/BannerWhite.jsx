import React from 'react';
import logo from './graphix/logo_transparent2.png';
import Darknet13 from './graphix/Darknet13.png'
import { TbLetterA } from "react-icons/tb";
// import { TbLetterT } from "react-icons/tb";
import { TbLetterT } from "react-icons/tb";
import { TbLetterR } from "react-icons/tb";
import { TbNumber1 } from "react-icons/tb";
import { TbLetterI } from "react-icons/tb";
import { TbLetterB } from "react-icons/tb";
import { TbLetterU } from "react-icons/tb";
import { TbLetterO } from "react-icons/tb";
import { TbLetterE } from "react-icons/tb";
import { TbNumber3 } from "react-icons/tb";
import { TbLetterD } from "react-icons/tb";
import { TbLetterDSmall } from "react-icons/tb";
// import { TbLetterDSmall } from "react-icons/tb";
import { SiMaildotru } from "react-icons/si";
import { TbCircleLetterD } from "react-icons/tb";
// RED = #D5441C
// BLUE = #336791


const BannerWhite = () => {
  return (
    <div className="banner-white">
      <div>&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <img src={logo} /> */}
        <SiMaildotru style={{color: '#D5441C', fontSize: '36px' }}/>
        {/* <TbLetterA style={{color: '#336791', fontSize: '40px' }}/> */}
        {/* <TbLetterT style={{color: '#336791', fontSize: '40px' }}/> */}
        <TbLetterT style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterR style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterI style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterB style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterU style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterT style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterE style={{color: '#336791', fontSize: '40px' }}/>
        <TbLetterD style={{color: '#D5441C', fontSize: '40px' }}/>
        
      </div>
    </div>
  );
};

export default BannerWhite;