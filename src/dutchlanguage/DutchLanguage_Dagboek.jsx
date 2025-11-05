import React, { useState, useEffect } from "react";
import { FaBookOpen } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { PiBookOpenTextBold } from "react-icons/pi";

function DutchLanguage_Dagboek() {
    const [entry, setEntry] = useState("");
    const [feedback, setFeedback] = useState("");
    const [aiSentence, setAiSentence] = useState("");
    const [loading, setLoading] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [showEntries, setShowEntries] = useState(false);
    const [expandedEntryId, setExpandedEntryId] = useState(null); // 👈 NEW: which date is open

    const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary";
    const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

    useEffect(() => {
        fetchAllEntries();
    }, []);

    const fetchAllEntries = async () => {
        try {
            const res = await fetch(API_BASE);
            const data = await res.json();
            setAllEntries(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Error fetching diary entries:", err);
            setAllEntries([]);
        }
    };

    // const formatDate = (dateString) => {
    //     if (!dateString) return "Onbekend datum";
    //     const d = new Date(dateString);
    //     if (isNaN(d)) return "Onbekend datum";
    //     const yyyy = d.getFullYear();
    //     const mm = String(d.getMonth() + 1).padStart(2, "0");
    //     const dd = String(d.getDate()).padStart(2, "0");
    //     return `${yyyy}.${mm}.${dd}`;
    // };

    const formatDate = (dateString) => {
    if (!dateString) return "Onbekend datum";
    const d = new Date(dateString);
    if (isNaN(d)) return "Onbekend datum";

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return `${yyyy}.${mm}.${dd} @ ${hh}:${min}`;
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!entry.trim()) return;

        setLoading(true);
        setFeedback("");
        setAiSentence("");

        try {
            const postRes = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myEntry: entry, aiEntry: "", feedback: "" }),
            });

            const saved = await postRes.json();
            const savedId = saved.id;

            const aiRes = await fetch(AI_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `You are a Dutch language teacher. A student wrote: "${entry}". 
Please respond ONLY in raw JSON with keys "feedback" and "suggestedSentence".`,
                }),
            });

            const aiData = await aiRes.json();
            let aiText = aiData.answer || aiData.response || "";
            aiText = aiText.replace(/^Optional\[/, "").replace(/\]$/, "").replace(/```json|```/g, "").trim();

            let parsedFeedback = "";
            let parsedSentence = "";
            try {
                const parsed = JSON.parse(aiText);
                parsedFeedback = parsed.feedback || "";
                parsedSentence = parsed.suggestedSentence || "";
            } catch {
                parsedFeedback = aiText;
            }

            setFeedback(parsedFeedback);
            setAiSentence(parsedSentence);

            await fetch(`${API_BASE}/${savedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence }),
            });

            setEntry("");
            fetchAllEntries();
        } catch (err) {
            console.error(err);
            setFeedback("Er is een fout opgetreden.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "1100px",
                margin: "16px auto",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #FF4F00",
                fontFamily: "Segoe UI",
                fontSize: "11pt",
            }}
        >
            <h2
                style={{
                    // fontWeight: "bold",
                    fontSize: "22px",
                    marginBottom: "6px",
                    marginTop: "1px",
                }}
            ><PiBookOpenTextBold style={{ color: '#FF4F00', fontSize: '32px', cursor: 'pointer', marginRight: '10px' }}/>
                Mijn Dagboek in het Nederlands
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <input
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Typ hier jouw dagboektekst..."
                    // rows="2"
                    style={{
                        height: "30.5px",
                        width: "90%",
                        padding: "4px",
                        fontFamily: "Segoe UI",
                        fontSize: "12pt",
                        borderRadius: "4px",
                        border: "0.75px solid #777777",
                    }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginLeft: "5px",
                        height: "35.5px",
                        width: "75px",
                        border: "1px solid #FF4F00",
                        borderRadius: "4px",
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        cursor: "pointer",
                        fontFamily: "Segoe UI",
                        fontSize: "16px",

                    }}
                >
                    {loading ? "Bezig..." : "Verstuur"}
                </button>
            </form>

            {/* Toggle diary list */}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => setShowEntries(!showEntries)}
                    style={{
                        fontFamily: "Segoe UI",
                        padding: "6px 10px",
                        fontSize: "11pt",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        background: "#f8f8f8",
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}
                >
                    {showEntries ? "Verberg dagboek" : "Toon dagboek"}
                </button>

                {/* Show only dates when expanded */}
                {showEntries && (
                    <div>
                        {allEntries
                            .slice()
                            .sort((a, b) => new Date(b.createdate) - new Date(a.createdate))
                            .map((item) => (
                                <div key={item.id}>
                                    {/* Date clickable */}
                                    <div
                                        onClick={() =>
                                            setExpandedEntryId(
                                                expandedEntryId === item.id ? null : item.id
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                            color:
                                                expandedEntryId === item.id ? "#000000" : "black",
                                            fontWeight:
                                                expandedEntryId === item.id ? "normal" : "normal",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        {formatDate(item.createdate)}
                                    </div>

                                    {/* Content shown only if this date is expanded */}
                                    {expandedEntryId === item.id && (
                                        <div
                                            style={{
                                                marginLeft: "15px",
                                                marginBottom: "6px",
                                                paddingBottom: "6px",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <div style={{ color: "#000000" }}>{item.myEntry}</div>
                                            {item.aiEntry && (
                                                <div style={{ color: "#FF4F00" }}>
                                                    {item.aiEntry}
                                                </div>
                                            )}
                                            {item.feedback && (
                                                <div
                                                    style={{
                                                        color: "grey",
                                                        fontStyle: "italic",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    {item.feedback}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DutchLanguage_Dagboek;
