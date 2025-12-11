// import React, { useState } from "react";
// import axios from "axios";
// import { PiBookOpenTextBold } from "react-icons/pi";
// import "./DutchLanguageHomePage.css";
// import { AiOutlineNodeIndex } from "react-icons/ai";

// const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

// // Empty template for table
// const EMPTY_TENSES = {
//   pastIk: "",
//   pastJij: "",
//   pastHij: "",
//   pastWij: "",
//   pastJullie: "",
//   pastZij: "",
//   presentIk: "",
//   presentJij: "",
//   presentHij: "",
//   presentWij: "",
//   presentJullie: "",
//   presentZij: "",
//   futureIk: "",
//   futureJij: "",
//   futureHij: "",
//   futureWij: "",
//   futureJullie: "",
//   futureZij: "",
// };

// export default function DutchLanguage_Verbs() {
//   const [word, setWord] = useState("");
//   const [data, setData] = useState(EMPTY_TENSES);
//   const [loading, setLoading] = useState(false);
//   const [checkWord, setCheckWord] = useState("");
//   const [checkResult, setCheckResult] = useState(null);
//   const [checking, setChecking] = useState(false);


//   const handleEnter = async (e) => {
//     if (e.key !== "Enter") return;
//     if (!word.trim()) return;

//     setLoading(true);

//     const payload = {
//       question: `Take the Dutch word "${word}" and give me an example (3-4 words) of all its uses and produce a JSON with the following keys:
// "presentIk","futureIk","pastIk",
// "presentJij","futureJij","pastJij",
// "presentHij","futureHij","pastHij",
// "presentWij","futureWij","pastWij",
// "presentJullie","futureJullie","pastJullie",
// "presentZij","futureZij","pastZij".`
//     };

//     try {
//       console.log("Sending to API:", payload);
//       const res = await axios.post(API_URL, payload);
//       console.log("RAW API response:", res.data);

//       let parsed = { ...EMPTY_TENSES };

//       if (res.data.answer) {
//         // Extract JSON block from Markdown response
//         const match = res.data.answer.match(/```json([\s\S]*?)```/);
//         if (match && match[1]) {
//           try {
//             parsed = JSON.parse(match[1]);
//           } catch (err) {
//             console.error("Failed to parse JSON:", err);
//           }
//         } else {
//           console.warn("No JSON block found, using empty template.");
//         }
//       }

//       console.log("In jou <DutchLanguage_Tenses/> is Parsed table data:", parsed);
//       setData(parsed);
//     } catch (err) {
//       console.error("In jou <DutchLanguage_Tenses/> API error:", err);
//     }

//     setLoading(false);

//     const handleCheck = async (e) => {
//   if (e.key !== "Enter") return;
//   if (!checkWord.trim()) return;

//   setChecking(true);

//   const payload = {
//     question: `For the Dutch word "${checkWord}", tell me whether it is a STEM or an INFINITIVE. 
// Return JSON with keys exactly: "stem" and "infinitive".`
//   };

//   try {
//     const res = await axios.post(API_URL, payload);

//     let parsed = null;
//     if (res.data.answer) {
//       const match = res.data.answer.match(/```json([\s\S]*?)```/);
//       if (match && match[1]) {
//         parsed = JSON.parse(match[1]);
//       }
//     }

//     setCheckResult(parsed);
//   } catch (err) {
//     console.error("Stem/Infinitive check error:", err);
//   }

//   setChecking(false);
// };

//   };







//   return (
//     <div
//       className="Font-Segoe-Large-Howto"
//       style={{
//         border: "1px solid #FF4F00",
//         borderRadius: "8px",
//         padding: "16px",
//         fontFamily: "Segoe UI",
//         fontSize: "16px",
//         marginBottom: "16px",
//         marginTop: "16px",
//       }}
//     >
//       <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px", }}>
//         <AiOutlineNodeIndex style={{ color: "#FF4F00", fontSize: "35px", cursor: "pointer", marginRight: "10px", }}
//         />Werkwoord  Conjugatie (Verbs)</h2>

//       {/* Input for Dutch verb */}
//       <div style={{ textAlign: "left", marginBottom: "10px" }}>
//         <input
//           value={word}
//           onChange={(e) => setWord(e.target.value)}
//           onKeyDown={handleEnter}
//           placeholder="Enter Stem, not Infinitive"
//           style={{
//             padding: "8px",
//             width: "200px",
//             border: "1px solid #ddd",
//             borderRadius: "6px",
//             fontSize: "16px",
//           }}
//         />

// {/* NEW: Stem/Infinitive Checker */}
// <div style={{ textAlign: "left", marginTop: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
//   <input
//     value={checkWord}
//     onChange={(e) => setCheckWord(e.target.value)}
//     onKeyDown={handleCheck}
//     placeholder="Check Stem/Infinitive"
//     style={{
//       padding: "8px",
//       width: "200px",
//       border: "1px solid #ddd",
//       borderRadius: "6px",
//       fontSize: "16px",
//     }}
//   />

