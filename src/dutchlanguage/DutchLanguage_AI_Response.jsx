// import React from "react";
// import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";

// // Simple word-diff algorithm
// function diffWords(before, after) {
//   const beforeWords = before.trim().split(/\s+/);
//   const afterWords = after.trim().split(/\s+/);

//   let result = [];
//   let i = 0, j = 0;

//   while (i < beforeWords.length || j < afterWords.length) {
//     // if (beforeWords[i] === afterWords[j]) {
//     //   // same word
//     //   result.push(<span key={`${i}-${j}`}>{beforeWords[i]} </span>);
//     //   i++; j++;
//     // } 
//     if (beforeWords[i] === afterWords[j]) {
//   result.push(
//     <span
//       key={`same-${i}-${j}`}
//       style={{ color: "#0B5D1E", fontWeight: "bold" }} // dark green
//     >
//       {beforeWords[i]}{" "}
//     </span>
//   );
//   i++; j++;
// }

    
//     else if (afterWords[j] && !beforeWords.includes(afterWords[j])) {
//       // word was added
//       result.push(
//         <span
//           key={`add-${j}`}
//           // style={{ color: "green", fontWeight: "bold" }}
//           style={{ color: "blue" }}
//         >
//           {afterWords[j]}{" "}
//         </span>
//       );
//       j++;
//     } else if (beforeWords[i] && !afterWords.includes(beforeWords[i])) {
//       // word was removed
//       result.push(
//         <span
//           key={`rm-${i}`}
//           style={{ color: "red", textDecoration: "line-through" }}
//         >
//           {beforeWords[i]}{" "}
//         </span>
//       );
//       i++;
//     } 
    
//     // else {
//     //   // changed word
//     //   result.push(
//     //     <span
//     //       key={`chg-${i}-${j}`}
//     //       style={{ color: "#FF4F00", fontWeight: "bold" }}
//     //     >
//     //       {afterWords[j]}{" "}
//     //     </span>
//     //   );
//     //   i++; j++;
//     // }

// else {
//   // old word (incorrect)
//   result.push(
//     <span
//       key={`old-${i}`}
//       style={{ color: "red", textDecoration: "line-through" }}
//     >
//       {beforeWords[i]}{" "}
//     </span>
//   );

//   // corrected word (shown AFTER)
//   result.push(
//     <span
//       key={`new-${j}`}
//       style={{ color: "blue", fontWeight: "bold" }}
//     >
//       {afterWords[j]}{" "}
//     </span>
//   );

//   i++; j++;
// }


//   }

//   return result;
// }

// function DutchLanguage_AI_Response({ submission }) {
//   if (!submission) return null;

//   const countWords = (text) =>
//     text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

//   // Highlighted correction
//   const highlighted =
//     submission.aiCorrection
//       ? diffWords(submission.userInput, submission.aiCorrection)
//       : null;

//   return (
//     <div
//       style={{
//         padding: "10px",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         background: "#fafafa",
//         marginBottom: "16px",
//       }}
//     >
//       <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//         <div style={{ color: "#000" }}>"{submission.userInput}"</div>

//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <span style={{ color: "#c0c0c0", fontSize: "10pt" }}>
//             {countWords(submission.userInput)} woorden
//           </span>

//           <DutchLanguage_AI_ScoreSquares
//             averageScore={submission.scoreUserAverage}
//           />
//         </div>
//       </div>

//       {/* Highlighted AI Correction */}
//       {submission.aiCorrection && (
//         <div style={{ marginTop: "4px", fontSize: "14px" }}>
//           {highlighted}
//         </div>
//       )}

//       {/* AI feedback */}
//       {submission.aiFeedback && (
//         <div
//           style={{
//             color: "#474343ff",
//             fontStyle: "italic",
//             marginTop: "2px",
//           }}
//         >
//           {submission.aiFeedback}
//         </div>
//       )}

//       {/* Score breakdown */}
//       <div
//         style={{
//           marginTop: "4px",
//           fontSize: "14px",
//           color: "#909090",
//         }}
//       >
//         {submission.scoreWordorder !== undefined && (
//           <span>Word Order: {submission.scoreWordorder} , </span>
//         )}
//         {submission.scoreGrammar !== undefined && (
//           <span>Grammar: {submission.scoreGrammar} , </span>
//         )}
//         {submission.scoreVocabulary !== undefined && (
//           <span>Vocabulary: {submission.scoreVocabulary} , </span>
//         )}
//         {submission.scoreSpelling !== undefined && (
//           <span>Spelling: {submission.scoreSpelling} , </span>
//         )}
//         {submission.scoreComprehensibility !== undefined && (
//           <span>Comprehensibility: {submission.scoreComprehensibility} , </span>
//         )}
//         {submission.scoreNoun !== undefined && (
//           <span>Nouns: {submission.scoreNoun} , </span>
//         )}
//         {submission.scoreArticle !== undefined && (
//           <span>Articles: {submission.scoreArticle} , </span>
//         )}
//         {submission.scoreUserAverage !== undefined && (
//           <span>AVG: {submission.scoreUserAverage} / 5</span>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DutchLanguage_AI_Response;


import React from "react";
import DutchLanguage_AI_ScoreSquares from "./DutchLanguage_AI_ScoreSquares";

// Word diff with strict display order:
// SAME → CHANGED (red → blue) → REMOVED → ADDED
function diffWords(before, after) {
  const beforeWords = before.trim().split(/\s+/);
  const afterWords = after.trim().split(/\s+/);

  const result = [];
  let i = 0;
  let j = 0;

  while (i < beforeWords.length || j < afterWords.length) {
    const bw = beforeWords[i];
    const aw = afterWords[j];

    // 1. SAME word
    if (bw && aw && bw === aw) {
      result.push(
        <span
          key={`same-${i}-${j}`}
          style={{ color: "#0B5D1E", fontWeight: "bold" }}
        >
          {bw}{" "}
        </span>
      );
      i++;
      j++;
      continue;
    }

    // 2. CHANGED word (force red → blue)
    if (bw && aw) {
      result.push(
        <span
          key={`old-${i}`}
          style={{ color: "red", textDecoration: "line-through" }}
        >
          {bw}{" "}
        </span>
      );

      result.push(
        <span
          key={`new-${j}`}
          style={{ color: "blue" }}
        >
          {aw}{" "}
        </span>
      );

      i++;
      j++;
      continue;
    }

    // 3. REMOVED word
    if (bw && !aw) {
      result.push(
        <span
          key={`rm-${i}`}
          style={{ color: "red", textDecoration: "line-through" }}
        >
          {bw}{" "}
        </span>
      );
      i++;
      continue;
    }

    // 4. ADDED word
    if (!bw && aw) {
      result.push(
        <span
          key={`add-${j}`}
          style={{ color: "blue" }}
        >
          {aw}{" "}
        </span>
      );
      j++;
    }
  }

  return result;
}

function DutchLanguage_AI_Response({ submission }) {
  if (!submission) return null;

  const countWords = (text) =>
    text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

  const highlighted = submission.aiCorrection
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

      {submission.aiCorrection && (
        <div style={{ marginTop: "4px", fontSize: "14px" }}>
          {highlighted}
        </div>
      )}

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
