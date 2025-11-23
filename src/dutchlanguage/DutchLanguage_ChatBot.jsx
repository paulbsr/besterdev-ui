// DutchLanguage_Chatbot.jsx
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbMessageChatbot } from "react-icons/tb";
import DutchLanguage_Chatbot_ScoreTrend from "./DutchLanguage_Chatbot_ScoreTrend";


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
          <div style={{ color: "#000000", marginBottom: "6px" }}>{item.userInput}</div>

          <div style={{ color: "#909090", marginBottom: "6px" }}>
            Score (0-5): Grammar {item.grammarScore} • Vocab {item.vocabularyScore} • Spelling {item.spellingScore} • Comprehensibility {item.comprehensibilityScore}
          </div>

          {item.botCorrection && (
            <div style={{ color: "#FF4F00", marginBottom: "6px" }}>{item.botCorrection}</div>
          )}

          {item.botResponse && (
            <div style={{ color: "#000000", marginBottom: "6px" }}>{item.botResponse}</div>
          )}

          <div style={{ color: "#c0c0c0", fontSize: "10pt" }}>
            {d.toLocaleString()}
          </div>
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
  const [showEntries, setShowEntries] = useState(false);

  const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/chatbot";
  const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

  useEffect(() => {
    fetchAllEntries();
  }, []);

  const fetchAllEntries = async () => {
    try {
      const res = await fetch(API_BASE);
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
    e.preventDefault();
    if (!entry.trim()) return;
    setLoading(true);
    try {
      const createRes = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: entry,
          botResponse: "",
          botCorrection: "",
          grammarScore: 0,
          vocabularyScore: 0,
          spellingScore: 0,
          comprehensibilityScore: 0,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create record");
      const saved = await createRes.json();
      const savedId = saved.id;

      const aiPrompt = {
        question: `You are a Dutch language teacher + scorer. The scoring is 0, 1 and 2. 0 = wrong or poor. 1 = acceptable. 2 = perfect. A student wrote: "${entry}". 
Respond in JSON with:
- grammarScore (0-2)
- vocabularyScore (0-2)
- spellingScore (0-2)
- comprehensibilityScore (0-2)
- botCorrection
- botResponse (conversational about the topic, not linguistic feedback, always in Dutch, encourage responses to be in the future tense or past tense)`
      };

      const aiRes = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiPrompt),
      });

      let aiData = await aiRes.json();
      let aiText = aiData.answer || aiData.response || JSON.stringify(aiData);
      aiText = aiText.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/```json|```/g, "").trim();

      let parsed = {};
      try {
        parsed = typeof aiData === "object" && aiData !== null && aiData.grammarScore !== undefined
          ? aiData
          : JSON.parse(aiText);
      } catch {
        parsed = {
          grammarScore: 0,
          vocabularyScore: 0,
          spellingScore: 0,
          comprehensibilityScore: 0,
          botCorrection: "",
          botResponse: String(aiText),
        };
      }

      const sanitizeScore = (v) => Math.max(0, Math.min(5, Math.round(Number(v) || 0)));

      const updatePayload = {
        userInput: entry,
        botResponse: parsed.botResponse || parsed.response || parsed.botReply || "",
        botCorrection: parsed.botCorrection || parsed.suggestedSentence || "",
        grammarScore: sanitizeScore(parsed.grammarScore),
        vocabularyScore: sanitizeScore(parsed.vocabularyScore),
        spellingScore: sanitizeScore(parsed.spellingScore),
        comprehensibilityScore: sanitizeScore(parsed.comprehensibilityScore),
      };

      const updateRes = await fetch(`${API_BASE}/${savedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (!updateRes.ok) toast.error("Could not persist AI results to DB", { position: "top-center" });

      setRecentData({
        id: savedId,
        ...updatePayload,
        createdAtParsed: saved.createdAt ? parseCreatedAt(saved.createdAt) : new Date(),
      });
      setEntry("");
      fetchAllEntries();
    } catch (err) {
      console.error(err);
      toast.error("Er is een fout opgetreden.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Weet je zeker dat je dit chat-item wilt verwijderen?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAllEntries((prev) => prev.filter((e) => e.id !== id));
        toast.success("Item verwijderd", { position: "top-center", autoClose: 1200 });
      } else {
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
        <TbMessageChatbot style={{ color: "#FF4F00", fontSize: "37px", cursor: "pointer", marginRight: "10px" }}/>Nederlandse AI Chatbot
      </h2>

      {/* <form onSubmit={handleSubmit}>
        <input
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Converseren in het Nederlands..."
          style={{
            marginTop: "10px",
            height: "40px",
            width: "98%",
            padding: "6px",
            fontFamily: "Segoe UI",
            fontSize: "12pt",
            borderRadius: "4px",
            border: "0.75px solid #777777",
            resize: "none",
          }}
        />
      </form> */}

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
    rows={2} // limits to 2 lines high
    style={{
      marginTop: "10px",
      width: "98%",
      padding: "6px",
      fontFamily: "Segoe UI",
      fontSize: "12pt",
      borderRadius: "4px",
      border: "0.75px solid #777777",
      resize: "none", // disables manual resizing
      overflow: "auto", // enables scrolling if content exceeds 2 lines
    }}
  />
{/* {allEntries.length > 1 && <DutchLanguage_Chatbot_ScoreTrend entries={allEntries} />} */}






{loading && (
  <div style={{ marginTop: "10px", textAlign: "center" }}>
    {/* Spinner */}
    {/* <div
      style={{
        width: "28px",
        height: "28px",
        border: "4px solid #ffb899",
        borderTop: "4px solid #FF4F00",
        borderRadius: "50%",
        margin: "0 auto",
        animation: "spin 0.8s linear infinite",
      }}
    ></div> */}

    {/* Thin orange progress bar */}
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


      {recentData && (
        <div style={{ marginTop: "12px", padding: "10px", border: "1px solid #ddd", position: "relative", backgroundColor: "#fafafa", borderRadius: "4px" }}>
          <FaTimes
            title="Clear"
            style={{ color: "#ccc", cursor: "pointer", position: "absolute", top: "6px", right: "6px" }}
            onClick={() => setRecentData(null)}
          />

          <div style={{ color: "#000000", marginBottom: "6px" }}><b>{recentData.userInput}</b></div>



          {recentData.botCorrection && <div style={{ color: "#FF4F00", marginBottom: "6px" }}>{recentData.botCorrection}</div>}

          <div style={{ color: "#909090", marginBottom: "6px", fontSize: "9pt" }}>
            Grammar: {recentData.grammarScore} • Vocab: {recentData.vocabularyScore} • Spelling: {recentData.spellingScore} • Comprehension: {recentData.comprehensibilityScore}
          </div>


          {recentData.botResponse && <div style={{ color: "#000000" }}>{recentData.botResponse}</div>}

          <div style={{ color: "#c0c0c0", fontSize: "10pt", marginTop: "8px" }}>
            {new Date(recentData.createdAtParsed).toLocaleString()}
          </div>
        </div>
        
      )}
<DutchLanguage_Chatbot_ScoreTrend entries={allEntries} />

      {/* <div style={{ marginTop: "20px" }}>
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontFamily: "Segoe UI", fontSize: "11pt" }}>
          <input type="checkbox" checked={showEntries} onChange={() => setShowEntries(!showEntries)} style={{ display: "none" }} />
          <span style={{
            width: "56px",
            height: "20px",
            background: showEntries ? "#FF4F00" : "#ccc",
            borderRadius: "20px",
            position: "relative",
            transition: "background 0.2s ease",
            marginRight: "8px",
          }}>
            <span style={{
              position: "absolute",
              top: "2px",
              left: showEntries ? "38px" : "2px",
              width: "16px",
              height: "16px",
              background: "#fff",
              borderRadius: "50%",
              transition: "left 0.8s ease",
            }} />
          </span>
          {showEntries ? "Hide history" : "Show history"}
        </label>

        {showEntries && (
          <div>
            {Object.entries(groupedByDate).map(([dateKey, entries]) => (
              <DateGroup key={dateKey} dateKey={dateKey} entries={entries} handleDelete={handleDelete} />
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}

