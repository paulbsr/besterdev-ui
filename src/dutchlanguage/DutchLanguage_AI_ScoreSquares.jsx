import React from "react";

// Reusable ScoreSquares based on average score
const DutchLanguage_AI_ScoreSquares = ({ averageScore }) => {
  // We'll display 5 squares, coloring up to the rounded average
  const maxSquares = 5;
  const colors = ["#FF4F00", "#FF8000", "#FFC000", "#A6D96A", "#1A9850"];
  const filledSquares = Math.round(averageScore); // round to nearest integer
  const index = filledSquares > 0 ? filledSquares - 1 : null;

  // return (
  //   <div style={{ display: "flex", gap: "4px", marginLeft: "6px" }}>
  //     {Array.from({ length: maxSquares }, (_, i) => (
  //       <div
  //         key={i}
  //         style={{
  //           width: "10px",
  //           height: "10px",
  //           borderRadius: "1px",
  //           backgroundColor: i < filledSquares ? colors[i] : "#f0f0f0",
  //           border: "0.5px solid #ccc",
  //         }}
  //       />
  //     ))}
  //   </div>
  // );

      return (
        <div style={{ display: "flex", gap: "4px", marginLeft: "6px" }}>
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "1px",
                        backgroundColor: index === i ? colors[i] : "#f0f0f0",
                        border: "0.5px solid #ccc",
                    }}
                />
            ))}
        </div>
    );
};

export default DutchLanguage_AI_ScoreSquares;
