import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DutchLanguage_AI_Response from "./DutchLanguage_AI_Response";
import { DutchLanguage_AI_Evaluator_Chatbot } from "./DutchLanguage_AI_Evaluator_Chatbot";
import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";
import { GiAngryEyes } from "react-icons/gi";

const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/add";
const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";
const API_ALL_CHATBOT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/ml-dataset/all/chatbot";

const countWords = (text) => (text ? text.trim().split(/\s+/).filter(Boolean).length : 0);

const spinnerStyles = `
@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

@keyframes slide {
0% { margin-left: -40%; }
50% { margin-left: 60%; }
100% { margin-left: -40%; }
}
`;


function parseCreatedAt(createdAt) {
  if (!createdAt) return new Date();
  if (typeof createdAt === "string") return new Date(createdAt);
  if (Array.isArray(createdAt) && createdAt.length >= 3) {
    const [y, m, d, hh = 0, mm = 0] = createdAt;
    return new Date(y, m - 1, d, hh, mm);
  }
  return new Date();
}

// Single message item
const TimeGroup = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const d = new Date(item.createdAtParsed);
  const average = item?.scoreUserAverage ?? 0;

  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", color: "black", fontFamily: "Segoe UI", fontSize: "11pt" }}
      >
        {d.getHours().toString().padStart(2, "0")}:{d.getMinutes().toString().padStart(2, "0")} - {item.userInput}
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{ color: "#c0c0c0", fontSize: "10pt", marginLeft: "6px" }}>
            {countWords(item.userInput)} Woorden
          </span>
          <DutchLanguage_AI_ScoreSquares averageScore={average} />
        </div>
      </div>

      {expanded && (
        <div style={{ marginLeft: "15px", borderLeft: "1px solid #eee", paddingLeft: "10px", marginTop: "3px" }}>
          <div style={{ color: "#000000", marginBottom: "6px" }}>
            <b>{item.userInput}</b>
          </div>
          <div style={{ color: "#909090", marginBottom: "6px", fontSize: "10pt" }}>
            Word Order: {item.scoreWordorder} , Grammar: {item.scoreGrammar} , Vocab: {item.scoreVocabulary} ,
            Spelling: {item.scoreSpelling} , Comprehensibility: {item.scoreComprehensibility} ,
            Nouns: {item.scoreNoun} , Articles: {item.scoreArticle} , AVG: {item.scoreUserAverage} / 5
          </div>
          {item.aiCorrection && <div style={{ color: "#FF4F00", marginBottom: "6px" }}>{item.aiCorrection}</div>}
          {item.aiFeedback && <div style={{ color: "#000000", marginBottom: "6px" }}>{item.aiFeedback}</div>}
          <div style={{ color: "#c0c0c0", fontSize: "10pt" }}>{d.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

// Date group with collapsible messages
const DateGroup = ({ dateKey, entries }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: "pointer",
          // fontWeight: "bold",
          fontFamily: "Segoe UI",
          fontSize: "12pt",
          color: "#FF4F00",
        }}
      >
        {dateKey}
      </div>
      {expanded && (
        <div style={{ marginLeft: "15px", marginTop: "5px" }}>
          {entries
            .slice()
            .sort((a, b) => new Date(b.createdAtParsed) - new Date(a.createdAtParsed))
            .map((item) => (
              <TimeGroup key={item.id} item={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default function DutchLanguage_Chatbot() {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentData, setRecentData] = useState(null);
  const [allEntries, setAllEntries] = useState([]);
  const [showPastEntries, setShowPastEntries] = useState(false);

  const API_ROOT = API_BASE.replace(/\/add$/, "");


  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes slide {
      0% { margin-left: -40%; }
      50% { margin-left: 60%; }
      100% { margin-left: -40%; }
    }
  `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);



  useEffect(() => {
    fetchAllEntries();
  }, []);

  const fetchAllEntries = async () => {
    try {
      const res = await fetch(API_ALL_CHATBOT);
      if (!res.ok) throw new Error("Failed to fetch entries");
      const data = await res.json();
      const normalized = (Array.isArray(data) ? data : [data]).map((it) => ({
        ...it,
        createdAtParsed: parseCreatedAt(it.createdAt),
      }));
      setAllEntries(normalized);
    } catch (err) {
      console.error(err);
      setAllEntries([]);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!entry.trim()) return;
    setLoading(true);

    try {
      const updated = await DutchLanguage_AI_Evaluator_Chatbot({
        userInput: entry,
        promptType: "chatbot",
        exerciseType: "chatbot",
        originComponent: "DutchLanguage_Chatbot",
        difficultyLevel: 1,
        userId: 111,
        apiBase: API_BASE,
        aiEndpoint: AI_ENDPOINT,
      });

      const rec = {
        ...updated,
        createdAtParsed: updated.createdAt ? parseCreatedAt(updated.createdAt) : new Date(),
      };

      setRecentData(rec);
      setEntry("");
      fetchAllEntries();
    } catch (err) {
      console.error(err);
      toast.error("Er is een fout opgetreden bij het verwerken van de AI-evaluatie.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const groupedByDate = allEntries
    .slice()
    .sort((a, b) => new Date(b.createdAtParsed) - new Date(a.createdAtParsed))
    .reduce((acc, item) => {
      const d = new Date(item.createdAtParsed);
      const dateKey = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {});

  return (
    <div style={{ border: "1px solid #FF4F00", borderRadius: "8px", padding: "16px", fontFamily: "Segoe UI", fontSize: "16px", marginBottom: "16px" }}>
      <ToastContainer />
      <h2 style={{ fontWeight: "bold", fontSize: "22px", margin: 0 }}>
        <TbMessageChatbot style={{ color: "#FF4F00", fontSize: "37px", cursor: "pointer", marginRight: "10px" }} />Nederlandse AI Chatbot
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Converseren in het Nederlands..."
          rows={2}
          style={{
            marginTop: "10px",
            width: "98%",
            padding: "6px",
            fontFamily: "Segoe UI",
            fontSize: "12pt",
            borderRadius: "4px",
            border: "0.75px solid #777777",
            resize: "none",
            overflow: "auto",
          }}
        />

        {loading && (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <div
              style={{
                marginTop: "8px",
                height: "4px",
                width: "100%",
                background: "#ffe2d1",
                overflow: "hidden",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "40%",
                  background: "#FF4F00",
                  animation: "slide 3.2s infinite",
                }}
              ></div>
            </div>
          </div>
        )}
      </form>

      {recentData && (
        <div style={{ marginTop: "12px", position: "relative" }}>
          <FaTimes
            title="Clear"
            style={{ color: "#ccc", cursor: "pointer", position: "absolute", top: "10px", right: "1px" }}
            onClick={() => setRecentData(null)}
          />
          <DutchLanguage_AI_Response submission={recentData} />
        </div>
      )}

      {/* SINGLE ICON TO SHOW/HIDE ALL PAST DATES */}
      <div
        style={{ marginTop: "1px", cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => setShowPastEntries(!showPastEntries)}
      >
        <GiAngryEyes style={{ fontSize: "32px", color: "#000000", marginRight: "8px" }} />
        <span style={{ fontSize: "12pt" }}>
          {showPastEntries ? "Verberg eerdere chatberichten" : "Bekijk eerdere chatberichten"}
        </span>
      </div>

      {showPastEntries && (
        <div style={{ marginTop: "12px" }}>
          {Object.keys(groupedByDate).length === 0 && <div style={{ color: "#999" }}>Geen eerdere chatberichten.</div>}
          {Object.keys(groupedByDate).map((dateKey) => (
            <DateGroup key={dateKey} dateKey={dateKey} entries={groupedByDate[dateKey]} />
          ))}
        </div>
      )}
    </div>
  );
}
