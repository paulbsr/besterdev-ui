import React from "react";
import './Fonts.css';
import { FaReact, FaJava, FaNodeJs, FaAws, FaPeopleArrows } from 'react-icons/fa';
import { SiSpringboot, SiGoogleanalytics, SiDocker } from "react-icons/si";
import { SlLogin, SlLogout } from "react-icons/sl";
import { RiOpenaiFill } from "react-icons/ri";
import { GrVirtualMachine} from "react-icons/gr";
import { BiLogoFirebase, BiLogoPostgresql, BiLogoHeroku, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import 'react-tooltip/dist/react-tooltip.css'
import { useNavigate } from 'react-router-dom'; 


  const BannerLight = ({ user }) => {
    const navigate = useNavigate();
    const handleNavigateLogin = () => {navigate('/login');}
    const handleNavigateScreen = () => {navigate('/screen');}
    const handleNavigateManage = () => {navigate('/manage');}
    const handleNavigateHowtoManage = () => {navigate('/howtomanage');}
    const handleNavigateHowtoDocs = () => {navigate('/howtodocs');}
    const handleNavigateLogout = () => {navigate('/logout');}
    
    
  return (

    <div className="banner-light" >
      <a data-tooltip-id="insert" data-tooltip-content="Login" onClick={handleNavigateLogin}><SlLogin style={{ color: '#000000', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Screen Candidates" onClick={handleNavigateScreen}><FaPeopleArrows style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Management Portal" onClick={handleNavigateManage}><MdManageAccounts style={{ color: '#336791', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Howto Management" onClick={handleNavigateHowtoManage}><FaFileCircleQuestion style={{ color: '#336791', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Howto Author" onClick={handleNavigateHowtoDocs}><FaQuestionCircle style={{ color: '#336791', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ChatGPT" href="https://chat.openai.com/auth/login" target="_blank" rel="noreferrer"><RiOpenaiFill style={{ color: '#19c37c', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ReactJS9" href="https://www.reactjs.com" target="_blank" rel="noreferrer"><FaReact style={{ color: '#61dafb', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="NodeJS18" href="https://www.nodejs.org/en" target="_blank" rel="noreferrer"><FaNodeJs style={{ color: '#169247', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Java17" href="https://www.java.com/en" target="_blank" rel="noreferrer"><FaJava style={{ color: '#D5441C', fontSize: '40px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="SpringBoot3.1.1" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer"><SiSpringboot style={{ color: '#169247', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="PostgreSQL DB DF04LM7IJ1Q2O" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer"><BiLogoPostgresql style={{ color: '#336791', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Github Repo" href="https://github.com" target="_blank" rel="noreferrer"><BiLogoGithub style={{ color: '#000000', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Amplify FE" href="https://eu-west-1.console.aws.amazon.com/amplify/home?installation_id=39421369&setup_action=install&region=eu-west-1#/dv43gyvsmgsn1/settings/domains/" target="_blank" rel="noreferrer"><FaAws style={{ color: '#ff8500', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Heroku BE" href="https://dashboard.heroku.com/apps" target="_blank" rel="noreferrer"><BiLogoHeroku style={{ color: '#6762a6', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="paul.besar@gmail.com" href="https://myaccount.google.com/" target="_blank" rel="noreferrer"><BiLogoGoogle style={{ color: '#4688F1', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Google Firebase IAM" href="https://console.firebase.google.com/project/besterdev-432e9/overview" target="_blank" rel="noreferrer"><BiLogoFirebase style={{ color: '#FFCB2B', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; 
      <a data-tooltip-id="insert" data-tooltip-content="Google Analytics" href="https://analytics.google.com/analytics/web/?pli=1#/p400562922/reports/intelligenthome" target="_blank" rel="noreferrer"><SiGoogleanalytics style={{ color: 'orange', fontSize: '24px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Docker" href="https://www.docker.com" target="_blank" rel="noreferrer"><SiDocker style={{ color: '#1D63ED', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Hyper-V" href="https://www.docker.com" target="_blank" rel="noreferrer"><GrVirtualMachine style={{ color: '#336791', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Logout" onClick={handleNavigateLogout}><SlLogout style={{ color: '#000000', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      
    </div>
  );
};
export default BannerLight;