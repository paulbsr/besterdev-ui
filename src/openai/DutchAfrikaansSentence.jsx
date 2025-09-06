import React, { useState, useEffect } from "react";

export default function DutchAfrikaansSentence() {
  const [dutch, setDutch] = useState("");
  const [afrikaans, setAfrikaans] = useState("");

  useEffect(() => {
    const fetchSentence = async () => {
      try {
        const res = await fetch(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question:
                "Generate one gramatically complex Dutch sentence (max 15 words), followed by its Afrikaans translation. Do not add introductions, just output the Dutch sentence on one line and the Afrikaans translation on the next."
            }),
          }
        );

        const data = await res.json();

        // Clean and split into Dutch (top) and Afrikaans (bottom)
        let cleaned = (data.answer || "")
          .replace(/optional/i, "")
          .replace(/[\[\]]/g, "")
          .trim();

        const [first, second] = cleaned.split(/\n/).map((s) => s.trim());

        setDutch(first || "");
        setAfrikaans(second || "");
      } catch (err) {
        console.error("Error fetching Dutch sentence:", err);
      }
    };

    // Fetch immediately on mount
    fetchSentence();

    // Then repeat every 10 seconds
    const intervalId = setInterval(fetchSentence, 20000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p
        style={{
          fontFamily: "Segoe UI",
          fontSize: "18px",
          fontStyle: "italic",
          color: "#FF4F00",
          margin: 0,
          textAlign: "center", // center align
        }}
      >
        {dutch}
      </p>
      <p
        style={{
          fontFamily: "Segoe UI",
          fontSize: "18px",
          fontStyle: "italic",
          color: "#007749",
          margin: 0,
          textAlign: "center", // center align
        }}
      >
        {afrikaans}
      </p>
    </>
  );
}
