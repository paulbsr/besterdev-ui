import React, { useState, useEffect, useRef } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/luisteren/wip";
const PROGRESS_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/luisteren/progress";

export default function DutchLanguage_Nt2exam_LuisterenToets() {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [progress, setProgress] = useState(null);

  // --------------------------
  // Countdown timer
  // --------------------------
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const startCountdown = () => {
    clearInterval(timerRef.current);
    setTimeLeft(135); // 2 minutes = 120 seconds

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // --------------------------
  // Fetch progress percentage
  // --------------------------
  const fetchProgress = async () => {
    try {
      const res = await fetch(PROGRESS_URL);
      if (!res.ok) throw new Error("Failed to fetch progress");
      const value = await res.json();
      setProgress(parseFloat(value).toFixed(1)); // e.g. 2.6
    } catch (err) {
      console.error("❌ Error fetching progress:", err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  // --------------------------
  // Fetch random listening question
  // --------------------------
  const fetchQuestion = async () => {
    setLoading(true);
    setFeedback("");
    setUserAnswer("");
    setQuestion(null);
    setTimeLeft(0);

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
      setCollapsed(false);
      startCountdown();

      // Refresh progress each time a new question is fetched
      fetchProgress();
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
  const checkAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return setFeedback("⚠️ Kies je antwoord.");

    const correctRaw = question?.answerCorrect?.trim().toLowerCase();
    const attempt = userAnswer.trim().toLowerCase();

    const isCorrect =
      correctRaw === attempt ||
      correctRaw.startsWith(attempt + " -") ||
      correctRaw.startsWith(attempt + "—") ||
      correctRaw.startsWith(attempt + ":");

    if (isCorrect) {
      setFeedback("✅ Correct! Goed gedaan!");
    } else {
      setFeedback(`❌ Onjuist. Het juiste antwoord is: ${question.answerCorrect}`);
    }

    try {
      const fullAnswer =
        userAnswer === "A"
          ? `A - ${question.optionA}`
          : userAnswer === "B"
          ? `B - ${question.optionB}`
          : userAnswer === "C"
          ? `C - ${question.optionC}`
          : userAnswer;

      await fetch(`${API_URL}/${question.id}/answerTry`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullAnswer),
      });

      console.log("✅ Answer persisted:", fullAnswer);
      fetchProgress(); // Refresh progress after saving answer
    } catch (err) {
      console.error("❌ Error saving answer:", err);
    }
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Nederlands Staatsexamen NT2 :: Luisteren-II Toets</h2>

        {question && (
          <button onClick={toggleCollapse} style={styles.collapseButton}>
            {collapsed ? "⬇️ Toon" : "⬆️ Verberg"}
          </button>
        )}
      </div>

      <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "12px", lineHeight: 1, margin: 0, padding: 0 }}>
        <p style={{ margin: 0 }}>2024 - Vragen: 37-40 • Maximumscore: 37-40 • Cesuur: 24 (65%) • Tijdsduur: ±90 minuten</p>
      </div>

      <button
        onClick={fetchQuestion}
        disabled={loading}
        style={{
          ...styles.button,
          backgroundColor: loading ? "#ddd" : "#fff",
          borderColor: "#FF4F00",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        {loading ? "Even geduld..." : "Nieuwe Luistervraag"}
      </button>

      {!collapsed && question && (
        <div style={styles.questionBox}>
          <div>
            <strong>Jaar:</strong> {question.year} •{" "}
            <strong>Track:</strong> {question.trackNumber} •{" "}
            <strong>Opgave:</strong> {question.opgave} •{" "}
            <strong>Onderwerp:</strong>{" "}
            
            <a
              href={question.trackTypeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {question.trackType}
            </a> •{" "}
            <strong>Compleet:</strong> {progress}%
          </div>

          <div style={{ marginTop: "12px" }}>
            {question.trackURL?.endsWith(".webm") ? (
              <video
                controls
                style={{ width: "100%", borderRadius: "6px" }}
                preload="metadata"
              >
                <source src={question.trackURL} type="video/webm" />
                Je browser ondersteunt het afspelen van video niet.
              </video>
            ) : (
              <audio controls style={{ width: "100%" }}>
                <source src={question.trackURL} type="audio/ogg" />
                Je browser ondersteunt het afspelen van audio niet.
              </audio>
            )}
          </div>

          <blockquote style={styles.questionText}>
            {question.question}
          </blockquote>

          <ul style={styles.optionList}>
            <li>A - {question.optionA}</li>
            <li>B - {question.optionB}</li>
            <li>C - {question.optionC}</li>
          </ul>

          <div
            style={{
              fontFamily: "Segoe UI, sans-serif",
              fontSize: "16px",
              marginBottom: "4px",
              fontWeight: "bold",
              color: timeLeft <= 10 ? "red" : "red",
            }}
          >
            {timeLeft > 0 ? (
              <>⏱️ Tijd over: {formatTime(timeLeft)}</>
            ) : (
              "⏰ Tijd is om!"
            )}
          </div>

          <form onSubmit={checkAnswer} style={{ marginTop: "4px" }}>
            <select
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={styles.select}
            >
              <option value="">-- Kies je antwoord --</option>
              <option value="A">A - {question.optionA}</option>
              <option value="B">B - {question.optionB}</option>
              <option value="C">C - {question.optionC}</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                backgroundColor: "#fff",
                borderColor: "#FF4F00",
                marginLeft: "5px",
                cursor: "pointer"
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

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    fontFamily: "Segoe UI",
    fontSize: "16px",
    maxWidth: "1100px",
    marginTop: "16px",
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
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "10px",
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
  select: {
    height: "40.5px",
    border: "1px solid #777",
    borderRadius: "4px",
    paddingLeft: "10px",
    width: "750px",
    fontSize: "16px",
    backgroundColor: "#fff",
  },
};
