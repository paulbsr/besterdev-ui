
// export default DutchLanguage_Dagboek;
import React, { useState, useEffect, useRef } from "react";
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DutchLanguage_Dagboek_ScoreTrend from "./DutchLanguage_Dagboek_ScoreTrend.jsx";

// ------------------- ScoreSquares -------------------

const ScoreSquares = ({ score }) => {
    const colors = ["#FF4F00", "#FF8000", "#FFC000", "#A6D96A", "#1A9850"];

    // If score = 0 → no highlighted square
    const index = score > 0 ? score - 1 : null;

    return (
        <div style={{ display: "flex", gap: "4px", marginLeft: "6px" }}>
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "1px",
                        backgroundColor: index === i ? colors[i] : "#f0f0f0",
                        border: "0.5px solid #ccc",
                    }}
                />
            ))}
        </div>
    );
};



// ------------------- TimeGroup -------------------
const TimeGroup = ({ item, handleDelete, styles }) => {
    const [expanded, setExpanded] = useState(false);
    const d = new Date(item.createdate);
    const hh = String(d.getHours()).padStart(2,"0");
    const min = String(d.getMinutes()).padStart(2,"0");
    const countWords = (text) => text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

    return (
        <div style={{ marginBottom: "6px" }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{ cursor: "pointer", color: "black", fontFamily: "Segoe UI", fontSize: "11pt" }}
            >
                {hh}:{min} - {item.myEntry}

                <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <span style={{ color:"#c0c0c0", fontSize:"10pt", marginLeft:"6px" }}>
                        {countWords(item.myEntry)} Woorden
                    </span>
                    <ScoreSquares score={item.score} />
                </div>

                <FaTimes
                    title="Delete"
                    style={{ ...styles.deleteIcon, marginLeft:"10px" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                    }}
                />
            </div>

            {expanded && (
                <div style={{ marginLeft:"15px", borderLeft:"1px solid #eee", paddingLeft:"10px", marginTop:"3px" }}>
                    <div style={{ color:"#000" }}>{item.myEntry}</div>
                    {item.aiEntry && <div style={{ color:"#FF4F00" }}>{item.aiEntry}</div>}
                    {item.feedback && <div style={{ color:"grey", fontStyle:"italic", marginTop:"2px" }}>{item.feedback}</div>}
                </div>
            )}
        </div>
    );
};

// ------------------- DateGroup -------------------
const DateGroup = ({ dateKey, entries, handleDelete, styles }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div style={{ marginBottom:"10px" }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{ cursor:"pointer", fontWeight:"bold", fontFamily:"Segoe UI", fontSize:"12pt", color:"#FF4F00" }}
            >
                {dateKey}
            </div>

            {expanded && (
                <div style={{ marginLeft:"15px", marginTop:"5px" }}>
                    {entries
                        .sort((a,b) => new Date(b.createdate)-new Date(a.createdate))
                        .map(item => (
                            <TimeGroup key={item.id} item={item} handleDelete={handleDelete} styles={styles} />
                        ))
                    }
                </div>
            )}
        </div>
    );
};

