import React, { useState } from "react";

export default function AskAI() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault(); // prevent page refresh
        if (!text.trim()) return;

        setLoading(true);
        setResponse("");

        const question = `Answer the following in a maximum of three sentences: ${text}`;

        try {
            const res = await fetch(
                "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question }),
                }
            );

            const data = await res.json();

            // Clean response
            let cleaned = (data.answer || "")
                .replace(/optional/i, "")
                .replace(/[\[\]]/g, "")
                .trim();

            setResponse(cleaned || "No response returned");
        } catch (err) {
            setResponse("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setText("");
        setResponse("");
    };

    return (
        <div style={{ display: "flex", alignItems: "left" }}>
            {/* Input + AskAI button inside a form */}
            <form onSubmit={handleAsk} >
                <input
                    style={{
                        height: '40.5px',
                        border: '0.75px solid #336791',
                        borderRadius: '4px',
                        padding: 0,
                        paddingLeft: '10px',
                        width: '850px',
                        fontFamily: 'Segoe UI',
                        fontSize: '18px',
                        marginBottom: '10px'
                    }}
                    placeholder="Ask OpenAI anything..."
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    type="submit"
                    style={{
                        marginLeft: '10px',
                        height: '40.5px',
                        border: '1px solid #336791',
                        borderRadius: '4px',
                        backgroundColor: '#336791',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        paddingRight: '10px',
                    }}
                    disabled={loading}
                > Ask  AI
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    style={{
                        marginLeft: '10px',
                        height: '40.5px',
                        border: '1px solid #336791',
                        borderRadius: '4px',
                        backgroundColor: '#336791',
                        color: '#FFFFFF',
                        cursor: 'pointer'
                    }}
                >Clear
                </button>
            </form>

            {/* Response BELOW input/buttons */}
            {loading && (
                <p
                    style={{
                        fontFamily: "Segoe UI",
                        fontStyle: "italic",
                        fontSize: "16px",
                        marginTop: "8px",
                    }}
                >
                    Thinking...
                </p>
            )}

            {response && (
                <div
                    style={{
                        marginTop: "8px",
                        fontFamily: "Segoe UI",
                        fontStyle: "italic",
                        fontSize: "16px",
                        color: "#000000",
                    }}
                >
                    {response}
                </div>
            )}
        </div>
    );
}
