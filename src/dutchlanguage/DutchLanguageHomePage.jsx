import "./DutchLanguageHomePage.css";
import Image from "./Amsterdam1.jpg";
import DutchLanguageIndex from "./DutchLanguageIndex";
import DutchLanguageTranslator from "./DutchLanguageTranslator";
import DutchLanguageChallengeTranslate from "./DutchLanguageChallengeTranslate";
import DutchLanguage_Nt2exam_Schrijven from "./DutchLanguage_Nt2exam_Schrijven";
import DutchLanguageSpellingChecker from "./DutchLanguageSpellingChecker";
import DutchLanguageCompareContrast from "./DutchLanguageCompareContrast";
import DutchLanguageTicker from "./DutchLanguageTicker";
import AskAI from '../openai/AskAI';
import DutchLanguageWoordenschat from "./DutchLanguageWoordenschat";
import DutchLanguageSentenceTrainerModal from "./DutchLanguageSentenceTrainerModal";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FaRadio } from "react-icons/fa6";
import { RiWebcamFill } from "react-icons/ri";
import { PiExamFill } from "react-icons/pi";
import { RiSpeakFill } from "react-icons/ri";
import DutchLanguageSentenceWords from "./DutchLanguageSentenceWords";
import DutchLanguageWordExplain from "./DutchLanguageWordExplain";
import { FaNewspaper } from "react-icons/fa6";
import { BsNewspaper } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import DutchLanguage_Nt2exam_SchrijvenInput from "./DutchLanguage_Nt2exam_SchrijvenInput";
import imageNT2ExamTimetableJanuary from "./NT2ExamTimetableJanuary.jpg"
import DutchLanguage_Nt2exam_LuisterenInput from "./DutchLanguage_Nt2exam_LuisterenInput";


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
          <Tooltip id="insert" place="top" style={{ opacity: 1, backgroundColor: "#333", color: "#fff" }}/>
          <img src={Image} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageTicker /></div>
                    <div><DutchLanguageCompareContrast /></div>

          <div style={{ marginTop: "10px", marginLeft: "5px" }}>
            <a href="https://www.nporadio1.nl/live" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NPO Radio 1" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "25px" }}><FaRadio /></a>
            <a href="https://www.skylinewebcams.com/en/webcam/netherlands/north-holland/amsterdam/amsterdam-dam-square.html" data-tooltip-id="insert" data-tooltip-content="Dam Square Live Webcam" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "25px", marginLeft: "20px" }}><RiWebcamFill /></a>
            <a href="https://oefenexamensnt2.nl/facet-openbaar-portaal/welkom" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Staatsexamens NT2 Oefen" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "24px", marginLeft: "20px" }}><PiExamFill /></a>
            <a href="https://www.staatsexamensnt2.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Staatsexamens NT2" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "24px", marginLeft: "20px" }}><RiSpeakFill /></a>
            <a href="https://www.rtl.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="RTL" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "24px", marginLeft: "20px" }}><FaNewspaper /></a>
            <a href="https://nos.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NOS" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "24px", marginLeft: "20px" }}><BsNewspaper /></a>
            <a href="https://www.knmi.nl/nederland-nu/weer/verwachtingen" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NL KNMI" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "30px", marginLeft: "20px" }}><TiWeatherPartlySunny /></a>
            <a href="https://www.metoffice.gov.uk/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="UK Met" style={{ cursor: "pointer", color: "#c0c0c0", fontSize: "30px", marginLeft: "20px" }}><TiWeatherDownpour /></a>
          </div>
                    <div>&nbsp;</div>
          <div><AskAI /></div>

          <DutchLanguage_Nt2exam_Schrijven />

          <DutchLanguageSentenceTrainerModal />

          <div><DutchLanguageCompareContrast /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageSentenceWords /></div>
          <div>&nbsp;&nbsp;</div>

          <div><DutchLanguageTranslator /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallengeTranslate /></div>
          <div>&nbsp;&nbsp;{imageNT2ExamTimetableJanuary}</div>
          <div><DutchLanguage_Nt2exam_SchrijvenInput/></div>
          <div><DutchLanguage_Nt2exam_LuisterenInput/></div>
          <img src={imageNT2ExamTimetableJanuary} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
        </div>


        {/* REGTER COLUMN */}
        <div className="spacer"></div>
        <div className="right">
          <DutchLanguageSpellingChecker />
          <DutchLanguageWordExplain />          
          <div>&nbsp;&nbsp;</div>
          {/* <DutchLanguageExamSchrijvenInput/> */}
          <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>
                              <div>&nbsp;&nbsp;</div>
          <p className="line underline">Pronouns (Voornaamwoorden):</p>
          <p className="line"><i>ik, jij, hij, zij, wij, jullie, zij</i></p>

          <p className="line underline spaced">Adjectives (Bijvoeglijke Naamwoorden):</p>
          <p className="line"><i>Describe nouns. Gets trailing "-e"</i></p>
          <p className="line">een <b>grote</b> man</p>
          <p className="line">de <b>rode</b> auto</p>
          <p className="line">het <b>groene</b> boek</p>

          <p className="line underline spaced">Adverbs (Bijwoorden):</p>
          <p className="line"><i>Tells us how, when, where, or how often something happens</i></p>
          <p className="line">snel, vaak, hier, nu</p>

          <p className="line underline spaced">Nouns (Zelfstandige naamwoorden):</p>
          <p className="line"><i>Words for people, places, things, ideas.</i></p>
          <p className="line">zijn = is (to be)</p>
          <p className="line">hebben = het (to have)</p>

          <p className="line underline spaced">Articles (Lidwoorden):</p>
          <p className="line"><i>Words like “the” and “a/an” that go with nouns.</i></p>
          <p className="line">een = 'n / a / an (singular)</p>
          <p className="line">de = die / the (always with plural)</p>
          <p className="line">het = die / the (singular)</p>

          <p className="line underline spaced">Pronouns (Voornaamwoorden):</p>
          <p className="line"><i>Words that replace nouns (I, you, he, she, it, we, they)</i></p>
          <p className="line">ik, jij, hij, zij, wij, jullie</p>

          <p className="line underline spaced">Verbs (Werkwoorden):</p>
          <p className="line"><i>Two super-important verbs</i></p>
          <p className="line">zijn = to be (is)</p>
          <p className="line">hebben = to have (het)</p>
          <p className="line">werken = to work</p>
          <p className="line">gaan = to go</p>


        </div>



      </div>
    </div>
  );
}

