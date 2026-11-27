import { TbLetterA } from "react-icons/tb";
import { TbLetterT } from "react-icons/tb";
import { TbLetterR } from "react-icons/tb";
import { TbLetterI } from "react-icons/tb";
import { TbLetterB } from "react-icons/tb";
import { TbLetterO } from "react-icons/tb";
import { TbLetterE } from "react-icons/tb";
import { TbLetterD } from "react-icons/tb";
import { TbLetterC } from "react-icons/tb";
import { TbLetterS } from "react-icons/tb";
import { TbLetterV } from "react-icons/tb";
import { TbLetterK } from "react-icons/tb";
import { TbLetterW } from "react-icons/tb";
import { TbLetterL } from "react-icons/tb";
import { TbLetterG } from "react-icons/tb";
import { TbLetterN } from "react-icons/tb";
import { TbLetterP } from "react-icons/tb";
import { TbLetterY } from "react-icons/tb";
import { Link } from 'react-router-dom';
import bannerAvatar from './banner-avatar.jpeg';
import './BannerWhite.css';

const BannerWhite = () => {
  return (
    <div className="banner-white banner-white-with-avatar">
      <div>&nbsp;</div>
      <img className="banner-white-avatar" src={bannerAvatar} alt="Hooded hacker avatar" />
      <div className="home-banner-content">

      <Link to="/home" className="home-brand-mark" aria-label="Home" data-tooltip-id="insert" data-tooltip-content="Home">
      <span className="home-brand-mark-ring" aria-hidden="true" />
      <span className="home-brand-mark-letter" aria-hidden="true">B</span>
      </Link>
      <TbLetterB className="home-banner-bester-letter home-banner-name-letter" style={{color: '#336791', fontSize: '40px' }}/>
      <TbLetterE className="home-banner-bester-letter home-banner-name-letter" style={{color: '#336791', fontSize: '40px' }}/>
      <TbLetterS className="home-banner-bester-letter home-banner-name-letter" style={{color: '#336791', fontSize: '40px' }}/>
      <TbLetterT className="home-banner-bester-letter home-banner-name-letter" style={{color: '#336791', fontSize: '40px' }}/>
      <TbLetterE className="home-banner-bester-letter home-banner-name-letter" style={{color: '#336791', fontSize: '40px' }}/>
      <TbLetterR className="home-banner-bester-letter home-banner-name-letter" style={{color: '#336791', fontSize: '40px' }}/>
      <TbLetterD className="home-banner-brand-letter" style={{color: '#D5441C', fontSize: '40px' }}/>
      <TbLetterE className="home-banner-brand-letter" style={{color: '#D5441C', fontSize: '40px' }}/>
      <TbLetterV className="home-banner-brand-letter banner-white-brand-end" style={{color: '#D5441C', fontSize: '40px', marginRight: "400px" }}/>

      < TbLetterC className="home-banner-brand-letter" style={{color: '#D5441C', fontSize: '9px' }}/>
      < TbLetterO className="home-banner-bester-letter" style={{color: '#336791', fontSize: '10px' }}/>
      < TbLetterN className="home-banner-bester-letter" style={{color: '#336791', fontSize: '11px' }}/>
      < TbLetterT className="home-banner-bester-letter" style={{color: '#336791', fontSize: '12px' }}/>
      < TbLetterA className="home-banner-bester-letter" style={{color: '#336791', fontSize: '13px' }}/>
      < TbLetterI className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterN className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterI className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterN className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterG className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>

      &nbsp; &nbsp; &nbsp;

      < TbLetterK className="home-banner-brand-letter" style={{color: '#D5441C', fontSize: '18px' }}/>
      < TbLetterN className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterO className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterW className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterL className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterE className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterD className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterG className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterE className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>

      &nbsp; &nbsp; &nbsp;

      < TbLetterE className="home-banner-brand-letter" style={{color: '#D5441C', fontSize: '16px' }}/>
      < TbLetterN className="home-banner-bester-letter" style={{color: '#336791', fontSize: '14px' }}/>
      < TbLetterT className="home-banner-bester-letter" style={{color: '#336791', fontSize: '13px' }}/>
      < TbLetterR className="home-banner-bester-letter" style={{color: '#336791', fontSize: '12px' }}/>
      < TbLetterO className="home-banner-bester-letter" style={{color: '#336791', fontSize: '11px' }}/>
      < TbLetterP className="home-banner-bester-letter" style={{color: '#336791', fontSize: '10px' }}/>
      < TbLetterY className="home-banner-bester-letter banner-white-tagline-end" style={{color: '#336791', fontSize: '9px', marginRight: "300px" }}/>
      </div>
    </div>
  );
};

export default BannerWhite;