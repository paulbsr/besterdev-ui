import "./DutchLanguageHomePage.css";
import DutchLanguageIndex from "./DutchLanguageIndex";
import DutchLanguageTranslator from "./DutchLanguageTranslator";
import DutchLanguageChallengeTranslate from "./DutchLanguageChallengeTranslate";
import DutchLanguageSpellingChecker from "./DutchLanguageSpellingChecker";
import DutchLanguageCompareContrast from "./DutchLanguageCompareContrast";
import DutchLanguageTicker from "./DutchLanguageTicker";
import DutchLanguageSentenceWords from "./DutchLanguageSentenceWords";
import DutchLanguageWordExplain from "./DutchLanguageWordExplain";
import DutchLanguage_Nt2exam_SchrijvenToets from "./DutchLanguage_Nt2exam_SchrijvenToets";
import DutchLanguage_Nt2exam_SchrijvenInput from "./DutchLanguage_Nt2exam_SchrijvenInput";
import DutchLanguageWoordenschat from "./DutchLanguageWoordenschat";
import DutchLanguageSentenceTrainerModal from "./DutchLanguageSentenceTrainerModal";
import DutchLanguage_Nt2exam_LuisterenInput from "./DutchLanguage_Nt2exam_LuisterenInput";
import DutchLanguage_Nt2exam_LuisterenToets from "./DutchLanguage_Nt2exam_LuisterenToets";
import AskAI from '../openai/AskAI';
import 'react-tooltip/dist/react-tooltip.css';
import { FaRadio } from "react-icons/fa6";
import { RiWebcamFill } from "react-icons/ri";
import { PiExamFill, PiNumberCircleOneBold } from "react-icons/pi";
import { FaNewspaper } from "react-icons/fa6";
import { BsNewspaper } from "react-icons/bs";
import { PiHouseSimpleBold } from "react-icons/pi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import imageNT2ExamTimetableJanuary from "./NT2ExamTimetableJanuary.jpg"
import imageNT2ExamTimes from "./NT2ExamTimes.jpg"
import Image from "./Amsterdam1.jpg"
import { SiGoogletranslate } from "react-icons/si";
import { FaCarCrash } from "react-icons/fa";
import DutchLanguage_Dagboek from "./DutchLanguage_Dagboek";
import { PiExamBold } from "react-icons/pi";
import { PiTelevisionBold } from "react-icons/pi";
import DutchLanguage_WordContext from "./DutchLanguage_WordContext";
import { FaFacebook } from "react-icons/fa6";
import DutchLanguage_Index from "./DutchLanguage_Index";

