import React, { useState } from "react";
import axios from "axios";
import "../Fonts.css";
import spacer from "../graphix/besterdev_spacer_white.png";
import spacer2 from "../graphix/besterdev_spacer_white_half.png";
import { GiHummingbird } from "react-icons/gi";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseInputStyle } from "../baseInputStyle";

export default function DutchLanguageExamSchrijvenInput(props) {
  const [isExpanded, setExpanded] = useState(false);

  // json fields
  const [examYear, setExamYear] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questionInstruction, setQuestionInstruction] = useState("");
  const [questionVerbiage, setQuestionVerbiage] = useState("");
  const [studentResponse, setStudentResponse] = useState("");

  const [beoordelingBegrijpelijkheid, setBeoordelingBegrijpelijkheid] = useState("");
  const [beoordelingGrammatica, setBeoordelingGrammatica] = useState("");
  const [beoordelingSpelling, setBeoordelingSpelling] = useState("");
  const [beoordelingSamehang, setBeoordelingSamehang] = useState("");
  const [beoordelingWoordgebruik, setBeoordelingWoordgebruik] = useState("");
  const [beoordelingOpbouw, setBeoordelingOpbouw] = useState("");
  const [beoordelingTekstverzorging, setBeoordelingTekstverzorging] = useState("");

  const [puntBegrijpelijkheid, setPuntBegrijpelijkheid] = useState(0);
  const [puntGrammatica, setPuntGrammatica] = useState(0);
  const [puntSpelling, setPuntSpelling] = useState(0);
  const [puntSamehang, setPuntSamehang] = useState(0);
  const [puntWoordgebruik, setPuntWoordgebruik] = useState(0);
  const [puntOpbouw, setPuntOpbouw] = useState(0);
  const [puntTekstverzorging, setPuntTekstverzorging] = useState(0);

  const toggleAccordion = () => setExpanded(!isExpanded);

  const resetForm = () => {
    setExamYear("");
    setQuestionNumber("");
    setQuestionName("");
    setQuestionInstruction("");
    setQuestionVerbiage("");
    setStudentResponse("");
    setBeoordelingBegrijpelijkheid("");
    setBeoordelingGrammatica("");
    setBeoordelingSpelling("");
    setBeoordelingSamehang("");
    setBeoordelingWoordgebruik("");
    setBeoordelingOpbouw("");
    setBeoordelingTekstverzorging("");
    setPuntBegrijpelijkheid(0);
    setPuntGrammatica(0);
    setPuntSpelling(0);
    setPuntSamehang(0);
    setPuntWoordgebruik(0);
    setPuntOpbouw(0);
    setPuntTekstverzorging(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRecord = {
      examYear,
      questionNumber,
      questionName,
      questionInstruction,
      questionVerbiage,
      studentResponse,
      beoordelingBegrijpelijkheid,
      beoordelingGrammatica,
      beoordelingSpelling,
      beoordelingSamehang,
      beoordelingWoordgebruik,
      beoordelingOpbouw,
      beoordelingTekstverzorging,
      puntBegrijpelijkheid,
      puntGrammatica,
      puntSpelling,
      puntSamehang,
      puntWoordgebruik,
      puntOpbouw,
      puntTekstverzorging,
    };





    try {
      const response = await axios.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/schrijven/post",
        newRecord
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`NT2 Schrijfen Exam Question ${questionNumber} saved successfully.`);
        // optional: collapse after save
        setExpanded(false);
        // optional: notify parent to refresh list
        if (props?.setCheckForRecords) props.setCheckForRecords(!props.checkForRecords);
        resetForm();
      } else {
        toast.error("Failed to save exam question.");
      }
    } catch (err) {
      toast.error("Error submitting exam question!");
      console.error(err);
    }
  };

  return (
    <div className="Font-Segoe-Large-Howto" style={{
      marginTop: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      fontFamily: "Segoe UI",
      fontSize: "16px",
      marginBottom: "10px",
    }}>
      <Tooltip id="insert" />
      <div onClick={toggleAccordion} style={{ cursor: "pointer" }}>
        <a data-tooltip-id="insert" data-tooltip-content="Add Exam Question">
          <GiHummingbird style={{ color: "#336791", fontSize: "25px" }} />
          <b style={{ marginLeft: 8 }}>Add NT2 Schrijven Exam Question</b>
        </a>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 8 }}>
          <form onSubmit={handleSubmit}>

            <div className="Font-Segoe-Large-Howto" style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>

              Exam Year:&nbsp;
              <input
                style={{ ...baseInputStyle, width: "600px", height: "28.5px" }}
                type="number"
                value={examYear}
                onChange={(e) => setExamYear(Number(e.target.value))}
                required
              />



              {/* Question Number:&nbsp;
              <input
                style={{ ...baseInputStyle, width: "600px", height: "28.5px" }}
                type="number"
                value={questionNumber}
                onChange={(e) => setQuestionNumber(Number(e.target.value))}
                required
              /> */}



              {/* Question Name:&nbsp;
              <input
                style={{ ...baseInputStyle, width: "600px", height: "28.5px" }}
                type="text"
                value={questionName}
                onChange={(e) => setQuestionName(e.target.value)}
                required
              /> */}

              Question Number:&nbsp;
              <select
                style={{ ...baseInputStyle, width: "600px", height: "28.5px" }}
                value={questionNumber}
                onChange={(e) => setQuestionNumber(Number(e.target.value))}
                required
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              Question Instruction:&nbsp;
              <textarea
                style={{
                  ...baseInputStyle,
                  width: "600px",
                  height: "60px",
                  padding: "6px 8px",     // 👈 adds space inside
                  whiteSpace: "pre-wrap",
                  resize: "vertical"
                }}
                value={questionInstruction}
                onChange={(e) => setQuestionInstruction(e.target.value)}
                required
              />

              Verbiage:&nbsp;
              <textarea
                style={{ ...baseInputStyle, width: "600px", height: "60px", padding: "6px 8px", whiteSpace: "pre-wrap", resize: "vertical" }}
                value={questionVerbiage}
                onChange={(e) => setQuestionVerbiage(e.target.value)}
              />

              {/* Student Response:&nbsp;
              <textarea
                style={{ ...baseInputStyle, width: "600px", height: "60px" }}
                value={studentResponse}
                onChange={(e) => setStudentResponse(e.target.value)}
              /> */}
            </div>

            {/* <div>
              <h4>Beoordeling</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Begrijpelijkheid"
                  value={beoordelingBegrijpelijkheid}
                  onChange={(e) => setBeoordelingBegrijpelijkheid(e.target.value)}
                />
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Grammatica"
                  value={beoordelingGrammatica}
                  onChange={(e) => setBeoordelingGrammatica(e.target.value)}
                />
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Spelling"
                  value={beoordelingSpelling}
                  onChange={(e) => setBeoordelingSpelling(e.target.value)}
                />
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Samenhang"
                  value={beoordelingSamehang}
                  onChange={(e) => setBeoordelingSamehang(e.target.value)}
                />
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Woordgebruik"
                  value={beoordelingWoordgebruik}
                  onChange={(e) => setBeoordelingWoordgebruik(e.target.value)}
                />
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Opbouw"
                  value={beoordelingOpbouw}
                  onChange={(e) => setBeoordelingOpbouw(e.target.value)}
                />
                <input
                  style={{ ...baseInputStyle, width: "200px" }}
                  placeholder="Tekstverzorging"
                  value={beoordelingTekstverzorging}
                  onChange={(e) => setBeoordelingTekstverzorging(e.target.value)}
                />
              </div>
            </div> */}

            <div style={{ height: 8 }} />

            {/* <div>
              <h4>Punten</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntBegrijpelijkheid}
                  onChange={(e) => setPuntBegrijpelijkheid(Number(e.target.value))}
                />
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntGrammatica}
                  onChange={(e) => setPuntGrammatica(Number(e.target.value))}
                />
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntSpelling}
                  onChange={(e) => setPuntSpelling(Number(e.target.value))}
                />
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntSamehang}
                  onChange={(e) => setPuntSamehang(Number(e.target.value))}
                />
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntWoordgebruik}
                  onChange={(e) => setPuntWoordgebruik(Number(e.target.value))}
                />
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntOpbouw}
                  onChange={(e) => setPuntOpbouw(Number(e.target.value))}
                />
                <input
                  style={{ ...baseInputStyle, width: "60px" }}
                  type="number"
                  value={puntTekstverzorging}
                  onChange={(e) => setPuntTekstverzorging(Number(e.target.value))}
                />
              </div>
            </div> */}

            <div style={{ height: 12 }} />

            <button
              className="Font-Segoe-Large-Howto"
              type="submit"
              style={{
                marginLeft: "10px",
                height: "34px",
                border: "1px solid #D5441C",
                borderRadius: "5px",
                backgroundColor: "#D5441C",
                color: "#FFFFFF",
                cursor: "pointer",
                padding: "0 12px",
              }}
            >
              Save Exam Question
            </button>
          </form>
        </div>
      )}

      {/* Toast container for toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
