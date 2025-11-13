import React, { useState, useEffect, useRef } from "react";
import { IoMdSwap } from "react-icons/io";

export default function DutchLanguageCompareContrast() {
  const [dutch, setDutch] = useState("");
  const [afrikaans, setAfrikaans] = useState("");
  const [subject, setSubject] = useState("Dutch politics");
  const [tempSubject, setTempSubject] = useState(subject);
  const [showInput, setShowInput] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const intervalRef = useRef(null);
  const countdownRef = useRef(null);

  const fetchSentence = async () => {
    try {
      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `Generate one grammatically complex Dutch sentence (minimum 15 words) about ${subject}, followed by its Afrikaans translation. Do not add introductions, just output the Dutch sentence on one line and the Afrikaans translation on the next.`,
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

  useEffect(() => {
    // clear existing timers before starting new ones
    clearInterval(intervalRef.current);
    clearInterval(countdownRef.current);

    // fetch immediately
    fetchSentence();

    // reset countdown
    setCountdown(15);

    // start countdown timer
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 15)); // reset to 15 when reaching 0
    }, 1000);

    // start fetch timer synced with countdown
    intervalRef.current = setInterval(() => {
      fetchSentence();
    }, 15000);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(countdownRef.current);
    };
  }, [subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubject(tempSubject);
    setShowInput(false);
  };

  return (
    <div
      style={{
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
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

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "22px",
            margin: "1px 0 16px 0",
          }}
        >
          Vergelijk en Contrast Talen
        </h2>

        <IoMdSwap
          size={18}
          style={{ cursor: "pointer", color: "#777777" }}
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
    </div>
  );
}
