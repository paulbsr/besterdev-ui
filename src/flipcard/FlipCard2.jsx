import React, { useState } from "react";

// Minimal, dependency-free flip card component.
// Works in any React app (no Tailwind or extra libs required).

function FlipCard({ term, question, width = 200, height = 50 }) {
  const [flipped, setFlipped] = useState(false);

  const containerStyle = {
    perspective: "1000px",
    width,
    height,
  };

  const cardStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s ease",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceBase = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    borderRadius: 8,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    backfaceVisibility: "hidden",
    cursor: "pointer",
    userSelect: "none",
  };

//   const frontStyle = {
//     ...faceBase,
//     color: "white",
//     fontWeight: 200,
//     fontSize: 20,
//     background:
//       "linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(99,102,241,1) 50%, rgba(236,72,153,1) 100%)",
//   };

const frontStyle = {
...faceBase,
background: "#ffffff", // white background
color: "#111827", // dark text
fontWeight: 200,
fontSize: 20,
};

//   const backStyle = {
//     ...faceBase,
//     background: "#ffffff",
//     color: "#111827",
//     transform: "rotateY(180deg)",
//     fontSize: 16,
//     lineHeight: 1.3,
//     textAlign: "center",
//   };

const backStyle = {
...faceBase,
background: "#ffffff",
color: "#111827",
transform: "rotateY(180deg)",
fontFamily: "Segoe UI",
fontSize: 12,
lineHeight: 1.3,
textAlign: "center",
};

  function toggle() {
    setFlipped((f) => !f);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div
          style={innerStyle}
          role="button"
          aria-pressed={flipped}
          tabIndex={0}
          onClick={toggle}
          onKeyDown={onKeyDown}
          aria-label={flipped ? "Show term" : "Show question"}
        >
          {/* Front */}
          <div style={frontStyle}>{term}</div>

          {/* Back */}
          <div style={backStyle}>{question}</div>
        </div>
      </div>
    </div>
  );
}

// Example usage with dummy data:
const DUMMY_DATA = [
  { term: "Monolith", question: "What are two pros and two cons of a monolithic architecture?" },
  { term: "Microservice", question: "Name two challenges when splitting a monolith into microservices." },
  { term: "OAuth 2.0", question: "What is the difference between Authorization Code and Client Credentials flows?" },
  { term: "CAP Theorem", question: "In CAP, which two properties can a distributed system prioritize under network partition?" },
  { term: "Idempotency", question: "Why should a PUT be idempotent and how would you enforce that on the server?" },
  { term: "CQRS", question: "When is Command Query Responsibility Segregation a good fit?" },
];

export default function App() {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 20,
    padding: 24,
    maxWidth: 1000,
    margin: "0 auto",
  };

  const headingStyle = {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 24,
    marginTop: 24,
  };

  const subStyle = {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 8,
  };

  return (
    <div>
      {/* <h1 style={headingStyle}>Flip Card Demo</h1>
      <p style={subStyle}>
        Click a card to flip between a <strong>term</strong> and its <strong>question</strong>.
      </p> */}
      <div style={gridStyle}>
        {DUMMY_DATA.map((item, idx) => (
          <FlipCard key={idx} term={item.term} question={item.question} />
        ))}
      </div>
    </div>
  );
}
