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

export default function DutchLanguage_Tenses() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(EMPTY_TENSES);
  const [loading, setLoading] = useState(false);

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
      console.log("Sending to API:", payload);
      const res = await axios.post(API_URL, payload);
      console.log("RAW API response:", res.data);

      let parsed = { ...EMPTY_TENSES };

      if (res.data.answer) {
        // Extract JSON block from Markdown response
        const match = res.data.answer.match(/```json([\s\S]*?)```/);
        if (match && match[1]) {
          try {
            parsed = JSON.parse(match[1]);
          } catch (err) {
            console.error("Failed to parse JSON:", err);
          }
        } else {
          console.warn("No JSON block found, using empty template.");
        }
      }

      console.log("In jou <DutchLanguage_Tenses/> is Parsed table data:", parsed);
      setData(parsed);
    } catch (err) {
      console.error("In jou <DutchLanguage_Tenses/> API error:", err);
    }

    setLoading(false);
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
      <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px", }}>
        <AiOutlineNodeIndex style={{ color: "#FF4F00", fontSize: "35px", cursor: "pointer", marginRight: "10px", }}
        />Werkwoord  Conjugatie (Verbs)</h2>

      {/* Input for Dutch verb */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Enter Dutch verb...."
          style={{
            padding: "8px",
            width: "200px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* {loading && <p style={{ textAlign: "left" }}>Loading...</p>} */}

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      )}

      {/* Always render table */}
      <table className="IndexTable IndexTableHover"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Tense</th>
            <th style={th}><span style={{ fontSize: "1.25rem" }}>🧍‍♂️</span> Ik</th>
            <th style={th}><span style={{ fontSize: "1.25rem" }}>🫵👨👩</span> Jij / Hij / Zij / Het</th>
            {/* <th style={th}><span style={{ fontSize: "1.25rem" }}></span> Hij / Zij (3e)</th> */}
            <th style={th}><span style={{ fontSize: "1.25rem" }}>👫👥 👥</span> Wij / Jullie / Zij</th>
            {/* <th style={th}><span style={{ fontSize: "1.25rem" }}></span> Zij</th> */}
            {/* <th style={th}><span style={{ fontSize: "1.25rem" }}>👥👥</span> Jullie / Zij (3e)</th> */}

          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdHeader}>Past Tense</td>
            <td style={td}>{data.pastIk}</td>
            <td style={td}>{data.pastJij}</td>
            {/* <td style={td}>{data.pastHij}</td> */}
            <td style={td}>{data.pastWij}</td>
            {/* <td style={td}>{data.pastZij}</td> */}
            {/* <td style={td}>{data.pastJullie}</td> */}

          </tr>
          <tr>
            <td style={tdHeader}>Present Tense</td>
            <td style={td}>stamwoord:  <b>{data.presentIk}</b></td>
            <td style={td}>stamwoord+t:  <b>{data.presentJij}</b></td>
            {/* <td style={td}>{data.presentHij}</td> */}
            {/* <td style={td}>{data.presentWij}</td> */}
            {/* <td style={td}>{data.presentZij}</td> */}
            <td style={td}>stamwoord+en:  <b>{data.presentJullie}</b></td>

          </tr>
          <tr>
            <td style={tdHeader}>Future Tense</td>
            <td style={td}>{data.futureIk}</td>
            <td style={td}>{data.futureJij}</td>
            {/* <td style={td}>{data.futureHij}</td> */}
            {/* <td style={td}>{data.futureWij}</td> */}
            <td style={td}>{data.futureZij}</td>
            {/* <td style={td}>{data.futureJullie}</td> */}

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
  fontWeight: "bold",
  background: "#fafafa",
};

const td = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};
