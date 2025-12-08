// Refactored DutchLanguage_Sentences.jsx with real-time word counter
import React, { useState, useEffect, useRef, useContext } from "react";
import { DutchLanguage_AIEvaluator } from "./DutchLanguage_AIEvaluator";
import DutchLanguage_AI_Response from "./DutchLanguage_AI_Response";
import { FiRefreshCw } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { RefreshContext } from "./RefreshContext";

function DutchLanguage_Sentences() {
  const [word, setWord] = useState("Laden...");
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSubmission, setRecentSubmission] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  const [topic, setTopic] = useState("De Goude Eeuw");

  const API_ASK = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";
  const API_DB = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/add";

  const timerRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  const { triggerRefresh } = useContext(RefreshContext);

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

  // ------------------- Word Counter -------------------
  useEffect(() => {
    const words = sentence.trim().split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [sentence]);

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
      setWordCount(0);
    } catch (err) {
      console.error(err);
      setFeedback("Er is een fout opgetreden bij het controleren.");
    } finally {
      setLoading(false);
    }

    triggerRefresh();
  };

  // ------------------- New Word -------------------
  const handleNewWord = async () => {
    await fetchWord(topic);
    setSentence("");
    setFeedback("");
    setWordCount(0);
  };

  return (
    <div style={{ fontFamily: "Segoe UI", width: "100%" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <FiRefreshCw
          onClick={handleNewWord}
          title="Nieuw woord"
          style={{
            position: "absolute",
            right: "20px",
            top: "38px",
            cursor: "pointer",
            fontSize: "20px",
            color: "#c0c0c0",
          }}
        />

        <div
          style={{
            border: "1px solid #FF4F00",
            borderRadius: "6px",
            padding: "10px 12px",
            marginTop: "10px",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            height: "130px",
            justifyContent: "flex-start",
          }}
        >
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

          <textarea
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyDown={handleSubmit}
            placeholder={`Gebruik dit woord in een correcte zin: ${word}`}
            style={{
              padding: "12px",
              fontFamily: "Segoe UI",
              fontSize: "13pt",
              borderRadius: "6px",
              border: "0.75px solid #ccc",
              boxShadow: "10px 10px 10px rgba(0,0,0,0.2)",
              minHeight: "50px",
              resize: "vertical",
              width: "98%",
            }}
          />

          {/* Real-time word counter */}
          <div style={{ fontSize: "12px", color: "#888", marginTop: "3px" }}>
            Woorden: {wordCount}
          </div>
        </div>
      </div>

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

      {recentSubmission && (
        <div style={{ marginTop: "12px", marginBottom: "16px", position: "relative" }}>
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
