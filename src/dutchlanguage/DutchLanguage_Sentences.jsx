// import React, { useState, useEffect, useRef } from "react";
// import { DutchLanguage_AIEvaluator } from "./DutchLanguage_AIEvaluator";
// import DutchLanguage_AI_Response from "./DutchLanguage_AI_Response";
// import { FiTrash2, FiRefreshCw } from "react-icons/fi";
// import { FaTimes } from "react-icons/fa";


// function DutchLanguage_Sentences() {
//   const [word, setWord] = useState("Laden...");
//   const [sentence, setSentence] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [recentSubmission, setRecentSubmission] = useState(null);
//   const [topic] = useState("De Goude Eeuw");

//   const API_ASK = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";
//   const API_DB = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/add";

//   const timerRef = useRef(null);
//   const [elapsed, setElapsed] = useState(0);

//   const handleClearSubmission = () => {
//   setRecentSubmission(null);
//   setFeedback("");
// };


//   // ------------------- Word Fetch -------------------
//   const formatText = (text) => {
//     if (!text) return "";
//     return text.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/\[|\]/g, "").trim();
//   };

//   const fetchWord = async (customTopic = topic) => {
//     try {
//       setWord("Laden...");
//       const res = await fetch(API_ASK, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: `Geef mij één willekeurig Nederlands woord over onderwerp ${customTopic}, zonder uitleg of zinnen. Alleen het woord.`,
//         }),
//       });
//       const data = await res.json();
//       setWord(formatText(data.answer || data.response || "onbekend woord"));
//     } catch {
//       setWord("Fout bij laden");
//     }
//   };

//   useEffect(() => {
//     fetchWord();
//     timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const resetTimer = () => {
//     clearInterval(timerRef.current);
//     setElapsed(0);
//     timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
//   };

//   const formatTime = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

//   // ------------------- Submit Sentence -------------------
//   const handleSubmit = async (e) => {
//     if (e.key !== "Enter") return;
//     if (!sentence.trim()) return;

//     setLoading(true);
//     setFeedback("");

//     try {
//       // Call common AI evaluator
//       const updated = await DutchLanguage_AIEvaluator({
//         userInput: sentence,
//         promptType: "sentences",
//         exerciseType: "zin-oefening",
//         originComponent: "DutchLanguage_Sentences",
//         difficultyLevel: 1,
//         userId: 123,
//         apiBase: API_DB,
//         aiEndpoint: API_ASK,
//       });

//       setFeedback(updated.aiFeedback || "Geen feedback ontvangen vanaf OpenAI in <DutchLanguage_Sentences>.");

//       // Update latest submission
//       setRecentSubmission({
//         userInput: sentence,
//         aiCorrection: updated.aiCorrection || "",
//         aiFeedback: updated.aiFeedback || "",
//         scoreUserAverage: updated.scoreUserAverage || 1,
//         scoreArticle: updated.scoreArticle,
//         scoreSpelling: updated.scoreSpelling,
//         scoreWordorder: updated.scoreWordorder,
//         scoreGrammar: updated.scoreGrammar,
//         scoreComprehensibility: updated.scoreComprehensibility,
//         scoreNoun: updated.scoreNoun,
//         scoreVocabulary: updated.scoreVocabulary,
//       });

//       resetTimer();
//       setSentence("");
//     } catch (err) {
//       console.error(err);
//       setFeedback("Er is een fout opgetreden bij het controleren.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------- New Word -------------------
//   const handleNewWord = async () => {
//     setSentence("");
//     setFeedback("");
//     await fetchWord();
//   };

//   // ------------------- Word Count -------------------
//   const countWords = (text) =>
//     text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

//   // ------------------- JSX -------------------
//   return (
//     <div style={{ fontFamily: "Segoe UI", width: "98%" }}>
//       <div style={{ position: "relative", width: "98%" }}>
//         <FiRefreshCw
//           onClick={handleNewWord}
//           title="Nieuw woord"
//           style={{
//             position: "absolute",
//             right: "2px",
//             top: "40%",
//             transform: "translateY(-50%)",
//             cursor: "pointer",
//             fontSize: "20px",
//             color: "#c0c0c0",
//           }}
//         />

//         <input
//           type="text"
//           value={sentence}
//           onChange={(e) => setSentence(e.target.value)}
//           onKeyDown={handleSubmit}
//           placeholder={`Gebruik dit woord in een correcte zin: ${word}`}
//           style={{
//             height: "40px",
//             width: "100%",
//             border: "1px solid #FF4F00",
//             borderRadius: "6px",
//             paddingLeft: "10px",
//             paddingRight: "24px",
//             fontSize: "16px",
//             marginTop: "10px",
//             marginBottom: "16px",
//           }}
//         />
//       </div>

//       {loading && (
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             marginTop: "2px",
//             marginBottom: "5px",
//             color: "#FF4F00",
//             fontSize: "15px",
//           }}
//         >
//           <div
//             style={{
//               width: "16px",
//               height: "16px",
//               border: "2px solid #FF4F00",
//               borderTop: "2px solid transparent",
//               borderRadius: "50%",
//               animation: "spin 0.8s linear infinite",
//             }}
//           ></div>
//           <span>Bezig met controleren...</span>
//         </div>
//       )}


//       {/* ------------------- Latest AI Submission ------------------- */}
//       {/* {recentSubmission && (
//         <div style={{ marginBottom: "16px" }}>
//           <DutchLanguage_AI_Response submission={recentSubmission} />
//         </div>
//       )} */}

