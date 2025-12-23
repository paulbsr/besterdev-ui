import React, { useState, useEffect, useRef, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { DutchLanguage_AIEvaluator } from "./DutchLanguage_AIEvaluator"; 
import { RefreshContext } from "./RefreshContext";
import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";
import DutchLanguage_AI_Response from "./DutchLanguage_AI_Response";

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
// Date grouping component
// ------------------------
// const DateGroup = ({ dateKey, entries, handleDelete, styles }) => {
//   const [expanded, setExpanded] = useState(false);
//   return (
//     <div style={{ marginBottom: "10px" }}>
//       <div
//         onClick={() => setExpanded(!expanded)}
//         style={{ cursor: "pointer", fontWeight: "bold", fontFamily: "Segoe UI", fontSize: "12pt", color: "#ddd" }}
//       >
//         {dateKey}
//       </div>

//       {expanded && (
//         <div style={{ marginLeft: "15px", marginTop: "5px" }}>
//           {entries
//             .sort((a, b) => new Date(b.createdate) - new Date(a.createdate))
//             .map((item) => <TimeGroup key={item.id} item={item} handleDelete={handleDelete} styles={styles} />)}
//         </div>
//       )}
//     </div>
//   );
// };

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

//   useEffect(() => { fetchAllEntries(); }, []);

  const formatTime = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const resetTimer = () => { clearInterval(timerRef.current); setElapsed(0); setTimerStarted(false); };

//   const fetchAllEntries = async () => {
//     try {
//       const res = await fetch("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/all/diary");
//       if (!res.ok) throw new Error("<Diary> failed to fetch /all/diary entries");
//       const data = await res.json();

//       const normalized = (Array.isArray(data) ? data : [data]).map((item) => {
//         let createdDate;
//         if (Array.isArray(item.createdAt)) {
//           const [y, m, d, hh, mm, ss, ns] = item.createdAt;
//           const ms = Math.floor(ns / 1e6);
//           createdDate = new Date(y, m - 1, d, hh, mm, ss, ms).toISOString();
//         } else createdDate = item.createdAt;
//         return { ...item, createdate: createdDate };
//       });

//       setAllEntries(normalized);
//     } catch (err) {
//       console.error(err);
//       setAllEntries([]);
//     }
//   };

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

//   const handleDelete = async (id) => {
//     if (!window.confirm("Weet je zeker dat je dit dagboekitem wilt verwijderen?")) return;

//     try {
//       const res = await fetch(
//         `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/delete/${id}`,
//         { method: "DELETE" }
//       );

//       if (res.status === 204 || res.ok) {
//         setAllEntries((prev) => prev.filter((e) => e.id !== id));
//         if (recentSubmission?.id === id) setRecentSubmission(null);
//         // toast.success("Dagboekitem succesvol verwijderd!", { position: "top-center" });
//       } else {
//         const text = await res.text();
//         console.error("Delete failed:", text);
//         toast.error("Verwijderen mislukt.", { position: "top-center" });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Fout bij verwijderen.", { position: "top-center" });
//     }
//   };

  // group entries by date
//   const groupedByDate = allEntries
//     .slice()
//     .sort((a, b) => new Date(b.createdate) - new Date(a.createdate))
//     .reduce((acc, item) => {
//       const d = new Date(item.createdate);
//       const yyyy = d.getFullYear();
//       const mm = String(d.getMonth() + 1).padStart(2, "0");
//       const dd = String(d.getDate()).padStart(2, "0");
//       const dateKey = `${yyyy}.${mm}.${dd}`;
//       if (!acc[dateKey]) acc[dateKey] = [];
//       acc[dateKey].push(item);
//       return acc;
//     }, {});

  return (
    // <div style={styles.container}>
          <div>
      <ToastContainer />
      {/* <h2 style={{ fontWeight: "bold", fontSize: "22px", margin: 0 }}>
        <PiBookOpenTextBold style={{ color: "#ddd", fontSize: "35px", cursor: "pointer", marginRight: "10px" }} />
        Mijn Dagboek in het Nederlands (ML)
      </h2> */}

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
    width: "800px",
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

      {/* <div style={{ marginTop: "20px" }}>
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontFamily: "Segoe UI", fontSize: "11pt" }}>
          <input type="checkbox" checked={showEntries} onChange={() => setShowEntries(!showEntries)} style={{ display: "none" }} />
          <span style={{ width: "56px", height: "20px", background: showEntries ? "#ddd" : "#ccc", borderRadius: "20px", position: "relative", transition: "background 0.2s ease", marginRight: "8px" }}>
            <span style={{ position: "absolute", top: "2px", left: showEntries ? "38px" : "2px", width: "16px", height: "16px", background: "#fff", borderRadius: "50%", transition: "left 0.8s ease" }} />
          </span>
          <span style={{ fontFamily: "Segoe UI", fontSize: 16, color: "#ddd" }}>{showEntries ? "Verberg dagboek" : "Toon dagboek"}</span>
        </label>

        {showEntries && (
          <div>
            {Object.entries(groupedByDate).map(([dateKey, entries]) => (
              <DateGroup key={dateKey} dateKey={dateKey} entries={entries} handleDelete={handleDelete} styles={styles} />
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}

export default DutchLanguage_Dagboek_Mini;
