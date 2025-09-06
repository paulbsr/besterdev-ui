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
        <div>
            {/* Input + AskAI button inside a form */}
            <form onSubmit={handleAsk} style={{ display: "flex", alignItems: "center" }}>
                <input
                    style={{
                        height: "25.5px",
                        border: "0.75px solid #336791",
                        borderRadius: "4px",
                        padding: 0,
                        paddingLeft: "10px",
                        width: "900px",
                        fontFamily: "Segoe UI",
                        fontSize: "16px",
                    }}
                    placeholder="Ask OpenAI anything..."
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                &nbsp;
                <button
                    type="submit"
                    style={{
                        marginLeft: "1px",
                        height: "25.5px",
                        width: "50px",
                        border: "1px solid #336791",
                        borderRadius: "4px",
                        backgroundColor: "#FFFFFF",
                        color: "#336791",
                        cursor: "pointer",
                    }}
                    disabled={loading}
                >AskAI
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    style={{ 
                        marginLeft: '10px', 
                        height: '25.5px', 
                        width: "50px",
                        border: '1px solid #D3D3D3', 
                        borderRadius: '4px', 
                        backgroundColor: '#FFFFFF', 
                        color: '#D3D3D3', 
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
                        color: "#D5441C",
                    }}
                >
                    {response}
                </div>
            )}
            <div>&nbsp;&nbsp;</div>
        </div>
    );
}
