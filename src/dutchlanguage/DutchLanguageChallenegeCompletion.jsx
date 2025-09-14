import React, { useState, useEffect } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageChallengeCompletion({
  subject = "workplace communication",
}) {
  const [challenge, setChallenge] = useState("");
  const [suggestedCompletion, setSuggestedCompletion] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [subjectInput, setSubjectInput] = useState(subject);

  const fetchChallenge = async () => {
    try {
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

      // Split out the suggestion part
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
    }
  };

  const checkAnswer = () => {
    if (!userInput.trim()) {
      setFeedback("⚠️ Please enter your completion.");
      return;
    }

    if (suggestedCompletion) {
      setFeedback(
        `Suggested completion was: "${suggestedCompletion}". Your answer: "${userInput}".`
      );
    } else {
      setFeedback(`Your answer: "${userInput}"`);
    }
  };

  // ✅ Load initial challenge automatically
  useEffect(() => {
    fetchChallenge();
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px", // ✅ Adds space between border and text (all sides)
        fontFamily: "Segoe UI", // ✅ Global font
        fontSize: "16px", // ✅ Global font size
        maxWidth: "1100px"
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px" }}>Dutch Sentence Completion</h2>

      {/* Topic input */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Choose a topic:</label>
        <input
          type="text"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          placeholder="Enter a topic..."
          className="border rounded w-full"
          style={{
            width: "300px",
            // padding: "6px 8px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
        />

              <button
        onClick={fetchChallenge}
        // className="bg-blue-500 text-white rounded mb-4"
        style={{
          marginLeft: "5px",
          // padding: "8px 16px",
          fontFamily: "Segoe UI",
          fontSize: "16px",
        }}
      >
        New Challenge
      </button>
      </div>



      {challenge && (
        <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>
          Complete this Dutch text:
        </label>
<blockquote
      className="whitespace-pre-line bg-gray-100 rounded"
      style={{
        padding: "8px",
        fontFamily: "Segoe UI",
        fontSize: "18px",
        fontStyle: "italic",
        // fontWeight: "bold",
                    color: "#FF4F00",
      }}
    >
      {challenge}
    </blockquote>

        </div>
      )}

      {challenge && (
        <div>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your completion here..."
            style={{
              height: "35.5px",
              border: "1px solid #FF4F00",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
              paddingLeft: "10px",
              width: "850px",
              fontFamily: "Segoe UI",
              fontSize: "16px",
            }}
          />
          <button
            onClick={checkAnswer}
          style={{
            marginLeft: "5px",
            height: "36.5px",
            border: "1px solid #FF4F00",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            color: "#FF4F00",
            cursor: "pointer",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
          >
            Submit
          </button>
        </div>
      )}

      {feedback && <div style={{ marginTop: "16px" }}>{feedback}</div>}
    </div>
  );
}