//       {recentSubmission && (
//   <div style={{ 
//       marginBottom: "16px", 
//       position: "relative",
//       // paddingRight: "4px"
//   }}>
//     {/* Delete Icon */}
//     <FaTimes
//       onClick={handleClearSubmission}
//       title="Verwijderen"
//       style={{
//         position: "absolute",
//         right: "0px",
//         top: "4px",
//         cursor: "pointer",
//         fontSize: "18px",
//         color: "#c0c0c0"
//       }}
//     />

//     <DutchLanguage_AI_Response submission={recentSubmission} />
//   </div>
// )}

//     </div>
//   );
// }

// export default DutchLanguage_Sentences;

import React, { useState, useEffect, useRef } from "react";
import { DutchLanguage_AIEvaluator } from "./DutchLanguage_AIEvaluator";
import DutchLanguage_AI_Response from "./DutchLanguage_AI_Response";
import { FiRefreshCw } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

function DutchLanguage_Sentences() {
  const [word, setWord] = useState("Laden...");
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSubmission, setRecentSubmission] = useState(null);

  const [topic, setTopic] = useState("De Goude Eeuw");

  const API_ASK = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";
  const API_DB = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/add";

  const timerRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  const handleClearSubmission = () => {
    setRecentSubmission(null);
    setFeedback("");
  };

  // ------------------- Word Fetch -------------------
  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/\[|\]/g, "").trim();
  };

  const fetchWord = async (customTopic = topic) => {
    try {
      setWord("Laden...");
      const res = await fetch(API_ASK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Geef mij één willekeurig Nederlands woord over onderwerp ${customTopic}, zonder uitleg of zinnen. Alleen het woord.`,
        }),
      });

      const data = await res.json();
      setWord(formatText(data.answer || data.response || "onbekend woord"));
    } catch {
      setWord("Fout bij laden");
    }
  };

  useEffect(() => {
    fetchWord();
    timerRef.current = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((prev) => prev + 1), 1000);
  };

  const formatTime = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

  // ------------------- Submit Sentence -------------------
  const handleSubmit = async (e) => {
    if (e.key !== "Enter") return;
    if (!sentence.trim()) return;

    setLoading(true);
    setFeedback("");

    try {
      const updated = await DutchLanguage_AIEvaluator({
        userInput: sentence,
        promptType: "sentences",
        exerciseType: "zin-oefening",
        originComponent: "DutchLanguage_Sentences",
        difficultyLevel: 1,
        userId: 123,
        apiBase: API_DB,
        aiEndpoint: API_ASK,
      });

      setFeedback(updated.aiFeedback || "Geen feedback ontvangen vanaf OpenAI in <DutchLanguage_Sentences>.");

      setRecentSubmission({
        userInput: sentence,
        aiCorrection: updated.aiCorrection || "",
        aiFeedback: updated.aiFeedback || "",
        scoreUserAverage: updated.scoreUserAverage || 1,
        scoreArticle: updated.scoreArticle,
        scoreSpelling: updated.scoreSpelling,
        scoreWordorder: updated.scoreWordorder,
        scoreGrammar: updated.scoreGrammar,
        scoreComprehensibility: updated.scoreComprehensibility,
        scoreNoun: updated.scoreNoun,
        scoreVocabulary: updated.scoreVocabulary,
      });

      resetTimer();
      setSentence("");
    } catch (err) {
      console.error(err);
      setFeedback("Er is een fout opgetreden bij het controleren.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- New Word -------------------
  const handleNewWord = async () => {
    await fetchWord(topic);
    setSentence("");
    setFeedback("");
  };

  return (
    <div style={{ fontFamily: "Segoe UI", width: "100%" }}>

      {/* ---------- REFRESH ICON ---------- */}
      <div style={{ position: "relative", width: "100%" }}>
        <FiRefreshCw
          onClick={handleNewWord}
          title="Nieuw woord"
          style={{
            position: "absolute",
            right: "12px",
            top: "22px",
            cursor: "pointer",
            fontSize: "20px",
            color: "#c0c0c0",
          }}
        />

        {/* ---------- CUSTOM INPUT CONTAINER ---------- */}
        <div
          style={{
            border: "1px solid #FF4F00",
            borderRadius: "6px",
            padding: "6px 10px",
            marginTop: "10px",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            height: "60px",
            justifyContent: "center",
          }}
        >
          {/* Topic input */}
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNewWord()}
            style={{
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: "#777",
            }}
            placeholder="Onderwerp..."
          />

          {/* Sentence input */}
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyDown={handleSubmit}
            placeholder={`Gebruik dit woord in een correcte zin: ${word}`}
            style={{
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      {/* ---------- LOADING ---------- */}
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#FF4F00",
            fontSize: "15px",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid #FF4F00",
              borderTop: "2px solid transparent",
              borderBottom: "4px solid transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span>Bezig met controleren...</span>
        </div>
      )}

      {/* ---------- AI FEEDBACK ---------- */}
      {recentSubmission && (
        <div
          style={{
            marginTop: "12px",
            marginBottom: "16px",
            position: "relative",
          }}
        >
          <FaTimes
            onClick={handleClearSubmission}
            title="Verwijderen"
            style={{
              position: "absolute",
              right: "0px",
              top: "4px",
              cursor: "pointer",
              fontSize: "18px",
              color: "#c0c0c0",
            }}
          />

          <DutchLanguage_AI_Response submission={recentSubmission} />
        </div>
      )}
    </div>
  );
}

export default DutchLanguage_Sentences;
