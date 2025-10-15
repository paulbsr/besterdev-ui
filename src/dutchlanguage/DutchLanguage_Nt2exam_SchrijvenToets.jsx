import React, { useState } from "react";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";
const QUESTIONS_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/schrijven/questions";

export default function DutchLanguage_Nt2exam_SchrijvenToets({
  subject = "workplace communication",
}) {
  const [challenge, setChallenge] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [criteriaScores, setCriteriaScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  // --------------------------
  // Fetch a new challenge
  // --------------------------
  const fetchChallenge = async () => {
    setLoading(true);
    setFeedback("");
    setCriteriaScores(null);
    setUserInput("");

    try {
      const res = await fetch(QUESTIONS_URL);
      if (!res.ok) throw new Error("Failed to fetch questions");

      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.questions)
        ? data.questions
        : [];

      if (list.length === 0) throw new Error("No questions available");

      const randomQuestion = list[Math.floor(Math.random() * list.length)];
      setChallenge(randomQuestion);
      setCollapsed(false); // Expand when new challenge loads
    } catch (err) {
      console.error("❌ Error fetching challenge:", err);
      setFeedback("❌ Error fetching challenge.");
      setChallenge(null);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Robust JSON parser
  // --------------------------
  const safeJsonParse = (text) => {
    if (!text) return null;

    const cleaned = text
      .replace(/^Optional\[/, "")
      .replace(/\]$/, "")
      .replace(/```json|```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch {
          return null;
        }
      }
      return null;
    }
  };

  // --------------------------
  // Evaluate user's response
  // --------------------------
  const checkAnswer = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return setFeedback("⚠️ Please enter your response.");
    if (!challenge) return setFeedback("⚠️ Please load a challenge first.");

    setLoading(true);
    setFeedback("Evaluating...");
    setCriteriaScores(null);

    try {
      const payload = {
        question: `
You are a Dutch NT2/B2 writing examiner. 
Here is the exam question: "${challenge.questionVerbiage}"
The student's response: "${userInput}"

Evaluate the response against these four criteria and return a JSON object with your evaluations per criterion:

1. ${challenge.beoordelingBegrijpelijkheid}
2. ${challenge.beoordelingGrammatica}
3. ${challenge.beoordelingBegrijpelijkheidAlgemeen}
4. ${challenge.beoordelingGrammaticaAlgemeen}
`,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error from AI API");

      const data = await res.json();
      const aiResponse = data.answer || "";
      const parsed = safeJsonParse(aiResponse);

      if (parsed && typeof parsed === "object") {
        setCriteriaScores(parsed);
        setFeedback("✅ Evaluation complete.");
      } else {
        console.warn("⚠️ Could not parse AI response:", aiResponse);
        setFeedback("⚠️ AI response could not be parsed.");
        setCriteriaScores({ "Raw AI Response": aiResponse });
      }
    } catch (err) {
      console.error("❌ Error evaluating:", err);
      setFeedback("❌ Error evaluating your response.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Collapse toggle
  // --------------------------
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // --------------------------
  // Small helper component
  // --------------------------
  const LabelRow = ({ label, value }) => (
    <div>
      <strong>{label}:</strong> {value || "N/A"}
    </div>
  );

  // --------------------------
  // UI
  // --------------------------
  return (
    <div className="exam-container" style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={{ fontWeight: "bold", fontSize: "22px", margin: "1px 0 16px 0" }}>
          Nederlands Staatsexamen NT2 :: Schrijven-II Toets
        </h2>

        {challenge && (
          <button onClick={toggleCollapse} style={styles.collapseButton}>
            {collapsed ? "⬇️ Toon" : "⬆️ Verberg"}
          </button>
        )}
      </div>

      <p>
        Totaal aantal opdrachten: 10 • Maximumscore: 53 punten • Cesuur: 31 punten (60%)
      </p>

      <button
        onClick={fetchChallenge}
        disabled={loading}
        style={{
          ...styles.button,
          backgroundColor: loading ? "#ddd" : "#fff",
          borderColor: "#FF4F00",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "8px",
        }}
      >
        {loading ? "Even geduld..." : "Nieuwe Uitdaging"}
      </button>

      {!collapsed && challenge && (
        <>
          <div style={styles.challengeBox}>
            Exam Year: {challenge.examYear} | Question Number: {challenge.questionNumber}
            <div style={styles.questionName}>
              {challenge.questionName || "Untitled Question"}
            </div>
            <em>{challenge.questionInstruction}</em>

            <blockquote style={styles.questionQuote}>
              {challenge.questionVerbiage}
            </blockquote>

            <div style={styles.criterium}>
              <div>
                🧩 <strong>Begrijpelijkheid:</strong>{" "}
                {challenge.beoordelingBegrijpelijkheid}
              </div>
              <div>
                ✍️ <strong>Grammatica:</strong>{" "}
                {challenge.beoordelingGrammatica}
              </div>
            </div>
          </div>

          <form onSubmit={checkAnswer} style={styles.form}>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Typ je antwoord hier..."
              style={{ ...styles.input, marginRight: "5px" }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                marginLeft: "5px",
                backgroundColor: "#ffffff",
                borderColor: "#FF4F00",
                cursor: "pointer",
              }}
            >
              {loading ? "Bezig met evaluatie..." : "Indienen"}
            </button>
          </form>

          {feedback && (
            <div style={{ marginTop: "16px" }}>
              <em>{feedback}</em>
            </div>
          )}

          {criteriaScores?.criteria && (
            <div style={styles.tableContainer}>
              <h4>Beoordeling per criterium</h4>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Criterium</th>
                    <th style={styles.th}>Score</th>
                    <th style={styles.th}>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(criteriaScores.criteria).map(([key, val]) => (
                    <tr key={key}>
                      <td style={styles.td}>{key}</td>
                      <td style={styles.td}>{val.evaluation || "—"}</td>
                      <td style={styles.td}>{val.comment || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
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
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  collapseButton: {
    border: "1px solid #FF4F00",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  button: {
    height: "40.5px",
    border: "1px solid #777",
    borderRadius: "4px",
    padding: "8px 8px",
    fontSize: "16px",
  },
  challengeBox: {
    backgroundColor: "#f9f9f9",
    borderLeft: "12px solid #FF4F00",
    padding: "12px 16px",
    borderRadius: "6px",
    marginTop: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  questionName: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "6px 0",
  },
  questionQuote: {
    fontSize: "18px",
    color: "#FF4F00",
    fontStyle: "italic",
    marginTop: "6px",
    whiteSpace: "pre-line",
  },
  criterium: {
    marginTop: "8px",
    fontSize: "15px",
  },
  form: {
    marginTop: "16px",
  },
  input: {
    height: "35.5px",
    border: "1px solid #777",
    borderRadius: "4px",
    paddingLeft: "10px",
    width: "850px",
    fontSize: "16px",
  },
  tableContainer: {
    marginTop: "16px",
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  th: {
    borderBottom: "1px solid #ddd",
    padding: "6px",
    textAlign: "left",
  },
  td: {
    padding: "6px",
    borderBottom: "1px solid #f1f1f1",
  },
};
