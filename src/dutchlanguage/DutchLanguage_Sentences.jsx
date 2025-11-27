import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";

function DutchLanguage_Sentences() {
    const [word, setWord] = useState("Laden...");
    const [sentence, setSentence] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [topic] = useState("Universiteit van amsterdam");

    const formatText = (text) => {
        if (!text) return "";
        return text
            .replace(/^Optional\[/, "")
            .replace(/\]$/, "")
            .replace(/\[|\]/g, "")
            .trim();
    };

    const fetchWord = async (customTopic = topic) => {
        try {
            setWord("Laden...");
            const res = await fetch(
                "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        question: `Geef mij één willekeurig Nederlands woord over onderwerp ${customTopic}, zonder uitleg of zinnen. Alleen het woord.`,
                    }),
                }
            );

            const data = await res.json();
            setWord(formatText(data.answer || data.response || "onbekend woord"));
        } catch {
            setWord("Fout bij laden");
        }
    };

    useEffect(() => {
        fetchWord();
    }, []);

    const handleSubmit = async (e) => {
        if (e.key !== "Enter") return;
        if (!sentence.trim()) return;

        setLoading(true);
        setFeedback("");

        try {
            const res = await fetch(
                "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        question: `You are a Dutch high school teacher. A student wrote the following sentence using the word "${word}": "${sentence}". 
                      Check correctness. If correct, start with "correct" and give praise. 
                      If incorrect, start with "incorrect" with explanation + corrected version.`,
                    }),
                }
            );

            const data = await res.json();
            setFeedback(formatText(data.answer || data.response));
        } catch {
            setFeedback("Fout bij controleren");
        } finally {
            setLoading(false);
        }
    };

    const handleNewWord = async () => {
        setSentence("");
        setFeedback("");
        await fetchWord();
    };

    return (
        <div style={{ fontFamily: "Segoe UI" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            </div>



            <div style={{ position: "relative", width: "96%" }}>
                <FiRefreshCw
                    onClick={handleNewWord}
                    title="Nieuw woord"
                    style={{
                        position: "absolute",
                        right: "2px",
                        top: "40%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#c0c0c0",
                    }}
                />

                <input
                    type="text"
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    onKeyDown={handleSubmit}
                    placeholder={`Gebruik dit woord in een correcte zin: ${word}`}
                    style={{
                        height: "40px",
                        width: "100%",
                        border: "1px solid #FF4F00",
                        borderRadius: "6px",
                        paddingLeft: "10px",
                        paddingRight: "24px", // ← important so text doesn't overlap the icon
                        fontSize: "16px",
                        marginTop: "10px",
                        marginBottom: "16px",
                    }}
                />
            </div>




            {/* Spinner */}
            {loading && (<div style={{ marginTop: "2px", color: "#FF4F00", marginBottom: "5px" }}>⏳ Bezig met controleren...</div>)}

            {/* FEEDBACK */}
            {feedback && (
                <div
                    style={{
                        marginTop: "1px",
                        padding: "10px",
                        borderRadius: "6px",
                        background: "#fff7f0",
                        color: "#FF4F00",
                        fontStyle: "italic",
                        width: "97%",
                        marginBottom: "16px",
                    }}
                >
                    {feedback}
                </div>
            )}
        </div>
    );
}

export default DutchLanguage_Sentences;
