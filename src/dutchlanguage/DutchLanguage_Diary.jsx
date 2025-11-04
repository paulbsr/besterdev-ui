import React, { useState, useEffect } from "react";

function DutchLanguage_Diary() {
    const [entry, setEntry] = useState("");
    const [feedback, setFeedback] = useState("");
    const [aiSentence, setAiSentence] = useState("");
    const [loading, setLoading] = useState(false);
    const [allEntries, setAllEntries] = useState([]);

    const API_BASE = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/diary";
    const AI_ENDPOINT = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

    // Fetch all entries on mount
    useEffect(() => {
        fetchAllEntries();
    }, []);


    const fetchAllEntries = async () => {
        try {
            const res = await fetch(API_BASE); // GET /
            const data = await res.json();
            setAllEntries(Array.isArray(data) ? data : [data]); // ensure array
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
        const mm = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const dd = String(d.getDate()).padStart(2, "0");

        return `${yyyy}.${mm}.${dd}`;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!entry.trim()) return;

        setLoading(true);
        setFeedback("");
        setAiSentence("");

        try {
            // Step 1 — Save user entry to DB
            const postRes = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myEntry: entry, aiEntry: "", feedback: "" }),
            });

            const saved = await postRes.json();
            const savedId = saved.id;

            // Step 2 — Call AI
            const aiRes = await fetch(AI_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `You are a Dutch language teacher. A student wrote: "${entry}". 
Please respond ONLY in raw JSON with keys "feedback" and "suggestedSentence".`
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

            // Step 3 — Update DB with AI feedback & suggestion
            await fetch(`${API_BASE}/${savedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback: parsedFeedback, aiEntry: parsedSentence }),
            });

            setEntry(""); // Clear input
            fetchAllEntries(); // Refresh all entries
        } catch (err) {
            console.error(err);
            setFeedback("Er is een fout opgetreden.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "20px", fontFamily: "Tahoma", fontSize: "8pt" }}>
        <div
            style={{
                maxWidth: "1100px",
                margin: "40px auto",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontFamily: "Tahoma",
                fontSize: "9pt"
            }}
        >
            <h2 style={{
                fontWeight: "bold",
                fontSize: "22px",
                marginBottom: "16px",
                marginTop: "1px",
            }}>Nederlands Dagboek</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Typ hier jouw dagboektekst..."
                    rows="2"
                    style={{ height: "25.5px", width: "97%", padding: "6px", fontFamily: "Segoe UI", fontSize: "10pt", borderRadius: "4px", border: "0.75px solid #777777", }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: "6px",
                        padding: "6px 12px",
                        fontSize: "8pt",
                        borderRadius: "4px",
                        background: loading ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Bezig..." : "Verstuur"}
                </button>
            </form>

            {/* Display all diary entries */}
            <div style={{ marginTop: "20px" }}>
                {allEntries
                    .slice() // create a copy so we don’t mutate state
                    .sort((a, b) => new Date(b.createdate) - new Date(a.createdate)) // most recent first
                    .map((item) => (
                        <div
                            key={item.id}
                            style={{
                                marginBottom: "12px",
                                //   borderBottom: "1px solid #eee",
                                paddingBottom: "6px",
                            }}
                        >
                            <div>{formatDate(item.createdate)}:</div>
                            <div style={{ color: "black" }}>{item.myEntry}</div>
                            <div style={{ color: "#FF4F00" }}>{item.aiEntry}</div>
                        </div>
                    ))}
            </div>

        </div>
    );
}

export default DutchLanguage_Diary;
