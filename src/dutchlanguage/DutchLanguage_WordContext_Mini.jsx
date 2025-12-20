// import React, { useState } from "react";
// import { RiFileWord2Line } from "react-icons/ri";

// const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

// export default function DutchLanguage_WordContext() {
//     const [word, setWord] = useState("");
//     const [explanation, setExplanation] = useState("");
//     const [loading, setLoading] = useState(false);

//     const fetchExplanation = async () => {
//         if (!word.trim()) {
//             setExplanation("⚠️ Please type a word first.");
//             return;
//         }

//         setLoading(true);
//         setExplanation("");

//         try {
//             const res = await fetch(API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     question: `Explain in English when the Dutch word "${word}" is used, and provide a short example sentence in Dutch with its English translation.`,
//                 }),
//             });

//             const data = await res.json();
//             let output = data.answer?.trim() || "";

//             // Clean up Optional[...] wrapping if present
//             output = output.replace(/^Optional\[/i, "").replace(/\]$/, "").trim();

//             setExplanation(output);
//         } catch (err) {
//             console.error(err);
//             setExplanation("❌ Error fetching explanation.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             fetchExplanation();
//         }
//     };

//     const handleClear = () => {
//         setWord("");
//         setExplanation("");
//     };

//     return (
//         <div>

//             <input
//                 type="text"
//                 value={word}
//                 onChange={(e) => setWord(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Uitleg wanneer je dit woord gebruikt"
//                 style={{
//                     // marginTop: "16px",
//                     padding: "8px",
//                     width: "690px",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     fontSize: "12px",
//                     height: "16.5px",
//                 }}
//             />

//             <button
//                 type="button"
//                 onClick={fetchExplanation}
//                 disabled={loading}
//                 style={{
//                     height: "33.5px",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     fontSize: "12px",
//                     cursor: "pointer",
//                     backgroundColor: "#FFFFFF",
//                     color: "#000000",
//                     marginLeft: "12px",
//                     color: "#a0a0a0",
//                 }}
//             >
//                 {loading ? (
//                     <div
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             gap: "6px",
//                         }}
//                     >
//                         <div
//                             style={{
//                                 width: "14px",
//                                 height: "14px",
//                                 border: "2px solid #ccc",
//                                 borderTop: "2px solid #FF4F00",
//                                 borderRadius: "50%",
//                                 animation: "spin 1s linear infinite",
//                             }}
//                         ></div>
//                         Aan het nadenken...
//                     </div>
//                 ) : (
//                     "Bepalen"
//                 )}
//             </button>

//             <button
//                 type="button"
//                 onClick={handleClear}
//                 style={{
//                     height: "33.5px",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     fontSize: "12px",
//                     cursor: "pointer",
//                     backgroundColor: "#FFFFFF",
//                     color: "#000000",
//                     marginLeft: "12px",
//                     color: "#a0a0a0",
//                 }}
//             >
//                 Clear
//             </button>

//             {explanation && (
//                 <div
//                     style={{
//                         marginTop: "12px",
//                         fontFamily: "Segoe UI",
//                         fontSize: "12px",
//                         fontStyle: "italic",
//                         color: "#000000",
//                         marginBottom: "8px",
//                         whiteSpace: "pre-wrap",
//                     }}
//                 >
//                     {explanation}
//                 </div>
//             )}

//             <style>
//                 {`
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//         `}
//             </style>
//         </div>
//     );
// }


import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

/* ---------------- Styles ---------------- */

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    width: "300px",
    height: "27px",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  button: {
    height: "27px",
    padding: "0 10px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: "#a0a0a0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },
  buttonDisabled: {
    cursor: "default",
    opacity: 0.8,
  },
  spinner: {
    width: "12px",
    height: "12px",
    border: "2px solid #ccc",
    borderTop: "2px solid #FF4F00",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  result: {
    marginTop: "12px",
    fontFamily: "Segoe UI",
    fontSize: "12px",
    fontStyle: "italic",
    whiteSpace: "pre-wrap",
    color: "#000",
  },
};

/* ---------------- Component ---------------- */

export default function DutchLanguage_WordContext_Mini() {
  const [word, setWord] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------- Logic -------- */

  const fetchContext = async () => {
    if (!word.trim()) {
      setExplanation("⚠️ Please type a word first.");
      return;
    }

    try {
      setLoading(true);
      setExplanation("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Explain in English when the Dutch word "${word}" is used, and provide a short example sentence in Dutch with its English translation.`,
        }),
      });

      const data = await res.json();
      const cleaned =
        data.answer
          ?.replace(/^Optional\[/i, "")
          .replace(/\]$/, "")
          .trim() || "";

      setExplanation(cleaned);
    } catch (err) {
      console.error(err);
      setExplanation("❌ Error fetching explanation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) fetchContext();
  };

  const handleClear = () => {
    if (loading) return;
    setWord("");
    setExplanation("");
  };

  /* -------- Render -------- */

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Bepalen wanneer gebruik je dit woord"
          style={styles.input}
        />

        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? (
            <>
              <span style={styles.spinner} />
              Bezig…
            </>
          ) : (
            "Clear"
          )}
        </button>
      </form>

      {!loading && explanation && (
        <div style={styles.result}>{explanation}</div>
      )}

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
