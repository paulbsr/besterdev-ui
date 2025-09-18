import "./DutchLanguageHomePage.css";
import Image from "./Amsterdam1.jpg";
import DutchLanguageList from "./DutchLanguageTable";
import DutchLanguageTranslator from "./DutchLanguageTranslator";
import DutchLanguageChallengeTranslate from "./DutchLanguageChallengeTranslate";
import DutchLanguageChallenegeCompletion from "./DutchLanguageChallenegeCompletion";
import DutchLanguageChallengeWordCheck from "./DutchLanguageChallengeWordCheck";
import DutchLanguageCompareContrast from "./DutchLanguageCompareContrast";
import DutchLanguageTicker from "./DutchLanguageTicker";
import AskAI from '../openai/AskAI';
import DutchLanguageWoordenschat from "./DutchLanguageWoordenschat";
import DutchLanguageSentenceTrainerModal from "./DutchLanguageSentenceTrainerModal";
// import 'react-tooltip/dist/react-tooltip.css';
// import { Tooltip } from 'react-tooltip';
// import DutchLanguageSentenceTrainer from "./DutchLanguageSentenceTrainer";

export default function DutchLanguageHomePage() {
  return (
    <div>
      {/* Spacer at the very top */}
      <div style={{ height: "20px" }}></div>

      <div className="homepage-layout">

        {/* LINKER COLUMN#1 */}
        <div className="left">
          <DutchLanguageList />
          <DutchLanguageWoordenschat />
        </div>

        <div className="spacer"></div>



        {/* CENTRE COLUMN */}
        <div className="main">
          <img src={Image} alt="Amsterdam" style={{ boxShadow: "10px 10px 10px rgba(0,0,0,0.2)", borderRadius: "8px", }} />
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageTicker /></div>
          <div>&nbsp;&nbsp;</div>
          <div><AskAI /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallenegeCompletion /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageCompareContrast /></div>
          {/* <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallengeWordCheck /></div> */}
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageTranslator /></div>
          <div>&nbsp;&nbsp;</div>
          <div><DutchLanguageChallengeTranslate /></div>
        </div>


        {/* REGTER COLUMN */}
        <div className="spacer"></div>
        <div className="right">
          <DutchLanguageChallengeWordCheck />
          {/* <DutchLanguageSentenceTrainer /> */}
            <DutchLanguageSentenceTrainerModal />

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

