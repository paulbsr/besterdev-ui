
import React, { useState } from "react";
import axios from "axios";
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

export default function DutchLanguage_Werkwoorden() {
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
            <td style={td}>Infinitive: <b>{data.presentJullie}</b></td>
          </tr>
          <tr>
            <td style={{...tdHeader, color: "#EA5C5F"}}>Future Tense</td>
            <td style={{ ...td, color: "#EA5C5F" }}>zal+Infinitive: <b>{data.futureIk}</b></td>
            <td style={{ ...td, color: "#EA5C5F" }}>zal/zult+Infinitive: <b>{data.futureJij}</b></td>
            <td style={{ ...td, color: "#EA5C5F" }}>zullen+Infinitive: <b>{data.futureZij}</b></td>
          </tr>
        </tbody>
      </table>

<div>
  <p style={{ margin: 0 }}>Stem vs. Infinitive Rules:</p>
  <p style={{ margin: 0, fontFamily: "Segoe UI", fontSize: "14px" }}>Rule#1: Use Stem in <i>Tegenwoordige Tijd - "Ik <b>loop</b> naar coffeeshop Green Place ."</i> (jij/hij/zij/het loopt)</p>
  <p style={{ margin: 0, fontFamily: "Segoe UI", fontSize: "14px" }}>Rule#3: Use Infinitive in <i style={{ margin: 0, fontFamily: "Segoe UI", fontSize: "14px", color: "#EA5C5F" }}>Toekomstige Tijd</i> - <i>Dan <u>zal</u> ik op Kloveniersburgwal <b>zitten</b>, vreselijk gerookt."</i>(Jij zult.. Hij/Zij/Het zal.. Wij/Jullie/Zij zullen..)</p>
  <p style={{ margin: 0, fontFamily: "Segoe UI", fontSize: "14px" }}>Rule#2: Use Infinitive after <i>Modals</i> (kunnen, willen, moeten, mogen, zullen, laten)  - <i>"Ik <u>wil</u> veel Starlato hybrid <b>roken</b> in deze coffeeshop."</i></p>
  <p style={{ margin: 0, fontFamily: "Segoe UI", fontSize: "14px" }}>Rule#4: Use Infinitive after <i>"..om te.."</i> - <i>Ik probeer <u>om te</u><b> praten</b>, maar mijn brein is nu kapot."</i></p>
</div>

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