export default function DutchLanguageHomePage() {
  return (
    <div>
      {/* Spacer at the very top */}
      <div style={{ height: "20px" }}></div>

      <div className="homepage-layout">

        {/* LINKER COLUMN#1 */}
        <div className="left">
          <DutchLanguageIndex />
          <DutchLanguageWoordenschat />
        </div>

        <div className="spacer"></div>



        {/* CENTRE COLUMN */}
        <div className="main">
          {/* <Tooltip id="insert" place="top" style={{ opacity: 1, backgroundColor: "#333", color: "#fff" }} /> */}
          <img src={Image} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageTicker /></div>
          <div><DutchLanguageCompareContrast /></div>

          <div style={{ marginTop: "10px", marginLeft: "45px" }}>
            <a href="https://www.nporadio1.nl/live" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NPO Radio 1" style={{ cursor: "pointer", color: "#336791", fontSize: "25px" }}><FaRadio /></a>
            <a href="https://www.bvn.tv/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="BVN TV" style={{ cursor: "pointer", color: "#336791", fontSize: "30px", marginLeft: "20px" }}><PiTelevisionBold /></a>
            <a href="https://www.rtl.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="RTL News" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><FaNewspaper /></a>
            <a href="https://nos.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NOS News" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><BsNewspaper /></a>
            <a href="https://www.skyFont-Segoe-14px-Blackwebcams.com/en/webcam/netherlands/north-holland/amsterdam/amsterdam-dam-square.html" data-tooltip-id="insert" data-tooltip-content="Dam Square Live Webcam" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", color: "#336791", fontSize: "25px", marginLeft: "20px" }}><RiWebcamFill /></a>
            <a href="https://www.staatsexamensnt2.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Staatsexamens NT2" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><PiExamBold /></a>
            <a href="https://oefenexamensnt2.nl/facet-openbaar-portaal/welkom" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Staatsexamens NT2 Oefen" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><PiExamFill /></a>
            <a href="https://www.knmi.nl/nederland-nu/weer/verwachtingen" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NL KNMI" style={{ cursor: "pointer", color: "#336791", fontSize: "30px", marginLeft: "20px" }}><TiWeatherPartlySunny /></a>
            <a href="https://www.taalthuis.com/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Taal Thuis" style={{ cursor: "pointer", color: "#336791", fontSize: "28px", marginLeft: "20px" }}><PiHouseSimpleBold /></a>
            <a href="https://translate.google.com/?sl=nl&tl=af&op=translate" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Google Translate" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><SiGoogletranslate /></a>
            <a href="https://www.anwb.nl/verkeer?center=52.08720994322829%2C5.449947200775682&zoom=6.173985622710852" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Verkeer" style={{ cursor: "pointer", color: "#336791", fontSize: "27px", marginLeft: "20px" }}><FaCarCrash /></a>
            <a href="https://npo.nl/start/serie/eenvandaag/afleveringen" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NPO EenVandaag" style={{ cursor: "pointer", color: "#336791", fontSize: "27px", marginLeft: "20px" }}><PiNumberCircleOneBold /></a>
            <a href="https://www.facebook.com/StaatsexamensNt2" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="StaatsexamensNt2" style={{ cursor: "pointer", color: "#336791", fontSize: "27px", marginLeft: "20px" }}><FaFacebook /></a>


<button
  onClick={() => document.body.classList.toggle('dark')}
  style={{
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '6px 10px',
    fontFamily: 'Segoe UI',
    cursor: 'pointer',
  }}
>
  Toggle Dark Mode
</button>



          </div>

          <AskAI />
          <DutchLanguage_Dagboek />
          <DutchLanguage_Nt2exam_SchrijvenToets />
          <DutchLanguage_Nt2exam_LuisterenToets />
          <DutchLanguageSentenceTrainerModal />
          <DutchLanguageSentenceWords />
          <DutchLanguageTranslator />
          <DutchLanguageChallengeTranslate />
          <DutchLanguage_Nt2exam_SchrijvenInput />
          <DutchLanguage_Nt2exam_LuisterenInput />
          <DutchLanguage_Index />
          <img src={imageNT2ExamTimetableJanuary} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <img src={imageNT2ExamTimes} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
        </div>


        {/* REGTER COLUMN */}
        <div className="spacer"></div>
        <div className="right">
          <DutchLanguage_WordContext/>
          <DutchLanguageSpellingChecker />
          <DutchLanguageWordExplain />
          <div>&nbsp;&nbsp;</div>

          {/* <p className="Font-Segoe-14px-Black underFont-Segoe-14px-Black spaced">Bijvoeglijke Naamwoorden:</p>
          <p className="Font-Segoe-14px-Black"><i>Describe nouns. Gets trailing "-e"</i></p>
          <p className="Font-Segoe-14px-Black">de <i>rode</i> auto (plural definite = die/the)</p>
          <p className="Font-Segoe-14px-Black">het groene boek (singular definite = die/the)</p>
          <p className="Font-Segoe-14px-Black">een grote man (singular indefinite = 'n/a/an)</p>

          <p className="Font-Segoe-14px-Black underFont-Segoe-14px-Black spaced">Zelfstandige naamwoorden:</p>
          <p className="Font-Segoe-14px-Black"><i>Words for people, places, things, ideas.</i></p>
          <p className="Font-Segoe-14px-Black">zijn = is (to be)</p>
          <p className="Font-Segoe-14px-Black">hebben = het (to have)</p>
          <p className="Font-Segoe-14px-Black">Ik ben moe → I am tired</p>
          <p className="Font-Segoe-14px-Black">Jij hebt een auto → You have a car.</p>
          <p className="Font-Segoe-14px-Black">Ik ben gegaan → I have gone / I went.</p>
          <p className="Font-Segoe-14px-Black">Ik heb gegeten → I have eaten / I ate.</p> */}
<div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>

          <p className="Font-Segoe-14px-Black"><b>IS:</b></p>
          <p className="Font-Segoe-14px-Black">EK IS -- Ik ben een Afrikaner</p>
          <p className="Font-Segoe-14px-Black">JY IS -- Jij bent een Afrikaner</p>
          <p className="Font-Segoe-14px-Black">ONS IS -- Wij zijn Afrikanen</p>
          <p className="Font-Segoe-14px-Black">JULLE IS -- Jullie zijn Afrikanen</p>
          <p className="Font-Segoe-14px-Black">HULLE IS -- Zij zijn Afrikanen</p>
          <p className="Font-Segoe-14px-Black">HY IS -- Hij is Afrikaan</p>

          <p className="Font-Segoe-14px-Black">.</p>

          <p className="Font-Segoe-14px-Black"><b>WAS:</b></p>
          <p className="Font-Segoe-14px-Black">EK WAS -- Ik was droken</p>
          <p className="Font-Segoe-14px-Black">JY WAS -- Jij was droken</p>
          <p className="Font-Segoe-14px-Black">ONS WAS -- Wij waren droken</p>
          <p className="Font-Segoe-14px-Black">JULLE WAS -- Jullie waren dronken</p>
          <p className="Font-Segoe-14px-Black">HULLE WAS -- Ze waren dronken</p>
          <p className="Font-Segoe-14px-Black">HY WAS -- Hij was dronken</p>
          <p className="Font-Segoe-14px-Black">SY WAS -- Ze was dronken</p>

          <p className="Font-Segoe-14px-Black">.</p>

          <p className="Font-Segoe-14px-Black"><b>KAN:</b></p>
          <p className="Font-Segoe-14px-Black">EK KAN -- Ik kan komen</p>
          <p className="Font-Segoe-14px-Black">JY KAN -- Jij kunt komen</p>
          <p className="Font-Segoe-14px-Black">ONS KAN -- Wij kunnen komen</p>
          <p className="Font-Segoe-14px-Black">JULLE KAN -- Jullie kunnen komen</p>
          <p className="Font-Segoe-14px-Black">HULLE KAN -- Zij kunnen komen</p>
          <p className="Font-Segoe-14px-Black">HY KAN -- Hij kan komen</p>

          <p className="Font-Segoe-14px-Black">.</p>

          <p className="Font-Segoe-14px-Black"><b>WIL:</b></p>
          <p className="Font-Segoe-14px-Black">EK WIL -- Ik wil dansen</p>
          <p className="Font-Segoe-14px-Black">JY WIL -- Jij wilt dansen</p>
          <p className="Font-Segoe-14px-Black">ONS WIL -- Wij willen dansen</p>
          <p className="Font-Segoe-14px-Black">JULLE WIL -- Jullie willen dansen</p>
          <p className="Font-Segoe-14px-Black">HULLE WIL -- Ze willen dansen.</p>
          <p className="Font-Segoe-14px-Black">HY WIL -- Hij wil dansen</p>
          
          <p className="Font-Segoe-14px-Black">.</p>

          <p className="Font-Segoe-14px-Black"><b>HET:</b></p>
          <p className="Font-Segoe-14px-Black">EK HET -- Ik heb een wapen</p>
          <p className="Font-Segoe-14px-Black">JY HET -- Jij hebt een wapen</p>
          <p className="Font-Segoe-14px-Black">ONS HET -- We hebben een wapen</p>
          <p className="Font-Segoe-14px-Black">JULLE HET -- Jullie hebben een wapen</p>
          <p className="Font-Segoe-14px-Black">HULLE HET -- Ze hebben een wapen</p>
          <p className="Font-Segoe-14px-Black">HY HET -- Hij heeft een wapen</p>
          <p className="Font-Segoe-14px-Black">SY HET -- Hiske heeft beginnende diabetes. Zij heeft door haar diabetes een hoog bloedsuikergehalte</p>

          <p className="Font-Segoe-14px-Black">.</p>

          <p className="Font-Segoe-14px-Black"><b>GEHAD:</b></p>
          <p className="Font-Segoe-14px-Black">EK HET GEHAD-- Ik had een wapen</p>
          <p className="Font-Segoe-14px-Black">JY HET GEHAD -- Jij had een wapen</p>
          <p className="Font-Segoe-14px-Black">ONS HET GEHAD -- We hadden een wapen</p>
          <p className="Font-Segoe-14px-Black">JULLE HET GEHAD -- Je had een wapen</p>
          <p className="Font-Segoe-14px-Black">HULLE HET GEHAD -- Ze headden een wapen</p>
          <p className="Font-Segoe-14px-Black">HY HET GEHAD -- Hij had een wapen</p>

</div>

        </div>
      </div>
    </div>
  );
}

