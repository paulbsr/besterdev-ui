import React, { useState } from "react";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";
const QUESTIONS_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/schrijven/questions/onerandom";

export default function DutchLanguage_Nt2exam_SchrijvenToets() {
  const [challenge, setChallenge] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [criteriaScores, setCriteriaScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false); // 👈 controls expand/collapse

  // -------------------------------
  // Safe JSON parser
  // -------------------------------
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

  // -------------------------------
  // Fetch a random writing challenge
  // -------------------------------
  const fetchChallenge = async () => {
    setLoading(true);
    setFeedback("");
    setCriteriaScores(null);
    setUserInput("");
    setChallenge(null);

    try {
      const res = await fetch(QUESTIONS_URL);
      const data = await res.json();

      if (data && typeof data === "object") {
        setChallenge(data);
        setExpanded(true); // 👈 auto-expand when question loads
      } else {
        setFeedback("⚠️ No valid challenge returned from server.");
      }
    } catch (e) {
      console.error("❌ Fetch challenge error:", e);
      setFeedback("❌ Error fetching challenge.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Submit answer for AI evaluation
  // -------------------------------
  const checkAnswer = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return setFeedback("⚠️ Please enter a response.");
    if (!challenge) return setFeedback("⚠️ Load a challenge first.");

    setLoading(true);
    setFeedback("Evaluating...");
    setCriteriaScores(null);

    try {
      const payload = {
        question: `
You are a Dutch NT2/B2 writing examiner and language teacher.

Evaluate this student's written response to the following exam question:
"${challenge.questionVerbiage}"

Student's response:
"${userInput}"

Return valid JSON only (no explanations outside JSON). 
Include an additional "suggested_correction" field that shows a corrected, natural, and grammatically accurate version of the student's text in Dutch.

Format your answer strictly like this:
{
  "criteria": {
    "Begrijpelijkheid": {"evaluation": 1-5, "comment": "feedback"},
    "Grammatica": {"evaluation": 1-5, "comment": "feedback"},
    "BegrijpelijkheidAlgemeen": {"evaluation": 1-5, "comment": "feedback"},
    "GrammaticaAlgemeen": {"evaluation": 1-5, "comment": "feedback"}
  },
  "suggested_correction": "..."
}
        `,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const aiResponse = data.answer || "";
      const parsed = safeJsonParse(aiResponse);

      if (parsed && parsed.criteria) {
        setCriteriaScores(parsed);
        setFeedback("✅ Evaluation complete.");
      } else {
        setFeedback("⚠️ Evaluation complete — but structured data missing.");
        setCriteriaScores({ rawResponse: aiResponse });
      }
    } catch (err) {
      console.error("❌ Evaluation error:", err);
      setFeedback("❌ Error evaluating your response.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Styles
  // -------------------------------
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
      // display: "flex",
      // alignItems: "center",
      justifyContent: "space-between",
      // marginBottom: "6px",
    },
    title: {
      fontWeight: "bold",
      fontSize: "22px",
      margin: 0,
    },
    button: {
      height: "40.5px",
      border: "1px solid #FF4F00",
      borderRadius: "4px",
      padding: "8px 8px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#FFFFFF",
      color: "#000000",
    },
    toggleButton: {
      background: "none",
      border: "none",
      color: "#FF4F00",
      fontSize: "15px",
      cursor: "pointer",
      marginLeft: "10px",
    },
    collapseButton: {
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      borderRadius: "4px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "10px",
      marginLeft: "600px"
    },
    challengeBox: {
      backgroundColor: "#f9f9f9",
      borderLeft: "12px solid #FF4F00",
      padding: "12px 16px",
      borderRadius: "6px",
      marginTop: "16px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    },
  };

  // -------------------------------
  // UI Rendering
  // -------------------------------
  return (
    // <div style={styles.container}>
    //   <h2>Nederlands Staatsexamen NT2 :: Schrijven-II Toets</h2>
    //   <p>Opdrachten: 10 • Maximumscore: 53 • Cesuur: 31 (60%) • Tijdsduur: ± 100 minuten</p>

    //   <button onClick={fetchChallenge} disabled={loading} style={styles.button}>
    //     {loading ? "Even geduld..." : "Nieuwe Schrijvingsvraag"}
    //   </button>

    //   {challenge && (
    //     <button
    //       onClick={() => setExpanded(!expanded)}
    //       style={styles.collapseButton}
    //     >
    //       {expanded ? "⬆️ Verberg" : "⬇️ Toon   SLEGTE EEN"}
    //     </button>
    //   )}

    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Nederlands Staatsexamen NT2 :: Schrijven-II Toets</h2>

        {challenge && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={styles.collapseButton}
          >
            {expanded ? "⬆️ Verberg" : "⬇️ Toon"}
          </button>
        )}
      </div>

      <div style={{ fontFamily: "Segoe UI, sans-serif", fontSize: "12px", lineHeight: 1, margin: 0, padding: 0 }}>
        <p style={{ margin: 0 }}>Opdrachten: 10 • Maximumscore: 53 • Cesuur: 31 (60%) • Tijdsduur: ± 100 minuten</p>
      </div>

      <button
        onClick={fetchChallenge}
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
        {loading ? "Even geduld..." : "Nieuwe Schrijvenvraag"}
      </button>
      {expanded && (
        <>
          {/* Challenge Display */}
          {challenge && (
            <div style={styles.challengeBox}>
              <div>
                <strong>Jaar:</strong> {challenge.examYear} •{" "}
                <strong>Vraagnummer:</strong> {challenge.questionNumber} •{" "}
                <strong>Onderwerp:</strong> {challenge.questionName} •{" "}
                <strong>Instructie:</strong> {challenge.questionInstruction}
              </div>

              <blockquote
                style={{
                  fontSize: "18px",
                  color: "#FF4F00",
                  fontStyle: "italic",
                  marginTop: "6px",
                  whiteSpace: "pre-line",
                }}
              >
                {challenge.questionVerbiage}
              </blockquote>

              <div style={{ marginTop: "10px", fontSize: "15px" }}>
                🧩 <strong>Begrijpelijkheid:</strong>{" "}
                {challenge.beoordelingBegrijpelijkheid}
                <br />
                ✍️ <strong>Grammatica:</strong> {challenge.beoordelingGrammatica}
              </div>
            </div>
          )}

          {/* Answer form */}
          <form onSubmit={checkAnswer} style={{ marginTop: "10px" }}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Typ je antwoord hier..."
              rows={5}
              style={{
                width: "98%",
                padding: "8px",
                resize: "vertical",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: "Segoe UI",
                fontSize: "14px",
                marginTop: "8px",
                padding: "8px 14px",
                cursor: loading ? "not-allowed" : "pointer",
                background: "#FF4F00",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              {loading ? "Bezig met evaluatie..." : "Indienen"}
            </button>
          </form>

          {feedback && (
            <div style={{ marginTop: "16px", fontStyle: "italic" }}>
              {feedback}
            </div>
          )}

          {/* Evaluation Results */}
          {criteriaScores?.criteria && (
            <div style={{ marginTop: "16px" }}>
              <h4>Beoordeling per criterium</h4>
              <table
                border="1"
                cellPadding="6"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ddd",
                }}
              >
                <thead style={{ background: "#efefef" }}>
                  <tr>
                    <th>Criterium</th>
                    <th>Score</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(criteriaScores.criteria).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val.evaluation ?? "—"}</td>
                      <td>{val.comment ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {criteriaScores?.suggested_correction && (
            <div
              style={{
                marginTop: "20px",
                background: "#f0f8ff",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <h4>💡 Suggested Correction</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {criteriaScores.suggested_correction}
              </p>
            </div>
          )}

          {criteriaScores?.rawResponse && (
            <pre
              style={{
                marginTop: "16px",
                whiteSpace: "pre-wrap",
                background: "#f7f7f7",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              {criteriaScores.rawResponse}
            </pre>
          )}
        </>
      )}
    </div>
  );
}
