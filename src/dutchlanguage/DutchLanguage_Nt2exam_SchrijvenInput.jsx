import React, { useState } from "react";
import axios from "axios";
import "../Fonts.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseInputStyle } from "../baseInputStyle";

export default function DutchLanguage_Nt2exam_SchrijvenInput(props) {
  const [isExpanded, setExpanded] = useState(false);
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
      marginTop: "1px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      fontFamily: "Segoe UI",
      fontSize: "16px",
      marginBottom: "10px",
    }}>
      <Tooltip id="insert" />
      <div onClick={toggleAccordion} style={{ cursor: "pointer" }}>
        <a>
          <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px" }}>Insert NT2 Schrijven-II Exam Question</h2>
        </a>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 8 }}>
          <form onSubmit={handleSubmit}>

            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                style={{ ...baseInputStyle, width: "100px", height: "28.5px", padding: "2px 8px" }}
                type="text"
                value={examYear}
                placeholder="Exam Year"
                onChange={(e) => setExamYear(e.target.value)}
                required
              />


              <input
                style={{ ...baseInputStyle, width: "100px", height: "28.5px", padding: "2px 8px" }}
                value={questionNumber}
                placeholder="Q Number"
                onChange={(e) => setQuestionNumber(Number(e.target.value))}
                required
              />

              <input
                style={{ ...baseInputStyle, width: "595px", height: "28.5px", padding: "2px 8px" }}
                type="text"
                value={questionName}
                placeholder="Question Name"
                onChange={(e) => setQuestionName(e.target.value)}
                required
              />

              <div>
                <input
                  style={{
                    ...baseInputStyle,
                    width: "850px",
                    height: "28.5px",
                    padding: "2px 8px",
                    marginTop: "10px"
                  }}
                  placeholder="Question Instruction"
                  value={questionInstruction}
                  onChange={(e) => setQuestionInstruction(e.target.value)}
                  required
                />
              </div>

              <div>
                <textarea
                  style={{ ...baseInputStyle, width: "850px", height: "100px", padding: "2px 8px", whiteSpace: "pre-wrap", resize: "vertical", marginTop: "10px" }}
                  value={questionVerbiage}
                  onChange={(e) => setQuestionVerbiage(e.target.value)}
                  placeholder="Question Verbiage"
                />
              </div>

            </div>

            <div style={{ height: 12 }} />

            <button
              className="Font-Segoe-Large-Howto"
              type="submit"
              style={{
                height: "35.5px",
                border: "1px solid #777777",
                borderRadius: "4px",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                cursor: "pointer",
                fontFamily: "Segoe UI",
                fontSize: "16px",
                padding: "2px 8px",
              }}
            >
              Save Exam Question
            </button>
          </form>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
