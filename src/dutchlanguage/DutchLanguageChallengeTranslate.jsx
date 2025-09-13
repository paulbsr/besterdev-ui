import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageChallengeTranslate({ subject = "daily life" }) {
  const [prompt, setPrompt] = useState("");
  const [correctDutch, setCorrectDutch] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchSentence = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Generate one grammatically complex Dutch sentence (max 15 words) about ${subject}, followed by its Afrikaans translation. Do not add introductions, just output the Dutch sentence on one line and the Afrikaans translation on the next.`
        }),
      });

      const data = await res.json();
      const output = data.answer || "";

      // Expecting two lines: Dutch and Afrikaans
      const lines = output.split("\n").map(l => l.trim()).filter(Boolean);

      if (lines.length >= 2) {
        setCorrectDutch(lines[0]);
        setPrompt(lines[1]); // Show Afrikaans as challenge
        setFeedback("");
        setUserInput("");
      } else {
        setFeedback("⚠️ API did not return both lines.");
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error fetching sentence");
    }
  };

  const checkAnswer = () => {
    if (!userInput.trim()) {
      setFeedback("⚠️ Please enter your translation.");
      return;
    }

    const normalizedUser = userInput.trim().toLowerCase();
    const normalizedCorrect = correctDutch.trim().toLowerCase();

    if (normalizedUser === normalizedCorrect) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Not quite. Correct answer: "${correctDutch}"`);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Dutch Translation Challenge</h2>

      <button
        onClick={fetchSentence}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        New Challenge
      </button>

      {prompt && (
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            Translate this Afrikaans sentence into Dutch:
          </p>
          <blockquote className="italic p-2 bg-gray-100 rounded">
            {prompt}
          </blockquote>
        </div>
      )}

      {prompt && (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your Dutch translation"
            // className="border p-2 w-full mb-2 rounded"
            style={{
            height: "25.5px",
            border: "0.75px solid #FF4F00",
            borderRadius: "4px",
            padding: 0,
            paddingLeft: "10px",
            width: "760px",
            fontFamily: "Segoe UI",
            fontSize: "16px",
          }}
          />
          <button
            onClick={checkAnswer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Check Answer
          </button>
        </div>
      )}

      {feedback && (
        <div className="mt-4 text-lg font-medium">{feedback}</div>
      )}
    </div>
  );
}
