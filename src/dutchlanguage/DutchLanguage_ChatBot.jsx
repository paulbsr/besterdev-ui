import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbMessageChatbot } from "react-icons/tb";
import DutchLanguage_AI_Response from "./DutchLanguage_AI_Response";
import { DutchLanguage_AI_Evaluator_Chatbot } from "./DutchLanguage_AI_Evaluator_Chatbot";
import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";

// Config (provided)
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

const DateGroup = ({ dateKey, entries, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
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
              <TimeGroup key={item.id} item={item} handleDelete={handleDelete} />
            ))}
        </div>
      )}
    </div>
  );
};




const TimeGroup = ({ item, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const d = new Date(item.createdAtParsed);
  const average = item?.scoreUserAverage ?? 0; // <-- safe fallback

  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: "pointer",
          color: "black",
          fontFamily: "Segoe UI",
          fontSize: "11pt",
        }}
      >
        {d.getHours().toString().padStart(2, "0")}:
        {d.getMinutes().toString().padStart(2, "0")} - {item.userInput}

        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{ color: "#c0c0c0", fontSize: "10pt", marginLeft: "6px" }}>
            {countWords(item.userInput)} Woorden
          </span>
          <DutchLanguage_AI_ScoreSquares averageScore={average} />
        </div>

        <FaTimes
          title="Delete"
          style={{ color: "#c0c0c0", marginLeft: "10px", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
          }}
        />
      </div>

      {expanded && (
        <div
          style={{
            marginLeft: "15px",
            borderLeft: "1px solid #eee",
            paddingLeft: "10px",
            marginTop: "3px",
          }}
        >
          <div style={{ color: "#000000", marginBottom: "6px" }}>
            <b>{item.userInput}</b>
          </div>

          {/* Scores line */}
          <div style={{ color: "#909090", marginBottom: "6px", fontSize: "10pt" }}>
            Word Order: {item.scoreWordorder} , 
            Grammar: {item.scoreGrammar} , 
            Vocab: {item.scoreVocabulary} , 
            Spelling: {item.scoreSpelling} , 
            Comprehensibility: {item.scoreComprehensibility} , 
            Nouns: {item.scoreNoun} , 
            Articles: {item.scoreArticle} , 
            AVG: {item.scoreUserAverage} / 5
          </div>

          {item.aiCorrection && (
            <div style={{ color: "#FF4F00", marginBottom: "6px" }}>{item.aiCorrection}</div>
          )}

          {item.aiFeedback && (
            <div style={{ color: "#000000", marginBottom: "6px" }}>{item.aiFeedback}</div>
          )}

          <div style={{ color: "#c0c0c0", fontSize: "10pt" }}>{d.toLocaleString()}</div>
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

  // API root used for delete (assumption: remove trailing /add)
  const API_ROOT = API_BASE.replace(/\/add$/, "");

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
    e && e.preventDefault && e.preventDefault();
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

      // evaluator returns the fully updated DB record
      const rec = {
        ...updated,
        createdAtParsed: updated.createdAt ? parseCreatedAt(updated.createdAt) : new Date(),
      };

      setRecentData(rec);
      setEntry("");
      // refresh list
      fetchAllEntries();
    } catch (err) {
      console.error(err);
      toast.error("Er is een fout opgetreden bij het verwerken van de AI-evaluatie.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Weet je zeker dat je dit chat-item wilt verwijderen?")) return;
    try {
      const res = await fetch(`${API_ROOT}/delete/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAllEntries((prev) => prev.filter((e) => e.id !== id));
        if (recentData && recentData.id === id) setRecentData(null);
        toast.success("Item verwijderd", { position: "top-center", autoClose: 1200 });
      } else {
        const txt = await res.text();
        console.error("Delete failed:", txt);
        toast.error("Verwijderen mislukt.", { position: "top-center" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Fout bij verwijderen.", { position: "top-center" });
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
      <style>{spinnerStyles}</style>

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
                  animation: "slide 4.2s infinite",
                }}
              ></div>
            </div>
          </div>
        )}
      </form>

      {/* Recent AI response area uses universal component */}
      {recentData && (
        <div style={{ marginTop: "12px" }}>
          <div style={{ position: "relative" }}>
            <FaTimes
              title="Clear"
              style={{ color: "ccc", cursor: "pointer", position: "absolute", top: "-6px", right: "-6px" }}
              onClick={() => setRecentData(null)}
            />
            <DutchLanguage_AI_Response submission={recentData} />
          </div>
        </div>
      )}

      <div style={{ marginTop: "8px" }}></div>

      {/* Past entries grouped */}
      <div style={{ marginTop: "12px" }}>
        {Object.keys(groupedByDate).length === 0 && <div style={{ color: "#999" }}>Geen eerdere chatberichten.</div>}
        {Object.keys(groupedByDate).map((dateKey) => (
          <DateGroup key={dateKey} dateKey={dateKey} entries={groupedByDate[dateKey]} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

