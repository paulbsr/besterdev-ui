import React, { useState } from "react";

const API_URL =
  "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/ask";

export default function DutchLanguageChallengeCompletion({ subject = "workplace communication" }) {
  const [challenge, setChallenge] = useState("");
  const [suggestedCompletion, setSuggestedCompletion] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [subjectInput, setSubjectInput] = useState(subject);

  const fetchChallenge = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Generate one Dutch text (1 sentence) about ${subjectInput}, 
          but leave one sentence unfinished with a blank line of underscores (______________). 
          After the text, on a new line, write "SUGGESTION:" followed by a natural Dutch completion 
          for the blank. Do not add introductions or explanations.`
        }),
      });

      const data = await res.json();
      const output = data.answer || "";

      // Split out the suggestion part
      const parts = output.split("SUGGESTION:");
      const challengeText = parts[0]?.trim() || "";
      const completion = parts[1]?.trim() || "";

      setChallenge(challengeText);
      setSuggestedCompletion(completion);
      setUserInput("");
      setFeedback("");
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error fetching challenge");
    }
  };

  const checkAnswer = () => {
    if (!userInput.trim()) {
      setFeedback("⚠️ Please enter your completion.");
      return;
    }

    if (suggestedCompletion) {
      setFeedback(
        `Suggested completion was: "${suggestedCompletion}". Your answer: "${userInput}".`
      );
    } else {
      setFeedback(`Your answer: "${userInput}"`);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Dutch Sentence Completion</h2>

      {/* Topic input */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Choose a topic:</label>
        <input
          type="text"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          placeholder="Enter a topic..."
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <button
        onClick={fetchChallenge}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        New Challenge
      </button>

      {challenge && (
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Complete this Dutch text:</p>
          <blockquote className="whitespace-pre-line italic p-2 bg-gray-100 rounded">
            {challenge}
          </blockquote>
        </div>
      )}

      {challenge && (
        <div>
          <textarea
            rows="2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your completion here..."
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
            Submit
          </button>
        </div>
      )}

      {feedback && <div className="mt-4 text-lg">{feedback}</div>}
    </div>
  );
}