//   {checking && <span>Checking...</span>}

//   {checkResult && (
//     <span>
//       <b>Stem:</b> {checkResult.stem || "-"} / <b>Infinitive:</b> {checkResult.infinitive || "-"}
//     </span>
//   )}
// </div>


//       </div>

//       {/* {loading && <p style={{ textAlign: "left" }}>Loading...</p>} */}

//       {loading && (
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
//           <div className="spinner"></div>
//           <span>Compiling...</span>
//         </div>
//       )}

//       {/* Always render table */}
//       <table className="IndexTable IndexTableHover"
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           fontSize: "14px",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={th}>Tense</th>
//             <th style={th}><span style={{ fontSize: "1.25rem" }}>🧍‍♂️</span> Ik</th>
//             <th style={th}><span style={{ fontSize: "1.25rem" }}>🫵 👨 👩 📦</span> Jij / Hij / Zij / Het</th>
//             {/* <th style={th}><span style={{ fontSize: "1.25rem" }}></span> Hij / Zij (3e)</th> */}
//             <th style={th}><span style={{ fontSize: "1.25rem" }}>👫👨‍👩‍👧 👨‍👩‍👧‍👦</span> Wij / Jullie / Zij</th>
//             {/* <th style={th}><span style={{ fontSize: "1.25rem" }}></span> Zij</th> */}
//             {/* <th style={th}><span style={{ fontSize: "1.25rem" }}>👥👥</span> Jullie / Zij (3e)</th> */}

//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td style={tdHeader}>Past Tense</td>
//             <td style={td}>stem: <b>{data.pastIk}</b></td>
//             <td style={td}>stem+t/e: <b>{data.pastJij}</b></td>
//             {/* <td style={td}>{data.pastHij}</td> */}
//             <td style={td}>stem+t/en: <b>{data.pastWij}</b></td>
//             {/* <td style={td}>{data.pastZij}</td> */}
//             {/* <td style={td}>{data.pastJullie}</td> */}

//           </tr>
//           <tr>
//             <td style={tdHeader}>Present Tense</td>
//             <td style={td}>stem:  <b>{data.presentIk}</b></td>
//             {/* <td style={td}>stamwoord+t:  <b>{data.presentJij}</b></td> */}
//             <td style={td}>stem+t:  <b>{data.presentHij}</b></td>
//             {/* <td style={td}>{data.presentWij}</td> */}
//             {/* <td style={td}>{data.presentZij}</td> */}
//             <td style={td}>infinite:  <b>{data.presentJullie}</b></td>

//           </tr>
//           <tr>
//             <td style={tdHeader}>Future Tense</td>
//             <td style={td}>zal+infinite: <b>{data.futureIk}</b></td>
//             <td style={td}>zal/zult+infinite: <b>{data.futureJij}</b></td>
//             {/* <td style={td}>{data.futureHij}</td> */}
//             {/* <td style={td}>{data.futureWij}</td> */}
//             <td style={td}>zullen+infinite: <b>{data.futureZij}</b></td>
//             {/* <td style={td}>{data.futureJullie}</td> */}

//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // Styles
// const th = {
//   border: "1px solid #ccc",
//   padding: "8px",
//   background: "#f7f7f7",
//   fontWeight: "bold",
// };

// const tdHeader = {
//   border: "1px solid #ccc",
//   padding: "8px",
//   fontWeight: "bold",
//   background: "#fafafa",
// };

// const td = {
//   border: "1px solid #ccc",
//   padding: "8px",
//   textAlign: "center",
// };

import React, { useState } from "react";
import axios from "axios";
import { PiBookOpenTextBold } from "react-icons/pi";
import "./DutchLanguageHomePage.css";
import { AiOutlineNodeIndex } from "react-icons/ai";

const API_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

// Empty template for table
const EMPTY_TENSES = {
  pastIk: "",
  pastJij: "",
  pastHij: "",
  pastWij: "",
  pastJullie: "",
  pastZij: "",
  presentIk: "",
  presentJij: "",
  presentHij: "",
  presentWij: "",
  presentJullie: "",
  presentZij: "",
  futureIk: "",
  futureJij: "",
  futureHij: "",
  futureWij: "",
  futureJullie: "",
  futureZij: "",
};

