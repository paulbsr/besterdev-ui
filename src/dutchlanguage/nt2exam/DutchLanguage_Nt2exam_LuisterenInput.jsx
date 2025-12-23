import React, { useState } from "react";
import axios from "axios";
import "../../Fonts.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseInputStyle } from "../../baseInputStyle";

export default function DutchLanguage_Nt2exam_LuisterenInput(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [year, setYear] = useState("");
    const [trackNumber, setTrackNumber] = useState("");
    const [opgave, setOpgave] = useState("");
    const [number, setNumber] = useState("");
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [answerTry, setAnswerTry] = useState("");
    const [answerCorrect, setAnswerCorrect] = useState("");
    const [trackURL, setTrackURL] = useState("");
    const [trackType, setTrackType] = useState("");

    const toggleAccordion = () => setExpanded(!isExpanded);

    const resetForm = () => {
        setYear("");
        setTrackNumber("");
        setOpgave("");
        setNumber("");
        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setAnswerTry("");
        setAnswerCorrect("");
        setTrackURL("");
        setTrackType("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newRecord = {
            year: Number(year),
            trackNumber: Number(trackNumber),
            opgave: Number(opgave),
            number: Number(number),
            question,
            optionA,
            optionB,
            optionC,
            answerTry,
            answerCorrect,
            trackURL,
            trackType,
        };

        try {
            const response = await axios.post(
                "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/luisteren",
                newRecord
            );

            if (response.status === 200 || response.status === 201) {
                toast.success(`NT2 Luisteren question ${number} saved successfully.`);
                setExpanded(false);
                if (props?.setCheckForRecords) props.setCheckForRecords(!props.checkForRecords);
                resetForm();
            } else {
                toast.error("Failed to save Luisteren exam question.");
            }
        } catch (err) {
            toast.error("Error submitting Luisteren question!");
            console.error(err);
        }
    };

    return (
        <div className="Font-Segoe-Large-Howto"
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                fontFamily: "Segoe UI",
                fontSize: "16px",
                // marginBottom: "46px",
            }}
        >
            <Tooltip id="insert" />
            <div onClick={toggleAccordion} style={{ cursor: "pointer" }}>
                <a>
                    <h2
                        style={{
                            fontWeight: "bold",
                            fontSize: "22px",
                            marginBottom: "16px",
                            marginTop: "1px",
                        }}
                    >
                        Insert NT2 Luisteren-II Exam Question
                    </h2>
                </a>
            </div>

            {isExpanded && (
                <div style={{ marginTop: 8 }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <select
                                style={{ ...baseInputStyle, width: "100px", height: "35.5px", padding: "2px 8px" }}
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            >
                                <option value="">Year</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </select>

                            Track:
                            <input
                                style={{ ...baseInputStyle, width: "100px", height: "28.5px", padding: "2px 8px" }}
                                type="number"
                                value={trackNumber}
                                placeholder="Track #"
                                onChange={(e) => setTrackNumber(e.target.value)}
                                required
                            />
                            Opgave:
                            <input
                                style={{ ...baseInputStyle, width: "100px", height: "28.5px", padding: "2px 8px" }}
                                type="number"
                                value={opgave}
                                placeholder="Opgave #"
                                onChange={(e) => setOpgave(e.target.value)}
                                required
                            />

                            Topic:
                            <input
                                style={{ ...baseInputStyle, width: "320px", height: "28.5px", padding: "2px 8px" }}
                                value={trackType}
                                placeholder="Topic"
                                onChange={(e) => setTrackType(e.target.value)}
                                required
                            />

                            <input
                                style={{ ...baseInputStyle, width: "850px", height: "28.5px", padding: "2px 8px" }}
                                value={trackURL}
                                placeholder="Audio URL"
                                onChange={(e) => setTrackURL(e.target.value)}
                                required
                            />


                            <div>
                                <input
                                    style={{
                                        ...baseInputStyle,
                                        width: "850px",
                                        height: "28.5px",
                                        padding: "2px 8px",
                                        resize: "vertical",
                                        marginTop: "5px",
                                    }}
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Question"
                                // required
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "5px" }}>
                                <input
                                    style={{ ...baseInputStyle, width: "600px", height: "28.5px", padding: "2px 8px" }}
                                    value={optionA}
                                    placeholder="Option A"
                                    onChange={(e) => setOptionA(e.target.value)}
                                    required
                                />
                                <input
                                    style={{ ...baseInputStyle, width: "600px", height: "28.5px", padding: "2px 8px" }}
                                    value={optionB}
                                    placeholder="Option B"
                                    onChange={(e) => setOptionB(e.target.value)}
                                    required
                                />
                                <input
                                    style={{ ...baseInputStyle, width: "600px", height: "28.5px", padding: "2px 8px" }}
                                    value={optionC}
                                    placeholder="Option C"
                                    onChange={(e) => setOptionC(e.target.value)}
                                    required
                                />

                                <div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
                                    <select
                                        style={{ ...baseInputStyle, width: "80px", height: "35.5px", padding: "2px 8px" }}
                                        value={
                                            answerCorrect.startsWith("A")
                                                ? "A"
                                                : answerCorrect.startsWith("B")
                                                    ? "B"
                                                    : answerCorrect.startsWith("C")
                                                        ? "C"
                                                        : ""
                                        }
                                        onChange={(e) => {
                                            const selected = e.target.value;
                                            let value = "";
                                            if (selected === "A") value = `A - ${optionA}`;
                                            else if (selected === "B") value = `B - ${optionB}`;
                                            else if (selected === "C") value = `C - ${optionC}`;
                                            setAnswerCorrect(value);
                                        }}
                                        required
                                    >
                                        <option value="">Correct</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>

                                    <input
                                        style={{
                                            ...baseInputStyle,
                                            width: "511px",
                                            height: "28.5px",
                                            padding: "2px 8px",
                                            backgroundColor: "#f7f7f7",
                                            color: "#333",
                                        }}
                                        value={answerCorrect}
                                        readOnly
                                        placeholder="Correct Answer auto-filled"
                                    />
                                </div>
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
                            Save Luisteren Question
                        </button>
                    </form>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
