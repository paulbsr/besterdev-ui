import React from "react";
import '../Fonts.css';
import 'react-tooltip/dist/react-tooltip.css'
import { FaReact, FaJava, FaNodeJs, FaAws, FaPeopleArrows } from 'react-icons/fa';
import { SiSpringboot, SiGoogleanalytics, SiDocker, SiSwagger } from "react-icons/si";
import { SlLogin, SlLogout, SlHome } from "react-icons/sl";
import { RiOpenaiFill, RiHome3Line } from "react-icons/ri";
import { GrVirtualMachine} from "react-icons/gr";
import { BiLogoFirebase, BiLogoPostgresql, BiLogoHeroku, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";
import { MdManageAccounts, MdOutlineVpnLock, MdOutlineMailLock } from "react-icons/md";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; 
import { TbWorldWww } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaDigitalOcean, FaFileContract } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";

  const MyCV_BannerLight = ({ user }) => {
    const navigate = useNavigate();
    const handleNavigateLogin = () => {navigate('/login');}
    const handleNavigateHome = () => {navigate('/home');}
    const handleNavigateResources = () => {navigate('/webresourcemanage');}
    const handleNavigateCyclopedia= () => {navigate('/cyclopediamanage');}
    const handleNavigateHowtoManage = () => {navigate('/howtomanage');}
    const handleNavigateManage = () => {navigate('/candidatemanage');}
    const handleNavigateHunt = () => {navigate('/hunt');}
    const handleNavigateHowtoDocs = () => {navigate('/howtodocs');}
    const handleNavigateLogout = () => {navigate('/logout');}
    const handleNavigateSwagger = () => {navigate('/swagger');}
    const handleNavigateMyCV = () => {navigate('/mycv');}
 
    
  return (

    <div className="banner-light" >
      
      {/* <a data-tooltip-id="insert" data-tooltip-content="Login" onClick={handleNavigateLogin}><SlLogin style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      <a data-tooltip-id="insert" data-tooltip-content="MyCV" onClick={handleNavigateMyCV}><FaFileContract style={{ color: '#D5441C', fontSize: '26px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      {/* <a data-tooltip-id="insert" data-tooltip-content="Home" onClick={handleNavigateHome}><IoHome style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      {/* <a data-tooltip-id="insert" data-tooltip-content="Web Resources" onClick={handleNavigateResources}><TbWorldWww style={{ color: '#336791', fontSize: '32px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      {/* <a data-tooltip-id="insert" data-tooltip-content="Cyclopedia" onClick={handleNavigateCyclopedia}><BsPatchQuestionFill style={{ color: '#336791', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      {/* <a data-tooltip-id="insert" data-tooltip-content="Howtos" onClick={handleNavigateHowtoManage}><IoLibrary style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      {/* <a data-tooltip-id="insert" data-tooltip-content="Hunt" onClick={handleNavigateHunt}><FaPeopleArrows style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      {/* <a data-tooltip-id="insert" data-tooltip-content="Candidates" onClick={handleNavigateManage}><MdManageAccounts style={{ color: '#336791', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp; */}
      <a data-tooltip-id="insert" data-tooltip-content="ChatGPT v3.5" href="https://chat.openai.com/auth/login" target="_blank" rel="noreferrer"><RiOpenaiFill style={{ color: '#19c37c', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ReactJS ^18.2.0" href="https://www.reactjs.com" target="_blank" rel="noreferrer"><FaReact style={{ color: '#61dafb', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="NodeJS v20.9.0" href="https://www.nodejs.org/en" target="_blank" rel="noreferrer"><FaNodeJs style={{ color: '#336791', fontSize: '35px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Java 17.0.9" href="https://www.java.com/en" target="_blank" rel="noreferrer"><FaJava style={{ color: '#D5441C', fontSize: '40px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content=":: Spring Boot :: (v3.1.2)" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer"><SiSpringboot style={{ color: '#336791', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="PostgreSQL DB Heroku" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer"><BiLogoPostgresql style={{ color: '#336791', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Github Repo" href="https://github.com" target="_blank" rel="noreferrer"><BiLogoGithub style={{ color: '#000000', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Amplify FE" href="https://eu-west-1.console.aws.amazon.com/amplify/home?installation_id=39421369&setup_action=install&region=eu-west-1#/dv43gyvsmgsn1/settings/domains/" target="_blank" rel="noreferrer"><FaAws style={{ color: '#ff8500', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Heroku BE" href="https://dashboard.heroku.com/apps" target="_blank" rel="noreferrer"><BiLogoHeroku style={{ color: '#6762a6', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="paul.besar@gmail.com" href="https://myaccount.google.com/" target="_blank" rel="noreferrer"><BiLogoGoogle style={{ color: '#4688F1', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Google Firebase IAM" href="https://console.firebase.google.com/project/besterdev-432e9/overview" target="_blank" rel="noreferrer"><BiLogoFirebase style={{ color: '#FFCB2B', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Google Analytics" href="https://analytics.google.com/analytics/web/?pli=1#/p400562922/reports/intelligenthome" target="_blank" rel="noreferrer"><SiGoogleanalytics style={{ color: 'orange', fontSize: '24px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="paulbsr" href="https://www.docker.com" target="_blank" rel="noreferrer"><SiDocker style={{ color: '#1D63ED', fontSize: '33px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="DigitalOcean" href="https://www.digitalocean.com" target="_blank" rel="noreferrer"><FaDigitalOcean style={{ color: '#0069FF', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Hyper-V" href="https://www.docker.com" target="_blank" rel="noreferrer"><GrVirtualMachine style={{ color: '#336791', fontSize: '27px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ProtonVPN (paulbsr)" href="https://protonvpn.com/" target="_blank" rel="noreferrer"><MdOutlineVpnLock style={{ color: 'brown', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="ProtonMail (kuberkont)" href="https://mail.proton.me/u/0/inbox" target="_blank" rel="noreferrer"><MdOutlineMailLock style={{ color: 'brown', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      <a data-tooltip-id="insert" data-tooltip-content="Swagger" onClick={handleNavigateSwagger}><SiSwagger style={{ color: '#85EA2D', fontSize: '30px', cursor: 'pointer' }} /></a>&nbsp;&nbsp;&nbsp;
      {/* <a data-tooltip-id="insert" data-tooltip-content="Logout" onClick={handleNavigateLogout}><SlLogout style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>&nbsp;&nbsp; */}
      
    </div>
  );
};
export default MyCV_BannerLight;