export default function DutchLanguage_Verbs() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(EMPTY_TENSES);
  const [loading, setLoading] = useState(false);

  const [checkWord, setCheckWord] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [checking, setChecking] = useState(false);

  // --- Existing verb conjugation ---
  const handleEnter = async (e) => {
    if (e.key !== "Enter") return;
    if (!word.trim()) return;

    setLoading(true);

    const payload = {
      question: `Take the Dutch word "${word}" and give me an example (3-4 words) of all its uses and produce a JSON with the following keys:
"presentIk","futureIk","pastIk",
"presentJij","futureJij","pastJij",
"presentHij","futureHij","pastHij",
"presentWij","futureWij","pastWij",
"presentJullie","futureJullie","pastJullie",
"presentZij","futureZij","pastZij".`
    };

    try {
      const res = await axios.post(API_URL, payload);

      let parsed = { ...EMPTY_TENSES };

      if (res.data.answer) {
        const match = res.data.answer.match(/```json([\s\S]*?)```/);
        if (match && match[1]) {
          try {
            parsed = JSON.parse(match[1]);
          } catch (err) {
            console.error("Failed to parse JSON:", err);
          }
        }
      }

      setData(parsed);
    } catch (err) {
      console.error("API error:", err);
    }

    setLoading(false);
  };

  // --- NEW: Stem/Infinitive checker ---
  const handleCheck = async (e) => {
    if (e.key !== "Enter") return;
    if (!checkWord.trim()) return;

    setChecking(true);

    const payload = {
      question: `For the Dutch word "${checkWord}", tell me whether it is a STEM or an INFINITIVE. Return JSON with keys exactly: "stem" and "infinitive".`
    };

    try {
      const res = await axios.post(API_URL, payload);

      let parsed = null;
      if (res.data.answer) {
        const match = res.data.answer.match(/```json([\s\S]*?)```/);
        if (match && match[1]) {
          parsed = JSON.parse(match[1]);
        }
      }

      setCheckResult(parsed);
    } catch (err) {
      console.error("Stem/Infinitive check error:", err);
    }

    setChecking(false);
  };

  return (
    <div
      className="Font-Segoe-Large-Howto"
      style={{
        border: "1px solid #FF4F00",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Segoe UI",
        fontSize: "16px",
        marginBottom: "16px",
        marginTop: "16px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          marginBottom: "16px",
          marginTop: "1px",
        }}
      >
        <AiOutlineNodeIndex
          style={{
            color: "#FF4F00",
            fontSize: "35px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        Werkwoord Conjugatie (Verbs)
      </h2>

      {/* Input for Dutch verb */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Enter Stem, not Infinitive"
          style={{
            padding: "8px",
            width: "200px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        {/* NEW: Stem/Infinitive Checker */}
        <div
          style={{
            textAlign: "left",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <input
            value={checkWord}
            onChange={(e) => setCheckWord(e.target.value)}
            onKeyDown={handleCheck}
            placeholder="Check Stem/Infinitive"
            style={{
              padding: "8px",
              width: "200px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          {checking && <span>Checking...</span>}

          {checkResult && (
            <span>
              <b>Stem:</b> {checkResult.stem || "-"} / <b>Infinitive:</b>{" "}
              {checkResult.infinitive || "-"}
            </span>
          )}
        </div>
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <div className="spinner"></div>
          <span>Compiling...</span>
        </div>
      )}

      {/* Always render table */}
      <table
        className="IndexTable IndexTableHover"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Tense</th>
            <th style={th}>
              <span style={{ fontSize: "1.25rem" }}>🧍‍♂️</span> Ik
            </th>
            <th style={th}>
              <span style={{ fontSize: "1.25rem" }}>🫵 👨 👩 📦</span> Jij / Hij / Zij / Het
            </th>
            <th style={th}>
              <span style={{ fontSize: "1.25rem" }}>👫👨‍👩‍👧 👨‍👩‍👧‍👦</span> Wij / Jullie / Zij
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{...tdHeader, color: "#0066FF"}}>Past Tense</td>
            {/* <td style={td, color: "#0066FF"}>stem: <b>{data.pastIk}</b></td> */}
            <td style={{ ...td, color: "#0066FF" }}>stem: <b>{data.pastIk}</b></td>
            <td style={{ ...td, color: "#0066FF" }}>stem+t/e: <b>{data.pastJij}</b></td>
            <td style={{ ...td, color: "#0066FF" }}>stem+t/en: <b>{data.pastWij}</b></td>
          </tr>
          <tr>
            <td style={tdHeader}>Present Tense</td>
            <td style={td}>stem: <b>{data.presentIk}</b></td>
            <td style={td}>stem+t: <b>{data.presentHij}</b></td>
            <td style={td}>infinite: <b>{data.presentJullie}</b></td>
          </tr>
          <tr>
            <td style={{...tdHeader, color: "#EA5C5F"}}>Future Tense</td>
            <td style={{ ...td, color: "#EA5C5F" }}>zal+infinite: <b>{data.futureIk}</b></td>
            <td style={{ ...td, color: "#EA5C5F" }}>zal/zult+infinite: <b>{data.futureJij}</b></td>
            <td style={{ ...td, color: "#EA5C5F" }}>zullen+infinite: <b>{data.futureZij}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Styles
const th = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f7f7f7",
  fontWeight: "bold",
};

const tdHeader = {
  border: "1px solid #ccc",
  padding: "8px",
  // fontWeight: "bold",
  background: "#fafafa",
};

const td = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};
