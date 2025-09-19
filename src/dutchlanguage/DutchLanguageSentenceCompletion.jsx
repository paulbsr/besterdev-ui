import React, { useState, useEffect } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageSentenceCompletion({
  subject = "workplace communication",
}) {
  const [challenge, setChallenge] = useState("");
  const [suggestedCompletion, setSuggestedCompletion] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [subjectInput, setSubjectInput] = useState(subject);
  const [loading, setLoading] = useState(false); // ✅ track loading state

  const fetchChallenge = async () => {
    try {
      setLoading(true); // ✅ start loading
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Generate one Dutch text (1 sentence) about ${subjectInput}, 
          but leave one sentence unfinished with a blank line of underscores (____________________________). 
          After the text, on a new line, write "SUGGESTION:" followed by a natural Dutch completion 
          for the blank. Do not add introductions or explanations.`,
        }),
      });

      const data = await res.json();
      const output = data.answer || "";

      const parts = output.split("SUGGESTION:");
      const challengeText = parts[0]?.trim() || "";
      const completion = parts[1]?.trim() || "";

      setChallenge(challengeText);
      setSuggestedCompletion(completion);
      setUserInput("");
      setFeedback("");
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error fetching challenge");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const checkAnswer = async () => {
    if (!userInput.trim()) {
      setFeedback("⚠️ Please enter your completion.");
      return;
    }

    try {
      setLoading(true); // ✅ show "Validating..."
      setFeedback("Validating..."); // ✅ immediately update text

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question:
            `Evaluate this Dutch sentence completion for correctness and naturalness:\n\n` +
            `Challenge: "${challenge}"\n` +
            `Suggested completion: "${suggestedCompletion}"\n` +
            `User completion: "${userInput}"\n\n` +
            `Respond with feedback in Dutch, indicating whether it is grammatically correct, natural sounding, and good Dutch.`,
        }),
      });

      const data = await res.json();
      const evaluation = data.answer || "⚠️ No evaluation received.";

      setFeedback(evaluation);
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error checking your answer.");
    } finally {
      setLoading(false); // ✅ done validating
    }
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
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px" }}>Nederlands Zin Voltooiing (B2 Schrijven Toets)</h2>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontWeight: "600", whiteSpace: "nowrap" }}>Specificeer een onderwerp:</label>
          <input
            type="text"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
            placeholder="Specify a topic..."
            style={{
              fontSize: "16px",
              width: "300px",
              height: "35.5px",
              border: "1px solid #777777",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              color: "#777777",
              fontFamily: "Segoe UI",
              fontSize: "16px",
              paddingLeft: "10px",
            }}
          />
          <button
            onClick={fetchChallenge}
            style={{
              height: "35.5px",
              border: "1px solid #777777",
              borderRadius: "4px",
              backgroundColor: loading ? "#ddd" : "#FFFFFF",
              color: "#000000",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Segoe UI",
              fontSize: "16px",
            }}
          >
            Nieuwe Uitdaging
          </button>
        </div>

      </div>

      {challenge && (
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}
          >
            Complete this Dutch text:
          </label>
          <blockquote
            className="whitespace-pre-line bg-gray-100 rounded"
            style={{
              padding: "8px",
              fontFamily: "Segoe UI",
              fontSize: "18px",
              fontStyle: "italic",
              color: "#FF4F00",
            }}
          >
            {challenge}
          </blockquote>
        </div>
      )}

      {challenge && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkAnswer();
          }}
        >
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your completion here..."
            style={{
              height: "35.5px",
              border: "1px solid #777777",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              paddingLeft: "10px",
              width: "850px",
              fontFamily: "Segoe UI",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            disabled={loading} // ✅ disable while validating
            style={{
              marginLeft: "5px",
              height: "36.5px",
              border: "1px solid #777777",
              borderRadius: "4px",
              backgroundColor: loading ? "#ddd" : "#FFFFFF",
              color: "#777777",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "Segoe UI",
              fontSize: "16px",
            }}
          >
            {loading ? "Validating..." : "Submit"}
          </button>
        </form>
      )}

      {feedback && (
        <div style={{ marginTop: "16px", fontStyle: loading ? "italic" : "" }}>
          {feedback}
        </div>
      )}
    </div>
  );
}
