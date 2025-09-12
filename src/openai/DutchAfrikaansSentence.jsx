import React, { useState, useEffect } from "react";
import { IoMdSwap } from "react-icons/io";
import DutchLanguageTicker from "./DutchLanguageTicker";

export default function DutchAfrikaansSentence() {
  const [dutch, setDutch] = useState("");
  const [afrikaans, setAfrikaans] = useState("");
  const [subject, setSubject] = useState("Interesting facts about Holland");
  const [tempSubject, setTempSubject] = useState(subject); // store input separately
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchSentence = async () => {
      try {
        const res = await fetch(
          "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: `Generate one grammatically complex Dutch sentence (max 15 words) about ${subject}, followed by its Afrikaans translation. Do not add introductions, just output the Dutch sentence on one line and the Afrikaans translation on the next.`
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

    fetchSentence();

    const intervalId = setInterval(fetchSentence, 20000);
    return () => clearInterval(intervalId);
  }, [subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubject(tempSubject); // update only when form is submitted
    setShowInput(false);     // hide input after submit
  };

  return (
    
    <>
    {/* <DutchLanguageTicker /> */}
      <p
        style={{
          fontFamily: "Segoe UI",
          fontSize: "18px",
          fontStyle: "italic",
          color: "#FF4F00", // Nassau Oranje
          margin: 0,
          textAlign: "left",
        }}
      >
        {dutch}
      </p>
      <p
        style={{
          fontFamily: "Segoe UI",
          fontSize: "18px",
          fontStyle: "italic",
          color: "#007749", // Springbok Groen
          margin: 0,
          textAlign: "left",
        }}
      >
        {afrikaans}
      </p>
      
      <>
        {/* Icon to toggle input */}
        <IoMdSwap
          size={18}
          style={{ cursor: "pointer", marginRight: "8px", color: "#c4c4c4" }}
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
                fontFamily: "Segoe UI",
                fontSize: "12px",
                width: "400px",
                padding: "4px",
                borderRadius: "4px",
                border: "1px solid #c4c4c4",
                backgroundColor: "#FFFFFF",
                color: "#c4c4c4",
              }}
            />
          </form>
        )}
      </>
    </>
  );
}
