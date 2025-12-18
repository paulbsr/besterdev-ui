import React, { useState } from "react";
import axios from "axios";
import "../Fonts.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseInputStyle } from "../baseInputStyle";

export default function DutchLanguage_Nt2exam_LezenInputText(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [questionNumbers, setQuestionNumbers] = useState("");
  const [text, setText] = useState("");

  const toggleAccordion = () => setExpanded(!isExpanded);

  const resetForm = () => {
    setYear("");
    setTopic("");
    setHeading("");
    setQuestionNumbers("");
    setText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      year: Number(year),
      topic,
      heading,
      questionNumbers,
      text
    };

    try {
      const response = await axios.post(
        "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/lezen/texts",
        // "http://localhost:8000/api/v1/nt2exam/lezen/texts",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Lezen exam text saved successfully");
        setExpanded(false);
        resetForm();

        if (props?.setCheckForRecords) {
          props.setCheckForRecords(!props.checkForRecords);
        }
      } else {
        toast.error("Failed to save reading text");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving reading text");
    }
  };

  return (
    <div
      className="Font-Segoe-Large-Howto"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        marginTop: "16px"
      }}
    >
      <div onClick={toggleAccordion} style={{ cursor: "pointer" }}>
        <h2 style={{ fontSize: "22px", margin: 0 }}>
          Insert NT2 Lezen-II Exam Text
        </h2>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              style={{ ...baseInputStyle, width: "100px" }}
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />

            <input
              style={{ ...baseInputStyle, width: "610px" }}
              placeholder="Topic (in grey italic)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />

            <input
              style={{ ...baseInputStyle, width: "100px" }}
              placeholder="Question numbers (e.g. 1–10)"
              value={questionNumbers}
              onChange={(e) => setQuestionNumbers(e.target.value)}
              required
            />

            <input
              style={{ ...baseInputStyle, width: "850px" }}
              placeholder="Heading (in bold)"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />



            <textarea
              style={{
                ...baseInputStyle,
                width: "1000px",
                height: "550px",
                whiteSpace: "pre-wrap",
                resize: "vertical"
              }}
              placeholder="Reading text (full passage)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              type="submit"
              style={{
                height: "36px",
                border: "1px solid #777",
                borderRadius: "4px",
                backgroundColor: "#fff",
                cursor: "pointer"
              }}
            >
              Save Reading Text
            </button>
          </div>
        </form>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