// ------------------- Main Component -------------------
function DutchLanguage_Dagboek() {
    const [entry, setEntry] = useState("");
    const [feedback, setFeedback] = useState("");
    const [aiSentence, setAiSentence] = useState("");
    const [loading, setLoading] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [showEntries, setShowEntries] = useState(false);
    const [recentData, setRecentData] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);

    const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary";
    const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

    const countWords = (text) => text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

    // Fetch entries
    useEffect(() => { fetchAllEntries(); }, []);
    useEffect(() => {
        timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timerRef.current);
    }, []);
    const formatTime = (secs) => `${Math.floor(secs/60)}:${String(secs%60).padStart(2,"0")}`;
    const resetTimer = () => { clearInterval(timerRef.current); setElapsed(0); timerRef.current = setInterval(() => setElapsed(prev => prev+1), 1000); };

    const fetchAllEntries = async () => {
        try {
            const res = await fetch(API_BASE);
            const data = await res.json();
            setAllEntries(Array.isArray(data) ? data : [data]);
        } catch(err) { console.error(err); setAllEntries([]); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!entry.trim()) return;

        setLoading(true); setFeedback(""); setAiSentence(""); setRecentData(null);

        try {
            // Save user entry
            const postRes = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify({ myEntry: entry, aiEntry:"", feedback:"" })
            });
            const saved = await postRes.json();
            const savedId = saved.id;

            // AI request
            const aiRes = await fetch(AI_ENDPOINT, {
                method:"POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify({ question: `
                    You are a Dutch language teacher. A student wrote: "${entry}". Please respond ONLY in raw JSON with keys "feedback" and "suggestedSentence" and "score".
                    Scoring rules:
                    5 = Excellent, no or tiny mistakes
                    4 = Good, minor issues
                    3 = Understandable but several mistakes
                    2 = Many mistakes, meaning partly unclear
                    1 = Major errors, meaning unclear
                    0 = Completely incorrect or unrelated`
                })
            });

            let aiData = await aiRes.json();
            let aiText = aiData.answer || aiData.response || "";
            aiText = aiText.replace(/^Optional\[/,"").replace(/\]$/,"").replace(/```json|```/g,"").trim();

            let parsedFeedback = "";
            let parsedSentence = "";
            let parsedScore = 1; // minimum 1

            try {
                const parsed = JSON.parse(aiText);
                parsedFeedback = parsed.feedback || "";
                parsedSentence = parsed.suggestedSentence || "";
                parsedScore = parsed.score ?? 1;
                parsedScore = Math.max(1, Math.min(5, parsedScore)); // clamp 1-5
            } catch { parsedFeedback = aiText; parsedScore = 1; }

            // Update UI
            setFeedback(parsedFeedback);
            setAiSentence(parsedSentence);
            setRecentData({ entry, feedback: parsedFeedback, aiSentence: parsedSentence, score: parsedScore });
            resetTimer();

            // Update backend entry
            await fetch(`${API_BASE}/${savedId}`, {
                method:"PUT",
                headers:{ "Content-Type":"application/json" },
                body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence, score: parsedScore })
            });

            setEntry(""); setWordCount(0); fetchAllEntries();
        } catch(err) {
            console.error(err); setFeedback("Er is een fout opgetreden.");
        } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Weet je zeker dat je dit dagboekitem wilt verwijderen?")) return;
        try {
            const res = await fetch(`${API_BASE}/${id}`, { method:"DELETE" });
            if(res.status===204){ setAllEntries(prev => prev.filter(e => e.id!==id)); }
            else { toast.error("Verwijderen mislukt.", { position:"top-center" }); }
        } catch(err){ console.error(err); toast.error("Fout bij verwijderen.", { position:"top-center" }); }
    };

    const styles = {
        container:{ border:"1px solid #FF4F00", borderRadius:"8px", padding:"16px", fontFamily:"Segoe UI", fontSize:"16px", marginBottom:"16px" },
        deleteIcon:{ color:"#c0c0c0", marginLeft:"8px", cursor:"pointer" },
        clearIcon:{ color:"#ccc", cursor:"pointer", position:"absolute", top:"6px", right:"6px" },
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <h2 style={{ fontWeight:"bold", fontSize:"22px", margin:0 }}>
                <PiBookOpenTextBold style={{ color:"#FF4F00", fontSize:"35px", cursor:"pointer", marginRight:"10px" }} />
                Mijn Dagboek in het Nederlands
            </h2>
<DutchLanguage_Dagboek_ScoreTrend />

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={entry}
                    onChange={e => { setEntry(e.target.value); setWordCount(countWords(e.target.value)); }}
                    onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); handleSubmit(e); } }}
                    placeholder="Typ hier jouw dagboektekst..."
                    style={{ marginTop:"10px", height:"40px", width:"98%", padding:"6px", fontFamily:"Segoe UI", fontSize:"12pt", borderRadius:"4px", border:"0.75px solid #777", resize:"vertical" }}
                />
                <div style={{ fontSize:"11pt", color:"grey", marginTop:"4px", marginBottom:"8px" }}>
                    Woorden: {wordCount} | Tijd: {formatTime(elapsed)}
                </div>
                <button type="submit" disabled={loading} style={{ height:"35.5px", width:"90px", border:"1px solid #FF4F00", borderRadius:"4px", backgroundColor:"#fff", color:"#000", cursor:"pointer", fontFamily:"Segoe UI", fontSize:"16px" }}>
                    {loading ? <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
                        <div style={{ width:"14px", height:"14px", border:"2px solid #ccc", borderTop:"2px solid #FF4F00", borderRadius:"50%", animation:"spin 1s linear infinite" }}></div>
                        Bezig...
                    </div> : "Verstuur"}
                </button>
            </form>

            {/* Latest entry */}
            {recentData && (
                <div style={{ marginTop:"10px", padding:"10px", border:"1px solid #ddd", position:"relative", backgroundColor:"#fafafa", borderRadius:"4px" }}>
                    <FaTimes title="Clear" style={styles.clearIcon} onClick={()=>setRecentData(null)} />
                    <div style={{ color:"#000", display:"flex", alignItems:"center", gap:"6px" }}>
                        <span>{recentData.entry}</span>
                        <span style={{ color:"#c0c0c0", fontSize:"10pt" }}>{countWords(recentData.entry)} woorden</span>
                        <ScoreSquares score={recentData.score} />
                    </div>
                    {recentData.aiSentence && <div style={{ color:"#FF4F00", marginTop:"4px" }}>{recentData.aiSentence}</div>}
                    {recentData.feedback && <div style={{ color:"grey", fontStyle:"italic", marginTop:"2px" }}>{recentData.feedback}</div>}
                </div>
            )}

            <div style={{ marginTop:"20px" }}>
                <label style={{ display:"flex", alignItems:"center", cursor:"pointer", fontFamily:"Segoe UI", fontSize:"11pt" }}>
                    <input type="checkbox" checked={showEntries} onChange={()=>setShowEntries(!showEntries)} style={{ display:"none" }} />
                    <span style={{ width:"56px", height:"20px", background:showEntries?"#FF4F00":"#ccc", borderRadius:"20px", position:"relative", transition:"background 0.2s ease", marginRight:"8px" }}>
                        <span style={{ position:"absolute", top:"2px", left:showEntries?"38px":"2px", width:"16px", height:"16px", background:"#fff", borderRadius:"50%", transition:"left 0.8s ease" }} />
                    </span>
                    <span style={{ fontFamily:"Segoe UI", fontSize:16, color:"#FF4F00" }}>{showEntries?"Verberg dagboek":"Toon dagboek"}</span>
                </label>

                {showEntries && (
                    <div>
                        {Object.entries(
                            allEntries.slice().sort((a,b)=>new Date(b.createdate)-new Date(a.createdate)).reduce((acc,item)=>{
                                const d = new Date(item.createdate);
                                const yyyy = d.getFullYear();
                                const mm = String(d.getMonth()+1).padStart(2,"0");
                                const dd = String(d.getDate()).padStart(2,"0");
                                const dateKey = `${yyyy}.${mm}.${dd}`;
                                if(!acc[dateKey]) acc[dateKey]=[];
                                acc[dateKey].push(item);
                                return acc;
                            },{})
                        ).map(([dateKey, entries])=>(
                            <DateGroup key={dateKey} dateKey={dateKey} entries={entries} handleDelete={handleDelete} styles={styles} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DutchLanguage_Dagboek;
