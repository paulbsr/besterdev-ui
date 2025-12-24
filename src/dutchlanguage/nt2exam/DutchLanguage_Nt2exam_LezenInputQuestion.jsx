import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Fonts.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseInputStyle } from "../../baseInputStyle";
import { FcMultipleInputs } from "react-icons/fc";

export default function DutchLanguage_Nt2exam_LezenInputQuestion() {
    const [isExpanded, setExpanded] = useState(false);

    const [year, setYear] = useState("");
    const [questionNumber, setQuestionNumber] = useState("");
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [answerCorrect, setAnswerCorrect] = useState("");
    const [readingTexts, setReadingTexts] = useState([]);
    const [readingTextId, setReadingTextId] = useState("");

    useEffect(() => {
        axios
            .get("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/lezen/texts")
            .then(res => setReadingTexts(res.data))
            .catch(err => {
                console.error(err);
                toast.error("Failed to load reading texts");
            });
    }, []);

    const toggleAccordion = () => setExpanded(!isExpanded);

    const resetForm = () => {
        setYear("");
        setQuestionNumber("");
        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setAnswerCorrect("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!readingTextId) {
            toast.error("No reading text selected");
            return;
        }

        const payload = {
            year: Number(year),
            questionNumber: Number(questionNumber),
            question,
            optionA: `A - ${optionA}`,
            optionB: `B - ${optionB}`,
            optionC: `C - ${optionC}`,
            optionD: `D - ${optionD}`,
            answerCorrect
        };


        try {
            const response = await axios.post(
                `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/nt2exam/lezen/texts/${readingTextId}/questions`,
                // `http://localhost:8000/api/v1/nt2exam/lezen/texts/${readingTextId}/questions`,
                payload
            );

            if (response.status === 201 || response.status === 200) {
                toast.success(`Question ${questionNumber} saved`);
                resetForm();
            } else {
                toast.error("Failed to save question");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error saving question");
        }
    };

    return (
        <div
            className="Font-Segoe-Large-Howto"
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px"
            }}
        >
            <div onClick={toggleAccordion} style={{ cursor: "pointer" }}>
                <h2 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "16px", marginTop: "1px" }}>
                    <FcMultipleInputs
                        style={{
                            color: "#FF4F00",
                            fontSize: "25px",
                            cursor: "pointer",
                            marginRight: "8px",
                        }}
                    />
                    Insert NT2 Lezen-II Exam Questions
                </h2>


            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>

                        <select
                            style={{ ...baseInputStyle, width: "600px" }}
                            value={readingTextId}
                            onChange={(e) => setReadingTextId(e.target.value)}
                            required
                        >
                            <option value="">Select reading text…</option>

                            {readingTexts.map(text => (
                                <option key={text.id} value={text.id}>
                                    {text.year} — {text.heading} ({text.questionNumbers})
                                </option>
                            ))}
                        </select>


                        <select
                            style={{ ...baseInputStyle, width: "84px" }}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>

                        <input
                            style={{ ...baseInputStyle, width: "100px" }}
                            placeholder="Q #"
                            value={questionNumber}
                            onChange={(e) => setQuestionNumber(e.target.value)}
                            required
                        />

                        <input
                            style={{ ...baseInputStyle, width: "800px" }}
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />

                        <input
                            style={{ ...baseInputStyle, width: "800px" }}
                            placeholder="Option A"
                            value={optionA}
                            onChange={(e) => setOptionA(e.target.value)}
                            required
                        />

                        <input
                            style={{ ...baseInputStyle, width: "800px" }}
                            placeholder="Option B"
                            value={optionB}
                            onChange={(e) => setOptionB(e.target.value)}
                            required
                        />

                        <input
                            style={{ ...baseInputStyle, width: "800px" }}
                            placeholder="Option C"
                            value={optionC}
                            onChange={(e) => setOptionC(e.target.value)}
                            required
                        />

                        <input
                            style={{ ...baseInputStyle, width: "800px" }}
                            placeholder="Option D"
                            value={optionD}
                            onChange={(e) => setOptionD(e.target.value)}
                            required
                        />

                        <input
                            style={{ ...baseInputStyle, width: "120px" }}
                            placeholder="Correct (A/B/C/D)"
                            value={answerCorrect}
                            onChange={(e) => setAnswerCorrect(e.target.value.toUpperCase())}
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
                            Save Question
                        </button>
                    </div>
                </form>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
