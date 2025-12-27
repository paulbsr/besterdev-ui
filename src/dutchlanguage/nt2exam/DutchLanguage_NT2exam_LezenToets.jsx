import React, { useState,useEffect } from "react";
import { FaBookReader } from "react-icons/fa";



const formatTime = seconds => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};


const BASE_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/lezen/texts";

const ANSWER_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/lezen/wip";

const instructiefilmlezen =
  "https://www.staatsexamensnt2.nl/documenten/videos/2025/8/4/instructiefilm-lezen";

export default function DutchLanguage_NT2exam_LezenToets() {
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH TEXT ================= */

  const fetchRandomText = async () => {
    setLoading(true);
    setCollapsed(false);
    setData(null);
    setAnswers({});
    setSubmitted({});
    setSubmitting({});

    const randomId = Math.floor(Math.random() * 18) + 1;

    try {
      const res = await fetch(`${BASE_URL}/${randomId}`);
      if (!res.ok) throw new Error("Failed to fetch reading text");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("❌ Error fetching text:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ANSWERS ================= */

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const submitAnswer = async (questionId) => {
    const answer = answers[questionId];
    if (!answer) return;

    setSubmitting(prev => ({ ...prev, [questionId]: true }));

    try {
      const res = await fetch(
        `${ANSWER_URL}/${questionId}/answerTry`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            answerTry: answer
          })
        }
      );

      if (!res.ok) throw new Error("Submit failed");

      setSubmitted(prev => ({ ...prev, [questionId]: true }));
    } catch (err) {
      console.error(`❌ Failed submitting question ${questionId}`, err);
      alert("Antwoord opslaan mislukt");
    } finally {
      setSubmitting(prev => ({ ...prev, [questionId]: false }));
    }
  };

  /* ================= RENDER ================= */

  /* ================= TIMER ================= */

const [timeLeft, setTimeLeft] = useState(0); // seconds

useEffect(() => {
  if (!data) return;

  // start at 15 minutes when text loads
  setTimeLeft(15 * 60);

  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [data]);



  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        <h2 style={styles.title}>
          <FaBookReader
            style={{ color: "#FF4F00", fontSize: "24px", marginRight: "10px" }}
          />
          Nederlands Staatsexamen NT2 :: Lezen-II Toets
        </h2>

        {data && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={styles.collapseButton}
          >
            {collapsed ? "⬇️ Toon" : "⬆️ Verberg"}
          </button>
        )}
      </div>

      <p style={styles.info}>
        Tekst: 6 •{" "}       Tijdsduur: ±100 minuten •{" "}
        <a href={instructiefilmlezen} target="_blank" rel="noreferrer">
          Instructiefilm
        </a>
      </p>


      <button
        onClick={fetchRandomText}
        disabled={loading}
        style={{
          //  ...styles.button,
          height: "40.5px",
          border: "1px solid #777",
          borderRadius: "4px",
          padding: "8px 8px",
          fontSize: "16px",
          marginTop: "10px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ddd" : "#fff",
          borderColor: "#FF4F00"

        }}
      >
        {loading ? "Even geduld…" : "Nieuwe Leestekst"}
      </button>

      {!collapsed && data && (
        <>
          <div style={styles.meta}>
            <strong>Jaar:</strong> {data.year} •{" "}
            <strong>Vragen:</strong> {data.questionNumbers}
          </div>

          <p style={styles.topic}>{data.topic}</p>

          <div style={styles.textBox}>
            <h3 style={styles.heading}>{data.heading}</h3>
            {data.text.split("\n\n").map((para, idx) => (
              <p key={idx} style={styles.paragraph}>{para}</p>
            ))}
          </div>


{data && (
  <div style={styles.timer}>
    ⏱ {formatTime(timeLeft)}
  </div>
)}


          {/* QUESTIONS */}
          <div style={{ marginTop: "20px" }}>
            {data.questions.map(q => (
              <div key={q.id} style={styles.questionBox}>
                <div style={styles.questionTitle}>
                  Vraag {q.questionNumber}
                </div>

                <blockquote style={styles.questionText}>
                  {q.question}
                </blockquote>

                <div style={styles.answerRow}>

                  <select
                    value={answers[q.id] || ""}
                    onChange={e =>
                      handleAnswerChange(q.id, e.target.value)
                    }
                    style={styles.select}
                  >
                    <option value="">-- Kies je antwoord --</option>
                    <option value={`${q.optionA}`}>{q.optionA}</option>
                    <option value={`${q.optionB}`}>{q.optionB}</option>
                    <option value={`${q.optionC}`}>{q.optionC}</option>
                    <option value={`${q.optionD}`}>{q.optionD}</option>
                  </select>

                  <button
                    onClick={() => submitAnswer(q.id)}
                    disabled={
                      !answers[q.id] || submitting[q.id]
                    }
                    style={{
                      ...styles.submitButton,
                      color: submitted[q.id]
                        ? "#4CAF50"
                        : "#FF4F00",
                      borderColor: submitted[q.id]
                        ? "#4CAF50"
                        : "#FF4F00"
                    }}
                  >
                    {submitting[q.id]
                      ? "Opslaan…"
                      : submitted[q.id]
                        ? "✔ Opgeslagen"
                        : "Submit"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    border: "1px solid #FF4F00",
    borderRadius: "8px",
    padding: "16px",
    fontFamily: "Segoe UI",
    marginBottom: "16px"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: { margin: 0 },
  info: { fontSize: "12px" },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #777"
  },
  // collapseButton: {
  //   fontSize: "10px",
  //   cursor: "pointer"
  // },

    collapseButton: {
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "10px",
  },

  
  meta: { marginTop: "10px" },
  topic: { fontStyle: "italic" },
  textBox: {
    backgroundColor: "#f9f9f9",
    borderLeft: "12px solid #c0c0c0",
    padding: "16px",
    marginTop: "12px"
  },
  heading: { color: "#FF4F00" },
  paragraph: { lineHeight: 1.6 },
  questionBox: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "12px"
  },
  questionTitle: { fontWeight: "bold" },
  questionText: { fontSize: "16px" },
  answerRow: {
    display: "flex",
    gap: "10px",
    marginTop: "8px"
  },
  select: {
    flex: 1,
    height: "40px"
  },
  submitButton: {
    minWidth: "120px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  timer: {
  color: "red",
  fontWeight: "bold",
  fontSize: "20px",
  marginTop: "6px"
},

};
