import React, { useState, useEffect, useRef } from "react";

function FlipCard({ width = 900, minHeight = 75 }) {
  const [flipped, setFlipped] = useState(false);
  const [term, setTerm] = useState("Loading...");
  const [challenge, setChallenge] = useState("Loading challenge...");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [cardHeight, setCardHeight] = useState(minHeight);

  const backRef = useRef(null);
  const frontRef = useRef(null);

  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(/\[|\]/g, "")
      .replace(/Optional\s*/gi, "")
      .replace(/Certainly!?/gi, "")
      .trim();
  };

  const fetchTermAndChallenge = async () => {
    try {
      setTerm("Loading...");
      setChallenge("Loading challenge...");

      const termRes = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/random"
      );
      const termData = await termRes.json();
      const newTerm = termData.cyclopediaName || "Unknown Term";
      setTerm(newTerm);

      const challengeRes = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `Generate a one-sentence question about the topic: ${newTerm}`,
          }),
        }
      );

      const challengeData = await challengeRes.json();
      const rawChallenge = challengeData.answer || challengeData.response || "Could not generate challenge";
      setChallenge(formatText(rawChallenge));
    } catch (err) {
      console.error("Error fetching term or challenge:", err);
      setTerm("Error loading term");
      setChallenge("Error generating challenge");
    }
  };

  useEffect(() => {
    fetchTermAndChallenge();
  }, []);

  useEffect(() => {
    const frontHeight = frontRef.current?.scrollHeight || minHeight;
    const backHeight = backRef.current?.scrollHeight || minHeight;
    setCardHeight(Math.max(frontHeight, backHeight, minHeight));
  }, [term, challenge, response, flipped]);

  const containerStyle = {
    perspective: "1000px",
    width,
    height: cardHeight,
    margin: "50px auto",
    transition: "height 0.3s ease",
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s ease",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    cursor: "pointer",
  };

  const faceBase = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    backfaceVisibility: "hidden",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  };

  const frontStyle = {
    ...faceBase,
    background: "#ffffff",
    color: "#111827",
    fontWeight: 500,
    height: "100%",
  };

  const backStyle = {
    ...faceBase,
    background: "#ffffff",
    color: "#111827",
    transform: "rotateY(180deg)",
    fontFamily: "Segoe UI",
    fontSize: 16,
    lineHeight: 1.4,
    padding: "10px",
    gap: "10px",
    height: "100%",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!answer.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `Evaluate the accuracy of the answer to the question about "${term}": ${answer}. Provide the correct answer in no more than 3 sentences.`,
          }),
        }
      );

      const data = await res.json();
      const rawResponse = data.answer || data.response || "No feedback available";
      setResponse(formatText(rawResponse));
    } catch (err) {
      console.error("Error submitting answer:", err);
      setResponse("Failed to submit answer");
    } finally {
      setLoading(false);
    }
  };

  const handleIDontKnow = async (e) => {
    e.stopPropagation();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: `Provide a concise technical answer about "${term}" in no more than three sentences.`,
          }),
        }
      );

      const data = await res.json();
      const rawResponse = data.answer || data.response || "No answer available";
      setResponse(formatText(rawResponse));
    } catch (err) {
      console.error("Error fetching technical answer:", err);
      setResponse("Failed to fetch answer");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async (e) => {
    e.stopPropagation();
    setAnswer("");
    setResponse("");
    setFlipped(false);
    await fetchTermAndChallenge();
  };

  return (
    <div style={containerStyle} onClick={() => setFlipped(!flipped)}>
      <div style={innerStyle}>
        <div style={frontStyle} ref={frontRef}>
          {term}
        </div>
        <div style={backStyle} ref={backRef}>
          <div style={{ color: "#000000", fontStyle: "italic", marginBottom: "0.1px" }}>
            {challenge}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                marginTop: "8px",
                padding: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "90%",
              }}
            />
            <button
              type="button"
              onClick={handleIDontKnow}
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fef3c7",
                cursor: "pointer",
              }}
            >
              I do not know
            </button>
          </form>

          {response && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#111827",
                textAlign: "left",
                width: "90%",
              }}
            >
              <strong>Feedback:</strong> {response}
              <div>
                <button
                  onClick={handleClear}
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    background: "#f3f4f6",
                    cursor: "pointer",
                  }}
                >
                  New Challenge
                </button>
                <div>&nbsp;</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
