
import "./DutchLanguageHomePage.css";
import 'react-tooltip/dist/react-tooltip.css';
import AskAI from '../openai/AskAI';
import DutchLanguage_Woordenschat from "./DutchLanguage_Woordenschat";
import DutchLanguageTranslator from "./DutchLanguageTranslator";
import DutchLanguageChallengeTranslate from "./DutchLanguageChallengeTranslate";
import DutchLanguageSpellingChecker from "./DutchLanguageSpellingChecker";
import DutchLanguageCompareContrast from "./DutchLanguageCompareContrast";
import DutchLanguageTicker from "./DutchLanguageTicker";
import DutchLanguageSentenceWords from "./DutchLanguageSentenceWords";
import DutchLanguageWordExplain from "./DutchLanguageWordExplain";
import DutchLanguage_Nt2exam_SchrijvenToets from "./DutchLanguage_Nt2exam_SchrijvenToets";
import DutchLanguage_Nt2exam_SchrijvenInput from "./DutchLanguage_Nt2exam_SchrijvenInput";
// import DutchLanguageWoordenschat from "./DutchLanguageWoordenschat";
import DutchLanguageSentenceTrainerModal from "./DutchLanguageSentenceTrainerModal";
import DutchLanguage_Nt2exam_LuisterenInput from "./DutchLanguage_Nt2exam_LuisterenInput";
import DutchLanguage_Nt2exam_LuisterenToets from "./DutchLanguage_Nt2exam_LuisterenToets";
import imageNT2ExamTimetableJanuary from "./NT2ExamTimetableJanuary.jpg"
import imageNT2ExamTimes from "./NT2ExamTimes.jpg"
import Image from "./Amsterdam1.jpg"
// import ImageRight from "./Dutch_Image_1.jpg"
import DutchLanguage_Dagboek from "./DutchLanguage_Dagboek";
import DutchLanguage_WordContext from "./DutchLanguage_WordContext";
import DutchLanguage_Index from "./DutchLanguage_Index";
import DutchLanguage_Verbs from "./DutchLanguage_Verbs";
import DutchLanguage_SignaalWoorden from "./DutchLanguage_SignaalWoorden";
import DutchLanguage_ChatBot from "./DutchLanguage_ChatBot";
import { PiExamFill, PiNumberCircleOneBold, PiExamBold, PiHouseSimpleBold, PiTelevisionSimpleDuotone, PiFootprintsFill } from "react-icons/pi";
import { FaNewspaper, FaFacebook, FaRadio } from "react-icons/fa6";
import { BsNewspaper, BsClockFill, BsFillDiamondFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SiGoogletranslate } from "react-icons/si";
import { RiWebcamFill } from "react-icons/ri";
import { FaCarCrash } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import DutchLanguage_Sentences from "./DutchLanguage_Sentences";
// import DutchLanguage_MLDataSet_ScoreTrend_Accuracy from "./DutchLanguage_MLDataSet_ScoreTrend_Accuracy";
import DutchLanguage_MLDataSet_ScoreTrend_Scores from "./DutchLanguage_MLDataSet_ScoreTrend_Scores";
import DutchLanguage_MLDataSet_ScoreTrend_Activity from "./DutchLanguage_MLDataSet_ScoreTrend_Activity";
import DutchLanguage_MLDataSet_ScoreTrend_LengthVsScore from "./DutchLanguage_MLDataSet_ScoreTrend_LengthVsScore";
import DutchLanguage_Zintransformatie from "./DutchLanguage_Zintransformatie";
import DutchLanguage_Zintransformatie_Mini from "./DutchLanguage_Zintransformatie_Mini";
import DutchLanguage_Lidwoorden from "./DutchLanguage_Lidwoorden";



export default function DutchLanguageHomePage() {
  return (
    <div>
      {/* Spacer at the very top */}
      <div style={{ height: "20px" }}></div>
      <div className="homepage-layout">
        {/* LINKER COLUMN#1 */}
        <div className="left">
          <DutchLanguage_Woordenschat />


        </div>
        <div className="spacer"></div>


        {/* CENTRE COLUMN */}
        <div className="main">
          <img src={Image} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <div style={{ marginTop: "10px", marginLeft: "5px" }}>
            <a href="https://www.nporadio1.nl/live" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NPO Radio 1" style={{ cursor: "pointer", color: "#336791", fontSize: "25px" }}><FaRadio /></a>
            <a href="https://www.bvn.tv/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="BVN TV" style={{ cursor: "pointer", color: "#336791", fontSize: "34px", marginLeft: "20px" }}><PiTelevisionSimpleDuotone /></a>
            <a href="https://npo.nl/start/serie/in-de-voetsporen-van/afleveringen" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NPO's In de voetsporen van" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><PiFootprintsFill /></a>
            <a href="https://npo.nl/start" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="NPO Start" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><BsFillDiamondFill /></a>
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
            <a href="https://anderetijden.nl/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Andere Tijden Website" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><BsClockFill /></a>
            <a href="https://www.youtube.com/@AndereTijdenNTR/" target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content="Andere Tijden YouTube Channel" style={{ cursor: "pointer", color: "#336791", fontSize: "24px", marginLeft: "20px" }}><TfiYoutube /></a>

          </div>

          <div><DutchLanguage_MLDataSet_ScoreTrend_Activity /></div>
          <div><DutchLanguage_MLDataSet_ScoreTrend_LengthVsScore /></div>
          <div><DutchLanguage_MLDataSet_ScoreTrend_Scores /></div>
          <div><DutchLanguage_Lidwoorden /></div>
          <div><DutchLanguage_Verbs /></div>
          <div><DutchLanguage_Index /></div>
          <div><DutchLanguage_Dagboek /></div>
          <div><DutchLanguage_Sentences /></div>
          {/* <div><DutchLanguage_MLDataSet_ScoreTrend_Accuracy /></div> */}
          <div><DutchLanguage_Zintransformatie_Mini /></div>
          <div><DutchLanguage_Zintransformatie /></div>
          <div><DutchLanguageCompareContrast /></div>
          {/* <div><DutchLanguage_Index /></div> */}


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
          >Dark Mode
          </button>

          <DutchLanguage_Nt2exam_SchrijvenToets />
          <DutchLanguage_Nt2exam_LuisterenToets />
          <DutchLanguageSentenceTrainerModal />
          <DutchLanguageSentenceWords />
          <DutchLanguageTranslator />
          <DutchLanguageChallengeTranslate />
          <DutchLanguage_Nt2exam_SchrijvenInput />
          <DutchLanguage_Nt2exam_LuisterenInput />
          <img src={imageNT2ExamTimetableJanuary} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <img src={imageNT2ExamTimes} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
        </div>


        {/* REGTER COLUMN */}
        <div className="spacer"></div>
        <div className="right">
          {/* <img src={ImageRight} alt="Image" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} /> */}
          {/* <img
            src={ImageRight}
            alt="Image"
            style={{
              width: "390px",
              height: "140px",
              boxShadow: "10px 10px 10px rgba(0,0,0,0.2)",
              borderRadius: "8px",
            }}
          /> */}

          <DutchLanguage_ChatBot />
          <DutchLanguageWordExplain />
          <DutchLanguage_WordContext />
          <DutchLanguageSpellingChecker />
          <DutchLanguage_SignaalWoorden />
        </div>
      </div>
    </div>
  );
}

