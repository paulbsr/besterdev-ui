import React from "react";
import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";

// Simple word-diff algorithm
function diffWords(before, after) {
  const beforeWords = before.trim().split(/\s+/);
  const afterWords = after.trim().split(/\s+/);

  let result = [];
  let i = 0, j = 0;

  while (i < beforeWords.length || j < afterWords.length) {
    if (beforeWords[i] === afterWords[j]) {
      // same word
      result.push(<span key={`${i}-${j}`}>{beforeWords[i]} </span>);
      i++; j++;
    } else if (afterWords[j] && !beforeWords.includes(afterWords[j])) {
      // word was added
      result.push(
        <span
          key={`add-${j}`}
          style={{ color: "green", fontWeight: "bold" }}
        >
          {afterWords[j]}{" "}
        </span>
      );
      j++;
    } else if (beforeWords[i] && !afterWords.includes(beforeWords[i])) {
      // word was removed
      result.push(
        <span
          key={`rm-${i}`}
          style={{ color: "red", textDecoration: "line-through" }}
        >
          {beforeWords[i]}{" "}
        </span>
      );
      i++;
    } else {
      // changed word
      result.push(
        <span
          key={`chg-${i}-${j}`}
          style={{ color: "#FF4F00", fontWeight: "bold" }}
        >
          {afterWords[j]}{" "}
        </span>
      );
      i++; j++;
    }
  }

  return result;
}

function DutchLanguage_AI_Response({ submission }) {
  if (!submission) return null;

  const countWords = (text) =>
    text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

  // Highlighted correction
  const highlighted =
    submission.aiCorrection
      ? diffWords(submission.userInput, submission.aiCorrection)
      : null;

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ color: "#000" }}>"{submission.userInput}"</div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#c0c0c0", fontSize: "10pt" }}>
            {countWords(submission.userInput)} woorden
          </span>

          <DutchLanguage_AI_ScoreSquares
            averageScore={submission.scoreUserAverage}
          />
        </div>
      </div>

      {/* Highlighted AI Correction */}
      {submission.aiCorrection && (
        <div style={{ marginTop: "4px", fontSize: "14px" }}>
          {highlighted}
        </div>
      )}

      {/* AI feedback */}
      {submission.aiFeedback && (
        <div
          style={{
            color: "#474343ff",
            fontStyle: "italic",
            marginTop: "2px",
          }}
        >
          {submission.aiFeedback}
        </div>
      )}

      {/* Score breakdown */}
      <div
        style={{
          marginTop: "4px",
          fontSize: "14px",
          color: "#909090",
        }}
      >
        {submission.scoreWordorder !== undefined && (
          <span>Word Order: {submission.scoreWordorder} , </span>
        )}
        {submission.scoreGrammar !== undefined && (
          <span>Grammar: {submission.scoreGrammar} , </span>
        )}
        {submission.scoreVocabulary !== undefined && (
          <span>Vocabulary: {submission.scoreVocabulary} , </span>
        )}
        {submission.scoreSpelling !== undefined && (
          <span>Spelling: {submission.scoreSpelling} , </span>
        )}
        {submission.scoreComprehensibility !== undefined && (
          <span>Comprehensibility: {submission.scoreComprehensibility} , </span>
        )}
        {submission.scoreNoun !== undefined && (
          <span>Nouns: {submission.scoreNoun} , </span>
        )}
        {submission.scoreArticle !== undefined && (
          <span>Articles: {submission.scoreArticle} , </span>
        )}
        {submission.scoreUserAverage !== undefined && (
          <span>AVG: {submission.scoreUserAverage} / 5</span>
        )}
      </div>
    </div>
  );
}

export default DutchLanguage_AI_Response;
