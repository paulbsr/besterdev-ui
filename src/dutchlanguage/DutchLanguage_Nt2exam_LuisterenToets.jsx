import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/luisteren";

export default function DutchLanguage_Nt2exam_LuisterenToets() {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  // --------------------------
  // Fetch random listening question
  // --------------------------
  const fetchQuestion = async () => {
    setLoading(true);
    setFeedback("");
    setUserAnswer("");
    setQuestion(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch question list");

      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.questions)
        ? data.questions
        : [];

      if (list.length === 0) throw new Error("No questions found.");

      const randomItem = list[Math.floor(Math.random() * list.length)];
      setQuestion(randomItem);
      setCollapsed(false); // Expand when new question loads
    } catch (err) {
      console.error("❌ Error fetching question:", err);
      setFeedback("❌ Error fetching question.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Check user answer
  // --------------------------
  const checkAnswer = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return setFeedback("⚠️ Voer je antwoord in.");

    const correct = question?.answerCorrect?.trim().toLowerCase();
    const attempt = userAnswer.trim().toLowerCase();

    if (attempt === correct) {
      setFeedback("✅ Correct! Goed gedaan!");
    } else {
      setFeedback(`❌ Onjuist. Het juiste antwoord is: ${question.answerCorrect}`);
    }
  };

  // --------------------------
  // Toggle collapse
  // --------------------------
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // --------------------------
  // UI
  // --------------------------
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>
          Nederlands Staatsexamen NT2 :: Luisteren-II Toets
        </h2>

        {/* Collapse toggle only if a question is loaded */}
        {question && (
          <button onClick={toggleCollapse} style={styles.collapseButton}>
            {collapsed ? "⬇️ Toon" : "⬆️ Verberg"}
          </button>
        )}
      </div>

      {/* Show button even when collapsed */}
      <button
        onClick={fetchQuestion}
        disabled={loading}
        style={{
          ...styles.button,
          backgroundColor: loading ? "#ddd" : "#fff",
          borderColor: "#FF4F00",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "10px",
        }}
      >
        {loading ? "Even geduld..." : "Nieuwe Luistervraag"}
      </button>

      {/* Collapsible section */}
      {!collapsed && question && (
        <div style={styles.questionBox}>
          <div>
            <strong>Jaar:</strong> {question.year} •{" "}
            <strong>Track:</strong> {question.trackNumber} •{" "}
            <strong>Opgave:</strong> {question.opgave}
          </div>

          {/* AUDIO PLAYER */}
          <div style={{ marginTop: "12px" }}>
            <audio controls style={{ width: "100%" }}>
              <source src={question.trackURL} type="audio/ogg" />
              Je browser ondersteunt het afspelen van audio niet.
            </audio>
          </div>

          <blockquote style={styles.questionText}>{question.question}</blockquote>

          <ul style={styles.optionList}>
            <li>A - {question.optionA}</li>
            <li>B - {question.optionB}</li>
            <li>C - {question.optionC}</li>
          </ul>

          <form onSubmit={checkAnswer} style={{ marginTop: "12px" }}>
            <input
              type="text"
              placeholder="Typ je antwoord (bijv. A of B of C)..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={styles.input}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                backgroundColor: "#fff",
                borderColor: "#FF4F00",
                marginLeft: "5px",
              }}
            >
              Controleer Antwoord
            </button>
          </form>

          {feedback && (
            <div style={{ marginTop: "12px", fontWeight: "bold" }}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --------------------------
// Styles
// --------------------------
const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    fontFamily: "Segoe UI",
    fontSize: "16px",
    maxWidth: "1100px",
    marginTop: "16px"
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "22px",
    margin: 0,
  },
  button: {
    height: "40.5px",
    border: "1px solid #777",
    borderRadius: "4px",
    padding: "8px 8px",
    fontSize: "16px",
  },
  collapseButton: {
    border: "1px solid #FF4F00",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  questionBox: {
    backgroundColor: "#f9f9f9",
    borderLeft: "12px solid #FF4F00",
    padding: "12px 16px",
    borderRadius: "6px",
    marginTop: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  questionText: {
    fontSize: "18px",
    color: "#FF4F00",
    fontStyle: "italic",
    marginTop: "10px",
  },
  optionList: {
    listStyleType: "none",
    padding: "0",
    marginTop: "10px",
    lineHeight: "1.8",
  },
  input: {
    height: "35.5px",
    border: "1px solid #777",
    borderRadius: "4px",
    paddingLeft: "10px",
    width: "250px",
    fontSize: "16px",
  },
};
