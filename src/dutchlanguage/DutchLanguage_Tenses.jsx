import React, { useState } from "react";
import axios from "axios";
import { PiBookOpenTextBold } from "react-icons/pi";
import { PiSwapBold } from "react-icons/pi";
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
        <AiOutlineNodeIndex
          style={{
            color: "#FF4F00",
            fontSize: "35px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />Conjugatie</h2>

      {/* Input for Dutch verb */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Enter Dutch verb..."
          style={{
            padding: "8px",
            width: "260px",
            border: "1px solid #777",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
      </div>

      {loading && <p style={{ textAlign: "left" }}>Loading...</p>}

      {/* Always render table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Tense</th>
            <th style={th}> 🧍‍♂️ Ik</th>
            <th style={th}> 🫵 Jij</th>
            <th style={th}> 👫 Wij</th>
            <th style={th}> 👥 Jullie</th>
            <th style={th}> 👨 Hij</th>
            <th style={th}> 👩 Zij</th>
          </tr>
        </thead>


        <tbody>
          <tr>
            <td style={tdHeader}>Past Tense</td>
            <td style={td}>{data.pastIk}</td>
            <td style={td}>{data.pastJij}</td>
            <td style={td}>{data.pastWij}</td>
            <td style={td}>{data.pastJullie}</td>
            <td style={td}>{data.pastHij}</td>
            <td style={td}>{data.pastZij}</td>
          </tr>
          <tr>
            <td style={tdHeader}>Present Tense</td>
            <td style={td}>{data.presentIk}</td>
            <td style={td}>{data.presentJij}</td>
            <td style={td}>{data.presentWij}</td>
            <td style={td}>{data.presentJullie}</td>
            <td style={td}>{data.presentHij}</td>
            <td style={td}>{data.presentZij}</td>
          </tr>
          <tr>
            <td style={tdHeader}>Future Tense</td>
            <td style={td}>{data.futureIk}</td>
            <td style={td}>{data.futureJij}</td>
            <td style={td}>{data.futureWij}</td>
            <td style={td}>{data.futureJullie}</td>
            <td style={td}>{data.futureHij}</td>
            <td style={td}>{data.futureZij}</td>
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
