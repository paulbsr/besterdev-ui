import React, { useState, useEffect, useRef } from "react";
import { PiBookOpenTextBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DutchLanguage_Dagboek() {
    const [entry, setEntry] = useState("");
    const [feedback, setFeedback] = useState("");
    const [aiSentence, setAiSentence] = useState("");
    const [loading, setLoading] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [showEntries, setShowEntries] = useState(false);
    const [expandedEntryId, setExpandedEntryId] = useState(null);
    const [recentData, setRecentData] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);

    const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary";
    const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

    // Fetch entries
    useEffect(() => {
        fetchAllEntries();
    }, []);

    // Timer effect
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    // Format seconds into MM:SS
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const resetTimer = () => {
    clearInterval(timerRef.current);
    setElapsed(0);
    timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
    }, 1000);
};


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
        setRecentData(null);

        try {
            // Save user entry
            const postRes = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myEntry: entry, aiEntry: "", feedback: "" }),
            });
            const saved = await postRes.json();
            const savedId = saved.id;

            // Send to AI
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
            aiText = aiText
                .replace(/^Optional\[/, "")
                .replace(/\]$/, "")
                .replace(/```json|```/g, "")
                .trim();

            let parsedFeedback = "";
            let parsedSentence = "";
            try {
                const parsed = JSON.parse(aiText);
                parsedFeedback = parsed.feedback || "";
                parsedSentence = parsed.suggestedSentence || "";
            } catch {
                parsedFeedback = aiText;
            }

            // Update UI
            setFeedback(parsedFeedback);
            setAiSentence(parsedSentence);
            setRecentData({ entry, feedback: parsedFeedback, aiSentence: parsedSentence });
            resetTimer();

            // Update backend entry with AI feedback
            await fetch(`${API_BASE}/${savedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence }),
            });

            setEntry("");
            setWordCount(0);
            fetchAllEntries();
        } catch (err) {
            console.error(err);
            setFeedback("Er is een fout opgetreden.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Weet je zeker dat je dit dagboekitem wilt verwijderen?")) return;
        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
            if (res.status === 204) {
                toast.success("Item succesvol verwijderd!", { position: "top-center", autoClose: 2000 });
                setAllEntries((prev) => prev.filter((e) => e.id !== id));
            } else {
                toast.error("Verwijderen mislukt.", { position: "top-center" });
            }
        } catch (err) {
            console.error("Error deleting entry:", err);
            toast.error("Fout bij verwijderen.", { position: "top-center" });
        }
    };

    const styles = {
        container: {
            border: "1px solid #FF4F00",
            borderRadius: "8px",
            padding: "16px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
            maxWidth: "1100px",
            marginTop: "16px",
            marginBottom: "16px",
        },
        deleteIcon: {
            color: "#c0c0c0",
            marginLeft: "8px",
            cursor: "pointer",
        },
        clearIcon: {
            color: "#ccc",
            cursor: "pointer",
            position: "absolute",
            top: "6px",
            right: "6px",
        },
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <h2 style={{ fontWeight: "bold", fontSize: "22px", margin: 0 }}>
                <PiBookOpenTextBold
                    style={{
                        color: "#FF4F00",
                        fontSize: "35px",
                        cursor: "pointer",
                        marginRight: "10px",
                    }}
                />
                Mijn Dagboek in het Nederlands
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={entry}
                    onChange={(e) => {
                        setEntry(e.target.value);
                        const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
                        setWordCount(words);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    placeholder="Typ hier jouw dagboektekst..."
                    style={{
                        marginTop: "10px",
                        height: "80px",
                        width: "98%",
                        padding: "6px",
                        fontFamily: "Segoe UI",
                        fontSize: "12pt",
                        borderRadius: "4px",
                        border: "0.75px solid #777777",
                        resize: "vertical",
                    }}
                />

                {/* Word count + timer */}
                <div
                    style={{
                        fontSize: "11pt",
                        color: "grey",
                        marginTop: "4px",
                        marginBottom: "8px",
                    }}
                >
                    Woorden: {wordCount} | Tijd: {formatTime(elapsed)}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        height: "35.5px",
                        width: "90px",
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

            {/* Latest entry display */}
            {recentData && (
                <div
                    style={{
                        marginTop: "10px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        position: "relative",
                        backgroundColor: "#fafafa",
                        borderRadius: "4px",
                    }}
                >
                    <FaTimes
                        title="Clear"
                        style={styles.clearIcon}
                        onClick={() => setRecentData(null)}
                    />
                    <div style={{ color: "#000000" }}>{recentData.entry}</div>
                    {recentData.aiSentence && (
                        <div style={{ color: "#FF4F00", marginTop: "4px" }}>
                            {recentData.aiSentence}
                        </div>
                    )}
                    {recentData.feedback && (
                        <div
                            style={{
                                color: "grey",
                                fontStyle: "italic",
                                marginTop: "2px",
                            }}
                        >
                            {recentData.feedback}
                        </div>
                    )}
                </div>
            )}

            {/* Diary entries list */}
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

                {showEntries && (
                    <div>
                        {allEntries
                            .slice()
                            .sort((a, b) => new Date(b.createdate) - new Date(a.createdate))
                            .map((item) => (
                                <div key={item.id}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {/* <div
                                            onClick={() =>
                                                setExpandedEntryId(
                                                    expandedEntryId === item.id ? null : item.id
                                                )
                                            }
                                            style={{
                                                cursor: "pointer",
                                                color: "black",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {formatDate(item.createdate)}  -  {item.myEntry}
                                        </div> */}

                                        <div
    onClick={() =>
        setExpandedEntryId(
            expandedEntryId === item.id ? null : item.id
        )
    }
    style={{
        cursor: "pointer",
        color: "black",
        marginBottom: "4px",
        fontFamily: "Segoe UI",
        fontSize: "10pt",
    }}
>
    {formatDate(item.createdate)}{" "}
    <span
        style={{
            fontStyle: "italic",
            fontSize: "8pt",
            fontFamily: "Segoe UI",
            color: "black",
        }}
    >
        - {item.myEntry}
    </span>
</div>
                                        <FaTimes
                                            title="Delete"
                                            style={styles.deleteIcon}
                                            onClick={() => handleDelete(item.id)}
                                        />
                                    </div>

                                    {expandedEntryId === item.id && (
                                        <div
                                            style={{
                                                marginLeft: "15px",
                                                marginBottom: "6px",
                                                paddingBottom: "6px",
                                                border: "1px solid #eee",
                                            }}
                                        >
                                            <div style={{ color: "#000000" }}>{item.myEntry}</div>
                                            {item.aiEntry && (
                                                <div style={{ color: "#FF4F00" }}>{item.aiEntry}</div>
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
