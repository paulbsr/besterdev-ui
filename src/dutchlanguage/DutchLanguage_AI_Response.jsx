import React from "react";
import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";


function DutchLanguage_AI_Response({ submission }) {
  if (!submission) return null;

  const countWords = (text) =>
    text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa",
        marginBottom: "16px",
        width: "99%"
      }}
    >
      {/* User input + word count + score squares */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "#000" }}>"{submission.userInput}"</span>
        <span style={{ color: "#c0c0c0", fontSize: "10pt" }}>{countWords(submission.userInput)} woorden</span>

        <DutchLanguage_AI_ScoreSquares averageScore={submission.scoreUserAverage} />
      </div>

      {/* AI suggestion */}
      {submission.aiCorrection && (
        <div style={{ color: "#FF4F00", marginTop: "4px" }}>{submission.aiCorrection}</div>
      )}

      {/* AI feedback */}
      {submission.aiFeedback && (
        <div style={{ color: "grey", fontStyle: "italic", marginTop: "2px", }}>{submission.aiFeedback}</div>
      )}

      {/* Optional: display individual 7 scores */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginTop: "4px",
          fontSize: "10px",
          color: "#999",
        }}
      >AI Score
        {submission.scoreWordorder !== undefined && (
          <span>Word Order: {submission.scoreWordorder}</span>
        )}
        {submission.scoreNoun !== undefined && (
          <span>Nouns (werkwoorden): {submission.scoreNoun}</span>
        )}
        {submission.scoreArticle !== undefined && (
          <span>Articles (lidwoorden): {submission.scoreArticle}</span>
        )}
        {submission.scoreSpelling !== undefined && (
          <span>Spelling: {submission.scoreSpelling}</span>
        )}
        {submission.scoreGrammar !== undefined && (
          <span>Grammar: {submission.scoreGrammar}</span>
        )}
        {submission.scoreComprehensibility !== undefined && (
          <span>Comprehensibility: {submission.scoreComprehensibility}</span>
        )}
        {submission.scoreVocabulary !== undefined && (
          <span>Vocabulary: {submission.scoreVocabulary}</span>
        )}
        {submission.scoreUserAverage !== undefined && (
          <span>AVG: {submission.scoreUserAverage} / 5</span>
        )}
      </div>
    </div>
  );
}

export default DutchLanguage_AI_Response;
