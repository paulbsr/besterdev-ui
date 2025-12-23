import React, { useState, useEffect, useRef, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { DutchLanguage_AIEvaluator } from "../DutchLanguage_AI_Evaluator";
import { RefreshContext } from "../RefreshContext";
import DutchLanguage_AI_ScoreSquares from "../DutchLanguage_AI_ScoreSquares";
import DutchLanguage_AI_Response from "../DutchLanguage_AI_Response";

// ------------------------
// Helper: Count words
// ------------------------
const countWords = (text) => (text ? text.trim().split(/\s+/).filter(Boolean).length : 0);

// ------------------------
// Helper: Word-level diff/highlight
// ------------------------
const diffWords = (before, after) => {
  const beforeWords = before.trim().split(/\s+/);
  const afterWords = after.trim().split(/\s+/);
  const result = [];
  let i = 0, j = 0;

  while (i < beforeWords.length || j < afterWords.length) {
    if (beforeWords[i] === afterWords[j]) {
      result.push(<span key={`${i}-${j}`}>{beforeWords[i]} </span>);
      i++; j++;
    } else if (afterWords[j] && !beforeWords.includes(afterWords[j])) {
      result.push(<span key={`add-${j}`} style={{ color: "green", fontWeight: "bold" }}>{afterWords[j]} </span>);
      j++;
    } else if (beforeWords[i] && !afterWords.includes(beforeWords[i])) {
      result.push(<span key={`rm-${i}`} style={{ color: "red", textDecoration: "line-through" }}>{beforeWords[i]} </span>);
      i++;
    } else {
      result.push(<span key={`chg-${i}-${j}`} style={{ color: "#ddd", fontWeight: "bold" }}>{afterWords[j]} </span>);
      i++; j++;
    }
  }

  return result;
};

// ------------------------
// Time entry component
// ------------------------
const TimeGroup = ({ item, handleDelete, styles }) => {
  const [expanded, setExpanded] = useState(false);
  const d = new Date(item.createdate);
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  // highlighted AI correction
  const highlightedCorrection = item.aiCorrection ? diffWords(item.userInput, item.aiCorrection) : null;

  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", color: "black", fontFamily: "Segoe UI", fontSize: "11pt" }}
      >
        {hh}:{min} - {item.userInput}

        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{ color: "#c0c0c0", fontSize: "10pt", marginLeft: "6px" }}>
            {countWords(item.userInput)} Woorden
          </span>
          <DutchLanguage_AI_ScoreSquares averageScore={item.scoreUserAverage} />
        </div>

        <FaTimes
          title="Delete"
          style={{ ...styles.deleteIcon, marginLeft: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
          }}
        />
      </div>

      {expanded && (
        <div style={{ marginLeft: "15px", borderLeft: "1px solid #eee", paddingLeft: "10px", marginTop: "3px" }}>
          <div style={{ color: "#000" }}>{item.userInput}</div>

          {/* Highlighted AI correction */}
          {highlightedCorrection && <div style={{ marginTop: "2px", fontSize: "14px" }}>{highlightedCorrection}</div>}

          {/* AI feedback */}
          {item.aiFeedback && <div style={{ color: "grey", fontStyle: "italic", marginTop: "2px" }}>{item.aiFeedback}</div>}

          {/* AI scores */}
          <div style={{ marginTop: "6px", color: "#666", fontSize: "11px" }}>
            <strong>AI Scores:</strong>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
              <span>Grammar: {item.scoreGrammar ?? 0}</span>
              <span>Vocabulary: {item.scoreVocabulary ?? 0}</span>
              <span>Spelling: {item.scoreSpelling ?? 0}</span>
              <span>Comprehensibility: {item.scoreComprehensibility ?? 0}</span>
              <span>Word Order: {item.scoreWordorder ?? 0}</span>
              <span>Noun/Verb: {item.scoreNoun ?? 0}</span>
              <span>Articles: {item.scoreArticle ?? 0}</span>
              <span>AVG: {item.scoreUserAverage} / 5</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------------
// Main Dagboek component
// ------------------------
function DutchLanguage_Dagboek_Mini() {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [allEntries, setAllEntries] = useState([]);
  const [showEntries, setShowEntries] = useState(false);
  const [recentSubmission, setRecentSubmission] = useState(null);
  const [wordCountState, setWordCountState] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const [timerStarted, setTimerStarted] = useState(false);

  const styles = {
    container: { border: "1px solid #ddd", borderRadius: "8px", padding: "16px", fontFamily: "Segoe UI", fontSize: "16px" },
    deleteIcon: { color: "#c0c0c0", marginLeft: "8px", cursor: "pointer" },
    clearIcon: { color: "#ccc", cursor: "pointer", position: "absolute", top: "6px", right: "6px" },
  };

  const { triggerRefresh } = useContext(RefreshContext);

  const formatTime = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const resetTimer = () => { clearInterval(timerRef.current); setElapsed(0); setTimerStarted(false); };


  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!entry.trim()) return;
    setLoading(true); setRecentSubmission(null); triggerRefresh();

    try {
      const submission = await DutchLanguage_AIEvaluator({
        userInput: entry,
        promptType: "dagboek",
        exerciseType: "diary-entry",
        originComponent: "DutchLanguage_Dagboek",
        difficultyLevel: 1,
        userId: 123,
        apiBase: "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/add",
        aiEndpoint: "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
      });

      setRecentSubmission(submission);
      setEntry(""); setWordCountState(0); resetTimer();
      //   fetchAllEntries();
    } catch (err) {
      console.error("Dagboek submit error:", err);
      toast.error("Fout bij verzenden: " + (err.message || ""), { position: "top-center" });
    } finally { setLoading(false); }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          value={entry}
          onChange={(e) => {
            const text = e.target.value;
            setEntry(text);
            setWordCountState(countWords(text));
            if (!timerStarted && text.trim().length > 0) {
              setTimerStarted(true);
              timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
            }
          }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
          placeholder="Typ hier jouw dagboektekst..."
          style={{
            width: "811px",
            height: "40px",
            padding: "6px 8px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxSizing: "border-box",
            marginTop: "10px"
          }}
        />

        <button type="submit" disabled={loading}
          style={{
            height: "40px",
            width: "90px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#a0a0a0",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            marginLeft: "8px",
          }}>
          {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <div style={{ width: "14px", height: "14px", border: "2px solid #ccc", borderTop: "2px solid #0099FF", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            Bezig...
          </div> : "Verstuur"}
        </button>
        <div style={{ fontSize: "10pt", color: "grey", marginTop: "4px", marginBottom: "8px" }}>
          Woorden: {wordCountState} | Tijd: {formatTime(elapsed)}
        </div>

      </form>

      {recentSubmission && (
        <div style={{ marginTop: "10px", position: "relative" }}>
          <FaTimes title="Clear" style={styles.clearIcon} onClick={() => setRecentSubmission(null)} />
          <DutchLanguage_AI_Response submission={recentSubmission} />
        </div>
      )}

    </div>
  );
}

export default DutchLanguage_Dagboek_Mini;
