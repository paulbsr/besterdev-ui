import React from "react";
import "./DutchLanguagePage.css";
import Image from "./Amsterdam.jpg"; // ✅ import your image
import DutchLanguageList from "./DutchLanguageTable";
import DutchLanguageTranslator from "./DutchLanguageTranslator";
// import DutchLanguageChallenge from "./DutchLanguageChallenge";
import DutchLanguageChallengeTranslate from "./DutchLanguageChallengeTranslate";
import DutchLanguageChallenegeCompletion from "./DutchLanguageChallenegeCompletion";
import DutchLanguageChallengeWordCheck from "./DutchLanguageChallengeWordCheck";

export default function DutchLanguagePage() {
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
          <img src={Image} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }}/>
          <div><DutchLanguageTranslator /></div>
          <div><DutchLanguageChallengeTranslate /></div>
          <div><DutchLanguageChallenegeCompletion /></div>
          <div><DutchLanguageChallengeWordCheck /></div>
        </div>



{/* REGTER COLUMN */}
        <div className="spacer"></div>
        <div className="right">Right area</div>
      </div>
    </div>
  );
}

