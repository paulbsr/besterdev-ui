import "./DutchLanguagePage.css";
import Image from "./Amsterdam.jpg"; // ✅ import your image
import DutchLanguageList from "./DutchLanguageTable";
import DutchLanguageTranslator from "./DutchLanguageTranslator";
import DutchLanguageChallengeTranslate from "./DutchLanguageChallengeTranslate";
import DutchLanguageChallenegeCompletion from "./DutchLanguageChallenegeCompletion";
import DutchLanguageChallengeWordCheck from "./DutchLanguageChallengeWordCheck";
import DutchLanguageCompareContrast from "./DutchLanguageCompareContrast";
import DutchLanguageTicker from "./DutchLanguageTicker";

export default function DutchLanguageHomePage() {
  return (
    <div>
      {/* Spacer at the very top */}
      <div style={{ height: "20px" }}></div>

      <div className="dutch-layout">

        {/* LINKER COLUMN */}
        <div className="left"><DutchLanguageList /></div>
        <div className="spacer"></div>


        {/* CENTRE COLUMN */}
        <div className="main">
          <img src={Image} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageTicker /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallenegeCompletion /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageCompareContrast /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallengeWordCheck /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageTranslator /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallengeTranslate /></div>
        </div>


        {/* REGTER COLUMN */}
        <div className="spacer"></div>
        <div className="right">Right area</div>
      </div>
    </div>
  );
}

