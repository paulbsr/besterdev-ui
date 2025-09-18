import React, { useState, useEffect } from "react";
import { IoMdSwap } from "react-icons/io";

export default function DutchLanguageCompareContrast() {
  const [dutch, setDutch] = useState("");
  const [afrikaans, setAfrikaans] = useState("");
  const [subject, setSubject] = useState("Dutch politics");
  const [tempSubject, setTempSubject] = useState(subject);
  const [showInput, setShowInput] = useState(false);
  const [countdown, setCountdown] = useState(20); // countdown state

  useEffect(() => {
    const fetchSentence = async () => {
      try {
        const res = await fetch(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: `Generate one grammatically complex Dutch sentence (max 15 words) about ${subject}, followed by its Afrikaans translation. Do not add introductions, just output the Dutch sentence on one line and the Afrikaans translation on the next.`,
            }),
          }
        );

        const data = await res.json();

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

    fetchSentence(); // initial fetch

    // every 20 sec fetch new sentence & reset countdown
    const intervalId = setInterval(() => {
      fetchSentence();
      setCountdown(15);
    }, 15000);

    return () => clearInterval(intervalId);
  }, [subject]);

  // countdown effect
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubject(tempSubject);
    setShowInput(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        maxWidth: "1100px",
        position: "relative",
      }}
    >
      {/* countdown in corner */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          right: "8px",
          fontSize: "11px",
          fontFamily: "Segoe UI",
          color: "#777777",
        }}
      >
        Swap in {countdown}s
      </div>

      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px" }}>Vergelijk en Contrast Talen</h2>

      <p
        style={{
          fontSize: "18px",
          fontStyle: "italic",
          color: "#FF4F00",
          margin: 0,
          textAlign: "left",
        }}
      >
        {dutch}
      </p>
      <p
        style={{
          fontSize: "18px",
          fontStyle: "italic",
          color: "#007749",
          margin: 0,
          textAlign: "left",
        }}
      >
        {afrikaans}
      </p>

      <div style={{ marginTop: "12px" }}>
        <IoMdSwap
          size={18}
          style={{ cursor: "pointer", marginRight: "8px", color: "#777777" }}
          title="Change subject"
          onClick={() => setShowInput(!showInput)}
        />

        {showInput && (
          <form onSubmit={handleSubmit} style={{ display: "inline" }}>
            <input
              type="text"
              value={tempSubject}
              onChange={(e) => setTempSubject(e.target.value)}
              style={{
                fontSize: "14px",
                width: "300px",
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #777777",
                backgroundColor: "#FFFFFF",
                color: "#777777",
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
}
