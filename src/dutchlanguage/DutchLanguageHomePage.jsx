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
import DutchLanguage_Tenses from "./DutchLanguage_Tenses";
import DutchLanguage_SignaalWoorden from "./DutchLanguage_SignaalWoorden";

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
          <div style={{ marginTop: "10px", marginLeft: "5px" }}>
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
          </div>

          <AskAI />

          <div><DutchLanguageCompareContrast /></div>
          <div><DutchLanguage_Index /></div>
          <div><DutchLanguage_Tenses /></div>
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
          <DutchLanguage_Dagboek />
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
          <DutchLanguage_WordContext />
          <DutchLanguageSpellingChecker />
          <DutchLanguageWordExplain />
          <DutchLanguage_SignaalWoorden />


{/* <div
  style={{
    fontFamily: "Segoe UI, sans-serif",
    fontSize: "9pt",
    whiteSpace: "pre-line",
  }}
>
  {`Signaalwoorden zijn belangrijke woorden om een tekst snel te kunnen lezen en 
begrijpen: het zijn de woorden waarmee de schrijver de structuur en gedachtegang 
van zijn tekst duidelijk maakt. Na een signaalwoord kan er bijvoorbeeld een 
tegenstelling komen, een voorbeeld, een conclusie of een uitleg. Let dus bij het lezen 
op signaalwoorden om de tekst beter te begrijpen, en gebruik bij het schrijven 
signaalwoorden om je tekst beter leesbaar en duidelijker te maken. 

Er zijn verschillende soorten signaalwoorden:`}
  
  <br /><br />

  <strong>Opsomming:</strong> {`ten eerste, en, eveneens, zowel ... als, tevens, daarbij, 
vervolgens, bovendien, verder, ook, een andere, daarnaast, ten slotte, tot slot.`}

  <br /><br />

  <strong>Toelichting/voorbeeld:</strong> {`zoals, bijvoorbeeld, zo, een voorbeeld, dat blijkt uit, 
dat komt voor bij, ter illustratie, onder andere, neem nou, u kent het wel, ter 
verduidelijking.`}

  <br /><br />

  <strong>Volgorde:</strong> {`eerst, vervolgens, dan, daarna, later, voorafgaand, toen, terwijl, 
voordat, nadat, zodra, intussen, vroeger.`}

  <br /><br />

  <strong>Tijdsaanduidingen:</strong> {`In 1972, een jaar later, op 12 mei, sinds die tijd, enz.`}

  <br /><br />

  <strong>Oorzaak/gevolg:</strong> {`door, waardoor, daardoor, doordat, zodat, te danken aan, te 
wijten aan, als gevolg van, dientengevolge, had als gevolg, wegens.`}

  <br /><br />

  <strong>Doel/middel:</strong> {`om ... te, door te, door middel van, met behulp van, opdat, 
daarmee, daartoe, teneinde, met als doel, daarvoor.`}

  <br /><br />

  <strong>Voorwaarde:</strong> {`als, indien, mits, wanneer, tenzij, stel dat, in het geval, 
aangenomen dat.`}

  <br /><br />

  <strong>Reden/verklaring:</strong> {`want, omdat, dat blijkt uit, hierom, derhalve, aangezien, 
vanwege, wegens, namelijk, immers, daarom.`}

  <br /><br />

  <strong>Vergelijking:</strong> {`net als, zoals, evenals, hetzelfde als, in vergelijking met, 
vergeleken met.`}

  <br /><br />

  <strong>Tegenstelling/contrast:</strong> {`enerzijds/anderzijds, niettemin, toch, echter, maar, 
daarentegen, integendeel, in plaats van, in tegenstelling tot, daar staat 
tegenover, desondanks.`}

  <br /><br />

  <strong>Mate van belangrijkheid:</strong> {`erg, zeer, bijzonder, meest.`}

  <br /><br />

  <strong>Samenvatting/conclusie:</strong> {`dus, kortom, concluderend, samenvattend, 
hieruit volgt, uiteindelijk, hieruit kunnen we afleiden, samengevat, alles bij 
elkaar, met andere woorden, al met al, daarom, dat houdt in, alles overziend, 
alles afwegend, slotsom.`}
</div> */}


          
        </div>
      </div>
    </div>
  );
}

